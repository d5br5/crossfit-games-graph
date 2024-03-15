import { createClient } from "@/src/utils/supabase/server";
import { LoggedIn, LoggedOut } from "./UserButton";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <LoggedIn /> : <LoggedOut />;
}
