import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const apiURL =
  "https://c3po.crossfit.com/api/competitions/v2/competitions/open/2022/leaderboards";

export async function GET(request: Request) {
  fetch(apiURL)
    .then((res) => res.json())
    .then((res) => console.log(res));

  return NextResponse.json({ data: "hello" });
}
