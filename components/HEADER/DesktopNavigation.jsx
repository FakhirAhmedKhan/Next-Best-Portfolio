"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DesktopNavigation = ({ navItems }) => {
  const pathname = usePathname();
console.log("REDIRECT FROM", pathname)
  return (
    <div className="hidden lg:flex items-center gap-2">
      {navItems?.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <div key={item.id || index} className="relative">
            <Link href={item.href}>
              <div
                className={`relative px-5 py-2.5 rounded-xl flex items-center gap-2 
                transition-all duration-300 cursor-pointer
                ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
                hover:scale-105 active:scale-95
              `}
              >
                {/* Active Background */}
                {isActive && (
                  <>
                    <div
                      className="absolute inset-0 bg-linear-to-r
                      from-pink-500/20 via-purple-500/20 to-indigo-500/20 
                      rounded-xl transition-all duration-300"
                    />

                    <div
                      className="absolute inset-0 border-2 border-pink-500/50
                      rounded-xl transition-all duration-300"
                    />
                  </>
                )}

                {/* Icon */}
                <Icon className="w-4 h-4 relative z-10" />

                {/* Label */}
                <span className="font-medium relative z-10">{item.label}</span>

                {/* Hover Underline */}
                {!isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 
                    h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 
                    rounded-full transition-all duration-300 group-hover:w-[70%]"
                  />
                )}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopNavigation;
