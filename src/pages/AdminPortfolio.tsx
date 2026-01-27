import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Building2, TrendingUp, Calendar, Wallet, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useAuth } from '@/hooks/useAuth';
import {
  useCapitalPrivado,
  useCompartimentos,
  useFIC,
  useFICTipos,
  useFICHistorico,
  useUpdateCapitalPrivado,
  useUpdateCompartimento,
  useUpdateFIC,
  useUpdateFICTipo,
  useUpdateFICHistorico,
} from '@/hooks/usePortfolioData';

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-CO').format(value);
};

const AdminPortfolio = () => {
  const { user } = useAuth();
  const { isAdmin, loading: isAdminLoading } = useIsAdmin();

  // Data hooks
  const { data: capitalPrivado, isLoading: cpLoading, refetch: refetchCP } = useCapitalPrivado();
  const { data: compartimentos, isLoading: compLoading, refetch: refetchComp } = useCompartimentos(capitalPrivado?.id);
  const { data: fic, isLoading: ficLoading, refetch: refetchFIC } = useFIC();
  const { data: ficTipos, isLoading: tiposLoading, refetch: refetchTipos } = useFICTipos(fic?.id);
  const { data: ficHistorico, isLoading: histLoading, refetch: refetchHist } = useFICHistorico(fic?.id);

  // Mutation hooks
  const updateCP = useUpdateCapitalPrivado();
  const updateComp = useUpdateCompartimento();
  const updateFIC = useUpdateFIC();
  const updateTipo = useUpdateFICTipo();
  const updateHist = useUpdateFICHistorico();

  // Local state for forms
  const [cpForm, setCpForm] = useState<Record<string, any>>({});
  const [ficForm, setFicForm] = useState<Record<string, any>>({});
  const [compForms, setCompForms] = useState<Record<string, Record<string, any>>>({});
  const [tipoForms, setTipoForms] = useState<Record<string, Record<string, any>>>({});
  const [histForms, setHistForms] = useState<Record<string, Record<string, any>>>({});

  const isLoading = cpLoading || compLoading || ficLoading || tiposLoading || histLoading || isAdminLoading;

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Acceso Restringido</h1>
            <p className="text-muted-foreground">Debes iniciar sesión para acceder a esta página.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin && !isAdminLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
            <p className="text-muted-foreground">No tienes permisos de administrador.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleRefreshAll = () => {
    refetchCP();
    refetchComp();
    refetchFIC();
    refetchTipos();
    refetchHist();
  };

  const handleSaveCP = () => {
    if (!capitalPrivado) return;
    updateCP.mutate({ id: capitalPrivado.id, ...cpForm });
    setCpForm({});
  };

  const handleSaveFIC = () => {
    if (!fic) return;
    updateFIC.mutate({ id: fic.id, ...ficForm });
    setFicForm({});
  };

  const handleSaveComp = (compId: string) => {
    const formData = compForms[compId];
    if (!formData || Object.keys(formData).length === 0) return;
    updateComp.mutate({ id: compId, ...formData });
    setCompForms(prev => ({ ...prev, [compId]: {} }));
  };

  const handleSaveTipo = (tipoId: string) => {
    const formData = tipoForms[tipoId];
    if (!formData || Object.keys(formData).length === 0) return;
    updateTipo.mutate({ id: tipoId, ...formData });
    setTipoForms(prev => ({ ...prev, [tipoId]: {} }));
  };

  const handleSaveHist = (histId: string) => {
    const formData = histForms[histId];
    if (!formData || Object.keys(formData).length === 0) return;
    updateHist.mutate({ id: histId, ...formData });
    setHistForms(prev => ({ ...prev, [histId]: {} }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Portafolio</h1>
                <p className="text-muted-foreground">Editar datos del portafolio de inversiones</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleRefreshAll} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Cargando datos...</p>
            </div>
          ) : (
            <Tabs defaultValue="capital-privado" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="capital-privado">Capital Privado</TabsTrigger>
                <TabsTrigger value="fic">FIC 180 Plus</TabsTrigger>
              </TabsList>

              {/* Capital Privado Tab */}
              <TabsContent value="capital-privado" className="space-y-6">
                {capitalPrivado && (
                  <>
                    {/* Datos Generales */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          Datos Generales
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Nombre del Fondo</Label>
                            <Input
                              defaultValue={capitalPrivado.name}
                              onChange={(e) => setCpForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label>Fecha de Reporte</Label>
                            <Input
                              type="date"
                              defaultValue={capitalPrivado.fecha_reporte}
                              onChange={(e) => setCpForm(prev => ({ ...prev, fecha_reporte: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label>Administrador</Label>
                            <Input
                              defaultValue={capitalPrivado.administrador}
                              onChange={(e) => setCpForm(prev => ({ ...prev, administrador: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label>Gestor Profesional</Label>
                            <Input
                              defaultValue={capitalPrivado.gestor_profesional}
                              onChange={(e) => setCpForm(prev => ({ ...prev, gestor_profesional: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <Label>Total Fondo (COP)</Label>
                            <Input
                              type="number"
                              defaultValue={capitalPrivado.total_fondo}
                              onChange={(e) => setCpForm(prev => ({ ...prev, total_fondo: parseFloat(e.target.value) }))}
                            />
                            <p className="text-xs text-muted-foreground mt-1">{formatNumber(cpForm.total_fondo || capitalPrivado.total_fondo)}</p>
                          </div>
                          <div>
                            <Label>Total Disponible (COP)</Label>
                            <Input
                              type="number"
                              defaultValue={capitalPrivado.total_disponible}
                              onChange={(e) => setCpForm(prev => ({ ...prev, total_disponible: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label>Total Invertido (COP)</Label>
                            <Input
                              type="number"
                              defaultValue={capitalPrivado.total_invertido}
                              onChange={(e) => setCpForm(prev => ({ ...prev, total_invertido: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label>Porcentaje Total (%)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={capitalPrivado.porcentaje_total}
                              onChange={(e) => setCpForm(prev => ({ ...prev, porcentaje_total: parseFloat(e.target.value) }))}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleSaveCP} disabled={Object.keys(cpForm).length === 0 || updateCP.isPending}>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar Cambios
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Compartimentos */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wallet className="w-5 h-5" />
                          Compartimentos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {compartimentos?.map((comp) => (
                          <div key={comp.id} className="border rounded-lg p-4 space-y-4">
                            <h4 className="font-semibold text-lg">{comp.name}</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <Label>Total Activos (COP)</Label>
                                <Input
                                  type="number"
                                  defaultValue={comp.total_activos}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], total_activos: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Disponible (COP)</Label>
                                <Input
                                  type="number"
                                  defaultValue={comp.disponible}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], disponible: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Invertido (COP)</Label>
                                <Input
                                  type="number"
                                  defaultValue={comp.invertido}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], invertido: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                              <div>
                                <Label>% Activos</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={comp.porcentaje_activos}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], porcentaje_activos: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Rent. Día (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={comp.rentabilidad_dia}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], rentabilidad_dia: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Rent. 30d (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={comp.rentabilidad_30dias}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], rentabilidad_30dias: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Rent. 90d (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={comp.rentabilidad_90dias}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], rentabilidad_90dias: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Rent. 180d (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={comp.rentabilidad_180dias}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], rentabilidad_180dias: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Rent. 365d (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={comp.rentabilidad_365dias}
                                  onChange={(e) => setCompForms(prev => ({
                                    ...prev,
                                    [comp.id]: { ...prev[comp.id], rentabilidad_365dias: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleSaveComp(comp.id)}
                                disabled={!compForms[comp.id] || Object.keys(compForms[comp.id] || {}).length === 0 || updateComp.isPending}
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar {comp.name}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              {/* FIC Tab */}
              <TabsContent value="fic" className="space-y-6">
                {fic && (
                  <>
                    {/* Datos Generales FIC */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Datos Generales FIC
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Nombre del Fondo</Label>
                            <Input
                              defaultValue={fic.name}
                              onChange={(e) => setFicForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label>Fecha de Reporte</Label>
                            <Input
                              type="date"
                              defaultValue={fic.fecha_reporte}
                              onChange={(e) => setFicForm(prev => ({ ...prev, fecha_reporte: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label>Administrador</Label>
                            <Input
                              defaultValue={fic.administrador}
                              onChange={(e) => setFicForm(prev => ({ ...prev, administrador: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <Label>Valor Unidad</Label>
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={fic.valor_unidad}
                              onChange={(e) => setFicForm(prev => ({ ...prev, valor_unidad: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label>Valor Fondo (COP)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={fic.valor_fondo}
                              onChange={(e) => setFicForm(prev => ({ ...prev, valor_fondo: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label>Rent. EA 30 días (%)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={fic.rentabilidad_ea_30dias}
                              onChange={(e) => setFicForm(prev => ({ ...prev, rentabilidad_ea_30dias: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label>Rent. EA 365 días (%)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={fic.rentabilidad_ea_365dias}
                              onChange={(e) => setFicForm(prev => ({ ...prev, rentabilidad_ea_365dias: parseFloat(e.target.value) }))}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleSaveFIC} disabled={Object.keys(ficForm).length === 0 || updateFIC.isPending}>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar Cambios
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tipos de Participación */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Percent className="w-5 h-5" />
                          Tipos de Participación
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {ficTipos?.map((tipo) => (
                          <div key={tipo.id} className="border rounded-lg p-4 space-y-4">
                            <h4 className="font-semibold text-lg">{tipo.nombre}</h4>
                            <div className="grid md:grid-cols-4 gap-4">
                              <div>
                                <Label>Inversión Mínima (COP)</Label>
                                <Input
                                  type="number"
                                  defaultValue={tipo.inversion_minima}
                                  onChange={(e) => setTipoForms(prev => ({
                                    ...prev,
                                    [tipo.id]: { ...prev[tipo.id], inversion_minima: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Comisión Admin. (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={tipo.comision_administracion}
                                  onChange={(e) => setTipoForms(prev => ({
                                    ...prev,
                                    [tipo.id]: { ...prev[tipo.id], comision_administracion: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Pacto Permanencia (días)</Label>
                                <Input
                                  type="number"
                                  defaultValue={tipo.pacto_permanencia}
                                  onChange={(e) => setTipoForms(prev => ({
                                    ...prev,
                                    [tipo.id]: { ...prev[tipo.id], pacto_permanencia: parseInt(e.target.value) }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Remuneración Efectiva (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={tipo.remuneracion_efectiva}
                                  onChange={(e) => setTipoForms(prev => ({
                                    ...prev,
                                    [tipo.id]: { ...prev[tipo.id], remuneracion_efectiva: parseFloat(e.target.value) }
                                  }))}
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Descripción</Label>
                              <Textarea
                                defaultValue={tipo.descripcion || ''}
                                onChange={(e) => setTipoForms(prev => ({
                                  ...prev,
                                  [tipo.id]: { ...prev[tipo.id], descripcion: e.target.value }
                                }))}
                              />
                            </div>
                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleSaveTipo(tipo.id)}
                                disabled={!tipoForms[tipo.id] || Object.keys(tipoForms[tipo.id] || {}).length === 0 || updateTipo.isPending}
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar {tipo.nombre}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Comportamiento Histórico */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Comportamiento Histórico
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {ficHistorico?.map((hist) => (
                          <div key={hist.id} className="border rounded-lg p-4 space-y-4">
                            <h4 className="font-semibold text-lg">{hist.nombre}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                              <div>
                                <Label>Año Corrido (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.ano_corrido_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], ano_corrido_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Diaria (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.diaria_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], diaria_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>30 días (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.dias_30_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], dias_30_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>180 días (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.dias_180_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], dias_180_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>1º año (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.ano_1_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], ano_1_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>2º año (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.ano_2_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], ano_2_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>3º año (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={hist.ano_3_ea ?? ''}
                                  onChange={(e) => setHistForms(prev => ({
                                    ...prev,
                                    [hist.id]: { ...prev[hist.id], ano_3_ea: e.target.value ? parseFloat(e.target.value) : null }
                                  }))}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleSaveHist(hist.id)}
                                disabled={!histForms[hist.id] || Object.keys(histForms[hist.id] || {}).length === 0 || updateHist.isPending}
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPortfolio;
