import { MapPin, Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import logoInnovafin from '@/assets/logo-innovafin.png';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="container-narrow mx-auto py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 xl:gap-10">
          {/* Column 1: Logo & Slogan */}
          <div>
            <div className="mb-6">
              <div className="bg-white rounded-xl p-3 inline-block mb-4">
                <img
                  loading="lazy"
                  decoding="async"
                  src={logoInnovafin}
                  alt="Innovafin"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-lg font-medium text-white/90 mb-2">
                Construimos Valor y Confianza
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed pr-4">
              Somos una firma colombiana de banca de inversión y fintech comprometida con el crecimiento de tu empresa.
            </p>
          </div>

          {/* Column 2: Location & Contact */}
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Ubicación</h4>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <MapPin className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Cali - Calle 95 No. 98-414<br />
                  Piso 15, Edificio Jardín Central 2
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                  </div>
                  <a
                    href="mailto:contacto@innovafin.co"
                    className="text-white/70 text-sm hover:text-secondary transition-colors"
                  >
                    contacto@innovafin.co
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                  </div>
                  <p className="text-white/70 text-sm">
                    Lun - Vie: 8:00 am - 5:00 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Escríbenos</h4>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Innovafin. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
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