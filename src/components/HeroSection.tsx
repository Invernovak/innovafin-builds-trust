import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsla(220, 55%, 15%, 0.92) 0%, hsla(150, 40%, 25%, 0.85) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up">
            Tu tranquilidad es nuestra prioridad
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Tus finanzas están en buenas manos. Logra los objetivos de tu negocio a través de controles permanentes gestionados por profesionales expertos.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-base rounded-lg shadow-elevated transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contáctanos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
