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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create SOP", href: "/dashboard/create", icon: Plus },
  { label: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { label: "Folders", href: "/dashboard/folders", icon: FolderOpen },
];

const bottomNav = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Team", href: "/dashboard/team", icon: Users },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navLink = (
    item: { label: string; href: string; icon: React.ElementType }
  ) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white shadow-sm transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/dashboard" className="text-xl font-bold text-primary">
            SOPGenius
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {mainNav.map(navLink)}

          <div className="my-3 border-t" />

          {bottomNav.map(navLink)}
        </nav>
      </aside>
    </>
  );
}
