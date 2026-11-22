import { MapPin, Mail, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import ContactForm from './ContactForm';
import logoInnovafin from '@/assets/logo-innovafin.png';

// Redes sociales. Cuando existan las cuentas, poner la dirección en "href" (ej. 'https://instagram.com/innovafin').
const socialLinks = [
  { label: 'Instagram', icon: Instagram, href: '' },
  { label: 'Facebook', icon: Facebook, href: '' },
  { label: 'LinkedIn', icon: Linkedin, href: '' },
];

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

            {/* Síguenos en */}
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-3">Síguenos en:</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href || '#'}
                    aria-label={label}
                    title={label}
                    {...(href
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : { onClick: (e: React.MouseEvent) => e.preventDefault() })}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-secondary hover:border-secondary hover:text-white hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Location & Contact */}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-base font-semibold mb-2 text-white">Ubicación</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center transition-all hover:bg-white/10">
                  <MapPin className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-medium text-sm">Cali</p>
                  <p className="text-white/60 text-xs">Calle 95 No. 98-414</p>
                </div>
              </div>

            </div>

            <div>
              <h4 className="text-base font-semibold mb-2 text-white">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center transition-all group-hover:bg-white/10">
                    <Mail className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Correo</p>
                    <a
                      href="mailto:contacto@innovafin.co"
                      className="text-white/70 text-sm hover:text-secondary transition-colors"
                    >
                      contacto@innovafin.co
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center transition-all group-hover:bg-white/10">
                    <Clock className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Horario</p>
                    <p className="text-white/70 text-sm">
                      Lun - Vie: 8:00 am - 5:00 pm
                    </p>
                  </div>
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