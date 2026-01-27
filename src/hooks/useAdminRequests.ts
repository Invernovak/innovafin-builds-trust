import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { InvoiceRequest, RequestHistory } from './useInvoiceRequests';

export type RequestStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'disbursed';

const STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'Pendiente',
  in_review: 'En Revisión',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  disbursed: 'Desembolsada',
};

export function useAdminRequests() {
  const [requests, setRequests] = useState<InvoiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  // Check if current user is admin
  const checkAdminRole = useCallback(async () => {
    try {
      setCheckingRole(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        return false;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        return false;
      }

      const hasAdminRole = !!data;
      setIsAdmin(hasAdminRole);
      return hasAdminRole;
    } finally {
      setCheckingRole(false);
    }
  }, []);

  // Fetch all requests (admin only)
  const fetchAllRequests = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoice_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
      toast.error('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update request status
  const updateRequestStatus = async (
    requestId: string,
    newStatus: RequestStatus,
    notes?: string
  ): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Sesión expirada');
        return false;
      }

      // Get current request to check old status
      const currentRequest = requests.find(r => r.id === requestId);
      if (!currentRequest) {
        toast.error('Solicitud no encontrada');
        return false;
      }

      // Update the status
      const { error: updateError } = await supabase
        .from('invoice_requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (updateError) throw updateError;

      // Log the status change in history
      const { error: historyError } = await supabase
        .from('request_history')
        .insert({
          request_id: requestId,
          user_id: user.id,
          action: 'admin_status_change',
          details: {
            old_status: currentRequest.status,
            new_status: newStatus,
            notes: notes || null,
            changed_by: user.email,
          },
        });

      if (historyError) {
        console.error('Error logging history:', historyError);
      }

      // Update local state
      setRequests(prev =>
        prev.map(r =>
          r.id === requestId ? { ...r, status: newStatus } : r
        )
      );

      toast.success(`Estado actualizado a "${STATUS_LABELS[newStatus]}"`);
      return true;
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Error al actualizar el estado');
      return false;
    }
  };

  // Get request history
  const getRequestHistory = async (requestId: string): Promise<RequestHistory[]> => {
    try {
      const { data, error } = await supabase
        .from('request_history')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching history:', err);
      return [];
    }
  };

  // Calculate admin stats
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inReview: requests.filter(r => r.status === 'in_review').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    disbursed: requests.filter(r => r.status === 'disbursed').length,
    totalAmount: requests.reduce((sum, r) => sum + Number(r.invoice_amount), 0),
    totalDisbursed: requests
      .filter(r => r.status === 'disbursed')
      .reduce((sum, r) => sum + Number(r.net_amount), 0),
  };

  useEffect(() => {
    const init = async () => {
      const hasRole = await checkAdminRole();
      if (hasRole) {
        await fetchAllRequests();
      }
    };
    init();
  }, [checkAdminRole, fetchAllRequests]);

  return {
    requests,
    loading,
    isAdmin,
    checkingRole,
    stats,
    fetchAllRequests,
    updateRequestStatus,
    getRequestHistory,
    getStatusLabel: (status: RequestStatus) => STATUS_LABELS[status],
  };
}
