import { 
  BarChart3, 
  Calculator, 
  Building2, 
  RefreshCw 
} from 'lucide-react';
import logoInnovafin from '@/assets/logo-innovafin.png';

const services = [
  {
    icon: BarChart3,
    title: 'Valoración de Empresas',
    description: 'Toma decisiones de inversión con métodos de valor financiero real.',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
    showLogo: true,
  },
  {
    icon: Calculator,
    title: 'Consultoría Financiera',
    description: 'Asesoría en MBO, LBO, fusiones y adquisiciones.',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
    showLogo: false,
  },
  {
    icon: Building2,
    title: 'Estructuración de Negocios',
    description: 'Fondos de capital privado, fiduciarios y titularizaciones.',
    gradient: 'from-violet-500/10 to-purple-500/10',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
    showLogo: true,
  },
  {
    icon: RefreshCw,
    title: 'Re-perfilamiento de Deuda',
    description: 'Optimización de estructuras de capital y deuda corporativa.',
    gradient: 'from-amber-500/10 to-orange-500/10',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    showLogo: false,
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

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
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
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Conocer más</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;