import { useState } from 'react';
import { toast } from 'sonner';

export type SubmissionType = 'originator' | 'investor';

interface UseLeadSubmissionOptions {
  type: SubmissionType;
  onSuccess?: () => void;
}

/**
 * Envío de los formularios de vinculación (Inversionistas y Originadores).
 *
 * Los datos los registra el script de seguimiento de GHL (index.html), que captura
 * el formulario al enviarlo usando el atributo "name" de cada campo.
 * Ya no se guardan en Supabase.
 */
export function useLeadSubmission({ type, onSuccess }: UseLeadSubmissionOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitLead = async (_data: any) => {
    setIsSubmitting(true);
    toast.success('El formulario se ha enviado con éxito. Un asesor se pondrá en contacto pronto.');

    // Se espera un momento antes de limpiar el formulario, para que GHL alcance a leer los datos
    setTimeout(() => {
      onSuccess?.();
      setIsSubmitting(false);
    }, 1500);
  };

  return { submitLead, isSubmitting };
}
