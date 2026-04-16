import { useState } from 'react';
import { supabaseInnovafin } from '@/lib/supabaseInnovafin';
import { toast } from 'sonner';

export type SubmissionType = 'originator' | 'investor';

interface UseLeadSubmissionOptions {
  type: SubmissionType;
  onSuccess?: () => void;
}

export function useLeadSubmission({ type, onSuccess }: UseLeadSubmissionOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitLead = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const table = type === 'originator' ? 'vinculacion_originadores' : 'vinculacion_clientes';

      const { error } = await supabaseInnovafin
        .from(table)
        .insert(data);

      if (error) {
        throw new Error(error.message || 'Error al enviar el formulario');
      }

      toast.success('El formulario se ha enviado con éxito. Un asesor se pondrá en contacto pronto.');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Hubo un error al enviar el formulario. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitLead, isSubmitting };
}
