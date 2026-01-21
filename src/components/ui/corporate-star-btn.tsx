import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface CorporateStarBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  duration?: number;
}

const CorporateStarBtn = React.forwardRef<HTMLButtonElement, CorporateStarBtnProps>(
  ({ className, asChild = false, duration = 6, children, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(
          "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-8 py-3 text-sm font-semibold",
          "bg-primary text-primary-foreground",
          "transition-all duration-300 hover:scale-105",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "overflow-hidden",
          className
        )}
        ref={ref}
        style={{ "--duration": duration, ...style } as React.CSSProperties}
        {...props}
      >
        {/* Animated star/glow effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)`,
            maskImage: `linear-gradient(90deg, transparent, white, transparent)`,
            WebkitMaskImage: `linear-gradient(90deg, transparent, white, transparent)`,
          }}
        >
          <div 
            className="absolute h-full w-20 animate-star-btn"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--accent)), hsl(var(--secondary)), transparent)`,
              offsetPath: `rect(0 100% 100% 0 round 0.75rem)`,
              boxShadow: `0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent) / 0.5)`,
            }}
          />
        </div>
        
        {/* Border glow */}
        <span 
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(90deg, transparent 40%, hsl(var(--accent) / 0.3), transparent 60%)`,
          }}
        >
          <span 
            className="absolute h-2 w-2 rounded-full animate-star-btn"
            style={{
              background: `hsl(var(--accent))`,
              offsetPath: `rect(0 100% 100% 0 round 0.75rem)`,
              boxShadow: `0 0 10px hsl(var(--accent)), 0 0 20px hsl(var(--accent)), 0 0 30px hsl(var(--secondary))`,
            }}
          />
        </span>
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
      </Comp>
    );
  }
);
CorporateStarBtn.displayName = "CorporateStarBtn";

export { CorporateStarBtn };
