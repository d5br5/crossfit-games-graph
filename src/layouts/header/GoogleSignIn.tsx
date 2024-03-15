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
    <Button onClick={login} variant="outline">
      구글 계정으로 로그인
    </Button>
  );
};

export default GoogleSignIn;
