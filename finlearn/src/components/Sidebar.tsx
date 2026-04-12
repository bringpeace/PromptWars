"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Layers, History, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Chapters", href: "/chapters", icon: BookOpen },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "History", href: "/history", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col justify-between glass border-r border-[rgba(255,255,255,0.1)] p-4 text-text-main shadow-lg">
      <div>
        <div className="mb-8 flex items-center justify-center py-4">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-black text-transparent tracking-tighter">
            finlearn.
          </h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] font-semibold"
                    : "hover:bg-surface-hover hover:text-white text-text-muted"
                }`}
              >
                <Icon size={20} className={isActive ? "text-primary" : ""} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-text-muted transition-colors hover:bg-error/20 hover:text-error"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
