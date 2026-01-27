-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Add admin policies to invoice_requests for viewing all requests
CREATE POLICY "Admins can view all requests"
ON public.invoice_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Add admin policy to update any request status
CREATE POLICY "Admins can update any request"
ON public.invoice_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Add admin policies for viewing all documents
CREATE POLICY "Admins can view all documents"
ON public.invoice_documents
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Add admin policies for viewing all history
CREATE POLICY "Admins can view all history"
ON public.request_history
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to add history entries for any request
CREATE POLICY "Admins can add history to any request"
ON public.request_history
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));