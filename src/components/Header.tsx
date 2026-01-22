import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const serviceItems = [
  { label: 'Gestor Profesional', href: '/servicios/gestor-profesional' },
  { label: 'Valoración de Empresas', href: '/servicios/valoracion-empresas' },
  { label: 'Consultoría Financiera', href: '/servicios/consultoria-financiera' },
  { label: 'Estructuración de Negocios', href: '/servicios/estructuracion-negocios' },
  { label: 'Re-perfilamiento de Deuda', href: '/servicios/reperfilamiento-deuda' },
];

const navItems = [
  { label: 'Inicio', href: '#hero', isRoute: false },
  { label: 'Quiénes Somos', href: '#nosotros', isRoute: false },
  { label: 'Servicios', href: '#servicios', isRoute: false, hasSubmenu: true },
  { label: 'Inversionistas', href: '/investors', isRoute: true },
  { label: 'Originadores', href: '/originators', isRoute: true },
  { label: 'Portafolio', href: '/portfolio', isRoute: true },
  { label: 'Dashboard', href: '#dashboard', isRoute: false },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
          {/* Logo */}
          <div className="flex items-center">
            <div
              className={`transition-all duration-300 rounded-xl ${
                isScrolled ? '' : 'bg-white/95 px-4 py-2'
              }`}
            >
              <img
                alt="Innovafin"
                className="h-14 md:h-20 lg:h-24 w-auto object-contain"
                src="/lovable-uploads/e5546305-49f3-46f8-9903-dc6821f73e5a.png"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.hasSubmenu ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap inline-flex items-center gap-1 ${
                        isScrolled
                          ? 'text-foreground hover:text-primary hover:bg-muted'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-background border border-border shadow-lg z-[60]"
                  >
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => scrollToSection('#servicios')}
                        className="w-full text-left cursor-pointer"
                      >
                        Ver todos los servicios
                      </button>
                    </DropdownMenuItem>
                    {serviceItems.map((service) => (
                      <DropdownMenuItem key={service.href} asChild>
                        <Link to={service.href} className="cursor-pointer">
                          {service.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                    isScrolled
                      ? 'text-foreground hover:text-primary hover:bg-muted'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                    isScrolled
                      ? 'text-foreground hover:text-primary hover:bg-muted'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
            <Button
              onClick={scrollToContact}
              size="sm"
              className="ml-2 lg:ml-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-4 lg:px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-xs lg:text-sm"
            >
              Agenda tu Asesoría
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden rounded-full ${
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
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border/50 animate-fade-in">
          <nav className="container-narrow mx-auto px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) =>
              item.hasSubmenu ? (
                <div key={item.label}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isServicesOpen && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                      <button
                        onClick={() => scrollToSection('#servicios')}
                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        Ver todos
                      </button>
                      {serviceItems.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left"
                >
                  {item.label}
                </button>
              )
            )}
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
