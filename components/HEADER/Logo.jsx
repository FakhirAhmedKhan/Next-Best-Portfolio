import { Sparkles } from "lucide-react";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <div
      className="flex items-center gap-2 transition-transform duration-300
      hover:scale-105 active:scale-95"
    >
      <Link href="/" className="flex items-center gap-3 group">
        <div
          className="w-10 h-10 rounded-xl bg-linear-to-br from-fuchsia-600 to-violet-600 
          flex items-center justify-center shadow-lg
          transition-transform duration-500 group-hover:rotate-180"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        <span
          className="text-2xl font-bold bg-linear-to-r from-fuchsia-600 via-pink-600 to-violet-600
          bg-clip-text text-transparent"
        >
          Simple.Dev
        </span>
      </Link>
    </div>
  );
};

export default HeaderLogo;