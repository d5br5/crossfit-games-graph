import AuthButton from "@/src/components/common/AuthButton";
import { Button } from "@/src/components/ui/button";
import { useServerUser } from "@/src/hooks/useServerUser";
import Link from "next/link";

const UserPage = async () => {
  const user = await useServerUser();

  const isMaster = user?.id === process.env.MASTER_UID;

  return (
    <div className="grid place-items-center flex-1">
      <div className="flex flex-col items-center gap-4">
        <AuthButton />
        {isMaster && (
          <Button asChild>
            <Link href="/master">Master</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserPage;
