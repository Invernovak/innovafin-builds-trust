import { BarChart3, Users, Briefcase, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const metrics = [
  {
    icon: Users,
    value: '150+',
    label: 'Inversionistas Activos',
    trend: '+12%',
    color: 'primary',
  },
  {
    icon: Briefcase,
    value: '45',
    label: 'Originadores Vinculados',
    trend: '+8%',
    color: 'secondary',
  },
  {
    icon: BarChart3,
    value: '$25.000M',
    label: 'Financiamiento Colocado',
    trend: '+25%',
    color: 'accent',
  },
  {
    icon: TrendingUp,
    value: '15.2%',
    label: 'Rentabilidad Promedio',
    trend: '+2.1%',
    color: 'primary',
  },
];

const DashboardSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="dashboard" className="section-padding bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
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
            Dashboard en Vivo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Métricas e Indicadores <span className="text-secondary">en Tiempo Real</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Transparencia total: conoce el desempeño de nuestro fondo y las operaciones activas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} delay={index * 100} />
          ))}
        </div>

        <div 
          ref={ctaRef}
          className={cn(
            "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-700",
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Quieres acceso completo al Dashboard?
              </h3>
              <p className="text-white/70">
                Regístrate como inversionista o originador para ver métricas detalladas y reportes personalizados.
              </p>
            </div>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-full px-8 shadow-lg whitespace-nowrap transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              Solicitar Acceso
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricCard = ({ 
  metric, 
  delay 
}: { 
  metric: typeof metrics[0]; 
  delay: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const Icon = metric.icon;
  
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-700 group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
        {metric.value}
      </h3>
      <p className="text-white/70 text-sm mb-2">
        {metric.label}
      </p>
      <span className="inline-flex items-center text-secondary text-xs font-semibold">
        <ArrowUpRight className="w-3 h-3 mr-1" />
        {metric.trend}
      </span>
    </div>
  );
};

export default DashboardSection;
