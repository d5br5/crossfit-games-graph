import Link from "next/link";

import AuthButton from "@/src/components/common/AuthButton";
import ThemeSwitch from "@/src/layouts/theme/Switch";

const Header = () => {
  return (
    <nav className="w-full flex justify-between items-center text-sm border-b border-b-foreground/10 h-16 py-3 px-5">
      <Link href="/" className="font-semibold text-lg">
        Crossfit Games Graph
      </Link>
      <ThemeSwitch />
    </nav>
  );
};

export default Header;
