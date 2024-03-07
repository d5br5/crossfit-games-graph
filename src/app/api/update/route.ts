import { NextResponse } from "next/server";
import {
  addPercentage,
  fetchAllPages,
  getHeadCountDist,
  getTableName,
  insertDataIntoTable,
  resetTable,
  updateHeadCountTable,
  updateTableLastUpdated,
} from "@/src/utils/api/fetch";
import { createClient } from "@/src/utils/supabase/server";
import { MetaInfo } from "@/src/config/types";

const { log } = console;

export async function POST(request: Request) {
  // request body를 기반으로 DB 테이블명 정하기
  const body = await request.json();
  const { year, division, ordinal } = body;
  const metaInfo: MetaInfo = { year, division, ordinal };

  const tableName = getTableName(year, ordinal, division);
  log(`Data will be updated at table : ${tableName}`);

  // db control을 위한 supabase client
  const supabase = createClient();

  // 기존 데이터 삭제
  await resetTable(supabase, tableName);

  try {
    // 모든 페이지 fetch 후 scoreMap 생성
    const { scoreMap, countMap, blankCount } = await fetchAllPages(metaInfo);
    const dataList = addPercentage(scoreMap, countMap);
    const headCountDist = getHeadCountDist(countMap, blankCount);

    // 새로운 데이터 DB에 넣기
    await insertDataIntoTable(supabase, tableName, dataList);
    await updateTableLastUpdated(supabase, tableName);
    await updateHeadCountTable(supabase, headCountDist, metaInfo);
  } catch (e) {
    log("returned by error");
    return NextResponse.json({ ok: false, error: e });
  }

  return NextResponse.json({
    ok: true,
    msg: "fetched successfully",
  });
}
