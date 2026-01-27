import { useState } from 'react';
import { ShoppingCart, AlertCircle, DollarSign, CheckCircle, TrendingUp, Shield, Calendar, Briefcase, ChevronRight, Wallet, PiggyBank, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Formato para números grandes en COP
const formatCOP = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Fondo Alternativos Plus con sus compartimentos reales
const fondoAlternativosPlus = {
  id: 'alternativos-plus',
  name: 'FCP Alternativos Plus',
  description: 'Fondo de Capital Privado especializado en activos alternativos con diversificación en libranzas, educación y evolución empresarial',
  compartimentos: [
    {
      id: 'libranzas',
      name: 'Libranzas',
      totalActivos: 167884754457,
      disponible: 9230991982,
      invertido: 158305370171,
      porcentajeActivos: 94,
      rentabilidad: {
        dia: 14.19,
        dias30: 14.81,
        dias60: null,
        dias90: null,
        dias180: null,
        dias365: null,
      },
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
      rentabilidad: {
        dia: 6.07,
        dias30: 12.28,
        dias60: null,
        dias90: null,
        dias180: null,
        dias365: null,
      },
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
      rentabilidad: {
        dia: 8.27,
        dias30: 40.69,
        dias60: null,
        dias90: null,
        dias180: null,
        dias365: null,
      },
      nivelRiesgo: 'Medio',
      nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
    },
  ],
};

// Calcular totales del fondo
const totalActivosFondo = fondoAlternativosPlus.compartimentos.reduce((acc, comp) => acc + comp.totalActivos, 0);
const totalDisponibleFondo = fondoAlternativosPlus.compartimentos.reduce((acc, comp) => acc + comp.disponible, 0);
const totalInvertidoFondo = fondoAlternativosPlus.compartimentos.reduce((acc, comp) => acc + comp.invertido, 0);

const procesoSteps = [
  {
    icon: ShoppingCart,
    title: 'Selección de Compartimento',
    description: 'Elija el compartimento que mejor se adapte a su perfil',
  },
  {
    icon: AlertCircle,
    title: 'Due Diligence',
    description: 'Análisis detallado del compartimento seleccionado',
  },
  {
    icon: DollarSign,
    title: 'Negociación',
    description: 'Definición de términos y condiciones',
  },
  {
    icon: CheckCircle,
    title: 'Cierre',
    description: 'Firma de documentos y transferencia',
  },
];

const desempenoCards = [
  {
    icon: TrendingUp,
    title: 'Rentabilidad Consistente',
    description: 'Rendimientos competitivos con tasas EA superiores al mercado tradicional',
  },
  {
    icon: Shield,
    title: 'Gestión de Riesgos',
    description: 'Diversificación óptima entre los tres compartimentos del fondo',
  },
  {
    icon: Calendar,
    title: 'Reportes Periódicos',
    description: 'Información detallada del desempeño de cada compartimento',
  },
];

const beneficios = [
  'Diversificación automática entre tres compartimentos',
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
    retornoEsperado: '14%',
  });

  const activeCompartimento = fondoAlternativosPlus.compartimentos.find(c => c.id === selectedCompartimento);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Portafolio Total InnovaFin
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fondo de Capital Privado Alternativos Plus con compartimentos especializados en Libranzas, Educapital y Evolución
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs defaultValue="fondos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-muted/30 rounded-xl p-1">
              <TabsTrigger 
                value="fondos" 
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
              >
                FCP Alternativos Plus
              </TabsTrigger>
              <TabsTrigger 
                value="desempeno"
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
              >
                Desempeño
              </TabsTrigger>
              <TabsTrigger 
                value="invertir"
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
              >
                Invertir
              </TabsTrigger>
            </TabsList>

            {/* Fondos Tab */}
            <TabsContent value="fondos">
              {/* Resumen General del Fondo */}
              <Card className="mb-8 border-l-4 border-l-primary bg-gradient-to-r from-muted/30 to-background">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary">
                        {fondoAlternativosPlus.name}
                      </h2>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        Fondo Activo
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {fondoAlternativosPlus.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Total Activos</p>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{formatCOP(totalActivosFondo)}</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="w-4 h-4 text-secondary" />
                        <p className="text-sm text-muted-foreground">Disponible</p>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-secondary">{formatCOP(totalDisponibleFondo)}</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <PiggyBank className="w-4 h-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Invertido</p>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{formatCOP(totalInvertidoFondo)}</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-accent" />
                        <p className="text-sm text-muted-foreground">Compartimentos</p>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compartimentos Cards */}
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Compartimentos del Fondo
              </h3>
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {fondoAlternativosPlus.compartimentos.map((comp) => (
                  <Card 
                    key={comp.id} 
                    className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                      selectedCompartimento === comp.id 
                        ? 'border-primary shadow-lg' 
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedCompartimento(selectedCompartimento === comp.id ? null : comp.id)}
                  >
                    <CardContent className="p-6">
                      {/* Header del Compartimento */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${
                            comp.id === 'libranzas' ? 'bg-primary' : 
                            comp.id === 'educapital1' ? 'bg-secondary' : 'bg-accent'
                          }`} />
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{comp.name}</h3>
                            <Badge className={comp.nivelRiesgoColor + ' mt-1'}>
                              Riesgo {comp.nivelRiesgo}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${selectedCompartimento === comp.id ? 'rotate-90' : ''}`} />
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
                            <p className="text-lg font-bold text-primary">{comp.rentabilidad.dia}%</p>
                          </div>
                          <div className="bg-secondary/5 rounded-lg p-2 text-center">
                            <p className="text-xs text-muted-foreground">30 días</p>
                            <p className="text-lg font-bold text-secondary">{comp.rentabilidad.dias30}%</p>
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
                            className={`h-full rounded-full ${
                              comp.id === 'libranzas' ? 'bg-primary' : 
                              comp.id === 'educapital1' ? 'bg-secondary' : 'bg-accent'
                            }`}
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

                      {/* Tabla de Rentabilidades */}
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
                                <td className="py-3 px-4 text-right font-bold text-primary">{activeCompartimento.rentabilidad.dia}%</td>
                              </tr>
                              <tr className="border-b border-border/30">
                                <td className="py-3 px-4 text-muted-foreground">30 días</td>
                                <td className="py-3 px-4 text-right font-bold text-secondary">{activeCompartimento.rentabilidad.dias30}%</td>
                              </tr>
                              <tr className="border-b border-border/30">
                                <td className="py-3 px-4 text-muted-foreground">60 días</td>
                                <td className="py-3 px-4 text-right text-muted-foreground">{activeCompartimento.rentabilidad.dias60 ?? '—'}</td>
                              </tr>
                              <tr className="border-b border-border/30">
                                <td className="py-3 px-4 text-muted-foreground">90 días</td>
                                <td className="py-3 px-4 text-right text-muted-foreground">{activeCompartimento.rentabilidad.dias90 ?? '—'}</td>
                              </tr>
                              <tr className="border-b border-border/30">
                                <td className="py-3 px-4 text-muted-foreground">180 días</td>
                                <td className="py-3 px-4 text-right text-muted-foreground">{activeCompartimento.rentabilidad.dias180 ?? '—'}</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 text-muted-foreground">365 días</td>
                                <td className="py-3 px-4 text-right text-muted-foreground">{activeCompartimento.rentabilidad.dias365 ?? '—'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resumen Total del FCP */}
              <Card className="mt-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Total FCP Alternativos Plus
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Total Activos</p>
                      <p className="text-2xl md:text-3xl font-bold text-primary">{formatCOP(totalActivosFondo)}</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Total Disponible</p>
                      <p className="text-2xl md:text-3xl font-bold text-secondary">{formatCOP(totalDisponibleFondo)}</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Total Invertido</p>
                      <p className="text-2xl md:text-3xl font-bold text-foreground">{formatCOP(totalInvertidoFondo)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Desempeño Tab */}
            <TabsContent value="desempeno">
              <Card className="mb-8 border-border/50">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-8">
                    Proceso de Inversión
                  </h2>
                  
                  {/* Proceso Steps */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {procesoSteps.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Desempeño Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {desempenoCards.map((card, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <card.icon className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparativa de Compartimentos */}
              <Card className="border-border/50">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-primary mb-6">Comparativa de Compartimentos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Compartimento</th>
                          <th className="text-right py-3 px-4 font-semibold text-foreground">Total Activos</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Rent. EA Día</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Rent. 30 días</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">% Invertido</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Riesgo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fondoAlternativosPlus.compartimentos.map((comp, index) => (
                          <tr key={comp.id} className={index < fondoAlternativosPlus.compartimentos.length - 1 ? 'border-b border-border/50' : ''}>
                            <td className="py-4 px-4 font-medium text-foreground">{comp.name}</td>
                            <td className="py-4 px-4 text-right font-semibold">{formatCOP(comp.totalActivos)}</td>
                            <td className="py-4 px-4 text-center font-semibold text-primary">{comp.rentabilidad.dia}%</td>
                            <td className="py-4 px-4 text-center font-semibold text-secondary">{comp.rentabilidad.dias30}%</td>
                            <td className="py-4 px-4 text-center">{comp.porcentajeActivos}%</td>
                            <td className="py-4 px-4 text-center">
                              <Badge className={comp.nivelRiesgoColor}>
                                {comp.nivelRiesgo}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
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
                          {fondoAlternativosPlus.compartimentos.map((comp) => (
                            <SelectItem key={comp.id} value={comp.id}>
                              {comp.name} - Rent. {comp.rentabilidad.dia}% EA
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
                      Beneficios del FCP Alternativos Plus
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

      <Footer />
    </div>
  );
};

export default Portfolio;
