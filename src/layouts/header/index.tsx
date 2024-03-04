import Link from "next/link";

import AuthButton from "@/src/layouts/header/AuthButton";
import ThemeSwitch from "@/src/layouts/theme/Switch";

const Header = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">
          <div className="font-semibold text-lg">Crossfit Games Graph</div>
        </Link>
        <div className="flex gap-2">
          <AuthButton />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Header;