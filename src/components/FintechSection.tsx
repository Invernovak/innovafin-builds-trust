import { Shield, Video, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'Software de Evaluación de Riesgo',
    description: 'Análisis avanzado de riesgo crediticio con algoritmos de última generación.',
  },
  {
    icon: Video,
    title: 'Comité de Crédito 100% a Distancia',
    description: 'Sesiones virtuales seguras para la toma de decisiones de crédito en tiempo real.',
  },
  {
    icon: Smartphone,
    title: 'Solución Mobile y Offline',
    description: 'Accede a tus análisis desde cualquier lugar, incluso sin conexión a internet.',
  },
];

const FintechSection = () => {
  return (
    <section id="fintech" className="section-padding bg-muted">
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
              Innova Fintech
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Tecnología de Última Generación
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Innovamos constantemente para ofrecer soluciones tecnológicas que transforman la manera de gestionar las finanzas empresariales.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex-shrink-0 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button 
              className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-5 rounded-lg shadow-medium transition-all duration-300 hover:shadow-lg"
            >
              Solicitar Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-navy-light rounded-3xl shadow-elevated flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Innova Fintech
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Soluciones financieras inteligentes
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

export default FintechSection;
