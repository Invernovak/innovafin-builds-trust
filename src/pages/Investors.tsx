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

const compartimentos = [
  {
    title: 'Cartera Libranzas',
    inversionMinima: '$100,000',
    retornoEsperado: '12-14%',
  },
  {
    title: 'Factoring',
    inversionMinima: '$250,000',
    retornoEsperado: '15-18%',
  },
  {
    title: 'Cartera Consumo',
    inversionMinima: '$150,000',
    retornoEsperado: '18-22%',
  },
];

const beneficios = [
  {
    icon: FileText,
    title: 'Reportes Detallados',
    description: 'Acceso a reportes mensuales y trimestrales sobre el desempeño de sus inversiones.',
  },
  {
    icon: Users,
    title: 'Asesoría Personalizada',
    description: 'Equipo dedicado de asesores financieros para optimizar su estrategia de inversión.',
  },
  {
    icon: Shield,
    title: 'Seguridad Garantizada',
    description: 'Cumplimiento estricto de regulaciones y mejores prácticas de la industria.',
  },
];

const Investors = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoPersona: 'natural',
    nombreCompleto: '',
    numeroIdentificacion: '',
    correoElectronico: '',
    telefono: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Portal de Inversionistas
              </h1>
              <p className="text-lg text-muted-foreground">
                Únase a nuestra red de inversionistas y acceda a oportunidades exclusivas de inversión
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <img 
                src={avatarCharts} 
                alt="Asesora de inversiones mostrando gráficos" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Tabs defaultValue="vinculacion" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-muted/30 rounded-xl p-1">
              <TabsTrigger 
                value="vinculacion" 
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Vinculación
              </TabsTrigger>
              <TabsTrigger 
                value="compartimentos"
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Compartimentos
              </TabsTrigger>
              <TabsTrigger 
                value="beneficios"
                className="rounded-lg text-sm md:text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Beneficios
              </TabsTrigger>
            </TabsList>

            {/* Vinculación Tab */}
            <TabsContent value="vinculacion">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    Proceso de Vinculación de Inversionistas
                  </CardTitle>
                  
                  {/* Stepper */}
                  <div className="flex items-center justify-between mt-6 max-w-md">
                    {[1, 2, 3].map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors ${
                            currentStep >= step
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step}
                        </div>
                        {index < 2 && (
                          <div
                            className={`w-16 md:w-32 h-0.5 mx-2 transition-colors ${
                              currentStep > step ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentStep === 1 && (
                    <>
                      <h3 className="text-lg font-semibold text-foreground">
                        Paso 1: Información Personal
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="tipoPersona">Tipo de Persona</Label>
                          <Select
                            value={formData.tipoPersona}
                            onValueChange={(value) => handleInputChange('tipoPersona', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Seleccione tipo de persona" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="natural">Persona Natural</SelectItem>
                              <SelectItem value="juridica">Persona Jurídica</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                            <Input
                              id="nombreCompleto"
                              placeholder="Juan Pérez"
                              value={formData.nombreCompleto}
                              onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="numeroIdentificacion">Número de Identificación</Label>
                            <Input
                              id="numeroIdentificacion"
                              placeholder="1234567890"
                              value={formData.numeroIdentificacion}
                              onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="correoElectronico">Correo Electrónico</Label>
                            <Input
                              id="correoElectronico"
                              type="email"
                              placeholder="correo@ejemplo.com"
                              value={formData.correoElectronico}
                              onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                              id="telefono"
                              placeholder="+57 300 123 4567"
                              value={formData.telefono}
                              onChange={(e) => handleInputChange('telefono', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <h3 className="text-lg font-semibold text-foreground">
                        Paso 2: Documentación
                      </h3>
                      <p className="text-muted-foreground">
                        Por favor cargue los documentos requeridos para completar su vinculación.
                      </p>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                        <p className="text-muted-foreground">Arrastre sus documentos aquí o haga clic para seleccionar</p>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <h3 className="text-lg font-semibold text-foreground">
                        Paso 3: Confirmación
                      </h3>
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
                    </>
                  )}

                  <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90">
                    {currentStep === 3 ? 'Confirmar' : 'Siguiente'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compartimentos Tab */}
            <TabsContent value="compartimentos">
              <div className="grid md:grid-cols-2 gap-6">
                {compartimentos.map((compartimento, index) => (
                  <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
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
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Beneficios Tab */}
            <TabsContent value="beneficios">
              <div className="grid md:grid-cols-3 gap-6">
                {beneficios.map((beneficio, index) => (
                  <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <beneficio.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {beneficio.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {beneficio.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investors;
