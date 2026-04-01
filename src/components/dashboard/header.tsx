"use client";

import { useState } from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search SOPs..."
          className="pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User avatar dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
          </Button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border bg-white py-1 shadow-lg">
                <a
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                >
                  Settings
                </a>
                <a
                  href="/dashboard/billing"
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                >
                  Billing
                </a>
                <div className="my-1 border-t" />
                <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-muted">
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
