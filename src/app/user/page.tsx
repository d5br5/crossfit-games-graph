import AuthButton from "@/src/components/common/AuthButton";
import { Button } from "@/src/components/ui/button";
import { useServerUser } from "@/src/hooks/useServerUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/src/utils/supabase/server";

const UserPage = async () => {
  const user = await useServerUser();

  const isMaster = user?.id === process.env.MASTER_UID;

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/user");
  };

  return (
    <div className="grid place-items-center flex-1">
      <div className="flex flex-col items-center gap-4">
        <form
          action={signOut}
          className="flex justify-between w-full items-center"
        >
          <Button variant="outline" type="submit">
            Log out <LogOut className="size-[0.9rem]" />
          </Button>
        </form>
        {isMaster && <Button>Master</Button>}
      </div>
    </div>
  );
};

export default UserPage;
