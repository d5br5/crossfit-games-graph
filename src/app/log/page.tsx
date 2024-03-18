import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const LogPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Log Page</div>

      <Button asChild>
        <Link href={"/log/new"}>Button</Link>
      </Button>
    </div>
  );
};

export default LogPage;
