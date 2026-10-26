"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Home, ShoppingBag, User } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const NAV = [
  { name: "Home", path: "/", icon: Home },
  { name: "Shop", path: "/shop", icon: ShoppingBag },
  { name: "Saved", path: "/saved", icon: Bookmark },
  { name: "Profile", path: "/dashboard", icon: User },
];

function isActive(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  if (path === "/shop") return pathname === "/shop" || pathname === "/cart";
  if (path === "/dashboard") {
    return ["/dashboard", "/login", "/setup", "/quests", "/fridge-rescue"].includes(pathname);
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function BottomNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-white px-8 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(61,41,20,0.04)]">
      <div className="mx-auto flex max-w-md items-center justify-between">
        {NAV.map((item) => {
          const active = isActive(pathname, item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${
                active ? "text-coral" : "text-muted-foreground hover:text-coral"
              }`}
            >
              <motion.span
                className="relative"
                whileTap={reduce ? undefined : { scale: 0.9 }}
                animate={reduce ? undefined : { scale: active ? 1.04 : 1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {active ? (
                  <span className="absolute -top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-coral" />
                ) : null}
                <Icon size={24} strokeWidth={active ? 2.4 : 2} />
              </motion.span>
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
