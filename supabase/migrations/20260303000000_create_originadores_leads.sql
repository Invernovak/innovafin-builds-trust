-- Create originadores_leads table for storing originator lead information
CREATE TABLE public.originadores_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  razon_social TEXT NOT NULL,
  nit TEXT NOT NULL,
  nombre_contacto TEXT NOT NULL,
  correo_electronico TEXT NOT NULL,
  telefono TEXT NOT NULL,
  tipo_originacion TEXT NOT NULL,
  departamento TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  horario_contacto TEXT NOT NULL,
  descripcion_negocio TEXT NOT NULL,
  necesidades_financiacion TEXT NOT NULL,
  acepta_habeas_data BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.originadores_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts (anyone can submit the form)
CREATE POLICY "Anyone can submit originator lead form" 
ON public.originadores_leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin reads
CREATE POLICY "Admins can view all originator leads" 
ON public.originadores_leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admin updates
CREATE POLICY "Admins can update originator leads" 
ON public.originadores_leads 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admin deletes
CREATE POLICY "Admins can delete originator leads" 
ON public.originadores_leads 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_originadores_leads_updated_at
BEFORE UPDATE ON public.originadores_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
