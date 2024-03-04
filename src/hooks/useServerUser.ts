import { createClient } from "@/utils/supabase/server";

export const useServerUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
