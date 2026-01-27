import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRequests, type RequestStatus } from '@/hooks/useAdminRequests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  FileText,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ShieldAlert,
  Eye,
  History,
  Briefcase,
} from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';

const STATUS_OPTIONS: { value: RequestStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pendiente', color: 'bg-yellow-500' },
  { value: 'in_review', label: 'En Revisión', color: 'bg-blue-500' },
  { value: 'approved', label: 'Aprobada', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rechazada', color: 'bg-red-500' },
  { value: 'disbursed', label: 'Desembolsada', color: 'bg-purple-500' },
];

export default function Admin() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const {
    requests,
    loading,
    isAdmin,
    checkingRole,
    stats,
    updateRequestStatus,
    getRequestHistory,
    getStatusLabel,
  } = useAdminRequests();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<RequestStatus | null>(null);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [historyModal, setHistoryModal] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Handle status change confirmation
  const handleStatusChange = async () => {
    if (!selectedRequest || !newStatus) return;

    setUpdating(true);
    const success = await updateRequestStatus(selectedRequest, newStatus, notes);
    setUpdating(false);

    if (success) {
      setSelectedRequest(null);
      setNewStatus(null);
      setNotes('');
    }
  };

  // Open history modal
  const openHistory = async (requestId: string) => {
    setHistoryModal(requestId);
    setLoadingHistory(true);
    const data = await getRequestHistory(requestId);
    setHistory(data);
    setLoadingHistory(false);
  };

  // Format currency
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);

  // Format date
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // Get status badge variant
  const getStatusBadge = (status: RequestStatus) => {
    const option = STATUS_OPTIONS.find(o => o.value === status);
    return (
      <Badge className={`${option?.color} text-white`}>
        {getStatusLabel(status)}
      </Badge>
    );
  };

  // Show loading state
  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <ShieldAlert className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Acceso Restringido</h1>
            <p className="text-muted-foreground mb-6">
              Debe iniciar sesión para acceder al panel de administración.
            </p>
            <Button onClick={() => setShowAuthModal(true)}>Iniciar Sesión</Button>
          </div>
        </main>
        <Footer />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <ShieldAlert className="w-16 h-16 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Acceso Denegado</h1>
            <p className="text-muted-foreground mb-6">
              No tiene permisos de administrador para acceder a esta página.
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Volver al Inicio
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestión de solicitudes de factoring
              </p>
            </div>
            <Link to="/admin/portfolio">
              <Button variant="outline" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Admin Portafolio
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-xs text-muted-foreground">Pendientes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.inReview}</p>
                    <p className="text-xs text-muted-foreground">En Revisión</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                    <p className="text-xs text-muted-foreground">Aprobadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                    <p className="text-xs text-muted-foreground">Rechazadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.disbursed}</p>
                    <p className="text-xs text-muted-foreground">Desembolsadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Totals */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Solicitado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(stats.totalAmount)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Desembolsado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(stats.totalDisbursed)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Factoring</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No hay solicitudes registradas.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Factura</TableHead>
                        <TableHead>Pagador</TableHead>
                        <TableHead>NIT</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead className="text-right">Neto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map(request => (
                        <TableRow key={request.id}>
                          <TableCell className="whitespace-nowrap">
                            {formatDate(request.created_at)}
                          </TableCell>
                          <TableCell className="font-medium">
                            {request.invoice_number}
                          </TableCell>
                          <TableCell>{request.payer_name}</TableCell>
                          <TableCell>{request.payer_nit}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(request.invoice_amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(request.net_amount)}
                          </TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Select
                                value={request.status}
                                onValueChange={(value: RequestStatus) => {
                                  setSelectedRequest(request.id);
                                  setNewStatus(value);
                                }}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATUS_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openHistory(request.id)}
                                title="Ver historial"
                              >
                                <History className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      {/* Status Change Confirmation Dialog */}
      <Dialog
        open={!!selectedRequest && !!newStatus}
        onOpenChange={() => {
          setSelectedRequest(null);
          setNewStatus(null);
          setNotes('');
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground">
              ¿Está seguro de cambiar el estado a{' '}
              <strong>{newStatus && getStatusLabel(newStatus)}</strong>?
            </p>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Agregue notas o comentarios sobre este cambio..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRequest(null);
                setNewStatus(null);
                setNotes('');
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleStatusChange} disabled={updating}>
              {updating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={!!historyModal} onOpenChange={() => setHistoryModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Historial de la Solicitud</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            {loadingHistory ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : history.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay historial disponible.
              </p>
            ) : (
              <div className="space-y-4">
                {history.map(entry => (
                  <div
                    key={entry.id}
                    className="border rounded-lg p-4 bg-muted/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{entry.action}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    {entry.details && (
                      <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(entry.details, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
