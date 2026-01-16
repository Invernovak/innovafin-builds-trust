import { useState } from 'react';
import { ShoppingCart, AlertCircle, DollarSign, CheckCircle, TrendingUp, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import avatarPresentation from '@/assets/avatar-presentation.png';

const compartimentos = [
  {
    id: 'libranzas',
    name: 'Cartera Libranzas',
    description: 'Créditos respaldados por descuento directo de nómina con alta estabilidad y bajo riesgo',
    valorTotal: '$15.8M',
    numeroCreditos: '2,450',
    tasaPromedio: '14%',
    plazoPromedio: '48 meses',
    desempeno: '+12.5% YTD',
    nivelRiesgo: 'Bajo',
    nivelRiesgoColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'factoring',
    name: 'Factoring',
    description: 'Financiación de facturas con empresas sólidas y flujo de caja predecible',
    valorTotal: '$22.5M',
    numeroCreditos: '185',
    tasaPromedio: '18%',
    plazoPromedio: '90 días',
    desempeno: '+15.8% YTD',
    nivelRiesgo: 'Medio',
    nivelRiesgoColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'consumo',
    name: 'Cartera Consumo',
    description: 'Créditos de consumo diversificados con tasas competitivas',
    valorTotal: '$8.3M',
    numeroCreditos: '1,856',
    tasaPromedio: '22%',
    plazoPromedio: '36 meses',
    desempeno: '+18.2% YTD',
    nivelRiesgo: 'Medio-Alto',
    nivelRiesgoColor: 'bg-orange-100 text-orange-700',
  },
];

const procesoSteps = [
  {
    icon: ShoppingCart,
    title: 'Selección de Cartera',
    description: 'Elija el tipo de cartera que desea adquirir',
  },
  {
    icon: AlertCircle,
    title: 'Due Diligence',
    description: 'Análisis detallado de la cartera seleccionada',
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
    description: 'Diversificación óptima entre los tres compartimientos del fondo',
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
  const [formData, setFormData] = useState({
    compartimiento: '',
    montoInversion: '$1,000,000',
    terminosPago: '',
    retornoEsperado: '15%',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Fondo de Capital InnovaFin
              </h1>
              <p className="text-lg text-muted-foreground">
                Gestione su inversión en nuestros tres compartimientos especializados
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <img 
                src={avatarPresentation} 
                alt="Asesora presentando información del portafolio" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="compartimientos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-muted/30 rounded-xl p-1">
              <TabsTrigger 
                value="compartimientos" 
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
              >
                Compartimientos
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

            {/* Compartimientos Tab */}
            <TabsContent value="compartimientos">
              {/* Resumen del Fondo */}
              <Card className="mb-8 border-l-4 border-l-primary bg-gradient-to-r from-muted/30 to-background">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Fondo de Capital InnovaFin
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Un fondo único con tres compartimientos especializados para diversificar su inversión
                  </p>
                  
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valor Total del Fondo</p>
                      <p className="text-3xl font-bold text-foreground">$46.6M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rendimiento Promedio</p>
                      <p className="text-3xl font-bold text-[#006038]">15.5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Inversionistas</p>
                      <p className="text-3xl font-bold text-foreground">342</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compartimientos Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {compartimentos.map((comp) => (
                  <Card key={comp.id} className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-primary">{comp.name}</h3>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          Activo
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-6">
                        {comp.description}
                      </p>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Valor Total</span>
                          <span className="font-semibold text-foreground">{comp.valorTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Número de Créditos</span>
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
                          <span className="font-semibold text-[#006038]">{comp.desempeno}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-muted-foreground">Nivel de Riesgo:</span>
                          <Badge className={comp.nivelRiesgoColor}>
                            {comp.nivelRiesgo}
                          </Badge>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-6">
                        Ver Detalles Completos
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Desempeño Tab */}
            <TabsContent value="desempeno">
              <Card className="mb-8 border-border/50">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-8">
                    Desempeño del Fondo
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
              <div className="grid md:grid-cols-3 gap-6">
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
                      <Label htmlFor="compartimiento">Compartimiento</Label>
                      <Select
                        value={formData.compartimiento}
                        onValueChange={(value) => setFormData({...formData, compartimiento: value})}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Seleccione compartimiento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="libranzas">Cartera Libranzas</SelectItem>
                          <SelectItem value="factoring">Factoring</SelectItem>
                          <SelectItem value="consumo">Cartera Consumo</SelectItem>
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
                      <Label htmlFor="retornoEsperado">Retorno Esperado (%)</Label>
                      <Input
                        id="retornoEsperado"
                        value={formData.retornoEsperado}
                        onChange={(e) => setFormData({...formData, retornoEsperado: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Beneficios */}
                  <div className="bg-muted/30 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-foreground mb-4">
                      Beneficios del Fondo InnovaFin
                    </h3>
                    <ul className="space-y-2">
                      {beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-[#006038]" />
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