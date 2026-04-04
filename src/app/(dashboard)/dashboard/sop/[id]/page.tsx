import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// This will be replaced with real Supabase fetch later
// For now, show the page structure

export const metadata: Metadata = {
  title: "View SOP — DentiSOP",
};

export default async function SOPViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: Replace with real Supabase fetch
  // const sop = await fetchSOP(id);
  const sop = null;

  if (!sop) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <div className="rounded-full bg-muted p-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">SOP not found</h2>
        <p className="text-muted-foreground">
          The SOP you&apos;re looking for doesn&apos;t exist or has been
          deleted.
        </p>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  // The structure below will render once real data is available
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Back button */}
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            {(sop as any).title}
          </h1>
          <Badge
            variant={
              (sop as any).status === "published" ? "default" : "secondary"
            }
          >
            {(sop as any).status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href={`/dashboard/sop/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Metadata bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Industry:</span>{" "}
          {(sop as any).industry}
        </div>
        <div>
          <span className="font-medium text-foreground">Department:</span>{" "}
          {(sop as any).department}
        </div>
        <div>
          <span className="font-medium text-foreground">Version:</span>{" "}
          {(sop as any).version}
        </div>
        <div>
          <span className="font-medium text-foreground">Last Updated:</span>{" "}
          {(sop as any).updated_at}
        </div>
        <div>
          <span className="font-medium text-foreground">Created:</span>{" "}
          {(sop as any).created_at}
        </div>
      </div>

      {/* Main content area */}
      <div className="rounded-lg border bg-card p-6">
        {/* TODO: Use SOPRenderer once available */}
        {/* <SOPRenderer content={(sop as any).content} /> */}
        <div className="prose dark:prose-invert max-w-none">
          {(sop as any).content}
        </div>
      </div>
    </div>
  );
}
