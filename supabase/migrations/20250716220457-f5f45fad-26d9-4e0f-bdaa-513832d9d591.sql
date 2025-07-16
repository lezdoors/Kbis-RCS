-- Security Fixes Migration
-- Fix critical RLS vulnerabilities and strengthen security policies

-- 1. Enable RLS on tables that don't have it
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rcs_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Create RLS policies for documents table
CREATE POLICY "Users can view their own documents" ON public.documents
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE demandes_rcs.id = documents.demande_id 
      AND demandes_rcs.user_id = auth.uid()
    )
    OR 
    EXISTS (
      SELECT 1 FROM public.rcs_forms 
      WHERE rcs_forms.id = documents.form_id 
      AND rcs_forms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create documents for their demandes" ON public.documents
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE demandes_rcs.id = documents.demande_id 
      AND demandes_rcs.user_id = auth.uid()
    )
    OR 
    EXISTS (
      SELECT 1 FROM public.rcs_forms 
      WHERE rcs_forms.id = documents.form_id 
      AND rcs_forms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own documents" ON public.documents
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE demandes_rcs.id = documents.demande_id 
      AND demandes_rcs.user_id = auth.uid()
    )
    OR 
    EXISTS (
      SELECT 1 FROM public.rcs_forms 
      WHERE rcs_forms.id = documents.form_id 
      AND rcs_forms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own documents" ON public.documents
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE demandes_rcs.id = documents.demande_id 
      AND demandes_rcs.user_id = auth.uid()
    )
    OR 
    EXISTS (
      SELECT 1 FROM public.rcs_forms 
      WHERE rcs_forms.id = documents.form_id 
      AND rcs_forms.user_id = auth.uid()
    )
  );

-- 3. Create RLS policies for rcs_forms table
CREATE POLICY "Users can view their own rcs forms" ON public.rcs_forms
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rcs forms" ON public.rcs_forms
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rcs forms" ON public.rcs_forms
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own rcs forms" ON public.rcs_forms
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- 4. Create RLS policies for users table (view-only)
CREATE POLICY "Users can view their own user record" ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- 5. Drop and recreate analytics policies to restrict to authenticated users
DROP POLICY "Allow public insert on analytics" ON public.analytics;
DROP POLICY "Allow public select on analytics" ON public.analytics;

CREATE POLICY "Authenticated users can insert analytics" ON public.analytics
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own analytics" ON public.analytics
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- 6. Update existing policies to restrict to authenticated users only
-- Drop and recreate associes policies
DROP POLICY "Users can view associes for their demandes" ON public.associes;
DROP POLICY "Users can create associes for their demandes" ON public.associes;
DROP POLICY "Users can update associes for their demandes" ON public.associes;
DROP POLICY "Users can delete associes for their demandes" ON public.associes;

CREATE POLICY "Authenticated users can view associes for their demandes" ON public.associes
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create associes for their demandes" ON public.associes
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update associes for their demandes" ON public.associes
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete associes for their demandes" ON public.associes
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

-- 7. Update other table policies to restrict to authenticated users
-- billing_info
DROP POLICY "Users can view their own billing info" ON public.billing_info;
DROP POLICY "Users can update their own billing info" ON public.billing_info;

CREATE POLICY "Authenticated users can view their own billing info" ON public.billing_info
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own billing info" ON public.billing_info
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- demandes_rcs
DROP POLICY "Users can view their own demandes" ON public.demandes_rcs;
DROP POLICY "Users can update their own demandes" ON public.demandes_rcs;

CREATE POLICY "Authenticated users can view their own demandes" ON public.demandes_rcs
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own demandes" ON public.demandes_rcs
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- orders
DROP POLICY "Users can view their own orders" ON public.orders;

CREATE POLICY "Authenticated users can view their own orders" ON public.orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- profiles
DROP POLICY "Users can view their own profile" ON public.profiles;
DROP POLICY "Users can update their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- support_tickets
DROP POLICY "Users can view their own support tickets" ON public.support_tickets;
DROP POLICY "Users can update their own support tickets" ON public.support_tickets;

CREATE POLICY "Authenticated users can view their own support tickets" ON public.support_tickets
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own support tickets" ON public.support_tickets
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- 8. Fix function security by setting search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_analytics_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.timestamp = now();
  RETURN NEW;
END;
$$;