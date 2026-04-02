"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-primary">
          SOPGenius
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground">
            Templates
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="/guides/how-to-write-a-dental-sop" className="text-sm text-muted-foreground hover:text-foreground">
            Guides
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started Free</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/features" className="text-sm" onClick={() => setOpen(false)}>Features</Link>
            <Link href="/templates" className="text-sm" onClick={() => setOpen(false)}>Templates</Link>
            <Link href="/pricing" className="text-sm" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/guides/how-to-write-a-dental-sop" className="text-sm" onClick={() => setOpen(false)}>Guides</Link>
            <hr />
            <Link href="/login" className="text-sm" onClick={() => setOpen(false)}>Log In</Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">Get Started Free</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
