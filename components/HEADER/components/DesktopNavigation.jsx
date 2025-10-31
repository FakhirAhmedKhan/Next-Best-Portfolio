'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navItemVariants } from "@/UI/motionConfige";
import { useAppContext } from "@/lib/contexts/app-context";

export const DesktopNavigation = () => {
  const {
    navItems,
  } = useAppContext();

  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-2">
      {navItems?.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <motion.div
            key={item.id || index}
            custom={index}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link href={item.href}>
              <motion.div
                className={`relative px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId="navBg"
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    <motion.div
                      layoutId="navBorder"
                      className="absolute inset-0 border-2 border-pink-500/50 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  </>
                )}

                <Icon className="w-4 h-4 relative z-10" />
                <span className="font-medium relative z-10">{item.label}</span>

                {!isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "70%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};