import { PieChart, Layers, TrendingUp, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const currentCompartments = [
  {
    name: 'Libranzas',
    description: 'Financiamiento respaldado por libranzas',
    color: 'hsl(var(--primary))',
    value: 40,
  },
  {
    name: 'Educapital',
    description: 'Inversión en sector educativo',
    color: 'hsl(var(--secondary))',
    value: 35,
  },
  {
    name: 'Evolución',
    description: 'Créditos de evolución empresarial',
    color: 'hsl(var(--accent))',
    value: 25,
  },
];

const futureCompartments = [
  {
    name: 'Para Sentencias',
    description: 'Financiamiento de sentencias judiciales',
  },
  {
    name: 'Para Factoring',
    description: 'Operaciones de factoring empresarial',
  },
];

const performanceData = [
  { name: 'Ene', desembolsos: 4200, aprobaciones: 5100 },
  { name: 'Feb', desembolsos: 3800, aprobaciones: 4600 },
  { name: 'Mar', desembolsos: 5100, aprobaciones: 5800 },
  { name: 'Abr', desembolsos: 4700, aprobaciones: 5400 },
  { name: 'May', desembolsos: 5300, aprobaciones: 6200 },
  { name: 'Jun', desembolsos: 5800, aprobaciones: 6800 },
];

const qualityIndicators = [
  { name: 'Cumplimiento', value: 95, color: 'hsl(var(--primary))' },
  { name: 'Otros', value: 5, color: 'hsl(var(--muted))' },
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

        {/* Current Compartments */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Compartimentos Activos
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {currentCompartments.map((compartment, index) => (
              <div key={index} className="bento-card text-center group hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-4" 
                  style={{ backgroundColor: compartment.color }}
                />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {compartment.name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {compartment.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Compartments */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            Futuros Compartimentos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {futureCompartments.map((compartment, index) => (
              <div key={index} className="bento-card border-dashed border-2 border-muted-foreground/20 bg-muted/30 text-center group hover:shadow-lg transition-all duration-300">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {compartment.name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {compartment.description}
                </p>
                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                  Próximamente
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Power BI Style */}
        <div className="bento-card-featured mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Dashboard de Rendimiento
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bar Chart - Desembolsos y Aprobaciones */}
            <div className="md:col-span-2 bg-muted/30 rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                Desembolsos vs Aprobaciones (Millones COP)
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}M`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="desembolsos" name="Desembolsos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="aprobaciones" name="Aprobaciones" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart - Indicador de Calidad */}
            <div className="bg-muted/30 rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                Indicador de Calidad
              </h4>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={qualityIndicators}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {qualityIndicators.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-primary">95%</span>
                    <p className="text-xs text-muted-foreground">Cumplimiento</p>
                  </div>
                </div>
              </div>
              
              {/* Distribution by Compartment */}
              <div className="mt-6">
                <h5 className="text-xs font-semibold text-muted-foreground mb-3">Distribución por Compartimento</h5>
                <div className="space-y-2">
                  {currentCompartments.map((comp, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: comp.color }}
                      />
                      <span className="text-xs text-foreground flex-1">{comp.name}</span>
                      <span className="text-xs font-semibold text-foreground">{comp.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <PieChart className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">+$50.000M</h4>
                <p className="text-muted-foreground text-sm">Activos bajo gestión</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Layers className="w-7 h-7 text-secondary" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">3 + 2</h4>
                <p className="text-muted-foreground text-sm">Compartimientos (activos + próximos)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">12-18%</h4>
                <p className="text-muted-foreground text-sm">Rentabilidad objetivo</p>
              </div>
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
