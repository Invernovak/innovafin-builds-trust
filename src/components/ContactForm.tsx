import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { LegalCheckboxes } from '@/components/LegalCheckboxes';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [authChecked, setAuthChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor ingrese un email válido.",
        variant: "destructive",
      });
      return;
    }

    // Validate legal checkboxes
    if (!authChecked) {
      toast({
        title: "Error",
        description: "Debe autorizar el tratamiento de datos personales.",
        variant: "destructive",
      });
      return;
    }

    if (!termsChecked) {
      toast({
        title: "Error",
        description: "Debe aceptar los términos y condiciones.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "¡Enviado!",
      description: "El formulario se ha enviado con éxito",
    });

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nombre: '', email: '', mensaje: '' });
      setAuthChecked(false);
      setTermsChecked(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 h-11 rounded-xl"
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 h-11 rounded-xl"
          maxLength={255}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Textarea
          name="mensaje"
          placeholder="Mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows={3}
          className="bg-white/10 border-white/20 placeholder:text-white/40 text-white focus:border-secondary focus:ring-secondary/20 resize-none rounded-xl"
          maxLength={1000}
          disabled={isSubmitting}
        />
      </div>

      <LegalCheckboxes
        authChecked={authChecked}
        onAuthChange={setAuthChecked}
        termsChecked={termsChecked}
        onTermsChange={setTermsChecked}
        itemClassName="flex items-start space-x-3 rounded-xl p-3 bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
        labelClassName="text-sm text-white/90 cursor-pointer leading-relaxed"
        linkClassName="p-0 h-auto font-normal text-xs text-secondary hover:text-secondary/80 underline justify-start"
      />

      <Button
        type="submit"
        disabled={isSubmitting || isSubmitted || !authChecked || !termsChecked}
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
            El formulario se ha enviado con éxito
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Enviar Mensaje
          </span>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;