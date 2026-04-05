import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-primary">
              DentiSOP
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Dental compliance and SOP software. Document procedures, assign them to staff, and track acknowledgments.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/templates" className="hover:text-foreground">Procedure Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dental-sop-software" className="hover:text-foreground">Dental Procedure Software</Link></li>
              <li><Link href="/dental-office-sops" className="hover:text-foreground">Dental Office Procedures</Link></li>
              <li><Link href="/dental-compliance-software" className="hover:text-foreground">Compliance Software</Link></li>
              <li><Link href="/guides" className="hover:text-foreground">Guides &amp; Checklists</Link></li>
              <li><Link href="/guides/dental-osha-compliance-checklist" className="hover:text-foreground">OSHA Compliance Checklist</Link></li>
              <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/security" className="hover:text-foreground">Security</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DentiSOP. All rights reserved.</p>
          <p className="mt-2">support@dentisop.com</p>
        </div>
      </div>
    </footer>
  );
}
