import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface InvoiceRequest {
  id: string;
  user_id: string;
  invoice_number: string;
  invoice_amount: number;
  payer_name: string;
  payer_nit: string;
  days_to_maturity: number;
  monthly_rate: number;
  calculated_discount: number;
  net_amount: number;
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'disbursed';
  created_at: string;
  updated_at: string;
}

export interface InvoiceDocument {
  id: string;
  request_id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  created_at: string;
}

export interface RequestHistory {
  id: string;
  request_id: string;
  user_id: string;
  action: string;
  details: unknown;
  created_at: string;
}

export interface CreateInvoiceRequest {
  invoice_number: string;
  invoice_amount: number;
  payer_name: string;
  payer_nit: string;
  days_to_maturity: number;
  monthly_rate: number;
}

const getStatusLabel = (status: InvoiceRequest['status']): string => {
  const labels: Record<InvoiceRequest['status'], string> = {
    pending: 'Pendiente',
    in_review: 'En Revisión',
    approved: 'Aprobada',
    rejected: 'Rechazada',
    disbursed: 'Desembolsada',
  };
  return labels[status];
};

export function useInvoiceRequests() {
  const [requests, setRequests] = useState<InvoiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('invoice_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setRequests(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRequest = async (data: CreateInvoiceRequest): Promise<InvoiceRequest | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Debe iniciar sesión para crear una solicitud');
        return null;
      }

      // Calculate discount and net amount
      const discount = data.invoice_amount * (data.monthly_rate / 100) * (data.days_to_maturity / 30);
      const netAmount = data.invoice_amount - discount;

      const { data: newRequest, error: createError } = await supabase
        .from('invoice_requests')
        .insert({
          user_id: user.id,
          invoice_number: data.invoice_number,
          invoice_amount: data.invoice_amount,
          payer_name: data.payer_name,
          payer_nit: data.payer_nit,
          days_to_maturity: data.days_to_maturity,
          monthly_rate: data.monthly_rate,
          calculated_discount: discount,
          net_amount: netAmount,
        })
        .select()
        .single();

      if (createError) throw createError;

      // Log history
      await supabase.from('request_history').insert({
        request_id: newRequest.id,
        user_id: user.id,
        action: 'created',
        details: { invoice_number: data.invoice_number },
      });

      setRequests(prev => [newRequest, ...prev]);
      toast.success('El formulario se ha enviado con éxito', {
        description: 'Recibirá una respuesta en las próximas 24 horas.',
      });
      return newRequest;
    } catch (err) {
      console.error('Error creating request:', err);
      toast.error('Error al crear la solicitud');
      return null;
    }
  };

  const getRequestHistory = async (requestId: string): Promise<RequestHistory[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('request_history')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      console.error('Error fetching history:', err);
      return [];
    }
  };

  const getRequestDocuments = async (requestId: string): Promise<InvoiceDocument[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('invoice_documents')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      console.error('Error fetching documents:', err);
      return [];
    }
  };

  // Calculate stats
  const stats = {
    totalCount: requests.length,
    totalPending: requests
      .filter(r => r.status === 'pending' || r.status === 'in_review')
      .reduce((sum, r) => sum + Number(r.invoice_amount), 0),
    totalApproved: requests
      .filter(r => r.status === 'approved')
      .reduce((sum, r) => sum + Number(r.invoice_amount), 0),
    totalDisbursed: requests
      .filter(r => r.status === 'disbursed')
      .reduce((sum, r) => sum + Number(r.invoice_amount), 0),
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    stats,
    fetchRequests,
    createRequest,
    getRequestHistory,
    getRequestDocuments,
    getStatusLabel,
  };
}
