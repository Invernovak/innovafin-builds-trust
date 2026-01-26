import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSidebar from '@/components/ServicesSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ValoracionEmpresas = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-narrow mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/#servicios')}
            className="mb-8 group lg:hidden"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Servicios
          </Button>

          <div className="flex gap-12">
            <ServicesSidebar />
            
            <div className="flex-1 max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Valoración de Empresas y de Proyectos
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Empleamos diversos métodos de valoración de empresas para obtener el valor financiero de las mismas. Dichos métodos varían en el grado de análisis que requiera cada caso, lo que nos permite adaptarnos a las necesidades específicas.
                </p>

                <div className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl p-8 mt-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Métodos de valoración:</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                      <span>Valoración por flujos de caja descontados (DCF)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                      <span>Valoración por múltiplos comparables</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                      <span>Valoración de activos netos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                      <span>Análisis de escenarios y sensibilidad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ValoracionEmpresas;
