import { Button } from "@/src/components/ui/button";
import { useServerUser } from "@/src/hooks/useServerUser";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/src/utils/supabase/server";

const UserPage = async () => {
  const user = await useServerUser();
  if (!user) return redirect("/login");

  const isMaster = user?.id === process.env.MASTER_UID;

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {isMaster && <Button>Master</Button>}
      <form
        action={signOut}
        className="flex justify-between w-full items-center"
      >
        <Button variant="outline" type="submit">
          Log out <LogOut className="size-[0.9rem]" />
        </Button>
      </form>
    </div>
  );
};

export default UserPage;
