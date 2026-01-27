import { Briefcase, Clock, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const benefits = [
  {
    icon: Briefcase,
    title: 'Financiamiento Ágil',
    description: 'Obtén capital de trabajo de manera rápida y eficiente para impulsar el crecimiento de tu empresa.',
  },
  {
    icon: Clock,
    title: 'Proceso Simplificado',
    description: 'Vinculación sencilla y requisitos claros para que accedas a financiamiento sin complicaciones.',
  },
  {
    icon: BarChart3,
    title: 'Acompañamiento Integral',
    description: 'Te brindamos asesoría continua y herramientas para optimizar tu gestión financiera.',
  },
];

const OriginatorsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="originadores" className="section-padding bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto relative">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Para Originadores
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Impulsa tu Empresa con <span className="text-secondary">Financiamiento Alternativo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conectamos empresas con capital inteligente para potenciar su crecimiento y operaciones.
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
            to="/originators"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:bg-secondary/90 hover:shadow-xl hover:shadow-secondary/25 hover:-translate-y-0.5"
          >
            Conocer Portal de Originadores
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
        "bento-card text-center group hover:border-secondary/20 hover:shadow-xl transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-secondary/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
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

export default OriginatorsSection;
