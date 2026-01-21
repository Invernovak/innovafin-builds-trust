import { 
  BarChart3, 
  Calculator, 
  Building2, 
  RefreshCw,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import logoInnovafin from '@/assets/logo-innovafin.png';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Briefcase,
    title: 'Gestor Profesional',
    description: 'Somos expertos en la administración de portafolios y en el manejo de los activos aceptables para invertir de acuerdo a lo establecido en el reglamento del Fondo de Capital Privado. Analizamos las necesidades de nuestros grupos de interés, lo que permite aumentar la eficiencia y garantizar la entrega de servicios consistentes, rentables, innovadores y de calidad.',
    gradient: 'from-primary/10 to-navy-light/10',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    showLogo: true,
  },
  {
    icon: BarChart3,
    title: 'Valoración de Empresas y de Proyectos',
    description: 'Empleamos diversos métodos de valoración de empresas para obtener el valor financiero de las mismas. Dichos métodos varían en el grado de análisis que requiera cada caso, lo que nos permite adaptarnos a las necesidades específicas.',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
    showLogo: false,
  },
  {
    icon: Calculator,
    title: 'Consultoría Financiera y Planeación Fiscal',
    description: 'Asesoría especializada en MBO, LBO, fusiones y adquisiciones. Brindamos acompañamiento integral en planeación fiscal y estrategias financieras para optimizar la estructura de su empresa.',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
    showLogo: true,
  },
  {
    icon: Building2,
    title: 'Estructuración de Negocios',
    description: 'Apoyamos a nuestros clientes mediante un enfoque innovador, con experiencia, conocimiento, habilidades, metodologías y herramientas que tenemos a disposición. Contribuimos a la estructuración de servicios como Fondos de capital privado, Negocios a través de vehículos financieros (fideicomisos) y Titularizaciones.',
    gradient: 'from-violet-500/10 to-purple-500/10',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
    showLogo: false,
  },
  {
    icon: RefreshCw,
    title: 'Re-perfilamiento de Deuda',
    description: 'Estructuración y Consecución de Deuda Corporativa, Recursos de Capital, Compra y Venta de Deuda Corporativa, Mercado de capitales y Optimización de Estructuras de Capital.',
    gradient: 'from-amber-500/10 to-orange-500/10',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    showLogo: true,
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Soluciones financieras{' '}
            <span className="text-gradient-green">integrales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diseñadas para impulsar el crecimiento sostenible de tu empresa
          </p>
        </div>

        {/* Services Grid - First row with featured Gestor Profesional */}
        <div className="mb-6">
          <div
            className={`group bento-card bg-gradient-to-br ${services[0].gradient} hover:shadow-xl relative overflow-hidden`}
          >
            {/* Logo watermark */}
            {services[0].showLogo && (
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <img src={logoInnovafin} alt="" className="w-20 h-auto" />
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className={`w-16 h-16 rounded-2xl ${services[0].iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <Briefcase className={`w-8 h-8 ${services[0].iconColor}`} strokeWidth={1.5} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {services[0].title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {services[0].description}
                </p>

                <Button variant="outline" className="rounded-full group/btn">
                  Conocer más
                  <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid - Remaining services */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.slice(1).map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group bento-card bg-gradient-to-br ${service.gradient} hover:shadow-xl relative overflow-hidden`}
              >
                {/* Logo watermark */}
                {service.showLogo && (
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <img src={logoInnovafin} alt="" className="w-16 h-auto" />
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${service.iconColor}`} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                  {service.description}
                </p>

                <Button variant="ghost" size="sm" className="rounded-full group/btn text-primary hover:text-primary p-0">
                  Conocer más
                  <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
