"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  PlusCircle,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Procedures", href: "/dashboard/procedures", icon: FileText },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "New Procedure", href: "/dashboard/create", icon: PlusCircle },
];

const BOTTOM = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(href + "/"));

  const renderLink = (
    item: (typeof NAV)[number],
    onClick?: () => void
  ) => {
    const active = isActive(item.href);
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={onClick}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            active
              ? "bg-indigo-500/10 text-indigo-400"
              : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
          )}
        >
          <item.icon
            className={cn(
              "h-[18px] w-[18px]",
              active ? "text-indigo-400" : "text-slate-500"
            )}
          />
          {item.label}
          {active && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
          )}
        </Link>
      </li>
    );
  };

  const inner = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-700/50 px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            DentiSOP
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 pt-6">
        <ul className="space-y-1">
          {NAV.map((item) => renderLink(item, onClose))}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-700/50 px-4 py-4">
        <ul className="space-y-1">
          {BOTTOM.map((item) => renderLink(item, onClose))}
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800/60 hover:text-white">
              <LogOut className="h-[18px] w-[18px] text-slate-500" />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[280px] bg-slate-900 lg:block">
        {inner}
      </aside>

      {/* Mobile */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-900 lg:hidden">
            {inner}
          </aside>
        </>
      )}
    </>
  );
}
