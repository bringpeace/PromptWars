"use client";

import { useSession } from "next-auth/react";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isAuthPage || !session) {
    return <main className="flex min-h-screen flex-col">{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-app">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
