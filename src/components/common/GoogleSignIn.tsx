"use client";

import { Button } from "@/src/components/ui/button";
import { createClient } from "@/src/utils/supabase/client";

const GoogleSignIn = () => {
  const login = async () => {
    const supabase = createClient();
    const origin = location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    });
  };
  return (
    <Button onClick={login} variant="ghost">
      Login with Google
    </Button>
  );
};

export default GoogleSignIn;
