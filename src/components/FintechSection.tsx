import { Brain, Video, Smartphone, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Evaluación de Riesgo con IA',
    description: 'Algoritmos avanzados de machine learning para análisis predictivo de riesgo crediticio.',
  },
  {
    icon: Video,
    title: 'Comité de Crédito 100% Digital',
    description: 'Sesiones virtuales seguras para toma de decisiones en tiempo real desde cualquier lugar.',
  },
  {
    icon: Smartphone,
    title: 'Solución Mobile y Offline',
    description: 'Accede a todos tus análisis y reportes desde cualquier dispositivo, incluso sin conexión.',
  },
];

const FintechSection = () => {
  return (
    <section id="fintech" className="section-padding bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-white/80">Innova Fintech</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tecnología de{' '}
            <span className="text-secondary">Última Generación</span>
          </h2>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Innovamos constantemente para transformar la gestión financiera empresarial
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group glass-dark rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                  <Icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Visual */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 glass-dark rounded-full px-8 py-4">
            <div className="flex -space-x-2">
              {['MTG', 'EC', 'ALV'].map((initials, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-secondary/30 border-2 border-white/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{initials}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Equipo de expertos</p>
              <p className="text-white/60 text-sm">Listos para asesorarte</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FintechSection;