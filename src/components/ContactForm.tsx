import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

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
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20 h-12"
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
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20 h-12"
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
          rows={4}
          className="bg-background border-border focus:border-secondary focus:ring-secondary/20 resize-none"
          maxLength={1000}
          disabled={isSubmitting}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-full h-12 font-medium rounded-lg transition-all duration-300 ${
          isSubmitted 
            ? 'bg-secondary hover:bg-secondary text-secondary-foreground' 
            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
