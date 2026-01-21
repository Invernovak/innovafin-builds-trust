import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsultoriaFinanciera = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-narrow mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/#servicios')}
            className="mb-8 group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Servicios
          </Button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Consultoría Financiera y Planeación Fiscal
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Asesoría especializada en MBO, LBO, fusiones y adquisiciones. Brindamos acompañamiento integral en planeación fiscal y estrategias financieras para optimizar la estructura de su empresa.
              </p>

              <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl p-8 mt-8">
                <h2 className="text-xl font-bold text-foreground mb-4">Servicios especializados:</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                    <span>Management Buyout (MBO) y Leveraged Buyout (LBO)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                    <span>Fusiones y adquisiciones empresariales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                    <span>Planeación fiscal estratégica</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                    <span>Optimización de estructuras corporativas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultoriaFinanciera;
