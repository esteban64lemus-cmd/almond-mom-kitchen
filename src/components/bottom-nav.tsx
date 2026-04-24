"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Refrigerator,
  ShoppingCart,
  Activity,
  BookOpen,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", path: "/", icon: Home },
    { name: "FRIDGE", path: "/fridge-rescue", icon: Refrigerator },
    { name: "CRAVINGS", path: "/cravings", icon: Utensils },
    { name: "SHOP", path: "/shop", icon: ShoppingCart },
    { name: "LOG", path: "/log", icon: Activity },
    { name: "READ", path: "/blog", icon: BookOpen },
  ];

  return (
    <div className="pointer-events-none fixed right-0 bottom-6 left-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass no-scrollbar pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-[32px] px-2 py-2 shadow-2xl shadow-black/10"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative flex h-14 w-16 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                isActive
                  ? "text-obsidian"
                  : "text-obsidian/40 hover:text-obsidian hover:bg-black/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 rounded-2xl border border-black/5 bg-white shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold tracking-wider">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
