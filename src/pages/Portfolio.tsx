import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Wallet, ShieldCheck, Briefcase, Calendar, ArrowRight, Users, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  fechaReporte: 'domingo, 25 de enero de 2026',
  totalFondo: 177186627829,
  totalDisponible: 12573673214,
  totalInvertido: 164326139428,
  porcentajeTotal: 93,
  compartimentos: [
    {
      id: 'libranzas',
      name: 'Libranzas',
      totalActivos: 167844754457,
      disponible: 9230991982,
      invertido: 158305470171,
      porcentajeActivos: 94,
      rentabilidadDia: 14.19,
      rentabilidad30dias: 14.81,
      rentabilidad60dias: 14.52,
      rentabilidad90dias: 14.35,
      rentabilidad180dias: 14.10,
      rentabilidad365dias: 13.85,
      nivelRiesgo: 'Bajo',
    },
    {
      id: 'educapital1',
      name: 'Educapital1',
      totalActivos: 9153246775,
      disponible: 3152991722,
      invertido: 6020669257,
      porcentajeActivos: 66,
      rentabilidadDia: 6.07,
      rentabilidad30dias: 12.28,
      rentabilidad60dias: 11.85,
      rentabilidad90dias: 11.42,
      rentabilidad180dias: 10.95,
      rentabilidad365dias: 10.50,
      nivelRiesgo: 'Bajo',
    },
    {
      id: 'evolucion',
      name: 'Evolución',
      totalActivos: 188626597,
      disponible: 189689510,
      invertido: 0,
      porcentajeActivos: 0,
      rentabilidadDia: 8.27,
      rentabilidad30dias: 40.69,
      rentabilidad60dias: 35.20,
      rentabilidad90dias: 28.50,
      rentabilidad180dias: 22.15,
      rentabilidad365dias: 18.40,
      nivelRiesgo: 'Medio',
    },
  ],
};

// FIC Alternativos 180 Plus - Tipos de Participación
const ficAlternativos180Plus = {
  name: 'FIC Alternativos 180 Plus',
  administrador: 'AVAL Fiduciaria - Asset Management',
  fechaReporte: '26 de enero de 2026',
  valorUnidad: 14363.9,
  valorFondo: 188573057841.61,
  saldo: 188573057841.61,
  rentabilidadEA30dias: 11.88,
  rentabilidadEA365dias: 12.41,
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
      anoCorridoEA: 11.96,
      diariaEA: 9.67,
      dias30EA: 11.52,
      dias180EA: 11.7,
      ano1EA: 12.19,
      ano2EA: 12.81,
      ano3EA: 11.55,
    },
    {
      id: 'tp2',
      nombre: 'Alternativo 180 plus - tp2',
      anoCorridoEA: 12.52,
      diariaEA: 10.22,
      dias30EA: 12.08,
      dias180EA: 12.13,
      ano1EA: 12.69,
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

const Portfolio = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="bg-[#0F172A] py-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="container-narrow mx-auto px-4 relative">
            <div className={cn(
              "text-center transition-all duration-700",
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Portafolio de Inversiones
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Inversiones <span className="text-secondary">Inteligentes</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Gestión profesional de activos con rentabilidades competitivas y diversificación estratégica.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="container-narrow mx-auto px-4 -mt-8 relative z-10">
          <div 
            ref={statsRef}
            className={cn(
              "transition-all duration-700",
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Card className="bg-card shadow-xl border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Portafolio Total Administrado</p>
                      <p className="text-3xl md:text-4xl font-bold text-[#0F172A]">{formatCOP(portafolioTotalAdministrado)}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-muted text-muted-foreground hidden md:flex">
                    <Calendar className="w-4 h-4 mr-2" />
                    {ficAlternativos180Plus.fechaReporte}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <p className="text-sm text-muted-foreground">Rent. EA 30 días</p>
                    </div>
                    <p className="text-2xl font-bold text-secondary">{ficAlternativos180Plus.rentabilidadEA30dias}%</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <p className="text-sm text-muted-foreground">Rent. EA 365 días</p>
                    </div>
                    <p className="text-2xl font-bold text-secondary">{ficAlternativos180Plus.rentabilidadEA365dias}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Compartimentos</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground">3 Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs defaultValue="capital-privado" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-muted/50 rounded-xl p-1 max-w-xl mx-auto">
                <TabsTrigger 
                  value="capital-privado" 
                  className="rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-[#0F172A]"
                >
                  Capital Privado
                </TabsTrigger>
                <TabsTrigger 
                  value="fic"
                  className="rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-[#0F172A]"
                >
                  FIC 180 Plus
                </TabsTrigger>
              </TabsList>

              {/* Fondo de Capital Privado Tab */}
              <TabsContent value="capital-privado">
                {/* Informe Diario - Tabla Principal */}
                <Card className="mb-8 border border-secondary/30 overflow-hidden">
                  <div className="bg-white p-4 border-b border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Informe Diario</p>
                        <p className="text-sm font-medium text-muted-foreground">Rentabilidad / Vr. Fondo</p>
                        <p className="text-lg font-bold text-[#0F172A]">{fondoCapitalPrivado.name}*</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Administrador</p>
                          <p className="text-sm font-bold text-[#0F172A]">{fondoCapitalPrivado.administrador}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Gestor Profesional*</p>
                          <p className="text-sm font-bold text-secondary">{fondoCapitalPrivado.gestorProfesional}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-0">
                    {/* Fecha */}
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <p className="text-sm text-muted-foreground font-medium">
                        {fondoCapitalPrivado.fechaReporte}
                      </p>
                    </div>
                    
                    {/* Tabla de compartimentos */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-secondary text-white">
                            <th className="text-left py-3 px-4 font-semibold">Compartimento</th>
                            <th className="text-right py-3 px-4 font-semibold">Total Activos</th>
                            <th className="text-center py-3 px-4 font-semibold" colSpan={2}>
                              <div>Rentabilidad EA</div>
                              <div className="flex justify-center gap-8 mt-1 text-xs font-normal text-white/80">
                                <span>Día</span>
                                <span>30 días</span>
                              </div>
                            </th>
                            <th className="text-right py-3 px-4 font-semibold">* Disponible</th>
                            <th className="text-right py-3 px-4 font-semibold">Invertido</th>
                            <th className="text-center py-3 px-4 font-semibold">% de los Activos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fondoCapitalPrivado.compartimentos.map((comp, index) => (
                            <tr key={comp.id} className={cn(
                              "border-b border-border/50 hover:bg-muted/20 transition-colors",
                              index % 2 === 0 ? 'bg-white' : 'bg-muted/10'
                            )}>
                              <td className="py-3 px-4 text-muted-foreground">Comp. {comp.name}</td>
                              <td className="py-3 px-4 text-right font-medium text-[#0F172A]">{formatCOP(comp.totalActivos)}</td>
                              <td className="py-3 px-4 text-center" colSpan={2}>
                                <div className="flex justify-center gap-8">
                                  <span className="font-bold text-secondary">{comp.rentabilidadDia}%</span>
                                  <span className="font-bold text-secondary">{comp.rentabilidad30dias}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right font-medium text-[#0F172A]">{formatCOP(comp.disponible)}</td>
                              <td className="py-3 px-4 text-right font-medium text-[#0F172A]">{comp.invertido > 0 ? formatCOP(comp.invertido) : '-'}</td>
                              <td className="py-3 px-4 text-center font-bold text-[#0F172A]">{comp.porcentajeActivos}%</td>
                            </tr>
                          ))}
                          {/* Fila de Totales */}
                          <tr className="bg-muted/30 font-bold border-t-2 border-secondary/30">
                            <td className="py-3 px-4 text-[#0F172A]">Total {fondoCapitalPrivado.name}</td>
                            <td className="py-3 px-4 text-right text-[#0F172A]">{formatCOP(fondoCapitalPrivado.totalFondo)}</td>
                            <td className="py-3 px-4 text-center text-muted-foreground" colSpan={2}>-</td>
                            <td className="py-3 px-4 text-right text-[#0F172A]">{formatCOP(fondoCapitalPrivado.totalDisponible)}</td>
                            <td className="py-3 px-4 text-right text-[#0F172A]">{formatCOP(fondoCapitalPrivado.totalInvertido)}</td>
                            <td className="py-3 px-4 text-center text-[#0F172A]">{fondoCapitalPrivado.porcentajeTotal}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Nota al pie */}
                    <div className="px-4 py-3 bg-muted/20 border-t border-border">
                      <p className="text-xs text-muted-foreground">* (Bancos + Inversiones a la vista)</p>
                      <p className="text-xs text-muted-foreground mt-1">Esperamos que esta información sea de mucha utilidad.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Compartimentos Grid Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Detalle por Compartimento</h3>
                  <p className="text-muted-foreground">Información detallada de rentabilidad por período</p>
                </div>

                {/* Compartimentos Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {fondoCapitalPrivado.compartimentos.map((comp) => (
                    <Card 
                      key={comp.id} 
                      className="border border-border/50 hover:border-[#0F172A]/30 hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl text-[#0F172A]">{comp.name}</CardTitle>
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            comp.id === 'libranzas' ? 'bg-[#0F172A]' : 
                            comp.id === 'educapital1' ? 'bg-secondary' : 'bg-amber-500'
                          )} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Total Activos */}
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            Total de Activos
                          </p>
                          <p className="text-xl font-bold text-[#0F172A]">{formatCOP(comp.totalActivos)}</p>
                        </div>

                        {/* Rentabilidad EA - Todos los períodos */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Rentabilidad EA por Período
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-secondary/5 rounded-lg p-2 text-center">
                              <p className="text-[10px] text-muted-foreground">Día</p>
                              <p className="text-sm font-bold text-secondary">{comp.rentabilidadDia}%</p>
                            </div>
                            <div className="bg-secondary/10 rounded-lg p-2 text-center">
                              <p className="text-[10px] text-muted-foreground">30 días</p>
                              <p className="text-sm font-bold text-secondary">{comp.rentabilidad30dias}%</p>
                            </div>
                            <div className="bg-secondary/5 rounded-lg p-2 text-center">
                              <p className="text-[10px] text-muted-foreground">60 días</p>
                              <p className="text-sm font-bold text-secondary">{comp.rentabilidad60dias}%</p>
                            </div>
                            <div className="bg-secondary/10 rounded-lg p-2 text-center">
                              <p className="text-[10px] text-muted-foreground">90 días</p>
                              <p className="text-sm font-bold text-secondary">{comp.rentabilidad90dias}%</p>
                            </div>
                            <div className="bg-secondary/5 rounded-lg p-2 text-center">
                              <p className="text-[10px] text-muted-foreground">180 días</p>
                              <p className="text-sm font-bold text-secondary">{comp.rentabilidad180dias}%</p>
                            </div>
                            <div className="bg-secondary/15 rounded-lg p-2 text-center">
                              <p className="text-[10px] text-muted-foreground">365 días</p>
                              <p className="text-sm font-bold text-secondary">{comp.rentabilidad365dias}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Distribución */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Saldo Disponible</span>
                            <span className="font-medium text-foreground">{formatCOP(comp.disponible)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Saldo Invertido</span>
                            <span className="font-medium text-foreground">{comp.invertido > 0 ? formatCOP(comp.invertido) : '-'}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-muted-foreground">% de Activos Invertidos</span>
                            <span className="text-sm font-bold text-[#0F172A]">{comp.porcentajeActivos}%</span>
                          </div>
                          <Progress 
                            value={comp.porcentajeActivos}
                            className="h-2 bg-muted"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA Invertir */}
                <div className="text-center mt-8">
                  <Link to="/investors#vinculacion">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8">
                      Quiero Invertir
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
                        {ficAlternativos180Plus.name}
                      </h2>
                      <p className="text-muted-foreground">
                        Fondo de Inversión Colectiva - Compare tipos de participación
                      </p>
                    </div>
                  </div>
                </div>

                {/* Valor Unidad, Valor Fondo, Información al */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-muted-foreground text-center">Valor unidad</p>
                    </div>
                    <div className="px-4 py-4 bg-[#0F172A] text-white flex items-center justify-between">
                      <span className="text-xl font-bold">
                        {ficAlternativos180Plus.valorUnidad.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
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
                        {ficAlternativos180Plus.valorFondo.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <Briefcase className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-muted-foreground text-center">Información al</p>
                    </div>
                    <div className="px-4 py-4 bg-[#0F172A] text-white flex items-center justify-between">
                      <span className="text-xl font-bold">{ficAlternativos180Plus.fechaReporte}</span>
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
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Tipo de participación</th>
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
                          {ficAlternativos180Plus.comportamientoHistorico.map((item, index) => (
                            <tr key={item.id} className={cn(
                              "border-b border-border/50 hover:bg-muted/20 transition-colors",
                              index % 2 === 0 ? 'bg-white' : 'bg-muted/10'
                            )}>
                              <td className="py-4 px-4 text-muted-foreground">{item.nombre}</td>
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

                {/* Tipos de Participación Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Tipos de Participación</h3>
                  <p className="text-muted-foreground">Seleccione el tipo de participación que mejor se adapte a su perfil de inversión</p>
                </div>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {ficAlternativos180Plus.tiposParticipacion.map((tipo, index) => (
                    <Card 
                      key={tipo.id}
                      className={cn(
                        "relative overflow-hidden border-2 transition-all duration-300",
                        index === 1 
                          ? "border-secondary bg-gradient-to-br from-secondary/5 to-secondary/10" 
                          : "border-border hover:border-[#0F172A]/30"
                      )}
                    >
                      {index === 1 && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-secondary text-white">
                            Recomendado
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl text-[#0F172A]">
                          Tipo {tipo.nombre}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{tipo.descripcion}</p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Inversión Mínima */}
                        <div className="p-4 bg-muted/50 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Wallet className="w-4 h-4 text-[#0F172A]" />
                            <p className="text-sm text-muted-foreground">Inversión Inicial Mínima</p>
                          </div>
                          <p className="text-2xl font-bold text-[#0F172A]">
                            {formatCOP(tipo.inversionMinimaInicial)}
                          </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-card border border-border rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Percent className="w-4 h-4 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">Comisión Admin.</p>
                            </div>
                            <p className="text-xl font-bold text-[#0F172A]">{tipo.comisionAdministracion}%</p>
                          </div>
                          <div className="p-4 bg-card border border-border rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">Permanencia</p>
                            </div>
                            <p className="text-xl font-bold text-[#0F172A]">{tipo.pactoPermanencia} días</p>
                          </div>
                        </div>

                        {/* Remuneración */}
                        <div className="p-4 bg-secondary/10 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-secondary" />
                            <p className="text-sm text-muted-foreground">Remuneración Efectiva Cobrada</p>
                          </div>
                          <p className="text-2xl font-bold text-secondary">{tipo.remuneracionEfectiva}% E.A.</p>
                        </div>

                        <Link to="/investors#vinculacion">
                          <Button 
                            className={cn(
                              "w-full",
                              index === 1 
                                ? "bg-secondary hover:bg-secondary/90 text-white" 
                                : "bg-[#0F172A] hover:bg-[#0F172A]/90 text-white"
                            )}
                          >
                            Invertir en {tipo.nombre}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Comparison Table */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0F172A]">Comparativa Detallada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left py-4 px-4 font-semibold text-[#0F172A] rounded-tl-lg">Característica</th>
                            <th className="text-center py-4 px-4 font-semibold text-[#0F172A]">TP1</th>
                            <th className="text-center py-4 px-4 font-semibold text-secondary rounded-tr-lg">TP2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-4 px-4 text-muted-foreground">Inversión Inicial Mínima</td>
                            <td className="py-4 px-4 text-center font-medium">$10.000.000</td>
                            <td className="py-4 px-4 text-center font-medium text-secondary">$1.000.000.000</td>
                          </tr>
                          <tr className="border-b border-border/50 bg-muted/20">
                            <td className="py-4 px-4 text-muted-foreground">Comisión de Administración</td>
                            <td className="py-4 px-4 text-center font-medium">2.25%</td>
                            <td className="py-4 px-4 text-center font-medium text-secondary">1.75%</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-4 px-4 text-muted-foreground">Pacto de Permanencia</td>
                            <td className="py-4 px-4 text-center font-medium">180 días</td>
                            <td className="py-4 px-4 text-center font-medium">180 días</td>
                          </tr>
                          <tr className="bg-muted/20">
                            <td className="py-4 px-4 text-muted-foreground rounded-bl-lg">Remuneración Efectiva</td>
                            <td className="py-4 px-4 text-center font-medium">2.25% E.A.</td>
                            <td className="py-4 px-4 text-center font-bold text-secondary rounded-br-lg">1.75% E.A.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Invertir */}
                <div className="text-center mt-8">
                  <Link to="/investors#vinculacion">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8">
                      Quiero Invertir
                      <ArrowRight className="w-5 h-5 ml-2" />
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
