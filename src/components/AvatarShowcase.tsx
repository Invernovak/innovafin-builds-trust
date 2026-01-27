import { Button } from "@/components/ui/button";
import { Home, Settings, User, FileText, LogOut, Star } from "lucide-react";
import {
  AvatarCustom,
  SectionHeaderWithAvatar,
  ProfileCard,
  SidebarWithAvatar,
  TestimonialWithAvatar,
  InlineAvatar,
  AvatarGroup,
} from "@/components/ui/avatar-variants";

// Imágenes placeholder de ejemplo
const AVATAR_EXAMPLES = {
  user1: "https://randomuser.me/api/portraits/men/75.jpg",
  user2: "https://randomuser.me/api/portraits/women/65.jpg",
  user3: "https://randomuser.me/api/portraits/men/32.jpg",
  user4: "https://randomuser.me/api/portraits/women/44.jpg",
  user5: "https://github.com/shadcn.png",
};

const sidebarLinks = [
  { label: "Inicio", href: "/", icon: <Home className="w-4 h-4" /> },
  { label: "Mi Perfil", href: "/perfil", icon: <User className="w-4 h-4" /> },
  { label: "Documentos", href: "/docs", icon: <FileText className="w-4 h-4" /> },
  { label: "Configuración", href: "/config", icon: <Settings className="w-4 h-4" /> },
];

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Inversionista",
    testimonial: "Excelente experiencia con InnovaFin. Los rendimientos han superado mis expectativas y el servicio al cliente es excepcional.",
    src: AVATAR_EXAMPLES.user1,
    date: "Hace 2 días",
  },
  {
    name: "Ana García",
    role: "Empresaria",
    testimonial: "El factoring me permitió mantener el flujo de caja de mi empresa. Proceso rápido y transparente.",
    src: AVATAR_EXAMPLES.user2,
    date: "Hace 1 semana",
  },
];

const teamAvatars = [
  { src: AVATAR_EXAMPLES.user1, fallback: "CM", alt: "Carlos" },
  { src: AVATAR_EXAMPLES.user2, fallback: "AG", alt: "Ana" },
  { src: AVATAR_EXAMPLES.user3, fallback: "JR", alt: "Juan" },
  { src: AVATAR_EXAMPLES.user4, fallback: "ML", alt: "María" },
  { fallback: "PG", alt: "Pedro" },
  { fallback: "LS", alt: "Laura" },
];

/**
 * Componente de demostración de todas las variaciones de Avatar
 * Este componente muestra ejemplos de uso de cada variante
 * 
 * NOTA: Este componente es solo para demostración y puede ser eliminado
 * después de integrar los componentes en la aplicación.
 */
const AvatarShowcase = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* 
        NOTA: El banner principal de video NO se toca.
        Todo el contenido de este showcase va DEBAJO del banner existente.
      */}
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Variaciones de Avatar
        </h1>
        <p className="text-muted-foreground mb-12">
          Componentes reutilizables para diferentes contextos de la aplicación.
        </p>

        {/* ============================================================= */}
        {/* 1. ENCABEZADO SECUNDARIO CON AVATAR A LA DERECHA */}
        {/* ============================================================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            1. Encabezado con Avatar
          </h2>
          <div className="bg-card rounded-xl p-6 border border-border">
            <SectionHeaderWithAvatar
              title="Mi Panel de Inversiones"
              subtitle="Gestiona tu portafolio y revisa tus rendimientos"
              src={AVATAR_EXAMPLES.user1}
              fallback="Carlos Mendoza"
              size="lg"
            />
          </div>
        </section>

        {/* ============================================================= */}
        {/* 2. CARDS DE PERFIL CON AVATAR CENTRADO */}
        {/* ============================================================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            2. Cards de Perfil
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ProfileCard
              src={AVATAR_EXAMPLES.user1}
              name="Carlos Mendoza"
              role="Inversionista Premium"
              description="Miembro desde 2023. Especialista en inversiones de renta fija."
            >
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
                Ver Perfil Completo
              </Button>
            </ProfileCard>

            <ProfileCard
              src={AVATAR_EXAMPLES.user2}
              name="Ana García"
              role="Empresaria"
              description="CEO de TechSolutions. Usuario activo de factoring."
            >
              <Button variant="outline" className="w-full">
                Contactar
              </Button>
            </ProfileCard>

            <ProfileCard
              fallback="María Teresa González"
              name="María Teresa González"
              role="Socia Fundadora"
              description="Más de 20 años de experiencia en banca de inversión."
            >
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Email
                </Button>
              </div>
            </ProfileCard>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 3. BARRA LATERAL CON AVATAR (Preview) */}
        {/* ============================================================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            3. Barra Lateral con Avatar (Preview)
          </h2>
          <div className="flex gap-6 bg-card rounded-xl border border-border overflow-hidden">
            {/* Sidebar demo (no sticky para el showcase) */}
            <div className="w-64 bg-muted/20 p-6 flex flex-col border-r border-border">
              <div className="flex flex-col items-center text-center pb-6 border-b border-border">
                <AvatarCustom
                  src={AVATAR_EXAMPLES.user5}
                  fallback="Usuario Demo"
                  size="lg"
                  className="mb-3"
                />
                <h4 className="font-semibold text-foreground">Usuario Demo</h4>
                <p className="text-xs text-muted-foreground mt-1">demo@innovafin.com</p>
              </div>
              <nav className="flex-1 py-6">
                <ul className="space-y-2">
                  {sidebarLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {link.icon}
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="pt-6 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
            
            {/* Contenido principal demo */}
            <div className="flex-1 p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Contenido Principal
              </h3>
              <p className="text-muted-foreground">
                La barra lateral con avatar permite una navegación intuitiva mientras muestra 
                la información del usuario de forma prominente. En producción, esta barra 
                sería sticky y permanecería visible mientras el usuario hace scroll.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 4. TESTIMONIOS CON AVATAR PEQUEÑO */}
        {/* ============================================================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            4. Testimonios con Avatar
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialWithAvatar
                key={index}
                src={testimonial.src}
                name={testimonial.name}
                role={testimonial.role}
                testimonial={testimonial.testimonial}
                date={testimonial.date}
              />
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* 5. AVATARES EN LÍNEA */}
        {/* ============================================================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            5. Avatares en Línea (para listas)
          </h2>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            <div className="p-4">
              <InlineAvatar
                src={AVATAR_EXAMPLES.user1}
                name="Carlos Mendoza"
                subtitle="Inversionista Premium"
                action={
                  <Button variant="ghost" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                }
              />
            </div>
            <div className="p-4">
              <InlineAvatar
                src={AVATAR_EXAMPLES.user2}
                name="Ana García"
                subtitle="Empresaria"
                action={
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                }
              />
            </div>
            <div className="p-4">
              <InlineAvatar
                fallback="María López"
                name="María López"
                subtitle="Nuevo usuario"
              />
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 6. GRUPO DE AVATARES */}
        {/* ============================================================= */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            6. Grupo de Avatares
          </h2>
          <div className="flex flex-wrap gap-8 items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tamaño pequeño (max 4):</p>
              <AvatarGroup avatars={teamAvatars} max={4} size="sm" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tamaño mediano (max 3):</p>
              <AvatarGroup avatars={teamAvatars} max={3} size="md" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Todos los tamaños:</p>
              <div className="flex gap-4 items-end">
                <AvatarCustom size="xs" fallback="XS" />
                <AvatarCustom size="sm" fallback="SM" />
                <AvatarCustom size="md" fallback="MD" />
                <AvatarCustom size="lg" fallback="LG" />
                <AvatarCustom size="xl" fallback="XL" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* NOTAS DE USO */}
        {/* ============================================================= */}
        <section className="bg-muted/30 rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            📝 Notas de Uso
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>AvatarCustom:</strong> Componente base reusable con tamaños xs, sm, md, lg, xl</li>
            <li>• <strong>SectionHeaderWithAvatar:</strong> Para encabezados de sección con avatar a la derecha</li>
            <li>• <strong>ProfileCard:</strong> Cards de perfil con avatar centrado, ideal para equipo o usuarios</li>
            <li>• <strong>SidebarWithAvatar:</strong> Barra lateral sticky con navegación y perfil de usuario</li>
            <li>• <strong>TestimonialWithAvatar:</strong> Comentarios o testimonios con avatar pequeño</li>
            <li>• <strong>InlineAvatar:</strong> Para listas o elementos en línea</li>
            <li>• <strong>AvatarGroup:</strong> Para mostrar múltiples usuarios con solapamiento</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AvatarShowcase;
