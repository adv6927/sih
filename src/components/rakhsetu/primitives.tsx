import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  onClick,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "glass fade-up rounded-2xl p-6 outline-none",
        onClick && "glow-hover cursor-pointer focus-visible:border-primary/60",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ icon, title, hint }: { icon?: ReactNode; title: string; hint?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        {icon ? <span className="text-primary">{icon}</span> : null}
        <h3 className="text-sm font-semibold tracking-wide text-foreground">{title}</h3>
      </div>
      {hint ? (
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}

export function Bar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(100, value)}%`,
          background: "linear-gradient(90deg, var(--rose-deep), var(--rose))",
        }}
      />
    </div>
  );
}

export function Tag({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "rose" | "critical";
}) {
  const tones = {
    muted: "bg-muted text-muted-foreground border-border",
    rose: "bg-primary/12 text-primary border-primary/30",
    critical: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Drawer({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string | undefined;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-400",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-full max-w-[440px] flex-col border-l border-primary/15 bg-[#0c0c0f]/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle ? (
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <X size={16} />
          </button>
        </header>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">{children}</div>
      </aside>
    </>
  );
}
