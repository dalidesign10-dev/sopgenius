"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  CheckCircle2,
  Eye,
  AlertTriangle,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { useClinic } from "@/lib/clinic-store";
import type { SOP } from "@/types";

export default function ProceduresPage() {
  const [sops, setSops] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unassigned" | "unread">("all");
  const clinic = useClinic();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("sops")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setSops(data);
      setLoading(false);
    }
    load();
  }, [supabase]);

  // Filter + search
  const filtered = sops.filter((sop) => {
    const title = (sop.content?.header?.title || sop.title).toLowerCase();
    if (search && !title.includes(search.toLowerCase())) return false;

    if (filter === "unassigned") {
      return clinic.getAssignedMembers(sop.id).length === 0;
    }
    if (filter === "unread") {
      const assigned = clinic.getAssignedMembers(sop.id);
      const readIds = clinic.getReadMembers(sop.id);
      return assigned.length > 0 && !assigned.every((m) => readIds.includes(m.id));
    }
    return true;
  });

  const counts = {
    all: sops.length,
    unassigned: sops.filter((s) => clinic.getAssignedMembers(s.id).length === 0).length,
    unread: sops.filter((s) => {
      const assigned = clinic.getAssignedMembers(s.id);
      const readIds = clinic.getReadMembers(s.id);
      return assigned.length > 0 && !assigned.every((m) => readIds.includes(m.id));
    }).length,
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Procedures</h1>
          <p className="text-sm text-slate-500">
            {sops.length} procedure{sops.length !== 1 ? "s" : ""} documented
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Procedure
          </Button>
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search procedures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "unassigned", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f === "all" ? "All" : f === "unassigned" ? "Unassigned" : "Unread"}{" "}
              <span className="opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Procedure list */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            {sops.length === 0 ? (
              <>
                <FileText className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No procedures yet
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Create your first procedure to start building your clinic&apos;s operations system.
                </p>
                <Link href="/dashboard/create" className="mt-4 inline-block">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Procedure
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No matching procedures
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try a different search or filter.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((sop) => {
                const title = sop.content?.header?.title || sop.title;
                const assigned = clinic.getAssignedMembers(sop.id);
                const readIds = clinic.getReadMembers(sop.id);
                const allRead =
                  assigned.length > 0 &&
                  assigned.every((m) => readIds.includes(m.id));

                let status: "complete" | "unread" | "unassigned";
                if (assigned.length === 0) status = "unassigned";
                else if (allRead) status = "complete";
                else status = "unread";

                return (
                  <Link
                    key={sop.id}
                    href={`/dashboard/sop/${sop.id}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                  >
                    {/* Status indicator */}
                    <div
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        status === "complete"
                          ? "bg-emerald-500"
                          : status === "unread"
                            ? "bg-amber-400"
                            : "bg-slate-300"
                      }`}
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-900">
                        {title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {sop.department || "No department"} · Updated{" "}
                        {new Date(sop.updated_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>

                    {/* Status badge */}
                    {status === "complete" ? (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        All read
                      </Badge>
                    ) : status === "unread" ? (
                      <Badge
                        variant="secondary"
                        className="bg-amber-50 text-amber-700"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        {readIds.length}/{assigned.length} read
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-500"
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Unassigned
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
