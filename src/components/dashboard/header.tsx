"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  Search,
  User,
  ChevronRight,
  Sun,
  Moon,
  Settings,
  LogOut,
  CreditCard,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
}

const notifications = [
  {
    id: 1,
    title: "SOP Review Overdue",
    desc: "Instrument Sterilization Protocol needs annual review",
    time: "2h ago",
    icon: AlertTriangle,
    color: "text-red-500 bg-red-50",
    read: false,
  },
  {
    id: 2,
    title: "Team Member Joined",
    desc: "Sarah Johnson accepted your invite",
    time: "5h ago",
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-50",
    read: false,
  },
  {
    id: 3,
    title: "New SOP Published",
    desc: "HIPAA Privacy Procedures is now live",
    time: "1d ago",
    icon: FileText,
    color: "text-indigo-500 bg-indigo-50",
    read: true,
  },
];

function breadcrumbLabel(segment: string) {
  const map: Record<string, string> = {
    dashboard: "Dashboard",
    create: "Create SOP",
    templates: "Templates",
    folders: "My SOPs",
    settings: "Settings",
    billing: "Billing",
    team: "Team",
    sop: "SOP",
    edit: "Edit",
    compliance: "Compliance",
    analytics: "Analytics",
  };
  return map[segment] || segment;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: breadcrumbLabel(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {breadcrumbs.map((bc) => (
            <span key={bc.href} className="flex items-center gap-1">
              {bc.isLast ? (
                <span className="font-semibold text-slate-900">{bc.label}</span>
              ) : (
                <>
                  <Link href={bc.href} className="text-slate-400 hover:text-slate-600 transition-colors">
                    {bc.label}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </>
              )}
            </span>
          ))}
        </nav>

        {/* Search */}
        <div className="relative flex-1 max-w-md ml-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search SOPs, templates..."
            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
            >
              <Bell className="h-5 w-5 text-slate-500" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                    <Badge variant="secondary" className="text-xs">{unreadCount} new</Badge>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex gap-3 px-4 py-3 border-b last:border-0 transition-colors hover:bg-slate-50 ${!n.read ? "bg-indigo-50/30" : ""}`}
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${n.color}`}>
                          <n.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900">{n.title}</p>
                          <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                        </div>
                        {!n.read && <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />}
                      </div>
                    ))}
                  </div>
                  <div className="border-t px-4 py-2.5">
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="mx-1 h-6 w-px bg-slate-200" />

          {/* User menu */}
          <div className="relative">
            <button
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                D
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900 leading-tight">My Practice</p>
                <p className="text-[11px] text-slate-400 leading-tight">Practice Plan</p>
              </div>
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border bg-white py-1.5 shadow-xl">
                  <div className="px-4 py-2.5 border-b">
                    <p className="text-sm font-semibold text-slate-900">My Practice</p>
                    <p className="text-xs text-slate-400">admin@mypractice.com</p>
                  </div>
                  <div className="py-1">
                    <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <Link href="/dashboard/billing" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                      <CreditCard className="h-4 w-4" /> Billing
                    </Link>
                    <Link href="/help" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                      <MessageSquare className="h-4 w-4" /> Support
                    </Link>
                  </div>
                  <div className="border-t py-1">
                    <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
