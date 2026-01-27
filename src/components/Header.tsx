import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsAdmin } from '@/hooks/useIsAdmin';
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

const aboutItems = [
  { label: '¿Por qué nosotros?', href: '#por-que-nosotros', isSection: true },
  { label: 'Visión', href: '#vision', isSection: true },
  { label: 'Misión', href: '#mision', isSection: true },
  { label: 'Equipo', href: '#equipo', isSection: true },
];

const originatorItems = [
  { label: 'Info General', href: '/originators', isRoute: true },
  { label: 'Registro', href: '/originators#registro', isSection: true },
  { label: 'Originadores Activos', href: '/originators#activos', isSection: true },
  { label: 'Portal Originadores', href: '/originators', isRoute: true },
];

const investorItems = [
  { label: 'Info General', href: '/investors', isRoute: true },
  { label: 'Beneficios', href: '/investors#beneficios', isSection: true },
  { label: 'Cómo Invertir', href: '/investors#como-invertir', isSection: true },
  { label: 'Portal Inversionistas', href: '/investors', isRoute: true },
];

// Factoring items removed - no submenu for Factoring

interface NavItem {
  label: string;
  href: string;
  isRoute: boolean;
  hasSubmenu?: boolean;
  submenuItems?: { label: string; href: string; isSection?: boolean; isRoute?: boolean }[];
}

const navItems: NavItem[] = [
  { label: 'Inicio', href: '#hero', isRoute: false },
  { label: 'Quiénes Somos', href: '#nosotros', isRoute: false, hasSubmenu: true, submenuItems: aboutItems },
  { label: 'Servicios', href: '#servicios', isRoute: false, hasSubmenu: true, submenuItems: serviceItems },
  { label: 'Inversionistas', href: '/investors', isRoute: true },
  { label: 'Originadores', href: '/originators', isRoute: true },
  { label: 'Portafolio', href: '/portfolio', isRoute: true },
  { label: 'Factoring', href: '/factoring', isRoute: true },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const { isAdmin } = useIsAdmin();

  // Check if we're on a page with white background (not the homepage)
  const isInternalPage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force "scrolled" style on internal pages or when actually scrolled
  const showSolidHeader = isScrolled || isInternalPage;

  const scrollToSection = (href: string) => {
    const isHashLink = href.includes('#');
    const [path, hash] = href.split('#');
    
    // If we need to navigate to a different path first
    if (path && path !== '/' && location.pathname !== path) {
      window.location.href = href;
      return;
    }
    
    // If we're on a different page and need to go to home page sections
    if (!path && location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    
    const targetHash = hash ? `#${hash}` : href;
    
    if (targetHash === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === label ? null : label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidHeader
          ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className={`transition-all duration-300 rounded-xl ${
                showSolidHeader ? '' : 'bg-white/95 px-4 py-2'
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
              item.hasSubmenu && item.submenuItems ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap inline-flex items-center gap-1 ${
                        showSolidHeader
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
                    {item.submenuItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.href} asChild>
                        {subItem.isRoute || subItem.href.startsWith('/') && !subItem.href.includes('#') ? (
                          <Link to={subItem.href} className="cursor-pointer">
                            {subItem.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => scrollToSection(subItem.href)}
                            className="w-full text-left cursor-pointer"
                          >
                            {subItem.label}
                          </button>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                    showSolidHeader
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
                    showSolidHeader
                      ? 'text-foreground hover:text-primary hover:bg-muted'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap inline-flex items-center gap-1 ${
                  showSolidHeader
                    ? 'text-primary hover:text-primary/80 hover:bg-primary/10'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
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
              showSolidHeader ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border/50 animate-fade-in max-h-[80vh] overflow-y-auto">
          <nav className="container-narrow mx-auto px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) =>
              item.hasSubmenu && item.submenuItems ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMobileSubmenu(item.label)}
                    className="w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openMobileSubmenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openMobileSubmenu === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                      {item.submenuItems.map((subItem) =>
                        subItem.isRoute || (subItem.href.startsWith('/') && !subItem.href.includes('#')) ? (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ) : (
                          <button
                            key={subItem.href}
                            onClick={() => scrollToSection(subItem.href)}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                          >
                            {subItem.label}
                          </button>
                        )
                      )}
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
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-primary hover:bg-primary/10 rounded-xl transition-colors text-left flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Panel Admin
              </Link>
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
