"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EditSOPPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/dashboard/sop/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold tracking-tight">Edit SOP</h1>

      <div className="rounded-lg border bg-muted/50 p-8 text-center text-muted-foreground">
        <p>The SOP editor will be implemented here.</p>
      </div>
    </div>
  );
}
