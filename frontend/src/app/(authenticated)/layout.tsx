// app/(authenticated)/layout.tsx or whatever your layout is
"use client";
import PillNav from "../components/PillNav";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PillNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
