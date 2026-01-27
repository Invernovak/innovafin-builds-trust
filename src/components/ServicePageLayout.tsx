import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSidebar from '@/components/ServicesSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LucideIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceFeature {
  text: string;
}

interface ServicePageLayoutProps {
  icon: LucideIcon;
  title: string;
  description: string;
  extendedDescription?: string;
  features: ServiceFeature[];
  featuresTitle: string;
  accentColor: 'primary' | 'blue' | 'emerald' | 'violet' | 'amber';
  nextService?: {
    title: string;
    route: string;
  };
  prevService?: {
    title: string;
    route: string;
  };
}

const colorClasses = {
  primary: {
    iconBg: 'bg-gradient-to-br from-primary to-primary/80',
    iconText: 'text-primary-foreground',
    badge: 'bg-primary/10 text-primary border-primary/20',
    gradient: 'from-primary/5 via-primary/3 to-transparent',
    bullet: 'bg-primary',
    featureBg: 'from-primary/5 to-primary/10',
    border: 'border-primary/20',
  },
  blue: {
    iconBg: 'bg-gradient-to-br from-blue-600 to-blue-500',
    iconText: 'text-white',
    badge: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    gradient: 'from-blue-500/5 via-blue-500/3 to-transparent',
    bullet: 'bg-blue-600',
    featureBg: 'from-blue-500/5 to-indigo-500/10',
    border: 'border-blue-500/20',
  },
  emerald: {
    iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-500',
    iconText: 'text-white',
    badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    gradient: 'from-emerald-500/5 via-emerald-500/3 to-transparent',
    bullet: 'bg-emerald-600',
    featureBg: 'from-emerald-500/5 to-teal-500/10',
    border: 'border-emerald-500/20',
  },
  violet: {
    iconBg: 'bg-gradient-to-br from-violet-600 to-violet-500',
    iconText: 'text-white',
    badge: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
    gradient: 'from-violet-500/5 via-violet-500/3 to-transparent',
    bullet: 'bg-violet-600',
    featureBg: 'from-violet-500/5 to-purple-500/10',
    border: 'border-violet-500/20',
  },
  amber: {
    iconBg: 'bg-gradient-to-br from-amber-600 to-amber-500',
    iconText: 'text-white',
    badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    gradient: 'from-amber-500/5 via-amber-500/3 to-transparent',
    bullet: 'bg-amber-600',
    featureBg: 'from-amber-500/5 to-orange-500/10',
    border: 'border-amber-500/20',
  },
};

const ServicePageLayout = ({
  icon: Icon,
  title,
  description,
  extendedDescription,
  features,
  featuresTitle,
  accentColor,
  nextService,
  prevService,
}: ServicePageLayoutProps) => {
  const navigate = useNavigate();
  const colors = colorClasses[accentColor];
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero section with gradient background */}
        <div className={cn("relative overflow-hidden mb-12", `bg-gradient-to-br ${colors.gradient}`)}>
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="container-narrow mx-auto px-4 py-16 relative">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/#servicios')}
              className="mb-8 group lg:hidden"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Volver a Servicios
            </Button>

            <div 
              ref={headerRef}
              className={cn(
                "flex flex-col md:flex-row items-start gap-6 transition-all duration-700",
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {/* Icon */}
              <div className="relative">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-500 hover:scale-105",
                  colors.iconBg
                )}>
                  <Icon className={cn("w-10 h-10", colors.iconText)} strokeWidth={1.5} />
                </div>
                <div className={cn(
                  "absolute -inset-2 rounded-2xl border-2 opacity-50",
                  colors.border
                )} />
              </div>
              
              {/* Title and Badge */}
              <div className="flex-1">
                <span className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border",
                  colors.badge
                )}>
                  <span className={cn("w-2 h-2 rounded-full animate-pulse", colors.bullet)} />
                  Servicio Especializado
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container-narrow mx-auto px-4">
          <div className="flex gap-12">
            <ServicesSidebar />
            
            <div className="flex-1 max-w-4xl">
              {/* Description */}
              <div 
                ref={contentRef}
                className={cn(
                  "transition-all duration-700 delay-100",
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {description}
                </p>
                
                {extendedDescription && (
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {extendedDescription}
                  </p>
                )}
              </div>

              {/* Features Card */}
              <div 
                ref={featuresRef}
                className={cn(
                  "relative rounded-2xl p-8 mt-8 border transition-all duration-700 delay-200 overflow-hidden",
                  `bg-gradient-to-br ${colors.featureBg}`,
                  colors.border,
                  featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                </div>
                
                <div className="relative">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className={cn("w-1 h-6 rounded-full", colors.bullet)} />
                    {featuresTitle}
                  </h2>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-4 group"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <span className={cn(
                          "w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-125",
                          colors.bullet
                        )} />
                        <span className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation between services */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <div className="flex justify-between items-center gap-4">
                  {prevService ? (
                    <Link 
                      to={prevService.route}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                      <div className="text-left">
                        <span className="text-xs text-muted-foreground block">Anterior</span>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{prevService.title}</span>
                      </div>
                    </Link>
                  ) : <div />}
                  
                  {nextService ? (
                    <Link 
                      to={nextService.route}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground block">Siguiente</span>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{nextService.title}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ) : <div />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePageLayout;
