import { useServerUser } from "@/src/hooks/useServerUser";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const user = await useServerUser();

  if (!user) {
    return redirect("/");
  }

  return <div className="">protected page</div>;
}
