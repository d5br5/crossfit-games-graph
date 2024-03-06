import { NextResponse } from "next/server";
import { convertElem, getApiURL } from "@/src/utils/api/fetch";
import { createClient } from "@/src/utils/supabase/server";
import { genderMap } from "@/src/config/const";

const { log } = console;

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  const { year, division, ordinal, filter } = body;

  const tableName = `${year}-OPEN-${ordinal}-${genderMap[division]}`;
  log(`Data will be updated at table : ${tableName}`);

  // 기존 데이터 삭제
  log("┌ Start : Delete ┐");
  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .neq("rank", -1);
  if (deleteError) log(deleteError);
  log("└ Finish: Delete ┘");

  const scoreMap: { [key: number]: { count: number } } = {};

  const firstAPIURL = getApiURL(year, division, 1);
  const data = await fetch(firstAPIURL).then((res) => res.json());
  const { totalPages, totalCompetitors } = data.pagination;

  try {
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
        const score = row.scores.find(
          (score: any) => score.ordinal === ordinal
        );
        const record = convertElem(score, filter);
        const { rank } = record;
        if (scoreMap[rank]) {
          scoreMap[rank].count += 1;
        } else {
          scoreMap[rank] = { count: 1, ...record };
        }
      }
    }
    log("=== Finish : Fetching ===");
  } catch (e: any) {
    log("returned by error");
    return NextResponse.json({ ok: false, error: e.message });
  }

  const dataList = Object.values(scoreMap);

  // DB에 데이터 넣기
  log("┌ Start : Insert into DB ┐");
  const { error } = await supabase.from(tableName).insert(dataList);
  if (error) log(error);
  log("└ Finish: Insert into DB ┘");

  return NextResponse.json({
    ok: true,
    data: `For ${totalPages} pages / ${totalCompetitors} competitors.`,
  });
}
