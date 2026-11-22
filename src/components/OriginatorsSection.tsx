import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const OriginatorsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="originadores" className="relative overflow-hidden h-full flex flex-col rounded-2xl border border-border/50 bg-card p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-6 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Para Originadores
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Impulsa tu Empresa con <span className="text-secondary">Financiamiento Alternativo</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Conectamos empresas con capital inteligente para potenciar su crecimiento y operaciones.
          </p>
        </div>

        <div 
          ref={ctaRef}
          className={cn(
            "mt-auto text-center transition-all duration-700 delay-200",
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

export default OriginatorsSection;
