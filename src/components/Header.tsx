import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoInnovafin from '@/assets/logo-innovafin.png';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Gestor Profesional', href: '#gestor' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Fintech', href: '#fintech' },
  { label: 'Contacto', href: '#contacto' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Tagline */}
          <div className="flex items-center gap-4">
            <div className={`transition-all duration-300 rounded-xl ${
              isScrolled ? '' : 'bg-white/95 px-4 py-2'
            }`}>
              <img 
                src={logoInnovafin} 
                alt="Innovafin" 
                className="h-9 md:h-10 w-auto"
              />
            </div>
            <div className={`hidden md:block transition-all duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}>
              <span className="text-xs font-medium text-muted-foreground tracking-wide">
                Construimos Valor y Confianza
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  isScrolled
                    ? 'text-foreground hover:text-primary hover:bg-muted'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={scrollToContact}
              className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Agenda tu Asesoría
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden rounded-full ${
              isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-border/50 animate-fade-in">
          <nav className="container-narrow mx-auto px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => {
                scrollToContact();
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
            >
              Agenda tu Asesoría
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;