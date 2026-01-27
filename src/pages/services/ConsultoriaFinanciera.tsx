import ServicePageLayout from '@/components/ServicePageLayout';
import { Calculator } from 'lucide-react';

const ConsultoriaFinanciera = () => {
  return (
    <ServicePageLayout
      icon={Calculator}
      title="Consultoría Financiera y Planeación Fiscal"
      description="Asesoría especializada en MBO, LBO, fusiones y adquisiciones. Brindamos acompañamiento integral en planeación fiscal y estrategias financieras para optimizar la estructura de su empresa."
      featuresTitle="Servicios especializados:"
      features={[
        { text: 'Management Buyout (MBO) y Leveraged Buyout (LBO)' },
        { text: 'Fusiones y adquisiciones empresariales' },
        { text: 'Planeación fiscal estratégica' },
        { text: 'Optimización de estructuras corporativas' },
      ]}
      accentColor="emerald"
      prevService={{
        title: 'Valoración de Empresas',
        route: '/servicios/valoracion-empresas',
      }}
      nextService={{
        title: 'Estructuración de Negocios',
        route: '/servicios/estructuracion-negocios',
      }}
    />
  );
};

export default ConsultoriaFinanciera;
