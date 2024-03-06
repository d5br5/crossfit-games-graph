import { createClient } from "@/src/utils/supabase/server";

import GoogleSignIn from "./GoogleSignIn";
import LoggedInUserButton from "./LoggedInUserButton";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <LoggedInUserButton /> : <GoogleSignIn />;
}
