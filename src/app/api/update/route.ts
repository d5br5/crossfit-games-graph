import { NextResponse } from "next/server";
import { convertElem, getApiURL } from "@/src/lib/utils";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  const { year, division, ordinal, filter } = body;

  const firstAPIURL = getApiURL(year, division, 1);
  const data = await fetch(firstAPIURL).then((res) => res.json());

  const { totalPages, totalCompetitors } = data.pagination;

  const result = [];

  try {
    // delete all rows before refresh data
    console.log("=== Start : Delete ===");
    const { error } = await supabase
      .from("2024-open-1")
      .delete()
      .neq("rank", -1);
    if (error) console.log(error);
    console.log("=== Finish : Delete");

    // fetch data from API
    console.log("=== Start : Fetching ===");
    for (let i = 1; i < 3; i++) {
      if (i % 10 === 0) {
        console.log(`Fetching page ${i} of ${totalPages}`);
      }
      const apiURL = getApiURL(year, division, i);
      const data = await fetch(apiURL).then((res) => res.json());
      const { leaderboardRows } = data;
      for (const row of leaderboardRows) {
        const score = row.scores.find(
          (score: any) => score.ordinal === ordinal
        );
        const record = convertElem(score, filter);
        result.push(record);
      }
    }
    console.log("=== Finish : Fetching ===");
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message });
  }

  // insert data to supabase
  console.log("=== Start : Insert into DB ===");
  const { error } = await supabase.from("2024-open-1").insert(result);
  if (error) console.log(error);
  console.log("=== Finish : Insert into DB ===");

  return NextResponse.json({
    ok: true,
    data: `For ${totalPages} pages / ${totalCompetitors} competitors - Data Updated : ${result.length} records`,
  });
}
