import { getTableName } from "@/src/utils/api/fetch";
import { createClient } from "@/src/utils/supabase/server";

import Chart from "./Chart";

const BoardPage = async () => {
  const supabase = createClient();
  const tableName = getTableName(2024, 1, 1);
  const { data } = await supabase.from(tableName).select().eq("scaled", 0);

  return (
    <div className="grid place-content-center flex-1">
      <h2>{tableName}</h2>
      {data && <Chart data={data} />}
    </div>
  );
};
export default BoardPage;
