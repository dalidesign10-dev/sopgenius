"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ── Types ──────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  addedAt: string;
}

export interface Assignment {
  id: string;
  sopId: string;
  memberId: string;
  assignedAt: string;
}

export interface ReadRecord {
  id: string;
  sopId: string;
  memberId: string;
  readAt: string;
}

interface ClinicStore {
  team: TeamMember[];
  assignments: Assignment[];
  reads: ReadRecord[];
  addMember: (name: string, role: string, email: string) => void;
  removeMember: (id: string) => void;
  assignProcedure: (sopId: string, memberId: string) => void;
  unassignProcedure: (sopId: string, memberId: string) => void;
  markRead: (sopId: string, memberId: string) => void;
  resetReadsForProcedure: (sopId: string) => void;
  getAssignedMembers: (sopId: string) => TeamMember[];
  getReadMembers: (sopId: string) => string[];
  getMemberAssignments: (memberId: string) => string[];
  getMemberReads: (memberId: string) => string[];
  isRead: (sopId: string, memberId: string) => boolean;
  getNonCompliantMembers: () => { member: TeamMember; unreadSopIds: string[] }[];
}

const ClinicContext = createContext<ClinicStore | null>(null);

// ── Helpers ────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Provider ───────────────────────────────────────────

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [reads, setReads] = useState<ReadRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setTeam(load("clinic_team", []));
    setAssignments(load("clinic_assignments", []));
    setReads(load("clinic_reads", []));
    setLoaded(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loaded) return;
    save("clinic_team", team);
  }, [team, loaded]);

  useEffect(() => {
    if (!loaded) return;
    save("clinic_assignments", assignments);
  }, [assignments, loaded]);

  useEffect(() => {
    if (!loaded) return;
    save("clinic_reads", reads);
  }, [reads, loaded]);

  const addMember = useCallback((name: string, role: string, email: string) => {
    setTeam((prev) => [
      ...prev,
      { id: uid(), name, role, email, addedAt: new Date().toISOString() },
    ]);
  }, []);

  const removeMember = useCallback((id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    setAssignments((prev) => prev.filter((a) => a.memberId !== id));
    setReads((prev) => prev.filter((r) => r.memberId !== id));
  }, []);

  const assignProcedure = useCallback((sopId: string, memberId: string) => {
    setAssignments((prev) => {
      if (prev.some((a) => a.sopId === sopId && a.memberId === memberId))
        return prev;
      return [
        ...prev,
        { id: uid(), sopId, memberId, assignedAt: new Date().toISOString() },
      ];
    });
  }, []);

  const unassignProcedure = useCallback((sopId: string, memberId: string) => {
    setAssignments((prev) =>
      prev.filter((a) => !(a.sopId === sopId && a.memberId === memberId))
    );
    setReads((prev) =>
      prev.filter((r) => !(r.sopId === sopId && r.memberId === memberId))
    );
  }, []);

  const markRead = useCallback((sopId: string, memberId: string) => {
    setReads((prev) => {
      if (prev.some((r) => r.sopId === sopId && r.memberId === memberId))
        return prev;
      return [
        ...prev,
        { id: uid(), sopId, memberId, readAt: new Date().toISOString() },
      ];
    });
  }, []);

  const getAssignedMembers = useCallback(
    (sopId: string) => {
      const memberIds = assignments
        .filter((a) => a.sopId === sopId)
        .map((a) => a.memberId);
      return team.filter((m) => memberIds.includes(m.id));
    },
    [assignments, team]
  );

  const getReadMembers = useCallback(
    (sopId: string) => reads.filter((r) => r.sopId === sopId).map((r) => r.memberId),
    [reads]
  );

  const getMemberAssignments = useCallback(
    (memberId: string) =>
      assignments.filter((a) => a.memberId === memberId).map((a) => a.sopId),
    [assignments]
  );

  const getMemberReads = useCallback(
    (memberId: string) =>
      reads.filter((r) => r.memberId === memberId).map((r) => r.sopId),
    [reads]
  );

  const resetReadsForProcedure = useCallback((sopId: string) => {
    setReads((prev) => prev.filter((r) => r.sopId !== sopId));
  }, []);

  const isRead = useCallback(
    (sopId: string, memberId: string) =>
      reads.some((r) => r.sopId === sopId && r.memberId === memberId),
    [reads]
  );

  const getNonCompliantMembers = useCallback(() => {
    return team
      .map((member) => {
        const assignedSopIds = assignments
          .filter((a) => a.memberId === member.id)
          .map((a) => a.sopId);
        const readSopIds = reads
          .filter((r) => r.memberId === member.id)
          .map((r) => r.sopId);
        const unreadSopIds = assignedSopIds.filter(
          (sopId) => !readSopIds.includes(sopId)
        );
        return { member, unreadSopIds };
      })
      .filter((entry) => entry.unreadSopIds.length > 0);
  }, [team, assignments, reads]);

  return (
    <ClinicContext.Provider
      value={{
        team,
        assignments,
        reads,
        addMember,
        removeMember,
        assignProcedure,
        unassignProcedure,
        markRead,
        resetReadsForProcedure,
        getAssignedMembers,
        getReadMembers,
        getMemberAssignments,
        getMemberReads,
        isRead,
        getNonCompliantMembers,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const ctx = useContext(ClinicContext);
  if (!ctx) throw new Error("useClinic must be used inside ClinicProvider");
  return ctx;
}
