import { useState } from 'react';
import { CheckCircle, TrendingUp, Briefcase, Wallet, PiggyBank, BarChart3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

// FIC Alternativos 180 Plus - Datos según la imagen del usuario
const ficAlternativos180Plus = {
  id: 'fic-alternativos-180-plus',
  name: 'FIC Alternativos 180 Plus',
  administrador: 'AVAL Fiduciaria - Asset Management',
  fechaReporte: 'domingo, 25 de enero de 2026',
  saldo: 186988400000,
  rentabilidadEA30dias: 11.88,
  rentabilidadEA365dias: 12.41,
  ultimoLlamado: 'NA',
  descripcion: 'Fondo de Inversión Colectiva especializado en activos alternativos con rentabilidades competitivas y gestión profesional.',
  compartimentos: [
    {
      id: 'libranzas',
      name: 'Libranzas',
      totalActivos: 167884754457,
      disponible: 9230991982,
      invertido: 158305370171,
      porcentajeActivos: 94,
      rentabilidadDia: 14.19,
      rentabilidad30dias: 14.81,
      nivelRiesgo: 'Bajo',
      nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'educapital1',
      name: 'Educapital 1',
      totalActivos: 9153246775,
      disponible: 3152001722,
      invertido: 6020669257,
      porcentajeActivos: 66,
      rentabilidadDia: 6.07,
      rentabilidad30dias: 12.28,
      nivelRiesgo: 'Bajo',
      nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
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
      nivelRiesgo: 'Medio',
      nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
    },
  ],
};

// Calcular totales de compartimentos
const totalActivosCompartimentos = ficAlternativos180Plus.compartimentos.reduce((acc, comp) => acc + comp.totalActivos, 0);
const totalDisponibleCompartimentos = ficAlternativos180Plus.compartimentos.reduce((acc, comp) => acc + comp.disponible, 0);
const totalInvertidoCompartimentos = ficAlternativos180Plus.compartimentos.reduce((acc, comp) => acc + comp.invertido, 0);

const beneficios = [
  'Diversificación automática entre compartimentos',
  'Gestión profesional del portafolio',
  'Liquidez según términos del fondo',
  'Reportes periódicos de desempeño',
];

const Portfolio = () => {
  const [selectedCompartimento, setSelectedCompartimento] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    compartimento: '',
    montoInversion: '$100,000,000',
    terminosPago: '',
    retornoEsperado: '12%',
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const activeCompartimento = ficAlternativos180Plus.compartimentos.find(c => c.id === selectedCompartimento);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="bg-gradient-to-br from-primary to-primary/80 py-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="container-narrow mx-auto px-4 relative">
            <div className={cn(
              "text-center transition-all duration-700",
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Portafolio InnovaFin
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {ficAlternativos180Plus.name}
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-4">
                {ficAlternativos180Plus.descripcion}
              </p>
              <p className="text-white/60 text-sm">
                Administrador: {ficAlternativos180Plus.administrador}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Cards - Informe Diario */}
        <section className="container-narrow mx-auto px-4 -mt-8 relative z-10">
          <div 
            ref={statsRef}
            className={cn(
              "transition-all duration-700",
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Fecha del Informe */}
            <div className="text-center mb-4">
              <Badge variant="outline" className="bg-white text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Informe Diario - {ficAlternativos180Plus.fechaReporte}
              </Badge>
            </div>

            {/* Main Stats Card */}
            <Card className="bg-white shadow-xl border-0 mb-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Saldo (Pesos)</p>
                    <p className="text-xl md:text-2xl font-bold text-primary">{formatCOP(ficAlternativos180Plus.saldo)}</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/5 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Rentabilidad EA 30 días</p>
                    <p className="text-xl md:text-2xl font-bold text-secondary">{ficAlternativos180Plus.rentabilidadEA30dias}%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Rentabilidad EA 365 días</p>
                    <p className="text-xl md:text-2xl font-bold text-green-600">{ficAlternativos180Plus.rentabilidadEA365dias}%</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Último Llamado</p>
                    <p className="text-xl md:text-2xl font-bold text-muted-foreground">{ficAlternativos180Plus.ultimoLlamado}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs defaultValue="fondos" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-muted/30 rounded-xl p-1 max-w-md mx-auto">
                <TabsTrigger 
                  value="fondos" 
                  className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
                >
                  Compartimentos
                </TabsTrigger>
                <TabsTrigger 
                  value="invertir"
                  className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
                >
                  Invertir
                </TabsTrigger>
              </TabsList>

              {/* Compartimentos Tab */}
              <TabsContent value="fondos">
                {/* Resumen de Compartimentos */}
                <Card className="mb-8 border-l-4 border-l-primary bg-gradient-to-r from-muted/30 to-background">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-primary">
                          Compartimentos del Fondo
                        </h2>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          3 Compartimentos Activos
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">Total Activos</p>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-foreground">{formatCOP(totalActivosCompartimentos)}</p>
                      </div>
                      <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Wallet className="w-4 h-4 text-secondary" />
                          <p className="text-sm text-muted-foreground">Disponible</p>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-secondary">{formatCOP(totalDisponibleCompartimentos)}</p>
                      </div>
                      <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <PiggyBank className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">Invertido</p>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-foreground">{formatCOP(totalInvertidoCompartimentos)}</p>
                      </div>
                      <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-accent" />
                          <p className="text-sm text-muted-foreground">Compartimentos</p>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-foreground">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compartimentos Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  {ficAlternativos180Plus.compartimentos.map((comp) => (
                    <Card 
                      key={comp.id} 
                      className={cn(
                        "border-2 transition-all duration-300 cursor-pointer hover:shadow-xl",
                        selectedCompartimento === comp.id 
                          ? 'border-primary shadow-lg' 
                          : 'border-border/50 hover:border-primary/50'
                      )}
                      onClick={() => setSelectedCompartimento(selectedCompartimento === comp.id ? null : comp.id)}
                    >
                      <CardContent className="p-6">
                        {/* Header del Compartimento */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-4 h-4 rounded-full",
                              comp.id === 'libranzas' ? 'bg-primary' : 
                              comp.id === 'educapital1' ? 'bg-secondary' : 'bg-accent'
                            )} />
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{comp.name}</h3>
                              <Badge className={comp.nivelRiesgoColor + ' mt-1'}>
                                Riesgo {comp.nivelRiesgo}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Total de Activos */}
                        <div className="bg-muted/30 rounded-xl p-4 mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Total de Activos</p>
                          <p className="text-2xl font-bold text-foreground">{formatCOP(comp.totalActivos)}</p>
                        </div>

                        {/* Rentabilidad EA */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Rentabilidad EA</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-primary/5 rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Día</p>
                              <p className="text-lg font-bold text-primary">{comp.rentabilidadDia}%</p>
                            </div>
                            <div className="bg-secondary/5 rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">30 días</p>
                              <p className="text-lg font-bold text-secondary">{comp.rentabilidad30dias}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Distribución */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Disponible</span>
                            <span className="font-semibold text-foreground">{formatCOP(comp.disponible)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Invertido</span>
                            <span className="font-semibold text-foreground">{formatCOP(comp.invertido)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-2 border-t border-border">
                            <span className="text-muted-foreground">% de Activos Invertido</span>
                            <Badge variant="outline" className="font-bold">{comp.porcentajeActivos}%</Badge>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                comp.id === 'libranzas' ? 'bg-primary' : 
                                comp.id === 'educapital1' ? 'bg-secondary' : 'bg-accent'
                              )}
                              style={{ width: `${comp.porcentajeActivos}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detalle del Compartimento Seleccionado */}
                {activeCompartimento && (
                  <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-primary">
                          Detalle: {activeCompartimento.name}
                        </h3>
                        <Button variant="ghost" onClick={() => setSelectedCompartimento(null)}>
                          Cerrar
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Información General */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground">Información General</h4>
                          <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total de Activos</span>
                              <span className="font-bold text-foreground">{formatCOP(activeCompartimento.totalActivos)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Disponible</span>
                              <span className="font-semibold text-secondary">{formatCOP(activeCompartimento.disponible)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Invertido</span>
                              <span className="font-semibold text-foreground">{formatCOP(activeCompartimento.invertido)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-border">
                              <span className="text-muted-foreground">% de Activos Invertido</span>
                              <Badge className={activeCompartimento.nivelRiesgoColor}>
                                {activeCompartimento.porcentajeActivos}%
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Rentabilidades */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground">Rentabilidad EA por Período</h4>
                          <div className="bg-muted/30 rounded-xl overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="text-left py-3 px-4 font-semibold text-foreground">Período</th>
                                  <th className="text-right py-3 px-4 font-semibold text-foreground">Rentabilidad EA</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-border/30">
                                  <td className="py-3 px-4 text-muted-foreground">Día</td>
                                  <td className="py-3 px-4 text-right font-bold text-primary">{activeCompartimento.rentabilidadDia}%</td>
                                </tr>
                                <tr>
                                  <td className="py-3 px-4 text-muted-foreground">30 días</td>
                                  <td className="py-3 px-4 text-right font-bold text-secondary">{activeCompartimento.rentabilidad30dias}%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Invertir Tab */}
              <TabsContent value="invertir">
                <Card className="border-border/50">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-primary mb-8">
                      Solicitud de Inversión
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <Label htmlFor="compartimento">Compartimento</Label>
                        <Select
                          value={formData.compartimento}
                          onValueChange={(value) => setFormData({...formData, compartimento: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleccione un compartimento" />
                          </SelectTrigger>
                          <SelectContent>
                            {ficAlternativos180Plus.compartimentos.map((comp) => (
                              <SelectItem key={comp.id} value={comp.id}>
                                {comp.name} - Rent. {comp.rentabilidadDia}% EA
                              </SelectItem>
                            ))}
                            <SelectItem value="todos">Todos los compartimentos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="montoInversion">Monto de Inversión</Label>
                        <Input
                          id="montoInversion"
                          value={formData.montoInversion}
                          onChange={(e) => setFormData({...formData, montoInversion: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="terminosPago">Términos de Pago</Label>
                        <Select
                          value={formData.terminosPago}
                          onValueChange={(value) => setFormData({...formData, terminosPago: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleccione términos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mensual">Mensual</SelectItem>
                            <SelectItem value="trimestral">Trimestral</SelectItem>
                            <SelectItem value="semestral">Semestral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="retornoEsperado">Retorno Esperado</Label>
                        <Input
                          id="retornoEsperado"
                          value={formData.retornoEsperado}
                          onChange={(e) => setFormData({...formData, retornoEsperado: e.target.value})}
                          className="mt-1"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Beneficios */}
                    <div className="bg-muted/30 rounded-xl p-6 mb-8">
                      <h3 className="font-semibold text-foreground mb-4">
                        Beneficios del FIC Alternativos 180 Plus
                      </h3>
                      <ul className="space-y-2">
                        {beneficios.map((beneficio, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            {beneficio}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Enviar Solicitud de Inversión
                    </Button>
                  </CardContent>
                </Card>
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