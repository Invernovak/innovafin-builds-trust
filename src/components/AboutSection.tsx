import { Target, Rocket, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import logoInnovafin from '@/assets/logo-innovafin.png';

const whyUsItems = [
  {
    icon: Lightbulb,
    title: 'Innovación Constante',
    description: 'Desarrollamos soluciones financieras disruptivas adaptadas a las necesidades del mercado.',
  },
  {
    icon: Shield,
    title: 'Confianza y Seguridad',
    description: 'Construimos relaciones sólidas basadas en transparencia y resultados comprobados.',
  },
  {
    icon: TrendingUp,
    title: 'Excelencia en Resultados',
    description: 'Maximizamos el valor para nuestros clientes con estrategias financieras efectivas.',
  },
];

const teamMembers = [
  {
    name: 'María Teresa González',
    role: 'Socia Fundadora',
    initials: 'MTG',
  },
  {
    name: 'Edison Cerón',
    role: 'Socio Fundador',
    initials: 'EC',
  },
  {
    name: 'Gustavo Guerra Galvez',
    role: 'Director de Riesgos',
    initials: 'GGG',
  },
  {
    name: 'Nathalia Sandoval Herrera',
    role: 'Directora FCP',
    initials: 'NSH',
  },
  {
    name: 'Paola Andrea García',
    role: 'Directora Administrativa',
    initials: 'PAG',
  },
  {
    name: 'Víctor Arango',
    role: 'Asesor Legal',
    initials: 'VA',
  },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="section-padding bg-muted">
      <div className="container-narrow mx-auto">
        {/* Why Innovafin - NEW BLOCK */}
        <div id="por-que-nosotros" className="text-center mb-20 scroll-mt-24">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Quiénes Somos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            ¿Por qué <span className="text-primary">Innovafin</span> es su mejor opción?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
            Diseñamos servicios financieros con innovación y excelencia para construir valor y confianza
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {whyUsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bento-card text-center group hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision 2026 */}
        <div id="vision" className="text-center mb-20 scroll-mt-24">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
            Nuestra Visión
          </span>
          
          <div className="max-w-4xl mx-auto">
            <div className="bento-card-featured text-center py-12 relative overflow-hidden">
              {/* Logo watermark */}
              <div className="absolute top-8 right-8 opacity-10">
                <img src={logoInnovafin} alt="" className="w-24 h-auto" />
              </div>
              
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-secondary/20 to-secondary/10 mx-auto mb-8 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-secondary" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                "Seremos reconocidos en el{' '}
                <span className="text-secondary">2026</span>{' '}
                como el mejor Gestor Profesional en Colombia"
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ofreciendo servicios disruptivos, innovadores y confiables para nuestros clientes.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div id="mision" className="mb-20 scroll-mt-24">
          <div className="bento-card flex flex-col md:flex-row items-start gap-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex-shrink-0 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nuestra Misión
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Brindar servicios financieros de alta calidad que construyan valor y generen confianza para nuestros clientes, impulsando el crecimiento sostenible de sus negocios a través de soluciones innovadoras y un equipo de profesionales comprometidos.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div id="equipo" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nuestro Equipo
            </h3>
            <p className="text-muted-foreground text-lg">
              Profesionales con amplia experiencia en el sector financiero colombiano
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                {/* Circular Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-navy-light mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 ring-4 ring-white">
                  <span className="text-xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {member.name}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
