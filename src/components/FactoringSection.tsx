import { FileText, Calculator, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Calculator,
    title: 'Calculadora de Descuento',
    description: 'Simula el valor de descuento de tus facturas en tiempo real con tasas competitivas.',
  },
  {
    icon: FileText,
    title: 'Solicitud 100% Digital',
    description: 'Carga tus documentos y solicita el descuento de facturas sin papeleos innecesarios.',
  },
  {
    icon: Clock,
    title: 'Liquidez en 24-48h',
    description: 'Recibe el anticipo de tus facturas en tiempo récord para mantener tu flujo de caja.',
  },
];

const benefits = [
  'Sin garantías reales requeridas',
  'Tasas desde el 1.2% mensual',
  'Aprobación en menos de 24 horas',
  'Acompañamiento personalizado',
];

const FactoringSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="factoring" className="section-padding bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-narrow mx-auto relative">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Portal Factoring
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Convierte tus <span className="text-secondary">Facturas en Liquidez</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Obtén capital de trabajo inmediato descontando tus facturas por cobrar con las mejores condiciones del mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} delay={index * 100} />
          ))}
        </div>

        {/* Benefits and CTA */}
        <div 
          ref={ctaRef}
          className={cn(
            "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-700",
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Por qué elegir nuestro Factoring?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/factoring"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:bg-secondary/90 hover:shadow-xl hover:-translate-y-0.5"
              >
                Ir al Portal Factoring
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  feature, 
  delay 
}: { 
  feature: typeof features[0]; 
  delay: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const Icon = feature.icon;
  
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-700 group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-white/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {feature.title}
      </h3>
      <p className="text-white/70 text-sm">
        {feature.description}
      </p>
    </div>
  );
};

export default FactoringSection;
