import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { LegalCheckboxes } from '@/components/LegalCheckboxes';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          toast.error('Las contraseñas no coinciden');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          toast.error('La contraseña debe tener al menos 6 caracteres');
          setIsLoading(false);
          return;
        }

        if (!authChecked) {
          toast.error('Debe autorizar el tratamiento de datos personales');
          setIsLoading(false);
          return;
        }

        if (!termsChecked) {
          toast.error('Debe aceptar los términos y condiciones');
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password);
        if (error) throw error;

        toast.success('Cuenta creada exitosamente');
        onSuccess?.();
        onClose();
        resetForm();
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;

        toast.success('Sesión iniciada exitosamente');
        onSuccess?.();
        onClose();
        resetForm();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error en la autenticación';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setAuthChecked(false);
    setTermsChecked(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {mode === 'login' ? (
                  <>
                    <LogIn className="w-5 h-5 text-primary" />
                    Iniciar Sesión
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 text-primary" />
                    Crear Cuenta
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {mode === 'login'
                  ? 'Ingrese sus credenciales para acceder al portal'
                  : 'Complete el formulario para registrarse'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" aria-label="Cerrar modal" onClick={() => { onClose(); resetForm(); }}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <LegalCheckboxes
                    authChecked={authChecked}
                    onAuthChange={setAuthChecked}
                    termsChecked={termsChecked}
                    onTermsChange={setTermsChecked}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full h-12 rounded-xl" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Iniciar Sesión
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Crear Cuenta
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  resetForm();
                }}
                className={cn(
                  "text-sm hover:underline transition-colors",
                  "text-primary"
                )}
              >
                {mode === 'login'
                  ? '¿No tiene cuenta? Regístrese aquí'
                  : '¿Ya tiene cuenta? Inicie sesión'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
