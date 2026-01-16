import { useState } from 'react';
import { ArrowRight, FileText, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import avatarCharts from '@/assets/avatar-charts.png';
const compartimentos = [{
  title: 'Cartera Libranzas',
  inversionMinima: '$100,000',
  retornoEsperado: '12-14%'
}, {
  title: 'Factoring',
  inversionMinima: '$250,000',
  retornoEsperado: '15-18%'
}, {
  title: 'Cartera Consumo',
  inversionMinima: '$150,000',
  retornoEsperado: '18-22%'
}];
const beneficios = [{
  icon: FileText,
  title: 'Reportes Detallados',
  description: 'Acceso a reportes mensuales y trimestrales sobre el desempeño de sus inversiones.'
}, {
  icon: Users,
  title: 'Asesoría Personalizada',
  description: 'Equipo dedicado de asesores financieros para optimizar su estrategia de inversión.'
}, {
  icon: Shield,
  title: 'Seguridad Garantizada',
  description: 'Cumplimiento estricto de regulaciones y mejores prácticas de la industria.'
}];
const Investors = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoPersona: 'natural',
    nombreCompleto: '',
    numeroIdentificacion: '',
    correoElectronico: '',
    telefono: ''
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex-col items-center justify-between gap-12 flex md:flex-col border-0 rounded-lg shadow-md">
            <div className="text-left md:max-w-lg">
              <h1 className="text-4xl text-primary mb-6 leading-tight font-extrabold text-center md:text-9xl">Portal de Inversionistas
              <br />Inversionistas
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                Únase a nuestra red de inversionistas y acceda a oportunidades exclusivas de inversión con el respaldo y la seguridad que InnovaFin ofrece.
              </p>
            </div>
            <div className="w-full md:w-auto">
              
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="vinculacion" className="w-full">
            {/* Tab Pills */}
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex h-12 bg-muted/50 rounded-full p-1 gap-1">
                <TabsTrigger value="vinculacion" className="rounded-full px-6 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">
                  Vinculación
                </TabsTrigger>
                <TabsTrigger value="compartimentos" className="rounded-full px-6 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">
                  Compartimentos
                </TabsTrigger>
                <TabsTrigger value="beneficios" className="rounded-full px-6 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">
                  Beneficios
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Vinculación Tab */}
            <TabsContent value="vinculacion">
              <Card className="border-0 shadow-xl bg-background rounded-2xl">
                <CardContent className="p-8">
                  {/* Stepper */}
                  <div className="flex items-center justify-center mb-8">
                    {[1, 2, 3].map((step, index) => <div key={step} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {step}
                        </div>
                        {index < 2 && <div className={`w-20 md:w-32 h-0.5 transition-colors ${currentStep > step ? 'bg-primary' : 'bg-border'}`} />}
                      </div>)}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                      Proceso de Vinculación de Inversionistas
                    </h2>
                    <p className="text-muted-foreground">
                      Paso {currentStep}: {currentStep === 1 ? 'Información Personal' : currentStep === 2 ? 'Documentación' : 'Confirmación'}
                    </p>
                  </div>
                  {currentStep === 1 && <div className="space-y-5">
                      <div>
                        <Label htmlFor="tipoPersona" className="text-sm font-medium text-foreground">
                          Tipo de Persona
                        </Label>
                        <Select value={formData.tipoPersona} onValueChange={value => handleInputChange('tipoPersona', value)}>
                          <SelectTrigger className="mt-2 h-12 bg-muted/30 border-0 rounded-lg">
                            <SelectValue placeholder="Seleccione tipo de persona" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg">
                            <SelectItem value="natural">Persona Natural</SelectItem>
                            <SelectItem value="juridica">Persona Jurídica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="nombreCompleto" className="text-sm font-medium text-foreground">
                            Nombre Completo
                          </Label>
                          <Input id="nombreCompleto" placeholder="Juan Pérez" value={formData.nombreCompleto} onChange={e => handleInputChange('nombreCompleto', e.target.value)} className="mt-2 h-12 bg-muted/30 border-0 rounded-lg" />
                        </div>
                        <div>
                          <Label htmlFor="numeroIdentificacion" className="text-sm font-medium text-foreground">
                            Número de Identificación
                          </Label>
                          <Input id="numeroIdentificacion" placeholder="1234567890" value={formData.numeroIdentificacion} onChange={e => handleInputChange('numeroIdentificacion', e.target.value)} className="mt-2 h-12 bg-muted/30 border-0 rounded-lg" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="correoElectronico" className="text-sm font-medium text-foreground">
                            Correo Electrónico
                          </Label>
                          <Input id="correoElectronico" type="email" placeholder="correo@ejemplo.com" value={formData.correoElectronico} onChange={e => handleInputChange('correoElectronico', e.target.value)} className="mt-2 h-12 bg-muted/30 border-0 rounded-lg" />
                        </div>
                        <div>
                          <Label htmlFor="telefono" className="text-sm font-medium text-foreground">
                            Teléfono
                          </Label>
                          <Input id="telefono" placeholder="+57 300 123 4567" value={formData.telefono} onChange={e => handleInputChange('telefono', e.target.value)} className="mt-2 h-12 bg-muted/30 border-0 rounded-lg" />
                        </div>
                      </div>
                    </div>}

                  {currentStep === 2 && <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Por favor cargue los documentos requeridos para completar su vinculación.
                      </p>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20">
                        <p className="text-muted-foreground">Arrastre sus documentos aquí o haga clic para seleccionar</p>
                      </div>
                    </div>}

                  {currentStep === 3 && <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Revise su información y confirme para completar el proceso de vinculación.
                      </p>
                      <div className="bg-muted/30 rounded-xl p-6 space-y-3">
                        <p><strong>Tipo:</strong> {formData.tipoPersona === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}</p>
                        <p><strong>Nombre:</strong> {formData.nombreCompleto || 'No especificado'}</p>
                        <p><strong>Identificación:</strong> {formData.numeroIdentificacion || 'No especificado'}</p>
                        <p><strong>Email:</strong> {formData.correoElectronico || 'No especificado'}</p>
                        <p><strong>Teléfono:</strong> {formData.telefono || 'No especificado'}</p>
                      </div>
                    </div>}

                  <div className="pt-4">
                    <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg">
                      {currentStep === 3 ? 'Confirmar' : 'Siguiente'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compartimentos Tab */}
            <TabsContent value="compartimentos">
              <div className="grid md:grid-cols-2 gap-6">
                {compartimentos.map((compartimento, index) => <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-4">
                        {compartimento.title}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Inversión Mínima:</span>
                          <span className="font-semibold text-foreground">{compartimento.inversionMinima}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Retorno Esperado:</span>
                          <span className="font-semibold text-primary">{compartimento.retornoEsperado}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-6">
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>

            {/* Beneficios Tab */}
            <TabsContent value="beneficios">
              <div className="grid md:grid-cols-3 gap-6">
                {beneficios.map((beneficio, index) => <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <beneficio.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {beneficio.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {beneficio.description}
                      </p>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Investors;