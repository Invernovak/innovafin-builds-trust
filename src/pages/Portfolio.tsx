import { useState } from 'react';
import { ShoppingCart, AlertCircle, DollarSign, CheckCircle, TrendingUp, Shield, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Definición de los 3 fondos de capital
const fondosCapital = [
  {
    id: 'plus1',
    name: 'InnovaFin Plus 1',
    description: 'Fondo enfocado en cartera de libranzas con perfil conservador',
    valorTotal: '$25.8M',
    rendimientoPromedio: '12.5%',
    inversionistas: 128,
    compartimientos: [
      {
        id: 'libranzas',
        name: 'Libranzas',
        valorTotal: '$12.5M',
        numeroCreditos: '1,850',
        tasaPromedio: '13%',
        plazoPromedio: '48 meses',
        desempeno: '+11.2% YTD',
        nivelRiesgo: 'Bajo',
        nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
      },
      {
        id: 'factoring',
        name: 'Factoring',
        valorTotal: '$8.3M',
        numeroCreditos: '95',
        tasaPromedio: '16%',
        plazoPromedio: '60 días',
        desempeno: '+13.5% YTD',
        nivelRiesgo: 'Bajo',
        nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
      },
      {
        id: 'consumo',
        name: 'Cartera de Consumo',
        valorTotal: '$5.0M',
        numeroCreditos: '920',
        tasaPromedio: '18%',
        plazoPromedio: '24 meses',
        desempeno: '+14.8% YTD',
        nivelRiesgo: 'Medio',
        nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
      },
    ],
  },
  {
    id: 'plus2',
    name: 'InnovaFin Plus 2',
    description: 'Fondo balanceado con diversificación en factoring y consumo',
    valorTotal: '$38.2M',
    rendimientoPromedio: '15.8%',
    inversionistas: 186,
    compartimientos: [
      {
        id: 'libranzas',
        name: 'Libranzas',
        valorTotal: '$10.2M',
        numeroCreditos: '1,520',
        tasaPromedio: '14%',
        plazoPromedio: '36 meses',
        desempeno: '+12.8% YTD',
        nivelRiesgo: 'Bajo',
        nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
      },
      {
        id: 'factoring',
        name: 'Factoring',
        valorTotal: '$18.5M',
        numeroCreditos: '145',
        tasaPromedio: '19%',
        plazoPromedio: '90 días',
        desempeno: '+17.2% YTD',
        nivelRiesgo: 'Medio',
        nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
      },
      {
        id: 'consumo',
        name: 'Cartera de Consumo',
        valorTotal: '$9.5M',
        numeroCreditos: '1,680',
        tasaPromedio: '22%',
        plazoPromedio: '36 meses',
        desempeno: '+18.5% YTD',
        nivelRiesgo: 'Medio',
        nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
      },
    ],
  },
  {
    id: 'plus3',
    name: 'InnovaFin Plus 3',
    description: 'Fondo de crecimiento con mayor exposición a cartera de consumo',
    valorTotal: '$52.6M',
    rendimientoPromedio: '18.2%',
    inversionistas: 245,
    compartimientos: [
      {
        id: 'libranzas',
        name: 'Libranzas',
        valorTotal: '$8.6M',
        numeroCreditos: '1,280',
        tasaPromedio: '15%',
        plazoPromedio: '48 meses',
        desempeno: '+13.5% YTD',
        nivelRiesgo: 'Bajo',
        nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
      },
      {
        id: 'factoring',
        name: 'Factoring',
        valorTotal: '$16.8M',
        numeroCreditos: '128',
        tasaPromedio: '20%',
        plazoPromedio: '75 días',
        desempeno: '+19.8% YTD',
        nivelRiesgo: 'Medio',
        nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
      },
      {
        id: 'consumo',
        name: 'Cartera de Consumo',
        valorTotal: '$27.2M',
        numeroCreditos: '3,450',
        tasaPromedio: '24%',
        plazoPromedio: '42 meses',
        desempeno: '+21.2% YTD',
        nivelRiesgo: 'Medio-Alto',
        nivelRiesgoColor: 'bg-orange-100 text-orange-700',
      },
    ],
  },
];

const procesoSteps = [
  {
    icon: ShoppingCart,
    title: 'Selección de Fondo',
    description: 'Elija el fondo que mejor se adapte a su perfil',
  },
  {
    icon: AlertCircle,
    title: 'Due Diligence',
    description: 'Análisis detallado del fondo seleccionado',
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
    title: 'Rentabilidad Histórica',
    description: 'Rendimiento consistente superior al 15% anual en los últimos 3 años',
  },
  {
    icon: Shield,
    title: 'Gestión de Riesgos',
    description: 'Diversificación óptima entre los tres compartimientos de cada fondo',
  },
  {
    icon: Calendar,
    title: 'Reportes Mensuales',
    description: 'Información detallada del desempeño de cada compartimiento',
  },
];

const beneficios = [
  'Diversificación automática entre tres compartimientos',
  'Gestión profesional del portafolio',
  'Liquidez trimestral garantizada',
  'Reportes mensuales de desempeño',
];

const Portfolio = () => {
  const [selectedFondo, setSelectedFondo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fondo: '',
    compartimiento: '',
    montoInversion: '$1,000,000',
    terminosPago: '',
    retornoEsperado: '15%',
  });

  const activeFondo = fondosCapital.find(f => f.id === selectedFondo);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Fondos de Capital InnovaFin
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tres fondos especializados con compartimientos en Libranzas, Factoring y Cartera de Consumo
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
                Fondos de Capital
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
              {/* Resumen General */}
              <Card className="mb-8 border-l-4 border-l-primary bg-gradient-to-r from-muted/30 to-background">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Portafolio Total InnovaFin
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Tres fondos de capital privado con compartimientos especializados para diferentes perfiles de inversión
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valor Total Gestionado</p>
                      <p className="text-3xl font-bold text-foreground">$116.6M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rendimiento Promedio</p>
                      <p className="text-3xl font-bold text-secondary">15.5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fondos Activos</p>
                      <p className="text-3xl font-bold text-foreground">3</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Inversionistas</p>
                      <p className="text-3xl font-bold text-foreground">559</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fondos Cards */}
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {fondosCapital.map((fondo) => (
                  <Card 
                    key={fondo.id} 
                    className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                      selectedFondo === fondo.id 
                        ? 'border-primary shadow-lg' 
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedFondo(selectedFondo === fondo.id ? null : fondo.id)}
                  >
                    <CardContent className="p-6">
                      {/* Header del Fondo */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary">{fondo.name}</h3>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mt-1">
                              Activo
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-6">
                        {fondo.description}
                      </p>

                      {/* Métricas del Fondo */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Valor Total</p>
                          <p className="text-lg font-bold text-foreground">{fondo.valorTotal}</p>
                        </div>
                        <div className="text-center border-x border-border">
                          <p className="text-xs text-muted-foreground">Rendimiento</p>
                          <p className="text-lg font-bold text-secondary">{fondo.rendimientoPromedio}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Inversores</p>
                          <p className="text-lg font-bold text-foreground">{fondo.inversionistas}</p>
                        </div>
                      </div>

                      {/* Compartimientos */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          Compartimientos
                          <ChevronRight className={`w-4 h-4 transition-transform ${selectedFondo === fondo.id ? 'rotate-90' : ''}`} />
                        </h4>
                        
                        {fondo.compartimientos.map((comp) => (
                          <div 
                            key={comp.id} 
                            className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                comp.id === 'libranzas' ? 'bg-primary' : 
                                comp.id === 'factoring' ? 'bg-secondary' : 'bg-accent'
                              }`} />
                              <span className="text-sm font-medium text-foreground">{comp.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-foreground">{comp.valorTotal}</span>
                              <Badge className={comp.nivelRiesgoColor + ' text-xs'}>
                                {comp.nivelRiesgo}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFondo(fondo.id);
                        }}
                      >
                        Ver Detalles Completos
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detalle del Fondo Seleccionado */}
              {activeFondo && (
                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-primary">
                        Detalle: {activeFondo.name}
                      </h3>
                      <Button variant="ghost" onClick={() => setSelectedFondo(null)}>
                        Cerrar
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {activeFondo.compartimientos.map((comp) => (
                        <Card key={comp.id} className="border-border/50">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-4 h-4 rounded-full ${
                                comp.id === 'libranzas' ? 'bg-primary' : 
                                comp.id === 'factoring' ? 'bg-secondary' : 'bg-accent'
                              }`} />
                              <h4 className="text-lg font-bold text-foreground">{comp.name}</h4>
                            </div>

                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Valor Total</span>
                                <span className="font-semibold text-foreground">{comp.valorTotal}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">N° Créditos</span>
                                <span className="font-semibold text-foreground">{comp.numeroCreditos}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tasa Promedio</span>
                                <span className="font-semibold text-foreground">{comp.tasaPromedio}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Plazo Promedio</span>
                                <span className="font-semibold text-foreground">{comp.plazoPromedio}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Desempeño</span>
                                <span className="font-semibold text-secondary">{comp.desempeno}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-border">
                                <span className="text-muted-foreground">Nivel de Riesgo</span>
                                <Badge className={comp.nivelRiesgoColor}>
                                  {comp.nivelRiesgo}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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

              {/* Comparativa de Fondos */}
              <Card className="border-border/50">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-primary mb-6">Comparativa de Fondos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Fondo</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Valor Total</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Rendimiento</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Inversionistas</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Perfil</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fondosCapital.map((fondo, index) => (
                          <tr key={fondo.id} className={index < fondosCapital.length - 1 ? 'border-b border-border/50' : ''}>
                            <td className="py-4 px-4 font-medium text-foreground">{fondo.name}</td>
                            <td className="py-4 px-4 text-center font-semibold">{fondo.valorTotal}</td>
                            <td className="py-4 px-4 text-center font-semibold text-secondary">{fondo.rendimientoPromedio}</td>
                            <td className="py-4 px-4 text-center">{fondo.inversionistas}</td>
                            <td className="py-4 px-4 text-center">
                              <Badge variant="outline" className={
                                fondo.id === 'plus1' ? 'border-emerald-500 text-emerald-600' :
                                fondo.id === 'plus2' ? 'border-yellow-500 text-yellow-600' :
                                'border-orange-500 text-orange-600'
                              }>
                                {fondo.id === 'plus1' ? 'Conservador' : fondo.id === 'plus2' ? 'Balanceado' : 'Crecimiento'}
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
                      <Label htmlFor="fondo">Fondo de Capital</Label>
                      <Select
                        value={formData.fondo}
                        onValueChange={(value) => setFormData({...formData, fondo: value, compartimiento: ''})}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Seleccione un fondo" />
                        </SelectTrigger>
                        <SelectContent>
                          {fondosCapital.map((fondo) => (
                            <SelectItem key={fondo.id} value={fondo.id}>
                              {fondo.name} - {fondo.rendimientoPromedio}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="compartimiento">Compartimiento</Label>
                      <Select
                        value={formData.compartimiento}
                        onValueChange={(value) => setFormData({...formData, compartimiento: value})}
                        disabled={!formData.fondo}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Seleccione compartimiento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="libranzas">Libranzas</SelectItem>
                          <SelectItem value="factoring">Factoring</SelectItem>
                          <SelectItem value="consumo">Cartera de Consumo</SelectItem>
                          <SelectItem value="todos">Todos los compartimientos</SelectItem>
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
                  </div>

                  {/* Beneficios */}
                  <div className="bg-muted/30 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-foreground mb-4">
                      Beneficios de los Fondos InnovaFin
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
