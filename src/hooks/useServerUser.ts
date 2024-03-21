import { createClient } from "@/src/utils/supabase/server";

export const useServerUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;

  // const { data: profiles } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("id", user?.id);

  // console.log(profiles);

  // if (profiles?.length === 0) {
  //   const result = await supabase.from("profiles").insert({
  //     id: user?.id,
  //     first_name: "test1",
  //     last_name: "test2",
  //   });
  //   console.log(result);
  // }
};
