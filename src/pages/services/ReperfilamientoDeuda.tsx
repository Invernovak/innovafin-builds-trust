import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSidebar from '@/components/ServicesSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReperfilamientoDeuda = () => {
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
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-amber-600" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Re-perfilamiento de Deuda
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Estructuración y Consecución de Deuda Corporativa, Recursos de Capital, Compra y Venta de Deuda Corporativa, Mercado de capitales y Optimización de Estructuras de Capital.
                </p>

                <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl p-8 mt-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Soluciones de deuda:</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
                      <span>Estructuración y consecución de deuda corporativa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
                      <span>Recursos de capital</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
                      <span>Compra y venta de deuda corporativa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
                      <span>Mercado de capitales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
                      <span>Optimización de estructuras de capital</span>
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

export default ReperfilamientoDeuda;
