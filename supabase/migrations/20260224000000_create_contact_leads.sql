-- Migration: Create contact_leads table for the Contact Form
-- Includes Row Level Security (RLS) configuration

-- Create the table
CREATE TABLE IF NOT EXISTS public.contact_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    acepta_habeas_data BOOLEAN NOT NULL DEFAULT false,
    acepta_terminos BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: In a real system you might want robust email validation at the DB level,
-- but for now the frontend Zod validation will handle it.

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- 1. Allow any user (even anonymous) to insert a new lead
CREATE POLICY "Allow anonymous inserts to contact_leads" 
ON public.contact_leads 
FOR INSERT 
TO public
WITH CHECK (true);

-- 2. Allow only authenticated admin users to view leads
-- Note: Assuming the role is managed via a JWT claim, app_role table, or similar.
-- If using the standard authenticated role: TO authenticated
-- Here we'll allow authenticated users to view for simplicity, 
-- but ideally you'd restrict this to an admin role based on your setup.
-- Using a generic authenticated policy here. Adjust as needed for your admin check.
CREATE POLICY "Allow authenticated users to read contact_leads" 
ON public.contact_leads 
FOR SELECT 
TO authenticated 
USING (true);

-- Note: UPDATE and DELETE policies are NOT created. 
-- This implies they are rejected by default due to RLS, which is desired for leads.

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_leads_modtime
BEFORE UPDATE ON public.contact_leads
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
