-- Create demandes_rcs table for RCS registration requests
CREATE TABLE public.demandes_rcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type_entreprise TEXT,
  activite TEXT,
  ville TEXT,
  nom_entreprise TEXT,
  nom TEXT,
  prenom TEXT,
  email TEXT,
  telephone TEXT,
  adresse TEXT,
  nationalite TEXT,
  capital_total DECIMAL,
  apport_nature BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  current_step INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create associes table for business partners
CREATE TABLE public.associes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demande_id UUID REFERENCES public.demandes_rcs(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  adresse TEXT,
  pourcentage DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create documents table for required documents
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demande_id UUID REFERENCES public.demandes_rcs(id) ON DELETE CASCADE,
  type_document TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.demandes_rcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for demandes_rcs
CREATE POLICY "Users can view their own demandes" ON public.demandes_rcs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own demandes" ON public.demandes_rcs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own demandes" ON public.demandes_rcs
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for associes
CREATE POLICY "Users can view associes for their demandes" ON public.associes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create associes for their demandes" ON public.associes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update associes for their demandes" ON public.associes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete associes for their demandes" ON public.associes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

-- Create RLS policies for documents
CREATE POLICY "Users can view documents for their demandes" ON public.documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create documents for their demandes" ON public.documents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update documents for their demandes" ON public.documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.demandes_rcs 
      WHERE id = demande_id AND user_id = auth.uid()
    )
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_demandes_rcs_updated_at
  BEFORE UPDATE ON public.demandes_rcs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();