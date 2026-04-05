-- Team member self-service read acknowledgment system
-- Run this migration against your Supabase project

-- Team members table (linked to a clinic owner)
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  invite_token TEXT UNIQUE,
  invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  UNIQUE(clinic_id, email)
);

-- Assignments: which SOPs are assigned to which team members
CREATE TABLE public.team_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_member_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE NOT NULL,
  sop_id UUID REFERENCES public.sops(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_by UUID REFERENCES public.users(id) NOT NULL,
  UNIQUE(team_member_id, sop_id)
);

-- Read acknowledgments: team members self-acknowledge
CREATE TABLE public.sop_reads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_member_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE NOT NULL,
  sop_id UUID REFERENCES public.sops(id) ON DELETE CASCADE NOT NULL,
  acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_member_id, sop_id)
);

-- Indexes
CREATE INDEX idx_team_members_clinic ON public.team_members(clinic_id);
CREATE INDEX idx_team_members_user ON public.team_members(user_id);
CREATE INDEX idx_team_members_token ON public.team_members(invite_token);
CREATE INDEX idx_team_assignments_member ON public.team_assignments(team_member_id);
CREATE INDEX idx_team_assignments_sop ON public.team_assignments(sop_id);
CREATE INDEX idx_sop_reads_member ON public.sop_reads(team_member_id);
CREATE INDEX idx_sop_reads_sop ON public.sop_reads(sop_id);

-- RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sop_reads ENABLE ROW LEVEL SECURITY;

-- Team members policies
-- Clinic owner can manage their team
CREATE POLICY "Clinic owner can manage team" ON public.team_members
  FOR ALL USING (auth.uid() = clinic_id);

-- Team member can read their own record
CREATE POLICY "Team member can read own record" ON public.team_members
  FOR SELECT USING (auth.uid() = user_id);

-- Assignments policies
-- Clinic owner can manage assignments (via team_member -> clinic_id)
CREATE POLICY "Clinic owner can manage assignments" ON public.team_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id AND clinic_id = auth.uid()
    )
  );

-- Team member can read their own assignments
CREATE POLICY "Team member can read own assignments" ON public.team_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id AND user_id = auth.uid()
    )
  );

-- Read acknowledgment policies
-- Clinic owner can view reads for their team
CREATE POLICY "Clinic owner can view reads" ON public.sop_reads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id AND clinic_id = auth.uid()
    )
  );

-- Team member can insert their own reads
CREATE POLICY "Team member can acknowledge" ON public.sop_reads
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id AND user_id = auth.uid()
    )
  );

-- Team member can view their own reads
CREATE POLICY "Team member can view own reads" ON public.sop_reads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id AND user_id = auth.uid()
    )
  );

-- Allow reading SOPs for team members who have assignments to them
CREATE POLICY "Team members can read assigned SOPs" ON public.sops
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_assignments ta
      JOIN public.team_members tm ON ta.team_member_id = tm.id
      WHERE ta.sop_id = id AND tm.user_id = auth.uid()
    )
  );
