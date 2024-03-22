import { useServerUser } from "../hooks/useServerUser";
import { createClient } from "../utils/supabase/server";

export const checkIsRegistered = async () => {
  // 미로그인 유저는 패스
  const user = await useServerUser();
  if (!user) return true;

  // 로그인 유저는 프로필이 있는지 확인
  const supabase = createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!profiles || profiles.length === 0) {
    return false;
  }

  return true;
};
