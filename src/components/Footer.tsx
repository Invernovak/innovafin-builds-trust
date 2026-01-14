import { MapPin, Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import logoInnovafin from '@/assets/logo-innovafin.png';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="container-narrow mx-auto section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Logo & Slogan */}
          <div>
            <div className="mb-6">
              <img 
                src={logoInnovafin} 
                alt="Innovafin - Construimos Valor y Confianza" 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm">
              Somos una firma colombiana de banca de inversión y fintech comprometida con el crecimiento de tu empresa.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                  Cali - Calle 95 No. 98-414 Piso 15<br />
                  Edificio Jardín Central 2
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" strokeWidth={1.5} />
                <a 
                  href="mailto:contacto@innovafin.co" 
                  className="text-primary-foreground/80 text-sm hover:text-secondary transition-colors"
                >
                  contacto@innovafin.co
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0" strokeWidth={1.5} />
                <p className="text-primary-foreground/80 text-sm">
                  Lunes a Viernes 8:00 am a 5:00 pm
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Escríbenos</h4>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Innovafin. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors">
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
