import { TrendingUp, PieChart, LineChart, ArrowUpRight } from 'lucide-react';

const GestorProfesionalSection = () => {
  return (
    <section id="gestor" className="section-padding bg-muted">
      <div className="container-narrow mx-auto">
        {/* Main Bento Card */}
        <div className="bento-card-featured overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-sm font-semibold text-secondary">Servicio Destacado</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Gestor Profesional
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Somos expertos en la administración de portafolios y en el manejo de los activos aceptables para invertir. Nuestra experiencia y tecnología garantizan resultados superiores para tu inversión.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">+15 años</p>
                    <p className="text-sm text-muted-foreground">de experiencia</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">$50M+</p>
                    <p className="text-sm text-muted-foreground">en activos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Dashboard */}
            <div className="relative">
              <div className="bg-primary rounded-3xl p-8 shadow-xl">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-primary-foreground/60 text-sm">Portfolio Dashboard</p>
                    <p className="text-2xl font-bold text-primary-foreground">Gestión Activa</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20">
                    <ArrowUpRight className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-secondary">+12.4%</span>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-white/10 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <LineChart className="w-5 h-5 text-primary-foreground/60" />
                    <span className="text-primary-foreground/60 text-sm">Rendimiento Anual</span>
                  </div>
                  <div className="h-32 flex items-end gap-1.5">
                    {[30, 45, 35, 60, 50, 75, 65, 80, 70, 85, 90, 95].map((height, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-gradient-to-t from-secondary/50 to-secondary rounded-t-md"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-primary-foreground/60 text-xs mb-1">Clientes</p>
                    <p className="text-xl font-bold text-primary-foreground">120+</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <p className="text-primary-foreground/60 text-xs mb-1">Satisfacción</p>
                    <p className="text-xl font-bold text-primary-foreground">98%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-primary-foreground/60 text-xs mb-1">Proyectos</p>
                    <p className="text-xl font-bold text-primary-foreground">250+</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 right-4 bottom-4 bg-secondary/20 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestorProfesionalSection;