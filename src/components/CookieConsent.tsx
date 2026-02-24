import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Small delay for better UX (don't flash immediately)
            const timer = setTimeout(() => setShow(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShow(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 animate-in slide-in-from-bottom-8 duration-700 pointer-events-none">
            <div className="max-w-6xl mx-auto bg-background/95 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative pointer-events-auto">
                <div className="flex-1 pr-8">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Privacidad y Cookies</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        En Innovafin utilizamos cookies propias y de terceros para fines analíticos,
                        mejorar su experiencia de navegación y ofrecer contenido personalizado.
                        Al hacer clic en "Aceptar todas", consiente el uso de todas las cookies.
                        Para más información, consulte nuestra Política de Privacidad.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                    <Button
                        variant="outline"
                        onClick={handleReject}
                        className="w-full sm:w-auto font-medium"
                    >
                        Rechazar
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="w-full sm:w-auto bg-[#001D4A] hover:bg-[#001D4A]/90 text-white font-medium"
                    >
                        Aceptar todas
                    </Button>
                </div>
            </div>
        </div>
    );
}
