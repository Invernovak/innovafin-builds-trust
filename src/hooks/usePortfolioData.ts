import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types
export interface CapitalPrivado {
  id: string;
  name: string;
  administrador: string;
  gestor_profesional: string;
  fecha_reporte: string;
  total_fondo: number;
  total_disponible: number;
  total_invertido: number;
  porcentaje_total: number;
}

export interface Compartimento {
  id: string;
  capital_privado_id: string;
  name: string;
  total_activos: number;
  disponible: number;
  invertido: number;
  porcentaje_activos: number;
  rentabilidad_dia: number;
  rentabilidad_30dias: number;
  rentabilidad_60dias: number;
  rentabilidad_90dias: number;
  rentabilidad_180dias: number;
  rentabilidad_365dias: number;
  orden: number;
}

export interface FIC {
  id: string;
  name: string;
  administrador: string;
  fecha_reporte: string;
  valor_unidad: number;
  valor_fondo: number;
  rentabilidad_ea_30dias: number;
  rentabilidad_ea_365dias: number;
}

export interface FICTipo {
  id: string;
  fic_id: string;
  nombre: string;
  inversion_minima: number;
  comision_administracion: number;
  pacto_permanencia: number;
  remuneracion_efectiva: number;
  descripcion: string | null;
  orden: number;
}

export interface FICHistorico {
  id: string;
  fic_id: string;
  nombre: string;
  ano_corrido_ea: number | null;
  diaria_ea: number | null;
  dias_30_ea: number | null;
  dias_180_ea: number | null;
  ano_1_ea: number | null;
  ano_2_ea: number | null;
  ano_3_ea: number | null;
  orden: number;
}

// Fetch hooks
export const useCapitalPrivado = () => {
  return useQuery({
    queryKey: ['portfolio', 'capital-privado'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_capital_privado')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data as CapitalPrivado | null;
    },
  });
};

export const useCompartimentos = (capitalPrivadoId?: string) => {
  return useQuery({
    queryKey: ['portfolio', 'compartimentos', capitalPrivadoId],
    queryFn: async () => {
      if (!capitalPrivadoId) return [];
      
      const { data, error } = await supabase
        .from('portfolio_compartimentos')
        .select('*')
        .eq('capital_privado_id', capitalPrivadoId)
        .order('orden', { ascending: true });
      
      if (error) throw error;
      return data as Compartimento[];
    },
    enabled: !!capitalPrivadoId,
  });
};

export const useFIC = () => {
  return useQuery({
    queryKey: ['portfolio', 'fic'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_fic')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data as FIC | null;
    },
  });
};

export const useFICTipos = (ficId?: string) => {
  return useQuery({
    queryKey: ['portfolio', 'fic-tipos', ficId],
    queryFn: async () => {
      if (!ficId) return [];
      
      const { data, error } = await supabase
        .from('portfolio_fic_tipos')
        .select('*')
        .eq('fic_id', ficId)
        .order('orden', { ascending: true });
      
      if (error) throw error;
      return data as FICTipo[];
    },
    enabled: !!ficId,
  });
};

export const useFICHistorico = (ficId?: string) => {
  return useQuery({
    queryKey: ['portfolio', 'fic-historico', ficId],
    queryFn: async () => {
      if (!ficId) return [];
      
      const { data, error } = await supabase
        .from('portfolio_fic_historico')
        .select('*')
        .eq('fic_id', ficId)
        .order('orden', { ascending: true });
      
      if (error) throw error;
      return data as FICHistorico[];
    },
    enabled: !!ficId,
  });
};

// Update mutations
export const useUpdateCapitalPrivado = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<CapitalPrivado> & { id: string }) => {
      const { id, ...updateData } = data;
      const { error } = await supabase
        .from('portfolio_capital_privado')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'capital-privado'] });
      toast.success('Capital Privado actualizado');
    },
    onError: (error) => {
      toast.error('Error al actualizar: ' + error.message);
    },
  });
};

export const useUpdateCompartimento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Compartimento> & { id: string }) => {
      const { id, ...updateData } = data;
      const { error } = await supabase
        .from('portfolio_compartimentos')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'compartimentos'] });
      toast.success('Compartimento actualizado');
    },
    onError: (error) => {
      toast.error('Error al actualizar: ' + error.message);
    },
  });
};

export const useUpdateFIC = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<FIC> & { id: string }) => {
      const { id, ...updateData } = data;
      const { error } = await supabase
        .from('portfolio_fic')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'fic'] });
      toast.success('FIC actualizado');
    },
    onError: (error) => {
      toast.error('Error al actualizar: ' + error.message);
    },
  });
};

export const useUpdateFICTipo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<FICTipo> & { id: string }) => {
      const { id, ...updateData } = data;
      const { error } = await supabase
        .from('portfolio_fic_tipos')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'fic-tipos'] });
      toast.success('Tipo de participación actualizado');
    },
    onError: (error) => {
      toast.error('Error al actualizar: ' + error.message);
    },
  });
};

export const useUpdateFICHistorico = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<FICHistorico> & { id: string }) => {
      const { id, ...updateData } = data;
      const { error } = await supabase
        .from('portfolio_fic_historico')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'fic-historico'] });
      toast.success('Histórico actualizado');
    },
    onError: (error) => {
      toast.error('Error al actualizar: ' + error.message);
    },
  });
};
