import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export interface Country {
  code: string; // código ISO en minúscula, se usa para la bandera
  name: string;
  dial: string; // indicativo internacional
}

// Colombia primero (valor por defecto); el resto en orden alfabético
const COUNTRIES: Country[] = [
  { code: 'co', name: 'Colombia', dial: '+57' },
  { code: 'de', name: 'Alemania', dial: '+49' },
  { code: 'ar', name: 'Argentina', dial: '+54' },
  { code: 'bo', name: 'Bolivia', dial: '+591' },
  { code: 'br', name: 'Brasil', dial: '+55' },
  { code: 'ca', name: 'Canadá', dial: '+1' },
  { code: 'cl', name: 'Chile', dial: '+56' },
  { code: 'cn', name: 'China', dial: '+86' },
  { code: 'cr', name: 'Costa Rica', dial: '+506' },
  { code: 'ec', name: 'Ecuador', dial: '+593' },
  { code: 'sv', name: 'El Salvador', dial: '+503' },
  { code: 'es', name: 'España', dial: '+34' },
  { code: 'us', name: 'Estados Unidos', dial: '+1' },
  { code: 'fr', name: 'Francia', dial: '+33' },
  { code: 'gt', name: 'Guatemala', dial: '+502' },
  { code: 'hn', name: 'Honduras', dial: '+504' },
  { code: 'it', name: 'Italia', dial: '+39' },
  { code: 'mx', name: 'México', dial: '+52' },
  { code: 'ni', name: 'Nicaragua', dial: '+505' },
  { code: 'pa', name: 'Panamá', dial: '+507' },
  { code: 'py', name: 'Paraguay', dial: '+595' },
  { code: 'pe', name: 'Perú', dial: '+51' },
  { code: 'pt', name: 'Portugal', dial: '+351' },
  { code: 'pr', name: 'Puerto Rico', dial: '+1' },
  { code: 'gb', name: 'Reino Unido', dial: '+44' },
  { code: 'do', name: 'República Dominicana', dial: '+1' },
  { code: 'ch', name: 'Suiza', dial: '+41' },
  { code: 'uy', name: 'Uruguay', dial: '+598' },
  { code: 've', name: 'Venezuela', dial: '+58' },
];

const Flag = ({ code, name }: { code: string; name: string }) => (
  <img
    src={`https://flagcdn.com/w40/${code}.png`}
    alt={name}
    width={20}
    height={14}
    loading="lazy"
    className="w-5 h-3.5 rounded-[2px] object-cover shrink-0"
  />
);

interface PhoneCountryInputProps {
  country: string;
  onCountryChange: (code: string) => void;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  /** Nombre del campo oculto con el número completo (ej. +573001234567), el que lee GHL */
  hiddenName?: string;
}

const PhoneCountryInput = ({
  country,
  onCountryChange,
  value,
  onChange,
  onBlur,
  placeholder = '300 123 4567',
  hiddenName = 'phone',
}: PhoneCountryInputProps) => {
  const [open, setOpen] = useState(false);
  const selected = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];
  const digits = value.replace(/\D/g, '');

  return (
    <div className="flex h-9 rounded-xl border border-white/20 bg-white/10 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-colors">
      {/* Selector de país */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`País: ${selected.name}`}
            className="flex items-center gap-1.5 pl-3 pr-2 border-r border-white/15 text-white/80 hover:text-white text-sm shrink-0"
          >
            <Flag code={selected.code} name={selected.name} />
            <span className="text-xs text-white/60">{selected.dial}</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar país..." />
            <CommandList>
              <CommandEmpty>No se encontró el país.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((c) => (
                  <CommandItem
                    key={c.code}
                    value={`${c.name} ${c.dial}`}
                    onSelect={() => {
                      onCountryChange(c.code);
                      setOpen(false);
                    }}
                    className="gap-2"
                  >
                    <Flag code={c.code} name={c.name} />
                    <span className="flex-1">{c.name}</span>
                    <span className="text-xs opacity-70">{c.dial}</span>
                    <Check className={cn('w-4 h-4', c.code === selected.code ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Número */}
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d\s-]/g, ''))}
        onBlur={onBlur}
        className="flex-1 min-w-0 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
      />

      {/* Número completo con indicativo, para el seguimiento de GHL */}
      <input type="hidden" name={hiddenName} value={digits ? `${selected.dial}${digits}` : ''} />
    </div>
  );
};

export default PhoneCountryInput;
