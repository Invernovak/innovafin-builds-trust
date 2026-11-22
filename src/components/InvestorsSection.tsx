import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const InvestorsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="inversionistas" className="relative overflow-hidden h-full flex flex-col rounded-2xl border border-border/50 bg-card p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary rounded-full blur-3xl" />
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
            Para Inversionistas
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Haz Crecer tu Capital con <span className="text-secondary">InnovaFin</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Únete a nuestra comunidad y accede a oportunidades únicas en el mercado de financiamiento alternativo.
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

export default InvestorsSection;
