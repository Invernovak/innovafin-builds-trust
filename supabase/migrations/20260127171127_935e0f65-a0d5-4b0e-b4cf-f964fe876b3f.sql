-- Create enum for request status
CREATE TYPE public.invoice_request_status AS ENUM ('pending', 'in_review', 'approved', 'rejected', 'disbursed');

-- Create invoice_requests table
CREATE TABLE public.invoice_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  invoice_amount DECIMAL(15,2) NOT NULL,
  payer_name TEXT NOT NULL,
  payer_nit TEXT NOT NULL,
  days_to_maturity INTEGER NOT NULL DEFAULT 30,
  monthly_rate DECIMAL(5,2) NOT NULL DEFAULT 1.8,
  calculated_discount DECIMAL(15,2) NOT NULL,
  net_amount DECIMAL(15,2) NOT NULL,
  status public.invoice_request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoice_documents table
CREATE TABLE public.invoice_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.invoice_requests(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create request_history table for tracking changes
CREATE TABLE public.request_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.invoice_requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.invoice_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_history ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user can access a request
CREATE OR REPLACE FUNCTION public.can_access_request(req_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.invoice_requests
    WHERE id = req_id AND user_id = auth.uid()
  )
$$;

-- RLS Policies for invoice_requests
CREATE POLICY "Users can view their own requests"
ON public.invoice_requests
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own requests"
ON public.invoice_requests
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own pending requests"
ON public.invoice_requests
FOR UPDATE
USING (user_id = auth.uid() AND status = 'pending');

-- RLS Policies for invoice_documents
CREATE POLICY "Users can view documents for their requests"
ON public.invoice_documents
FOR SELECT
USING (public.can_access_request(request_id));

CREATE POLICY "Users can add documents to their requests"
ON public.invoice_documents
FOR INSERT
WITH CHECK (public.can_access_request(request_id));

CREATE POLICY "Users can delete documents from their pending requests"
ON public.invoice_documents
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.invoice_requests
    WHERE id = request_id AND user_id = auth.uid() AND status = 'pending'
  )
);

-- RLS Policies for request_history
CREATE POLICY "Users can view history of their requests"
ON public.request_history
FOR SELECT
USING (public.can_access_request(request_id));

CREATE POLICY "Users can add history to their requests"
ON public.request_history
FOR INSERT
WITH CHECK (user_id = auth.uid() AND public.can_access_request(request_id));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_invoice_requests_updated_at
BEFORE UPDATE ON public.invoice_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to log history on status change
CREATE OR REPLACE FUNCTION public.log_request_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.request_history (request_id, user_id, action, details)
    VALUES (
      NEW.id,
      NEW.user_id,
      'status_change',
      jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER log_invoice_request_status_change
AFTER UPDATE ON public.invoice_requests
FOR EACH ROW
EXECUTE FUNCTION public.log_request_status_change();