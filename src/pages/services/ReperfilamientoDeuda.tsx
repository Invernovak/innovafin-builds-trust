import ServicePageLayout from '@/components/ServicePageLayout';
import { RefreshCw } from 'lucide-react';

const ReperfilamientoDeuda = () => {
  return (
    <ServicePageLayout
      icon={RefreshCw}
      title="Re-perfilamiento de Deuda"
      description="Estructuración y Consecución de Deuda Corporativa, Recursos de Capital, Compra y Venta de Deuda Corporativa, Mercado de capitales y Optimización de Estructuras de Capital."
      featuresTitle="Soluciones de deuda:"
      features={[
        { text: 'Estructuración y consecución de deuda corporativa' },
        { text: 'Recursos de capital' },
        { text: 'Compra y venta de deuda corporativa' },
        { text: 'Mercado de capitales' },
        { text: 'Optimización de estructuras de capital' },
      ]}
      accentColor="amber"
      prevService={{
        title: 'Estructuración de Negocios',
        route: '/servicios/estructuracion-negocios',
      }}
    />
  );
};

export default ReperfilamientoDeuda;
