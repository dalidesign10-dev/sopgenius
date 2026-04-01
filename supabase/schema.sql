-- SOPGenius Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom types
CREATE TYPE plan_type AS ENUM ('free', 'starter', 'pro', 'business');
CREATE TYPE sop_status AS ENUM ('draft', 'published', 'archived');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  company_name TEXT,
  industry TEXT,
  plan plan_type NOT NULL DEFAULT 'free',
  sop_count INTEGER NOT NULL DEFAULT 0,
  monthly_generations INTEGER NOT NULL DEFAULT 0,
  generations_reset_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOPs table
CREATE TABLE public.sops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  industry TEXT NOT NULL DEFAULT '',
  department TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  markdown_content TEXT NOT NULL DEFAULT '',
  status sop_status NOT NULL DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOP versions table
CREATE TABLE public.sop_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sop_id UUID REFERENCES public.sops(id) ON DELETE CASCADE NOT NULL,
  version_number INTEGER NOT NULL,
  content JSONB NOT NULL,
  markdown_content TEXT NOT NULL DEFAULT '',
  changed_by UUID REFERENCES public.users(id) NOT NULL,
  change_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Templates table
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  industry TEXT NOT NULL,
  category TEXT NOT NULL,
  prompt_template TEXT NOT NULL,
  sample_output JSONB NOT NULL DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Folders table
CREATE TABLE public.folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOP-Folder junction table
CREATE TABLE public.sop_folders (
  sop_id UUID REFERENCES public.sops(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  PRIMARY KEY (sop_id, folder_id)
);

-- Indexes
CREATE INDEX idx_sops_user_id ON public.sops(user_id);
CREATE INDEX idx_sops_status ON public.sops(status);
CREATE INDEX idx_sop_versions_sop_id ON public.sop_versions(sop_id);
CREATE INDEX idx_folders_user_id ON public.folders(user_id);
CREATE INDEX idx_templates_industry ON public.templates(industry);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sop_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sop_folders ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- SOPs policies
CREATE POLICY "Users can read own SOPs" ON public.sops
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own SOPs" ON public.sops
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own SOPs" ON public.sops
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own SOPs" ON public.sops
  FOR DELETE USING (auth.uid() = user_id);

-- SOP versions policies
CREATE POLICY "Users can read own SOP versions" ON public.sop_versions
  FOR SELECT USING (auth.uid() = changed_by);
CREATE POLICY "Users can insert SOP versions" ON public.sop_versions
  FOR INSERT WITH CHECK (auth.uid() = changed_by);

-- Folders policies
CREATE POLICY "Users can manage own folders" ON public.folders
  FOR ALL USING (auth.uid() = user_id);

-- SOP folders policies
CREATE POLICY "Users can manage own sop_folders" ON public.sop_folders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.sops WHERE id = sop_id AND user_id = auth.uid())
  );

-- Templates are readable by all authenticated users
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read templates" ON public.templates
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_sops_updated_at
  BEFORE UPDATE ON public.sops
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
