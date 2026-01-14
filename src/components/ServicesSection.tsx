import { 
  Briefcase, 
  BarChart3, 
  Calculator, 
  Building2, 
  RefreshCw 
} from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Gestor Profesional',
    description: 'Somos expertos en la administración de portafolios y en el manejo de los activos aceptables para invertir.',
    highlighted: true,
  },
  {
    icon: BarChart3,
    title: 'Valoración de Empresas y Proyectos',
    description: 'Asesoramos en la toma de decisiones de inversión y empleamos métodos para obtener el valor financiero real.',
    highlighted: false,
  },
  {
    icon: Calculator,
    title: 'Consultoría Financiera y Planeación Fiscal',
    description: 'Asesoría en compras apalancadas (MBO y LBO), fusiones y adquisiciones con experiencia única en Colombia.',
    highlighted: false,
  },
  {
    icon: Building2,
    title: 'Estructuración de Negocios',
    description: 'Fondos de capital privado, negocios fiduciarios y titularizaciones.',
    highlighted: false,
  },
  {
    icon: RefreshCw,
    title: 'Re-perfilamiento de Deuda',
    description: 'Estructuración de deuda corporativa y optimización de estructuras de capital.',
    highlighted: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding bg-muted">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones financieras integrales diseñadas para impulsar el crecimiento de tu empresa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group bg-card rounded-xl p-8 shadow-card card-hover border ${
                  service.highlighted 
                    ? 'border-secondary/30 ring-1 ring-secondary/20' 
                    : 'border-border'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  service.highlighted 
                    ? 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground' 
                    : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                }`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {service.highlighted && (
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-secondary">
                    Servicio destacado
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
