-- Create inversionistas_leads table for storing investor lead information
CREATE TABLE public.inversionistas_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_persona TEXT NOT NULL CHECK (tipo_persona IN ('natural', 'juridica')),
  nombre_completo TEXT,
  numero_identificacion TEXT,
  razon_social TEXT,
  nit TEXT,
  representante_legal TEXT,
  correo_electronico TEXT NOT NULL,
  telefono TEXT NOT NULL,
  departamento TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  horario_contacto TEXT NOT NULL,
  monto_inversion TEXT,
  mensaje TEXT,
  acepta_habeas_data BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inversionistas_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts (anyone can submit the form)
CREATE POLICY "Anyone can submit investor lead form" 
ON public.inversionistas_leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin reads
CREATE POLICY "Admins can view all investor leads" 
ON public.inversionistas_leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admin updates
CREATE POLICY "Admins can update investor leads" 
ON public.inversionistas_leads 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admin deletes
CREATE POLICY "Admins can delete investor leads" 
ON public.inversionistas_leads 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_inversionistas_leads_updated_at
BEFORE UPDATE ON public.inversionistas_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();