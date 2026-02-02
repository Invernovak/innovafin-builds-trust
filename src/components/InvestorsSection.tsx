import { TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Rendimientos Competitivos',
    description: 'Accede a rentabilidades superiores al mercado tradicional con inversiones respaldadas por activos reales.',
  },
  {
    icon: Shield,
    title: 'Seguridad y Transparencia',
    description: 'Tu inversión está protegida por rigurosos procesos de análisis y una gestión profesional certificada.',
  },
  {
    icon: Users,
    title: 'Diversificación Inteligente',
    description: 'Distribuye tu capital en múltiples sectores y originadores para minimizar riesgos.',
  },
];

const InvestorsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="inversionistas" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto relative">
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Para Inversionistas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Haz Crecer tu Capital con <span className="text-primary">InnovaFin</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Únete a nuestra comunidad y accede a oportunidades únicas en el mercado de financiamiento alternativo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} delay={index * 100} />
          ))}
        </div>

        <div
          ref={ctaRef}
          className={cn(
            "text-center transition-all duration-700 delay-200",
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link
            to="/investors"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            Conocer Portal de Inversionistas
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({
  benefit,
  delay
}: {
  benefit: typeof benefits[0];
  delay: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const Icon = benefit.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "bento-card text-center group hover:border-primary/20 hover:shadow-xl transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {benefit.title}
      </h3>
      <p className="text-muted-foreground">
        {benefit.description}
      </p>
    </div>
  );
};

export default InvestorsSection;
