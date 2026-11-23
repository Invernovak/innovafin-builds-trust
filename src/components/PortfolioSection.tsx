import { ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Compartimentos del fondo. Para agregar una descripción debajo del nombre, añade "description".
const currentCompartments: { name: string; description?: string; color: string }[] = [
  { name: 'Integra Plus - Libranzas', color: 'hsl(var(--primary))' },
  { name: 'Evolución - Libranzas', color: 'hsl(var(--secondary))' },
];

const futureCompartments: { name: string; description?: string }[] = [
  { name: 'Conecta - Factoring' },
  { name: 'Sentencias - Sentencias' },
];

const PortfolioSection = () => {
  return (
    <section id="portafolio" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Nuestros Fondos Gestionados
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Fondo de Capital Privado <span className="text-secondary">Alternativos Plus</span>
          </h2>
          <p className="text-base md:text-lg font-semibold text-foreground/80 mb-4">
            Administrado por AVAL Fiduciaria - Asset Management
          </p>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estructura diversificada con compartimientos especializados para maximizar rendimientos y gestionar riesgos.
          </p>
        </div>

        {/* Compartimentos activos y futuros, uno al lado del otro */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Current Compartments */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Compartimentos Activos
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {currentCompartments.map((compartment, index) => (
                <div key={index} className="bento-card min-h-[144px] flex flex-col items-center justify-center text-center border-2 border-primary/20 hover:border-primary/40 group hover:shadow-lg transition-all duration-300">
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-4"
                    style={{ backgroundColor: compartment.color }}
                  />
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {compartment.name}
                  </h4>
                  {compartment.description && (
                    <p className="text-muted-foreground text-sm">
                      {compartment.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Future Compartments */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              Futuros Compartimentos
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {futureCompartments.map((compartment, index) => (
                <div key={index} className="bento-card min-h-[144px] flex flex-col items-center justify-center border-dashed border-2 border-secondary/40 hover:border-secondary/60 bg-muted/30 text-center group hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {compartment.name}
                  </h4>
                  {compartment.description && (
                    <p className="text-muted-foreground text-sm">
                      {compartment.description}
                    </p>
                  )}
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                    Próximamente
                  </span>
                </div>
              ))}
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
    </section >
  );
};

export default PortfolioSection;
