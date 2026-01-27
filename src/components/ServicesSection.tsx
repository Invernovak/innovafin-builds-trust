import { 
  BarChart3, 
  Calculator, 
  Building2, 
  RefreshCw,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Briefcase,
    title: 'Gestor Profesional',
    description: 'Somos expertos en la administración de portafolios y en el manejo de los activos aceptables para invertir de acuerdo a lo establecido en el reglamento del Fondo de Capital Privado.',
    route: '/servicios/gestor-profesional',
    featured: true,
  },
  {
    icon: BarChart3,
    title: 'Valoración de Empresas y de Proyectos',
    description: 'Empleamos diversos métodos de valoración de empresas para obtener el valor financiero de las mismas, adaptándonos a las necesidades específicas de cada caso.',
    route: '/servicios/valoracion-empresas',
  },
  {
    icon: Calculator,
    title: 'Consultoría Financiera y Planeación Fiscal',
    description: 'Asesoría especializada en MBO, LBO, fusiones y adquisiciones. Brindamos acompañamiento integral en planeación fiscal y estrategias financieras.',
    route: '/servicios/consultoria-financiera',
  },
  {
    icon: Building2,
    title: 'Estructuración de Negocios',
    description: 'Contribuimos a la estructuración de Fondos de capital privado, Negocios a través de vehículos financieros (fideicomisos) y Titularizaciones.',
    route: '/servicios/estructuracion-negocios',
  },
  {
    icon: RefreshCw,
    title: 'Re-perfilamiento de Deuda',
    description: 'Estructuración y consecución de deuda corporativa, recursos de capital, compra y venta de deuda corporativa, y optimización de estructuras de capital.',
    route: '/servicios/reperfilamiento-deuda',
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

const ServiceCard = ({ 
  service, 
  className 
}: { 
  service: typeof services[0]; 
  className?: string;
}) => {
  const Icon = service.icon;
  
  return (
    <div 
      className={cn(
        "group relative bg-card rounded-2xl border border-border/50 p-8 transition-all duration-500",
        "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Trust indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-muted-foreground font-medium">Expertos</span>
      </div>

      {/* Icon container */}
      <div className="relative mb-6 z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
          <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-primary/20 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
          {service.description}
        </p>

        {/* Button */}
        <ServiceButton to={service.route} />
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none" />
    </div>
  );
};

const FeaturedServiceCard = ({ service }: { service: typeof services[0] }) => {
  const Icon = service.icon;
  
  return (
    <div 
      className={cn(
        "group relative bg-gradient-to-br from-primary/5 via-card to-card rounded-2xl border border-primary/20 p-10 transition-all duration-500",
        "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
        "overflow-hidden"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Trust badges */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-600 font-semibold">Servicio Principal</span>
        </div>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-8 items-start">
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl shadow-primary/30 transition-transform duration-500 group-hover:scale-110">
            <Icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="absolute -inset-2 rounded-2xl border-2 border-primary/30 scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-2xl">
            {service.description}
          </p>

          <ServiceButton to={service.route} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

const ServicesSection = () => {
  const featuredService = services[0];
  const otherServices = services.slice(1);

  return (
    <section id="servicios" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Soluciones financieras{' '}
            <span className="text-gradient-green">integrales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diseñadas para impulsar el crecimiento sostenible de tu empresa con la confianza y experiencia que nos respalda
          </p>
        </div>

        {/* Featured Service */}
        <div className="mb-8">
          <FeaturedServiceCard service={featuredService} />
        </div>

        {/* Other Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Trust footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-muted/50 border border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">+15 años de experiencia</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Asesoría personalizada</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Resultados comprobados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
