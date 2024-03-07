import { useServerUser } from "@/src/hooks/useServerUser";
import { notFound, redirect } from "next/navigation";
import { Update } from "./Update";

export default async function MasterPage() {
  const user = await useServerUser();

  const isMaster = user?.id === process.env.MASTER_UID;

  if (!user || !isMaster) return notFound();

  return (
    <div className="flex-1 grid place-items-center">
      <Update />
    </div>
  );
}
