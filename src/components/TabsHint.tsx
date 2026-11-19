import { MousePointerClick, ArrowRight, ArrowDown } from 'lucide-react';

interface TabsHintProps {
  text?: string;
}

/**
 * Indicación que invita a hacer clic en las pestañas.
 * En escritorio aparece a la izquierda con una flecha hacia la derecha;
 * en celular aparece arriba con una flecha hacia abajo.
 */
const TabsHint = ({ text = 'Explora presionando una opción' }: TabsHintProps) => (
  <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground">
    <MousePointerClick className="h-5 w-5 text-secondary" />
    <span>{text}</span>
    <ArrowRight className="hidden h-4 w-4 text-secondary animate-pulse md:block" />
    <ArrowDown className="h-4 w-4 text-secondary animate-bounce md:hidden" />
  </div>
);

export default TabsHint;
