-- Create analytics table for tracking user interactions
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  entity_type TEXT,
  question_id TEXT,
  user_agent TEXT,
  page_url TEXT,
  user_id UUID,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics access
CREATE POLICY "Allow public insert on analytics" 
ON public.analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select on analytics" 
ON public.analytics 
FOR SELECT 
USING (true);

-- Create index for better performance
CREATE INDEX idx_analytics_event_type ON public.analytics(event_type);
CREATE INDEX idx_analytics_timestamp ON public.analytics(timestamp);
CREATE INDEX idx_analytics_user_id ON public.analytics(user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_analytics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.timestamp = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;