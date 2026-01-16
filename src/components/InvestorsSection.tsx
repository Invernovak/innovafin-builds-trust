import { TrendingUp, Shield, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  return (
    <section id="inversionistas" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Para Inversionistas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Haz Crecer tu Capital con <span className="text-primary">InnovaFin</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Únete a nuestra comunidad de inversionistas y accede a oportunidades únicas en el mercado de financiamiento alternativo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bento-card text-center group hover:border-primary/20 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/investors">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              Conocer Portal de Inversionistas
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
