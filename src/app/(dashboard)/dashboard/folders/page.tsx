import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";

export default function FoldersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Folders</h1>
        <Button>
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">No folders yet</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Create folders to organize your SOPs.
        </p>
      </div>

      {/* Grid placeholder for folder cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" />
    </div>
  );
}
