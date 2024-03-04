"use client";

import { Button } from "@/src/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { LogIn } from "lucide-react";

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
  return (
    <Button onClick={login} variant="ghost">
      Login with Google
    </Button>
  );
};

export default GoogleSignIn;