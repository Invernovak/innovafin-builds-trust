import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ComposedChart, Line, Bar, ResponsiveContainer, YAxis, XAxis, CartesianGrid } from 'recharts';
import heroVideo from '@/assets/animacion_1.mp4';
import { useState, useEffect } from 'react';

const chartData = [
  { name: '1', bars: 20, line1: 25, line2: 15 },
  { name: '2', bars: 35, line1: 30, line2: 25 },
  { name: '3', bars: 25, line1: 45, line2: 35 },
  { name: '4', bars: 45, line1: 40, line2: 45 },
  { name: '5', bars: 30, line1: 55, line2: 52 },
  { name: '6', bars: 55, line1: 65, line2: 60 },
  { name: '7', bars: 40, line1: 60, line2: 70 },
  { name: '8', bars: 65, line1: 75, line2: 85 },
  { name: '9', bars: 50, line1: 85, line2: 92 },
  { name: '10', bars: 75, line1: 80, line2: 95 },
  { name: '11', bars: 85, line1: 95, line2: 105 },
  { name: '12', bars: 92, line1: 100, line2: 115 },
];

const HeroSection = () => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 6000); // Loops every 6 seconds
    return () => clearInterval(interval);
  }, []);

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

          {/* Right: Holographic Financial Graphic */}
          <div className="hidden lg:block relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative p-6">

              {/* Main Card with Holographic effect */}
              <div className="relative glass-dark rounded-xl p-6 shadow-2xl overflow-hidden bg-cyan-900/5 backdrop-blur-md border border-cyan-400/10">
                <div className="h-48 w-full relative">
                  {/* Arrow markers for SVG */}
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <marker id="arrow-cyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                      </marker>
                      <marker id="arrow-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
                      </marker>
                    </defs>
                  </svg>

                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart key={animationKey} data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(34,211,238,0.1)" />
                      <XAxis hide />
                      <YAxis hide domain={[0, 130]} />
                      
                      {/* Bars */}
                      <Bar 
                        dataKey="bars" 
                        fill="rgba(34,211,238,0.2)" 
                        stroke="rgba(34,211,238,0.4)" 
                        radius={[2, 2, 0, 0]} 
                        barSize={12}
                        animationDuration={1500}
                      />
                      
                      {/* Line 1: Gold Trend */}
                      <Line 
                        type="monotone" 
                        dataKey="line1" 
                        stroke="#D4AF37" 
                        strokeWidth={2} 
                        dot={false}
                        markerEnd="url(#arrow-gold)"
                        animationDuration={2500}
                        strokeOpacity={0.7}
                      />
                      
                      {/* Line 2: Thick Cyan Trend */}
                      <Line 
                        type="monotone" 
                        dataKey="line2" 
                        stroke="#22d3ee" 
                        strokeWidth={4} 
                        dot={false}
                        markerEnd="url(#arrow-cyan)"
                        animationDuration={2000}
                        strokeDasharray="none"
                        className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Floating Shield Card */}
              <div className="absolute -bottom-4 -left-6 glass-dark rounded-2xl p-4 shadow-xl animate-float border border-green-400/20" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-medium">Riesgo Sistema</p>
                    <p className="text-green-400 font-bold uppercase tracking-wider text-sm">Bajo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;