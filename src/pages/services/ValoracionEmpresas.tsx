import ServicePageLayout from '@/components/ServicePageLayout';
import { BarChart3 } from 'lucide-react';

const ValoracionEmpresas = () => {
  return (
    <ServicePageLayout
      icon={BarChart3}
      title="Valoración de Empresas y de Proyectos"
      description="Empleamos diversos métodos de valoración de empresas para obtener el valor financiero de las mismas. Dichos métodos varían en el grado de análisis que requiera cada caso, lo que nos permite adaptarnos a las necesidades específicas."
      featuresTitle="Métodos de valoración:"
      features={[
        { text: 'Valoración por flujos de caja descontados (DCF)' },
        { text: 'Valoración por múltiplos comparables' },
        { text: 'Valoración de activos netos' },
        { text: 'Análisis de escenarios y sensibilidad' },
      ]}
      accentColor="blue"
      prevService={{
        title: 'Gestor Profesional',
        route: '/servicios/gestor-profesional',
      }}
      nextService={{
        title: 'Consultoría Financiera',
        route: '/servicios/consultoria-financiera',
      }}
    />
  );
};

export default ValoracionEmpresas;
