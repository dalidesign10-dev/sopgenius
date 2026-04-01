import Link from "next/link";
import { Plus, FileText } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My SOPs</h1>
        <Link
          href="/dashboard/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New SOP
        </Link>
      </div>

      {/* Empty state */}
      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-lg font-semibold">No SOPs yet</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Create your first SOP to get started. Use templates or build one from
          scratch.
        </p>
        <Link
          href="/dashboard/create"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New SOP
        </Link>
      </div>
    </div>
  );
}
