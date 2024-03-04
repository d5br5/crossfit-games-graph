"use client";

import { createClient } from "@/utils/supabase/client";

const GoogleSignIn = () => {
  const login = async () => {
    const supabase = createClient();
    const origin = location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };
  return <button onClick={login}>Google Sign</button>;
};

export default GoogleSignIn;
