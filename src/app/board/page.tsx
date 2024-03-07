import { createClient } from "@/src/utils/supabase/server";

import Chart from "./Chart";

const BoardPage = async () => {
  const supabase = createClient();
  const tableName = "2024-OPEN-1-min";
  const title = "Crossfit Open 2024.1";
  const { data } = await supabase
    .from(tableName)
    .select()
    .eq("scaled", 1)
    .eq("division", 2);

  return (
    <div className="flex flex-col flex-1 items-center">
      <h2 className="text-xl font-bold my-2">{title}</h2>
      {data && <Chart data={data} />}
    </div>
  );
};
export default BoardPage;
