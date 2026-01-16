import { BarChart3, Users, Briefcase, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  return (
    <section id="dashboard" className="section-padding bg-gradient-to-br from-primary to-primary/80">
      <div className="container-narrow mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
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
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/20 mx-auto mb-4 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
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
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Quieres acceso completo al Dashboard?
              </h3>
              <p className="text-white/70">
                Regístrate como inversionista o originador para ver métricas detalladas y reportes personalizados.
              </p>
            </div>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-full px-8 shadow-lg whitespace-nowrap">
              Solicitar Acceso
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
