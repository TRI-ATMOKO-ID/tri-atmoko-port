
-- Create visitors table
CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  device_name TEXT NOT NULL,
  location TEXT NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visitors" ON public.visitors FOR SELECT USING (true);
CREATE POLICY "Anyone can insert visitors" ON public.visitors FOR INSERT WITH CHECK (true);

-- Create view counter table
CREATE TABLE public.view_counter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 2058
);

ALTER TABLE public.view_counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view counter" ON public.view_counter FOR SELECT USING (true);
CREATE POLICY "Anyone can update counter" ON public.view_counter FOR UPDATE USING (true);

-- Insert initial row
INSERT INTO public.view_counter (count) VALUES (2058);
