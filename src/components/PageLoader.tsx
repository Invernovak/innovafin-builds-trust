import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20" />
        <Loader2 className="w-16 h-16 text-primary animate-spin absolute top-0 left-0" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold text-primary animate-pulse">Cargando Experiencia</h3>
        <p className="text-sm text-muted-foreground italic">InnovaFin - Transformando el futuro</p>
      </div>
    </div>
  );
};

export default PageLoader;
