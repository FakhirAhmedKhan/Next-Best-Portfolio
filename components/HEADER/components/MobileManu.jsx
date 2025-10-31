'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { mobileItemVariants, mobileMenuVariants } from "@/UI/motionConfige";
import { useAppContext } from "@/lib/contexts/app-context";

export const MobileMenu = () => {
  const {
    navItems,
    isMenuOpen,
    setIsMenuOpen,
  } = useAppContext();

  const pathname = usePathname();

  return (
    <motion.div
      variants={mobileMenuVariants}
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      className="md:hidden overflow-hidden"
    >
      <motion.div className="py-6 space-y-3">
        {navItems?.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <motion.div key={item.id} variants={mobileItemVariants}>
              <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                      ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 text-white border-2 border-pink-500/30"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white border-2 border-transparent"
                    }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileDot"
                      className="ml-auto w-2 h-2 rounded-full bg-pink-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}

        <motion.div variants={mobileItemVariants}>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-4 py-3 mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl text-white font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};