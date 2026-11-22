import { Building2, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    icon: Briefcase,
    title: 'Gestión de Activos Alternativos',
    description: 'Estructuramos y administramos fondos de capital privado especializados en activos alternativos, con un enfoque disciplinado en la preservación y el crecimiento del capital.',
    route: '/servicios/gestion-activos-alternativos',
    featured: true,
  },
  {
    icon: Building2,
    title: 'Estructuración de Negocios',
    description: 'Contribuimos a la estructuración de Fondos de capital privado, Negocios a través de vehículos financieros (fideicomisos) y Titularizaciones.',
    route: '/servicios/estructuracion-negocios',
  },
];

const ServiceButton = ({ to }: { to: string }) => (
  <Link 
    to={to}
    className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
  >
    Conocer más
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
  </Link>
);

const FeaturedServiceCard = ({ service }: { service: (typeof services)[number] }) => {
  const Icon = service.icon;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });
  
  return (
    <div 
      ref={ref}
      className={cn(
        "group relative h-full flex flex-col bg-gradient-to-br from-primary/5 via-card to-card rounded-2xl border border-primary/20 p-8 transition-all duration-700",
        "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
        "overflow-hidden",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Trust badges */}
      {service.featured && (
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-600 font-semibold">Servicio Principal</span>
          </div>
        </div>
      )}

      <div className="relative flex flex-col gap-6 items-start flex-1">
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl shadow-primary/30 transition-transform duration-500 group-hover:scale-110">
            <Icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="absolute -inset-2 rounded-2xl border-2 border-primary/30 scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed mb-6 text-base">
            {service.description}
          </p>

          {/* El botón queda abajo para que ambas tarjetas se vean alineadas */}
          <div className="mt-auto">
            <ServiceButton to={service.route} />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="servicios" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto relative">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-8 transition-all duration-700",
            headerVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Soluciones financieras{' '}
            <span className="text-gradient-green">integrales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diseñadas para impulsar el crecimiento sostenible de tu empresa con la confianza y experiencia que nos respalda
          </p>
        </div>

        {/* Servicios: todos con el mismo formato de tarjeta */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <FeaturedServiceCard key={service.route} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
