import { MapPin, Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import logoInnovafin from '@/assets/logo-innovafin.png';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="container-narrow mx-auto py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Column 1: Logo & Slogan */}
          <div>
            <div className="mb-4">
              <div className="bg-white rounded-xl p-2 inline-block mb-3">
                <img
                  loading="lazy"
                  decoding="async"
                  src={logoInnovafin}
                  alt="Innovafin"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-base font-medium text-white/90 mb-1">
                Construimos Valor y Confianza
              </p>
            </div>
            <p className="text-white/60 text-xs leading-relaxed pr-4">
              Somos una firma colombiana de banca de inversión y fintech comprometida con el crecimiento de tu empresa.
            </p>
          </div>

          {/* Column 2: Location & Contact */}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-base font-semibold mb-2 text-white">Ubicación</h4>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <MapPin className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  Cali - Calle 95 No. 98-414<br />
                  Piso 15, Edificio Jardín Central 2
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-2 text-white">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                  </div>
                  <a
                    href="mailto:contacto@innovafin.co"
                    className="text-white/70 text-xs hover:text-secondary transition-colors"
                  >
                    contacto@innovafin.co
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                  </div>
                  <p className="text-white/70 text-xs">
                    Lun - Vie: 8:00 am - 5:00 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div>
            <h4 className="text-base font-semibold mb-2 text-white">Escríbenos</h4>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Innovafin. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 text-xs hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/50 text-xs hover:text-white transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;