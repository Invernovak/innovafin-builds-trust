import { Wrench, X, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaintenanceNoticeProps {
  /** Si se pasa, el aviso se muestra como ventana emergente con botón para cerrar */
  onClose?: () => void;
}

const Contenido = ({ onClose }: MaintenanceNoticeProps) => {
  const irAContacto = () => {
    onClose?.();
    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-2xl">
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-secondary/10 flex items-center justify-center">
        <Wrench className="w-8 h-8 text-secondary" strokeWidth={1.75} />
      </div>

      <h2 className="text-xl font-bold text-foreground mb-3">Estamos mejorando nuestra plataforma</h2>
      <p className="text-muted-foreground leading-relaxed mb-2">
        En este momento estamos realizando un traslado y mantenimiento de nuestros sistemas para brindarte una mejor experiencia.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-6">
        El registro, el inicio de sesión y las solicitudes en línea estarán disponibles muy pronto. Mientras tanto, con gusto te atendemos por nuestros canales de contacto.
      </p>

      <div className="flex flex-col gap-3">
        <Button onClick={irAContacto} className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          Escríbenos
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <a
          href="mailto:contacto@innovafin.co"
          className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className="w-4 h-4" />
          contacto@innovafin.co
        </a>
      </div>
    </div>
  );
};

/** Aviso de mantenimiento: como ventana emergente (con onClose) o dentro de la página (sin onClose) */
const MaintenanceNotice = ({ onClose }: MaintenanceNoticeProps) =>
  onClose ? (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md animate-scale-in">
        <Contenido onClose={onClose} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center py-12 px-4">
      <Contenido />
    </div>
  );

export default MaintenanceNotice;
