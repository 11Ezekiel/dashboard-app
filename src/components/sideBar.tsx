"use client";

import {
  Home,
  Calendar,
  Users,
  BarChart,
  Bell,
  MessageSquare,
  Settings,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Speakers", href: "/speakers", icon: Users },
  { label: "Reports", href: "/reports", icon: BarChart },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside
      className={cn(
        "h-screen border-r bg-white dark:bg-gray-900 p-4 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo and Collapse Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xl font-bold text-orange-500">
          {collapsed ? "P." : "PrimEvent"}
        </span>
        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-gray-800 transition"
            >
              <Icon className="h-5 w-5" />
              {!collapsed && item.label}
            </Link>
          );
        })}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="mt-4 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-gray-800 transition"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          {!collapsed && (theme === "dark" ? "Light Mode" : "Dark Mode")}
        </button>
      </nav>
    </aside>
  );
}
