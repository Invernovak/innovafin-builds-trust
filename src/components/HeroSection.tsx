import { ArrowRight, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/animacion_1.mp4';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/70" />

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-4 md:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8 animate-fade-up">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white/80">Gestor Profesional Certificado</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Tu tranquilidad es nuestra{' '}
              <span className="text-secondary">prioridad</span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Gestión de activos y banca de inversión con tecnología de punta. Logra tus objetivos con controles permanentes y expertos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Contáctanos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-white/60 text-sm animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Expertos en administración de portafolios y FCP</span>
            </div>
          </div>

          {/* Right: Abstract Financial Graphic */}
          <div className="hidden lg:block relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main Card */}
              <div className="glass-dark rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Rendimiento del Portafolio</p>
                    <p className="text-3xl font-bold text-white">+24.8%</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="h-40 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 95, 75, 88, 92].map((height, i) => (
                    <div 
                      key={i}
                      className="flex-1 bg-gradient-to-t from-secondary/40 to-secondary rounded-t-lg transition-all duration-500"
                      style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 glass-dark rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Activos</p>
                    <p className="text-white font-semibold">$2.4M</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 glass-dark rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Riesgo</p>
                    <p className="text-green-400 font-semibold">Bajo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;