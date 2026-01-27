import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// =============================================================================
// TIPOS Y PROPS
// =============================================================================

interface AvatarBaseProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

interface SectionHeaderWithAvatarProps extends AvatarBaseProps {
  title: string;
  subtitle?: string;
  as?: "h2" | "h3" | "h4";
}

interface ProfileCardProps extends AvatarBaseProps {
  name: string;
  role?: string;
  description?: string;
  children?: React.ReactNode;
}

interface TestimonialAvatarProps extends AvatarBaseProps {
  name: string;
  role?: string;
  testimonial: string;
  date?: string;
}

interface SidebarAvatarProps extends AvatarBaseProps {
  name: string;
  email?: string;
  links?: { label: string; href: string; icon?: React.ReactNode }[];
  children?: React.ReactNode;
}

// =============================================================================
// UTILIDADES DE TAMAÑO
// =============================================================================

const sizeClasses = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-xl",
};

const borderClasses = "ring-2 ring-border ring-offset-2 ring-offset-background";

// =============================================================================
// 1. AVATAR BASE REUSABLE
// =============================================================================

export const AvatarCustom = React.forwardRef<
  HTMLSpanElement,
  AvatarBaseProps & { showBorder?: boolean }
>(({ src, alt = "Avatar", fallback = "U", size = "md", className, showBorder = true }, ref) => {
  const initials = fallback
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar
      ref={ref}
      className={cn(
        sizeClasses[size],
        showBorder && borderClasses,
        "transition-all duration-200",
        className
      )}
    >
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
});
AvatarCustom.displayName = "AvatarCustom";

// =============================================================================
// 2. ENCABEZADO CON AVATAR A LA DERECHA
// =============================================================================

export const SectionHeaderWithAvatar: React.FC<SectionHeaderWithAvatarProps> = ({
  title,
  subtitle,
  as: Tag = "h2",
  src,
  alt,
  fallback,
  size = "lg",
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between gap-4 py-4", className)}>
      <div className="flex-1">
        <Tag className="text-xl md:text-2xl font-bold text-foreground">{title}</Tag>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      <AvatarCustom src={src} alt={alt} fallback={fallback || title} size={size} />
    </div>
  );
};

// =============================================================================
// 3. CARD DE PERFIL CON AVATAR CENTRADO
// =============================================================================

export const ProfileCard: React.FC<ProfileCardProps> = ({
  src,
  alt,
  fallback,
  name,
  role,
  description,
  size = "xl",
  className,
  children,
}) => {
  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow duration-300", className)}>
      <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
        {/* Avatar centrado en la parte superior */}
        <AvatarCustom
          src={src}
          alt={alt || name}
          fallback={fallback || name}
          size={size}
          className="mb-4"
        />
        
        {/* Información del perfil */}
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        {role && (
          <p className="text-sm text-secondary font-medium mt-1">{role}</p>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">{description}</p>
        )}
        
        {/* Contenido adicional (botones, enlaces, etc.) */}
        {children && <div className="mt-4 w-full">{children}</div>}
      </CardContent>
    </Card>
  );
};

// =============================================================================
// 4. BARRA LATERAL CON AVATAR
// =============================================================================

export const SidebarWithAvatar: React.FC<SidebarAvatarProps> = ({
  src,
  alt,
  fallback,
  name,
  email,
  links,
  size = "lg",
  className,
  children,
}) => {
  return (
    <aside
      className={cn(
        "w-64 bg-card border-r border-border p-6 flex flex-col",
        "sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto",
        className
      )}
    >
      {/* Sección del avatar y perfil */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-border">
        <AvatarCustom
          src={src}
          alt={alt || name}
          fallback={fallback || name}
          size={size}
          className="mb-3"
        />
        <h4 className="font-semibold text-foreground">{name}</h4>
        {email && (
          <p className="text-xs text-muted-foreground mt-1 truncate max-w-full">
            {email}
          </p>
        )}
      </div>

      {/* Enlaces de navegación */}
      {links && links.length > 0 && (
        <nav className="flex-1 py-6">
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.icon && <span className="w-5 h-5">{link.icon}</span>}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Contenido adicional */}
      {children && <div className="mt-auto pt-6 border-t border-border">{children}</div>}
    </aside>
  );
};

// =============================================================================
// 5. COMENTARIO/TESTIMONIO CON AVATAR PEQUEÑO
// =============================================================================

export const TestimonialWithAvatar: React.FC<TestimonialAvatarProps> = ({
  src,
  alt,
  fallback,
  name,
  role,
  testimonial,
  date,
  size = "sm",
  className,
}) => {
  return (
    <div className={cn("flex gap-4 p-4 rounded-xl bg-muted/30", className)}>
      {/* Avatar pequeño a la izquierda */}
      <AvatarCustom
        src={src}
        alt={alt || name}
        fallback={fallback || name}
        size={size}
        className="flex-shrink-0 mt-1"
      />
      
      {/* Contenido del testimonio */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground text-sm">{name}</span>
          {role && (
            <span className="text-xs text-muted-foreground">• {role}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          "{testimonial}"
        </p>
        {date && (
          <p className="text-xs text-muted-foreground/70 mt-2">{date}</p>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// 6. AVATAR EN LÍNEA (para listas, comentarios cortos)
// =============================================================================

interface InlineAvatarProps extends AvatarBaseProps {
  name: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const InlineAvatar: React.FC<InlineAvatarProps> = ({
  src,
  alt,
  fallback,
  name,
  subtitle,
  size = "sm",
  action,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <AvatarCustom
        src={src}
        alt={alt || name}
        fallback={fallback || name}
        size={size}
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{name}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

// =============================================================================
// 7. GRUPO DE AVATARES (para mostrar múltiples usuarios)
// =============================================================================

interface AvatarGroupProps {
  avatars: { src?: string; fallback: string; alt?: string }[];
  max?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = "sm",
  className,
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayAvatars.map((avatar, index) => (
        <AvatarCustom
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="border-2 border-background"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            sizeClasses[size],
            "rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium border-2 border-background"
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
