import { SupabaseClient } from "@supabase/supabase-js";

import { apiBaseURL, genderMap } from "@/src/config/const";
import {
  CountMap,
  HeadCount,
  MetaInfo,
  RawScore,
  Score,
  ScoreMap,
} from "@/src/config/types";

const { log } = console;

export const getApiURL = (
  year: number,
  division: number,
  page: number
): string => {
  return `${apiBaseURL}/${year}/leaderboards?division=${division}&page=${page}`;
};

export const getTableName = (
  year: number,
  ordinal: number,
  division: number
) => {
  return `${year}-OPEN-${ordinal}-${genderMap[division]}`;
};

export const resetTable = async (
  supabase: SupabaseClient,
  tableName: string
) => {
  log("┌ Start : Delete ┐");
  const { error } = await supabase.from(tableName).delete().neq("rank", -1);
  if (error) log(error);
  log("└ Finish: Delete ┘");
};

export const insertDataIntoTable = async (
  supabase: SupabaseClient,
  tableName: string,
  dataList: any[]
) => {
  log("┌ Start : Insert into DB ┐");
  const { error } = await supabase.from(tableName).insert(dataList);
  if (error) log(error);
  log("└ Finish: Insert into DB ┘");
};

export const updateTableLastUpdated = async (
  supabase: SupabaseClient,
  tableName: string
) => {
  log("┌ Start  : update table - last updated ┐");
  const { error } = await supabase
    .from("table-status")
    .upsert({ tableName, lastUpdated: new Date().toISOString() });
  if (error) log(error);
  log("└ Finish : update table - last updated ┘");
};

export const updateHeadCountTable = async (
  supabase: SupabaseClient,
  headCountDist: HeadCount[],
  metaInfo: MetaInfo
) => {
  const tableName = "head-count";
  const { year, ordinal, division } = metaInfo;

  // 기존 데이터 삭제
  await supabase
    .from(tableName)
    .delete()
    .eq("year", year)
    .eq("ordinal", ordinal)
    .eq("division", division);

  const dataList = headCountDist.map((item) => ({
    category: "open",
    year,
    ordinal,
    division,
    scaled: item.scaled,
    count: item.count,
    percentage: item.percentage,
  }));

  log("┌ Start  : update table - head count ┐");
  const { error } = await supabase.from(tableName).insert(dataList);
  if (error) log(error);
  log("└ Finish : update table - head count ┘");
};

export const fetchAllPages = async (metaInfo: MetaInfo) => {
  const { year, ordinal, division } = metaInfo;

  // API 호출 후 score 목록을 가공하여 저장할 Map
  const scoreMap: ScoreMap = {};
  const countMap: CountMap = {};
  let blankCount = 0;

  // 첫 API 호출로 총 page 산정
  const firstAPIURL = getApiURL(year, division, 1);
  const data = await fetch(firstAPIURL).then((res) => res.json());
  const { totalPages } = data.pagination;

  // crossfit API로 데이터 가져오기
  log("=== Start : Fetching ===");

  for (let i = 1; i <= totalPages; i++) {
    if (i % 10 === 0) {
      log(`Fetching page ${i} of ${totalPages}`);
    }
    const apiURL = getApiURL(year, division, i);
    const data = await fetch(apiURL).then((res) => res.json());

    const { leaderboardRows } = data;
    for (const row of leaderboardRows) {
      const score = row.scores.find((score: any) => score.ordinal === ordinal);
      const record = convertElem(score);
      const { rank, scoreDisplay, scaled } = record;
      if (score.score === "0" || scoreDisplay === "") {
        blankCount += 1;
        continue;
      }

      if (scoreMap[scoreDisplay]) {
        // 이미 존재하면 count, rank 업데이트
        const obj = scoreMap[scoreDisplay];
        obj.count += 1;
        if (rank < obj.rank) obj.rank = rank;
      } else {
        // 존재하지 않으면 count 1로 초기화
        scoreMap[scoreDisplay] = {
          ...record,
          count: 1,
        };
      }

      if (countMap[scaled]) {
        const obj = countMap[scaled];
        obj.count += 1;
        if (rank < obj.firstRank) obj.firstRank = rank;
      } else {
        countMap[scaled] = {
          count: 1,
          firstRank: rank,
        };
      }
    }
  }

  log("=== Finish : Fetching ===");

  return { scoreMap, countMap, blankCount };
};

const toNum = (value: any) => {
  const numberdValue = Number(value);
  const isNumber = !isNaN(numberdValue);
  return isNumber ? numberdValue : 0;
};

export const convertElem = (elem: RawScore) => {
  const newItem: Score = {
    rank: toNum(elem.rank),
    scaled: toNum(elem.scaled),
    breakdown: String(elem.breakdown),
    scoreDisplay: String(elem.scoreDisplay),
    time: toNum(elem.time),
  };
  return newItem;
};

export const addPercentage = (scoreMap: ScoreMap, countMap: CountMap) => {
  const total = Object.values(countMap)
    .map((item) => item.count)
    .reduce((prev, curr) => prev + curr, 0);

  const values = Object.values(scoreMap);

  console.log(total);
  console.log(countMap);

  const result = values.map((score) => {
    const { count, firstRank } = countMap[score.scaled];

    return {
      ...score,
      partPercentage: Number(
        (((score.rank - firstRank + 1) / count) * 100).toFixed(3)
      ),
      overallPercentage: Number(((score.rank / total) * 100).toFixed(3)),
    };
  });

  return result;
};

export const getHeadCountDist = (
  countMap: CountMap,
  blankCount: number = 0
) => {
  const total =
    Object.values(countMap)
      .map((item) => item.count)
      .reduce((prev, curr) => prev + curr, 0) + blankCount;

  const result: HeadCount[] = Object.entries(countMap).map(([key, value]) => {
    return {
      scaled: key,
      count: value.count as number,
      percentage: Number(((value.count / total) * 100).toFixed(3)),
    };
  });

  result.push({
    scaled: "-1",
    count: blankCount,
    percentage: Number(((blankCount / total) * 100).toFixed(3)),
  });

  return result;
};
