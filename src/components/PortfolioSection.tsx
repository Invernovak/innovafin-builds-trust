import { PieChart, Layers, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const compartments = [
  {
    name: 'Compartimiento A',
    description: 'Financiamiento Corporativo',
    color: 'bg-primary',
  },
  {
    name: 'Compartimiento B',
    description: 'Factoring y Confirming',
    color: 'bg-secondary',
  },
  {
    name: 'Compartimiento C',
    description: 'Crédito de Consumo',
    color: 'bg-accent',
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
            Fondo de Capital Privado <span className="text-primary">InnovaFin</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estructura diversificada con compartimientos especializados para maximizar rendimientos y gestionar riesgos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {compartments.map((compartment, index) => (
            <div key={index} className="bento-card text-center group hover:shadow-lg transition-all duration-300">
              <div className={`w-4 h-4 rounded-full ${compartment.color} mx-auto mb-4`} />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {compartment.name}
              </h3>
              <p className="text-muted-foreground">
                {compartment.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bento-card-featured flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <PieChart className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">+$50.000M</h3>
              <p className="text-muted-foreground">Activos bajo gestión</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Layers className="w-8 h-8 text-secondary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">3</h3>
              <p className="text-muted-foreground">Compartimientos activos</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">12-18%</h3>
              <p className="text-muted-foreground">Rentabilidad objetivo</p>
            </div>
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
    </section>
  );
};

export default PortfolioSection;
