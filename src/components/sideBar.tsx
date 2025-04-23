"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Close sidebar on mobile when screen resizes to large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen border-r bg-white dark:bg-gray-900 p-4 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </aside>

      {/* Mobile sidebar as drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar panel */}
          <aside className="w-64 bg-white dark:bg-gray-900 p-4 h-full shadow-lg z-50">
            <SidebarContent
              collapsed={false}
              setCollapsed={setCollapsed}
              theme={theme}
              toggleTheme={toggleTheme}
            />
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </aside>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsMobileOpen(false)}
          />
        </div>
      )}
    </>
  );
}

function SidebarContent({
  collapsed,
  setCollapsed,
  theme,
  toggleTheme,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  theme: string | undefined;
  toggleTheme: () => void;
}) {
  return (
    <>
      {/* Logo and Collapse Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xl font-bold text-orange-500">
          {collapsed ? "P." : "PrimEvent"}
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:block hidden"
        >
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
    </>
  );
}
