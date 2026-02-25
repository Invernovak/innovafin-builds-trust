import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { LegalCheckboxes } from '@/components/LegalCheckboxes';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100),
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }).max(255),
  mensaje: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }).max(1000),
  aceptaHabeasData: z.boolean().refine(val => val === true, {
    message: "Debe autorizar el tratamiento de datos",
  }),
  aceptaTerminos: z.boolean().refine(val => val === true, {
    message: "Debe aceptar los términos y condiciones",
  })
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      email: '',
      mensaje: '',
      aceptaHabeasData: false,
      aceptaTerminos: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement Turnstile / reCAPTCHA validation here before inserting

      // Insert into Supabase
      const { error } = await supabase
        .from('contact_leads' as any) // Assuming the table might not be in the generated types yet
        .insert({
          nombre: values.nombre,
          email: values.email,
          mensaje: values.mensaje,
          acepta_habeas_data: values.aceptaHabeasData,
          acepta_terminos: values.aceptaTerminos,
        });

      if (error) {
        console.error('Error inserting lead:', error);
        throw new Error(error.message);
      }

      setIsSubmitted(true);
      toast({
        title: "¡Enviado!",
        description: "El formulario se ha enviado con éxito. Nos pondremos en contacto pronto.",
      });

      // Reset form area after successful send
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 5000);

    } catch (error: any) {
      toast({
        title: "Error al enviar",
        description: "Ocurrió un problema al enviar su mensaje. Por favor intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nombre"
                  className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 h-11 rounded-xl"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 h-11 rounded-xl"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Mensaje"
                  rows={3}
                  className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 resize-none rounded-xl"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Legal Checkboxes using custom component inside FormField wrappers to catch errors */}
        <div className="space-y-1">
          <LegalCheckboxes
            authChecked={form.watch("aceptaHabeasData")}
            onAuthChange={(checked) => form.setValue("aceptaHabeasData", checked, { shouldValidate: true })}
            termsChecked={form.watch("aceptaTerminos")}
            onTermsChange={(checked) => form.setValue("aceptaTerminos", checked, { shouldValidate: true })}
            labelClassName="text-xs text-white/70 cursor-pointer leading-tight"
            linkClassName="p-0 h-auto font-normal text-xs text-white/70 hover:text-white underline decoration-white/50 underline-offset-4 justify-start transition-colors"
            checkboxClassName="border-white/50 data-[state=checked]:bg-secondary data-[state=checked]:text-white"
          />
          {/* Manually render errors for the checkboxes since we mapped them manually */}
          {form.formState.errors.aceptaHabeasData && (
            <p className="text-red-400 text-xs font-medium">{form.formState.errors.aceptaHabeasData.message}</p>
          )}
          {form.formState.errors.aceptaTerminos && !form.formState.errors.aceptaHabeasData && (
            <p className="text-red-400 text-xs font-medium">{form.formState.errors.aceptaTerminos.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isSubmitted || !form.watch("aceptaHabeasData") || !form.watch("aceptaTerminos")}
          className={`w-full h-11 font-medium rounded-xl transition-all duration-300 ${isSubmitted
            ? 'bg-secondary hover:bg-secondary text-secondary-foreground'
            : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enviando...
            </span>
          ) : isSubmitted ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Mensaje enviado
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensaje
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;