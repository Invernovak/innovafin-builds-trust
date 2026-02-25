import { ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const currentCompartments = [
  {
    name: 'Libranzas',
    description: 'Financiamiento respaldado por libranzas',
    color: 'hsl(var(--primary))',
    value: 40,
  },
  {
    name: 'Educapital',
    description: 'Inversión en sector educativo',
    color: 'hsl(var(--secondary))',
    value: 35,
  },
  {
    name: 'Evolución',
    description: 'Créditos de evolución empresarial',
    color: 'hsl(var(--accent))',
    value: 25,
  },
];

const futureCompartments = [
  {
    name: 'Para Sentencias',
    description: 'Financiamiento de sentencias judiciales',
  },
  {
    name: 'Para Factoring',
    description: 'Operaciones de factoring empresarial',
  },
];



const PortfolioSection = () => {
  return (
    <section id="portafolio" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Nuestro Portafolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fondo de Capital Privado <span className="text-primary">Alternativos Plus</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estructura diversificada con compartimientos especializados para maximizar rendimientos y gestionar riesgos.
          </p>
        </div>

        {/* Current Compartments */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Compartimentos Activos
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {currentCompartments.map((compartment, index) => (
              <div key={index} className="bento-card text-center group hover:shadow-lg transition-all duration-300">
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: compartment.color }}
                />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {compartment.name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {compartment.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Compartments */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            Futuros Compartimentos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {futureCompartments.map((compartment, index) => (
              <div key={index} className="bento-card border-dashed border-2 border-muted-foreground/20 bg-muted/30 text-center group hover:shadow-lg transition-all duration-300">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {compartment.name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {compartment.description}
                </p>
                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                  Próximamente
                </span>
              </div>
            ))}
          </div>
        </div>



        <div className="text-center">
          <Link to="/portfolio">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              Explorar Portafolio Completo
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section >
  );
};

export default PortfolioSection;
