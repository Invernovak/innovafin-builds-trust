import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Wallet, ShieldCheck, Briefcase, Calendar, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import TabsHint from '@/components/TabsHint';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  useCapitalPrivado,
  useCompartimentos,
  useFIC,
  useFICTipos,
  useFICHistorico,
} from '@/hooks/usePortfolioData';

// Formato para números grandes en COP
const formatCOP = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Formato compacto para números muy grandes
const formatCompactCOP = (value: number) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}B`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}MM`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  return formatCOP(value);
};

// Fondo de Capital Privado - Compartimentos (datos actualizados según informe)
const fondoCapitalPrivado = {
  name: 'FCP Alternativos Plus',
  administrador: 'AVAL Fiduciaria - Asset Management',
  gestorProfesional: 'InnovaFin',
  fechaReporte: 'Domingo, 30 de marzo de 2026',
  totalFondo: 171651066103,
  totalDisponible: 21002571341,
  totalInvertido: 150893706805,
  porcentajeTotal: 88,
  compartimentos: [
    {
      id: 'integra-plus-libranzas',
      name: 'Integra Plus - Libranzas',
      totalActivos: 142285655709,
      disponible: 2234163609,
      invertido: 140278708137,
      porcentajeActivos: 99,
      rentabilidadDia: 17.32,
      rentabilidad7dias: 12.28, // Valor original (no disponible en imagen)
      rentabilidad30dias: 15.32,
      rentabilidad90dias: 15.01,
      rentabilidad180dias: 14.66,
      rentabilidad365dias: 15.13,
      nivelRiesgo: 'Bajo',
    },
    {
      id: 'evolucion-libranzas',
      name: 'Evolución - Libranzas',
      totalActivos: 9272035443,
      disponible: 907806217,
      invertido: 8378943898,
      porcentajeActivos: 90,
      rentabilidadDia: 16.28,
      rentabilidad7dias: 11.67, // Valor original (no disponible en imagen)
      rentabilidad30dias: 11.09,
      rentabilidad90dias: 11.91,
      rentabilidad180dias: 14.88,
      rentabilidad365dias: 19.41,
      nivelRiesgo: 'Bajo',
    },
  ],
};

// FIC Alternativos 180 Plus - Tipos de Participación
const ficAlternativos180Plus = {
  name: 'FIC Alternativos 180 Plus',
  administrador: 'AVAL Fiduciaria - Asset Management',
  fechaReporte: 'Domingo, 30 de marzo de 2026',
  valorUnidad: 14637.11,
  valorFondo: 186673273435.14,
  saldo: 186673273435.14,
  rentabilidadEA30dias: 10.91,
  rentabilidadEA365dias: 11.98,
  tiposParticipacion: [
    {
      id: 'tp1',
      nombre: 'TP1',
      inversionMinimaInicial: 10000000,
      comisionAdministracion: 2.25,
      pactoPermanencia: 180,
      remuneracionEfectiva: 2.25,
      descripcion: 'Ideal para inversores individuales que buscan iniciar con montos accesibles.',
    },
    {
      id: 'tp2',
      nombre: 'TP2',
      inversionMinimaInicial: 1000000000,
      comisionAdministracion: 1.75,
      pactoPermanencia: 180,
      remuneracionEfectiva: 1.75,
      descripcion: 'Diseñado para inversores institucionales y de alto patrimonio.',
    },
  ],
  // Comportamiento Histórico
  comportamientoHistorico: [
    {
      id: 'tp1',
      nombre: 'Alternativo 180 plus - tp1',
      anoCorridoEA: 11.45,
      diariaEA: 10.24,
      dias30EA: 10.91,
      dias180EA: 11.36,
      ano1EA: 11.98,
      ano2EA: 12.58,
      ano3EA: 11.8,
    },
    {
      id: 'tp2',
      nombre: 'Alternativo 180 plus - tp2',
      anoCorridoEA: 12.01,
      diariaEA: 10.79,
      dias30EA: 11.47,
      dias180EA: 11.92,
      ano1EA: 12.48,
      ano2EA: null,
      ano3EA: null,
    },
  ],
};

// Calcular Portafolio Total Administrado (Capital Privado + FIC)
const portafolioTotalAdministrado = fondoCapitalPrivado.totalFondo + ficAlternativos180Plus.saldo;

const beneficios = [
  'Diversificación automática entre compartimentos',
  'Gestión profesional del portafolio',
  'Liquidez según términos del fondo',
  'Reportes periódicos de desempeño',
];

// Monto mínimo de inversión por tipo de participación del FIC (TP1 / TP2)
const montoMinimoFIC = (nombre: string) => {
  const n = nombre.toLowerCase();
  if (n.includes('tp1')) return '$ 10.000.000';
  if (n.includes('tp2')) return '$ 1.000.000.000';
  return '-';
};

const Portfolio = () => {
  // Si se llegó desde el botón "Conoce nuestros fondos actuales" de Inversionistas, se ofrece volver
  const location = useLocation();
  const vieneDeInversionistas = (location.state as { desde?: string } | null)?.desde === 'inversionistas';
  const [activeTab, setActiveTab] = useState('capital-privado');

  // Al presionar una pestaña, baja suavemente dejando visibles las burbujas de datos (cambian con la pestaña)
  const goToTab = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      document.getElementById('datos-portafolio')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Fetch data from database
  const { data: dbCapitalPrivado, isLoading: cpLoading } = useCapitalPrivado();
  const { data: dbCompartimentos } = useCompartimentos(dbCapitalPrivado?.id);
  const { data: dbFIC, isLoading: ficLoading } = useFIC();
  const { data: dbFICTipos } = useFICTipos(dbFIC?.id);
  const { data: dbFICHistorico } = useFICHistorico(dbFIC?.id);

  // Use database data if available, otherwise fall back to static data
  const capitalPrivadoData = dbCapitalPrivado ? {
    name: dbCapitalPrivado.name,
    administrador: dbCapitalPrivado.administrador,
    gestorProfesional: dbCapitalPrivado.gestor_profesional,
    fechaReporte: new Date(dbCapitalPrivado.fecha_reporte).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    totalFondo: Number(dbCapitalPrivado.total_fondo),
    totalDisponible: Number(dbCapitalPrivado.total_disponible),
    totalInvertido: Number(dbCapitalPrivado.total_invertido),
    porcentajeTotal: Number(dbCapitalPrivado.porcentaje_total),
  } : fondoCapitalPrivado;

  const compartimentosData = dbCompartimentos && dbCompartimentos.length > 0
    ? dbCompartimentos.map(c => ({
      id: c.id,
      name: c.name,
      totalActivos: Number(c.total_activos),
      disponible: Number(c.disponible),
      invertido: Number(c.invertido),
      porcentajeActivos: Number(c.porcentaje_activos),
      rentabilidadDia: Number(c.rentabilidad_dia),
      rentabilidad30dias: Number(c.rentabilidad_30dias),
      rentabilidad60dias: Number(c.rentabilidad_60dias),
      rentabilidad90dias: Number(c.rentabilidad_90dias),
      rentabilidad180dias: Number(c.rentabilidad_180dias),
      rentabilidad365dias: Number(c.rentabilidad_365dias),
    }))
    : fondoCapitalPrivado.compartimentos;

  const ficData = dbFIC ? {
    name: dbFIC.name,
    administrador: dbFIC.administrador,
    fechaReporte: new Date(dbFIC.fecha_reporte).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    valorUnidad: Number(dbFIC.valor_unidad),
    valorFondo: Number(dbFIC.valor_fondo),
    saldo: Number(dbFIC.valor_fondo),
    rentabilidadEA30dias: Number(dbFIC.rentabilidad_ea_30dias),
    rentabilidadEA365dias: Number(dbFIC.rentabilidad_ea_365dias),
  } : ficAlternativos180Plus;

  const ficTiposData = dbFICTipos && dbFICTipos.length > 0
    ? dbFICTipos.map(t => ({
      id: t.id,
      nombre: t.nombre,
      inversionMinimaInicial: Number(t.inversion_minima),
      comisionAdministracion: Number(t.comision_administracion),
      pactoPermanencia: t.pacto_permanencia,
      remuneracionEfectiva: Number(t.remuneracion_efectiva),
      descripcion: t.descripcion || '',
      // Find matching historical data to get 1 year EA
      rentabilidadEstimada: dbFICHistorico?.find(h =>
        (h.nombre.toLowerCase().includes(t.nombre.toLowerCase()))
      )?.ano_1_ea || (t.nombre === 'TP1' ? 12.19 : 12.69),
    }))
    : ficAlternativos180Plus.tiposParticipacion.map(t => ({
      ...t,
      rentabilidadEstimada: t.nombre === 'TP1' ? 12.19 : 12.69
    }));

  const ficHistoricoData = dbFICHistorico && dbFICHistorico.length > 0
    ? dbFICHistorico.map(h => ({
      id: h.id,
      nombre: h.nombre,
      anoCorridoEA: h.ano_corrido_ea ? Number(h.ano_corrido_ea) : null,
      diariaEA: h.diaria_ea ? Number(h.diaria_ea) : null,
      dias30EA: h.dias_30_ea ? Number(h.dias_30_ea) : null,
      dias180EA: h.dias_180_ea ? Number(h.dias_180_ea) : null,
      ano1EA: h.ano_1_ea ? Number(h.ano_1_ea) : null,
      ano2EA: h.ano_2_ea ? Number(h.ano_2_ea) : null,
      ano3EA: h.ano_3_ea ? Number(h.ano_3_ea) : null,
    }))
    : ficAlternativos180Plus.comportamientoHistorico;

  // Calculate total portfolio by summing all compartimentos' total assets
  // Total reportado del fondo (no depende de cuántos compartimentos se muestren)
  const portafolioTotal = capitalPrivadoData.totalFondo;
  // Fila de totales de la tabla: suma de los compartimentos que se muestran
  const totalVrCompartimentos = compartimentosData.reduce((acc, c) => acc + c.invertido, 0);
  const totalActivosMostrados = compartimentosData.reduce((acc, c) => acc + c.totalActivos, 0);
  const porcentajeTotalMostrado = totalActivosMostrados > 0 ? Math.round((totalVrCompartimentos / totalActivosMostrados) * 100) : 0;

  // Dynamic values based on active tab
  const isFicActive = activeTab === 'fic';
  const displayDate = isFicActive ? ficAlternativos180Plus.fechaReporte : capitalPrivadoData.fechaReporte;
  // Burbujas de datos bajo la franja superior (cambian según la pestaña activa)
  const statBubbles = isFicActive
    ? [
        { label: 'Valor Fondo FIC', value: formatCOP(ficAlternativos180Plus.saldo), icon: Users, iconBox: 'bg-primary/10', iconColor: 'text-primary' },
        { label: 'Participaciones', value: String(ficAlternativos180Plus.tiposParticipacion.length), icon: Briefcase, iconBox: 'bg-secondary/10', iconColor: 'text-secondary' },
      ]
    : [
        { label: 'Portafolio Total Gestionado', value: formatCOP(portafolioTotal), icon: Wallet, iconBox: 'bg-primary/10', iconColor: 'text-primary' },
        { label: 'Fondos de Capital Privado', value: '1', icon: ShieldCheck, iconBox: 'bg-secondary/10', iconColor: 'text-secondary' },
        { label: 'Compartimentos', value: '2', icon: Briefcase, iconBox: 'bg-accent', iconColor: 'text-accent-foreground' },
      ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Portafolio de Inversiones"
        description="Consulta el desempeño de nuestros fondos y compartimentos. Transparencia en tiempo real sobre tus inversiones con Innovafin."
      />
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="bg-gradient-to-br from-primary to-primary/80 pt-6 pb-16 md:pt-8 md:pb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container-narrow mx-auto px-4 relative">
            {vieneDeInversionistas && (
              <Link
                to="/investors"
                className="group inline-flex items-center gap-2 mb-6 lg:mb-0 lg:absolute lg:top-0 lg:left-4 px-5 py-2.5 rounded-full border-2 border-white/40 bg-white/10 text-white text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary z-10"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver a Inversionistas
              </Link>
            )}
            <div className={cn(
              "text-center transition-all duration-700",
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Portafolio de Inversiones
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                Conoce nuestros <span className="text-secondary">fondos gestionados</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Gestión profesional de activos con rentabilidades competitivas y diversificación estratégica.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Cards: burbujas como las de Inversionistas */}
        <section id="datos-portafolio" className="container-narrow mx-auto px-4 -mt-14 relative z-10 scroll-mt-24">
          <div
            ref={statsRef}
            className={cn(
              "transition-all duration-700",
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Fecha del reporte, arriba a la izquierda */}
            <div className="mb-3 flex justify-center md:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium backdrop-blur-sm">
                <Calendar className="w-3.5 h-3.5" />
                {displayDate}
              </span>
            </div>

            <div className={cn("grid gap-4", statBubbles.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {statBubbles.map(({ label, value, icon: Icon, iconBox, iconColor }) => (
                <Card key={label} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", iconBox)}>
                        <Icon className={cn("w-5 h-5", iconColor)} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-xl font-bold text-foreground">{value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section id="pestanas-portafolio" className="pt-6 pb-8 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs value={activeTab} onValueChange={goToTab} className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6">
                <TabsHint />
                <TabsList className="grid w-full grid-cols-2 gap-4 max-w-xl mx-auto md:mx-0">
                  <TabsTrigger
                    value="capital-privado"
                    className="md:text-base"
                  >
                    FCP Alternativos Plus
                  </TabsTrigger>
                  <TabsTrigger
                    value="fic"
                    className="md:text-base"
                  >
                    FIC 180 Plus
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Fondo de Capital Privado Tab */}
              <TabsContent value="capital-privado">
                {/* Informe Diario - Tabla Principal */}
                <Card className="mb-8 border border-secondary/30 overflow-hidden">
                  <div className="bg-white p-4 border-b border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Informe Diario</p>
                        <p className="text-sm font-medium text-muted-foreground">Rentabilidad / Vr. Fondo</p>
                        <p className="text-lg font-bold text-[#0F172A]">{capitalPrivadoData.name}*</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Administrador</p>
                          <p className="text-sm font-bold text-[#0F172A]">{capitalPrivadoData.administrador}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Gestor Profesional*</p>
                          <p className="text-sm font-bold text-secondary">{capitalPrivadoData.gestorProfesional}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-0">

                    {/* Tabla de compartimentos */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[600px] table-fixed">
                        {/* Anchos de columna repartidos de forma pareja */}
                        <colgroup>
                          <col className="w-[25%]" />
                          <col className="w-[8.33%]" />
                          <col className="w-[8.33%]" />
                          <col className="w-[8.34%]" />
                          <col className="w-[25%]" />
                          <col className="w-[25%]" />
                        </colgroup>
                        <thead>
                          <tr className="bg-secondary text-white">
                            <th className="text-left py-3 px-4 font-semibold">Compartimento</th>
                            <th className="text-center py-3 px-4 font-semibold" colSpan={3}>
                              <div>Rentabilidad EA</div>
                              <div className="flex justify-center gap-4 mt-1 text-xs font-normal text-white/80">
                                <span>30 días</span>
                                <span>90 días</span>
                                <span>365 días</span>
                              </div>
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">Vr. del Compartimento</th>
                            <th className="text-center py-3 px-4 font-semibold">% de los Activos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {compartimentosData.map((comp, index) => (
                            <tr key={comp.id} className={cn(
                              "border-b border-border/50 hover:bg-muted/20 transition-colors",
                              index % 2 === 0 ? 'bg-white' : 'bg-muted/10'
                            )}>
                              <td className="py-3 px-4 text-muted-foreground">Comp. {comp.name}</td>
                              <td className="py-3 px-4 text-center" colSpan={3}>
                                <div className="flex justify-center gap-4">
                                  <span className="font-bold text-secondary">{comp.rentabilidad30dias}%</span>
                                  <span className="font-bold text-secondary">{comp.rentabilidad90dias}%</span>
                                  <span className="font-bold text-secondary">{comp.rentabilidad365dias}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium text-[#0F172A]">{comp.invertido > 0 ? formatCOP(comp.invertido) : '-'}</td>
                              <td className="py-3 px-4 text-center font-bold text-[#0F172A]">{comp.porcentajeActivos}%</td>
                            </tr>
                          ))}
                          {/* Fila de Totales */}
                          <tr className="bg-muted/30 font-bold border-t-2 border-secondary/30">
                            <td className="py-3 px-4 text-[#0F172A]">Total {capitalPrivadoData.name}</td>
                            <td className="py-3 px-4 text-center text-muted-foreground" colSpan={3}>-</td>
                            <td className="py-3 px-4 text-center text-[#0F172A]">{formatCOP(totalVrCompartimentos)}</td>
                            <td className="py-3 px-4 text-center text-[#0F172A]">{porcentajeTotalMostrado}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Invertir */}
                <div className="text-center mt-6">
                  <Link to="/investors#vinculacion">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8">
                      Empezar Ahora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              {/* FIC Alternativos 180 Plus Tab */}
              <TabsContent value="fic">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#0F172A]">
                        {ficData.name}
                      </h2>
                      <p className="text-muted-foreground">
                        Fondo de Inversión Colectiva - Compare tipos de participación
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informe Diario - Datos del Fondo */}
                <Card className="mb-8 border border-[#0F172A]/20 overflow-hidden">
                  <div className="bg-[#0F172A] text-white p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Informe Diario</p>
                        <p className="text-sm font-medium">Rentabilidad / Vr. Fondo</p>
                        <p className="text-lg font-bold">{ficData.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Administrador</p>
                        <p className="text-sm font-bold">{ficData.administrador}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    {/* Fecha */}
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <p className="text-sm text-muted-foreground font-medium">
                        {ficData.fechaReporte}
                      </p>
                    </div>

                    {/* Tabla de datos */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[600px]">
                        <thead>
                          <tr className="bg-[#0F172A] text-white">
                            <th className="text-left py-3 px-4 font-semibold">Fondo</th>
                            <th className="text-left py-3 px-4 font-semibold">Saldo (pesos)</th>
                            <th className="text-left py-3 px-4 font-semibold">
                              <div>Rentabilidad EA</div>
                              <div className="flex justify-start gap-8 mt-1 text-xs font-normal text-white/80">
                                <span>30 días</span>
                                <span>365 días</span>
                              </div>
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                            <td className="py-4 px-4 font-medium text-[#0F172A]">{ficData.name}</td>
                            <td className="py-4 px-4 text-left font-bold text-[#0F172A]">{formatCOP(ficData.saldo)}</td>
                            <td className="py-4 px-4 text-left">
                              <div className="flex justify-start gap-8">
                                <span className="font-bold text-secondary">{ficData.rentabilidadEA30dias}%</span>
                                <span className="font-bold text-secondary">{ficData.rentabilidadEA365dias}%</span>
                              </div>
                            </td>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Valor Unidad, Valor Fondo, Información al */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-muted-foreground text-center">Valor unidad</p>
                    </div>
                    <div className="px-4 py-4 bg-[#0F172A] text-white flex items-center justify-between">
                      <span className="text-xl font-bold">
                        {ficData.valorUnidad.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                      </span>
                      <Wallet className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-muted-foreground text-center">Valor Fondo</p>
                    </div>
                    <div className="px-4 py-4 bg-[#0F172A] text-white flex items-center justify-between">
                      <span className="text-xl font-bold">
                        {ficData.valorFondo.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <Briefcase className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-muted-foreground text-center">Información al</p>
                    </div>
                    <div className="px-4 py-4 bg-[#0F172A] text-white flex items-center justify-between">
                      <span className="text-xl font-bold">{ficData.fechaReporte}</span>
                      <Calendar className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                </div>

                {/* Comportamiento Histórico */}
                <Card className="mb-8 border border-[#0F172A]/20 overflow-hidden">
                  <CardHeader className="bg-card border-b border-border">
                    <CardTitle className="text-xl text-[#0F172A] text-center">Comportamiento Histórico</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[1100px]">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Tipo de participación</th>
                            <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Monto mínimo<br />de inversión</th>
                            <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Año corrido<br />% E.A</th>
                            <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Diaria<br />% E.A</th>
                            <th className="text-center py-4 px-4 font-semibold text-muted-foreground">30 días<br />% E.A</th>
                            <th className="text-center py-4 px-4 font-semibold text-muted-foreground">180 días<br />% E.A</th>
                            <th className="text-center py-4 px-4 font-semibold text-[#0F172A] bg-muted/80">1º año<br />% E.A</th>
                            <th className="text-center py-4 px-4 font-semibold text-[#0F172A] bg-muted/80">2º año<br />% E.A</th>
                            <th className="text-center py-4 px-4 font-semibold text-[#0F172A] bg-muted/80">3º año<br />% E.A</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ficHistoricoData.map((item, index) => (
                            <tr key={item.id} className={cn(
                              "border-b border-border/50 hover:bg-muted/20 transition-colors",
                              index % 2 === 0 ? 'bg-white' : 'bg-muted/10'
                            )}>
                              <td className="py-4 px-4 text-muted-foreground">{item.nombre}</td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F172A] whitespace-nowrap">{montoMinimoFIC(item.nombre)}</td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F172A]">{item.anoCorridoEA}</td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F172A]">{item.diariaEA}</td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F172A]">{item.dias30EA}</td>
                              <td className="py-4 px-4 text-center font-medium text-[#0F172A]">{item.dias180EA}</td>
                              <td className="py-4 px-4 text-center font-bold text-secondary bg-secondary/5">{item.ano1EA}</td>
                              <td className="py-4 px-4 text-center font-bold text-secondary bg-secondary/5">{item.ano2EA ?? '-'}</td>
                              <td className="py-4 px-4 text-center font-bold text-secondary bg-secondary/5">{item.ano3EA ?? '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Invertir */}
                <div className="text-center mt-6">
                  <Link to="/investors#vinculacion">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-secondary/40 hover:scale-105 transition-all duration-300">
                      Me Interesa
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
