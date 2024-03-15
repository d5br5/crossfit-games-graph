import Link from "next/link";

import { User as UserIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export const LoggedIn = () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/user">
        <UserIcon className="size-[1.2rem]" />
      </Link>
    </Button>
  );
};

export const LoggedOut = () => {
  return (
    <Button variant="ghost" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
};
