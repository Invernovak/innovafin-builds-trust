import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logoInnovafin from '@/assets/logo-innovafin.png';
const navItems = [{
  label: 'Inicio',
  href: '#hero',
  isRoute: false
}, {
  label: 'Quiénes Somos',
  href: '#nosotros',
  isRoute: false
}, {
  label: 'Servicios',
  href: '#servicios',
  isRoute: false
}, {
  label: 'Inversionistas',
  href: '/investors',
  isRoute: true
}, {
  label: 'Originadores',
  href: '/originators',
  isRoute: true
}, {
  label: 'Portafolio',
  href: '#portafolio',
  isRoute: false
}, {
  label: 'Dashboard',
  href: '#dashboard',
  isRoute: false
}];
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-border/50' : 'bg-transparent'}`}>
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`transition-all duration-300 rounded-xl ${isScrolled ? '' : 'bg-white/95 px-4 py-2'}`}>
              <img alt="Innovafin" className="h-14 md:h-20 lg:h-24 w-auto object-contain" src="/lovable-uploads/e5546305-49f3-46f8-9903-dc6821f73e5a.png" />
            </div>
          </div>

          {/* Desktop Navigation - visible from md breakpoint */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${isScrolled ? 'text-foreground hover:text-primary hover:bg-muted' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
                  {item.label}
                </Link> : <button key={item.label} onClick={() => scrollToSection(item.href)} className={`px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${isScrolled ? 'text-foreground hover:text-primary hover:bg-muted' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
                  {item.label}
                </button>)}
            <Button onClick={scrollToContact} size="sm" className="ml-2 lg:ml-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-4 lg:px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-xs lg:text-sm">
              Agenda tu Asesoría
            </Button>
          </nav>

          {/* Mobile Menu Button - only visible on small screens */}
          <Button variant="ghost" size="icon" className={`md:hidden rounded-full ${isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - only for small screens */}
      {isMobileMenuOpen && <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border/50 animate-fade-in">
          <nav className="container-narrow mx-auto px-4 py-6 flex flex-col gap-2">
            {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left">
                  {item.label}
                </Link> : <button key={item.label} onClick={() => scrollToSection(item.href)} className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors text-left">
                  {item.label}
                </button>)}
            <Button onClick={() => {
          scrollToContact();
          setIsMobileMenuOpen(false);
        }} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full">
              Agenda tu Asesoría
            </Button>
          </nav>
        </div>}
    </header>;
};
export default Header;