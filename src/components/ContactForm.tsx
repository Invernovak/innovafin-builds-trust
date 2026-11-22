import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { LegalCheckboxes } from '@/components/LegalCheckboxes';
import PhoneCountryInput from '@/components/PhoneCountryInput';

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100),
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }).max(255),
  whatsappPais: z.string(),
  whatsapp: z.string().refine(val => {
    const digitos = val.replace(/\D/g, '').length;
    return digitos >= 7 && digitos <= 15;
  }, { message: "Ingrese un número de WhatsApp válido" }),
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      email: '',
      whatsappPais: 'co',
      whatsapp: '',
      mensaje: '',
      aceptaHabeasData: false,
      aceptaTerminos: false,
    },
  });

  // El envío lo registra el script de seguimiento de GHL (index.html), que captura el formulario al enviarlo.
  // Ya no se guarda en Supabase.
  const onSubmit = () => {
    setIsSubmitted(true);
    toast.success("¡Enviado!", {
      description: "El formulario se ha enviado con éxito. Nos pondremos en contacto pronto.",
    });

    // Limpiar el formulario después de mostrar la confirmación
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 5000);
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
                  className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 h-9 text-sm rounded-xl"
                  {...field}
                  // Nombre en inglés ("full_name") para que el seguimiento de GHL reconozca el nombre del contacto
                  name="full_name"
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
                  className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 h-9 text-sm rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <PhoneCountryInput
                country={form.watch("whatsappPais")}
                onCountryChange={(code) => form.setValue("whatsappPais", code)}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="WhatsApp"
              />
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
                  rows={2}
                  className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 resize-none rounded-xl text-sm"
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
          disabled={isSubmitted || !form.watch("aceptaHabeasData") || !form.watch("aceptaTerminos")}
          className={`w-full h-9 text-sm font-medium rounded-xl transition-all duration-300 ${isSubmitted
            ? 'bg-secondary hover:bg-secondary text-secondary-foreground'
            : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
            }`}
        >
          {isSubmitted ? (
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