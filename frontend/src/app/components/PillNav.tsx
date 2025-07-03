// components/PillNav.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/worklog", label: "Work Log" },
  { href: "/salary", label: "Salary" },
  { href: "/overtime", label: "Overtime" },
  { href: "/tax", label: "Tax Overview" },
  { href: "/profile", label: "Profile" },
];

export default function PillNav() {
  const pathname = usePathname();
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; height: number }>({
    left: 0,
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  
  useEffect(() => {
    const index = navItems.findIndex((item) => item.href === pathname);
    const tab = tabRefs.current[index];
    const container = containerRef.current;
    if (tab && container) {
      const tabRect = tab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPillStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
        height: tab.offsetHeight,
      });
    }
  }, [pathname]);

  return (
    <nav
      className="relative flex flex-wrap gap-2 bg-slate-50 p-2 rounded-full w-fit max-w-full mx-auto my-2 overflow-x-auto"
  ref={containerRef}
    >
      {/* Animated blue pill */}
      <div
        className="absolute top-2 transition-all duration-300 z-0"
        style={{
          left: pillStyle.left,
          width: pillStyle.width,
          height: pillStyle.height,
          background: "#2563eb", // Tailwind's blue-600
          borderRadius: "9999px",
        }}
      />
      {/* Tabs */}
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            className={`relative px-6 py-2 rounded-full font-medium transition-colors z-10 ${
              isActive ? "text-white" : "text-gray-700 hover:bg-blue-50"
            }`}
            style={{
              // So that text is above the animated pill
              background: isActive ? "transparent" : "transparent",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}