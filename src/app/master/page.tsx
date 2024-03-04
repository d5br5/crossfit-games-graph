import { useServerUser } from "@/src/hooks/useServerUser";
import { redirect } from "next/navigation";
import { UpdateButton } from "./update-button";

export default async function MasterPage() {
  const user = await useServerUser();

  const isMaster = user?.id === process.env.MASTER_UID;

  if (!user || !isMaster) return redirect("/");

  return (
    <div className="flex-1 grid place-items-center">
      <UpdateButton />
    </div>
  );
}
