import { Briefcase, Clock, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  return (
    <section id="originadores" className="section-padding bg-muted">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
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
            <div key={index} className="bento-card text-center group hover:border-secondary/20 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
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
          <Link to="/originators">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              Conocer Portal de Originadores
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OriginatorsSection;
