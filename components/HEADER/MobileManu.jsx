"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "@/hooks/useNav";

const MobileMenu = () => {
  const { navItems, isMenuOpen, setIsMenuOpen } = useNav();
  const pathname = usePathname();

  return (
    <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="py-6 space-y-3">
        {navItems?.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <div key={item.id} className="transform transition-all duration-300">
              <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                <div
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300 relative
                    ${isActive
                      ? "bg-linear-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 text-white border-2 border-pink-500/30"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white border-2 border-transparent"
                    }
                    hover:translate-x-1 active:scale-95
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>

                  {isActive && (<div className="ml-auto w-2 h-2 rounded-full bg-pink-500" />)}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MobileMenu;