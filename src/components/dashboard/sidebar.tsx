"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plus,
  LayoutTemplate,
  FolderOpen,
  Settings,
  CreditCard,
  Users,
  X,
  FileText,
  BarChart3,
  Shield,
  ChevronDown,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuGroups = [
  {
    label: "MENU",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Create SOP", href: "/dashboard/create", icon: Plus },
      { label: "My SOPs", href: "/dashboard/folders", icon: FileText },
      { label: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Team", href: "/dashboard/team", icon: Users },
      { label: "Compliance", href: "/dashboard/compliance", icon: Shield },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
      { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
      { label: "Help", href: "/help", icon: HelpCircle },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-slate-900 text-slate-300 shadow-2xl transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700/50 px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">DentiSOP</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6 custom-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {group.label}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-indigo-500/10 text-indigo-400 shadow-sm"
                            : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                        )}
                      >
                        <item.icon className={cn(
                          "h-[18px] w-[18px] transition-colors",
                          isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                        )} />
                        {item.label}
                        {isActive && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User profile section */}
        <div className="border-t border-slate-700/50 p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-800/60 transition-colors cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">My Practice</p>
              <p className="text-xs text-slate-500 truncate">Practice Plan</p>
            </div>
            <LogOut className="h-4 w-4 text-slate-500 hover:text-red-400 transition-colors" />
          </div>
        </div>
      </aside>
    </>
  );
}
