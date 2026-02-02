import { Target, Rocket, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import logoInnovafin from '@/assets/logo-innovafin.png';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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



const AboutSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: visionRef, isVisible: visionVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });


  return (
    <section id="nosotros" className="section-padding bg-muted">
      <div className="container-narrow mx-auto">
        {/* Why Innovafin */}
        <div id="por-que-nosotros" className="text-center mb-20 scroll-mt-24">
          <div
            ref={headerRef}
            className={cn(
              "transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Quiénes Somos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              ¿Por qué <span className="text-primary">Innovafin</span> es su mejor opción?
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
              Diseñamos servicios financieros con innovación y excelencia para construir valor y confianza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyUsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <WhyUsCard key={index} item={item} Icon={Icon} delay={index * 100} />
              );
            })}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Vision Card */}
          <div
            id="vision"
            className="scroll-mt-24"
            ref={visionRef}
          >
            <div
              className={cn(
                "bento-card h-full relative overflow-hidden border-2 border-secondary/20 bg-gradient-to-br from-background via-background to-secondary/5 transition-all duration-700",
                visionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="absolute top-4 right-4 opacity-5">
                <img src={logoInnovafin} alt="" className="w-16 h-auto" />
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex-shrink-0 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-secondary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">
                    Visión 2026
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
                    "Seremos reconocidos como el mejor{' '}
                    <span className="text-secondary">Gestor Profesional</span>{' '}
                    en Colombia"
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ofreciendo servicios disruptivos, innovadores y confiables para nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div
            id="mision"
            className="scroll-mt-24"
            ref={missionRef}
          >
            <div
              className={cn(
                "bento-card h-full relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-700 delay-100",
                missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="absolute top-4 right-4 opacity-5">
                <img src={logoInnovafin} alt="" className="w-16 h-auto" />
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    Nuestra Misión
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Construir <span className="text-primary">valor y confianza</span> para nuestros clientes
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Brindar servicios financieros de alta calidad impulsando el crecimiento sostenible de sus negocios a través de soluciones innovadoras y un equipo de profesionales comprometidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

// Extracted component for Why Us cards with individual animation
const WhyUsCard = ({
  item,
  Icon,
  delay
}: {
  item: typeof whyUsItems[0];
  Icon: typeof Lightbulb;
  delay: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "bento-card text-center group hover:shadow-lg transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
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
};

export default AboutSection;
