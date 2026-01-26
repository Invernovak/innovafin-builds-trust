import { Link, useLocation } from 'react-router-dom';
import { Briefcase, BarChart3, Calculator, Building2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { 
    label: 'Gestor Profesional', 
    href: '/servicios/gestor-profesional',
    icon: Briefcase 
  },
  { 
    label: 'Valoración de Empresas', 
    href: '/servicios/valoracion-empresas',
    icon: BarChart3 
  },
  { 
    label: 'Consultoría Financiera', 
    href: '/servicios/consultoria-financiera',
    icon: Calculator 
  },
  { 
    label: 'Estructuración de Negocios', 
    href: '/servicios/estructuracion-negocios',
    icon: Building2 
  },
  { 
    label: 'Re-perfilamiento de Deuda', 
    href: '/servicios/reperfilamiento-deuda',
    icon: RefreshCw 
  },
];

const ServicesSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Nuestros Servicios
        </h3>
        <nav className="space-y-1">
          {services.map((service) => {
            const isActive = location.pathname === service.href;
            const Icon = service.icon;
            
            return (
              <Link
                key={service.href}
                to={service.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{service.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default ServicesSidebar;
