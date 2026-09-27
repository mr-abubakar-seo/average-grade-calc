import type { ReactNode } from "react";

interface HeadingCard {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface GlobalHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  alignment?: "left" | "center";
  fullHeight?: boolean;
  className?: string;
  children?: ReactNode;
  cards?: HeadingCard[];
}

const sizeClasses = {
  sm: "text-[clamp(1.05rem,2.6vw,1.375rem)]",
  md: "text-[clamp(1.375rem,4vw,2rem)]",
  lg: "text-[clamp(1.75rem,5.5vw,3rem)]",
  xl: "text-[clamp(2.1rem,7vw,3.75rem)]",
};

const displayFont = '[font-family:var(--font-display,"Inter","Helvetica_Neue",Arial,sans-serif)]';
const bodyFont = '[font-family:var(--font-body,"Inter","Helvetica_Neue",Arial,sans-serif)]';

export default function GlobalHeading({
  as: Component = "h2",
  badge,
  title,
  titleHighlight,
  subtitle,
  size = "lg",
  alignment = "center",
  fullHeight = false,
  className = "",
  children,
  cards,
}: GlobalHeadingProps) {
  const isCenter = alignment === "center";
  const index = titleHighlight ? title.indexOf(titleHighlight) : -1;
  const hasHighlight = index >= 0;

  return (
    <section
      className={`relative w-full overflow-hidden ${
        fullHeight
          ? "min-h-[100svh] min-h-[100dvh] flex items-center justify-center py-[clamp(1.5rem,6svh,4rem)]"
          : className.includes("py-0") ? "" : "py-[clamp(1.25rem,4vw,3rem)]"
      } ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-50 h-full w-full opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,var(--brand-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-muted)_1px,transparent_1px)] bg-[size:28px_28px] sm:bg-[size:32px_32px] md:bg-[size:40px_40px]" />
      <div aria-hidden="true" className="absolute inset-0 -z-40 h-full w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,color-mix(in_srgb,var(--brand)_8%,transparent),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,color-mix(in_srgb,var(--brand)_12%,transparent),transparent_70%)]" />

      <div className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 md:px-8 ${className.includes("py-0") ? "gap-2 sm:gap-3 md:gap-4" : "gap-4 sm:gap-6 md:gap-8"} ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
        {badge && (
          <div className={isCenter ? "mx-auto" : ""}>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--brand)_18%,transparent)] bg-[color-mix(in_srgb,var(--brand-surface)_80%,transparent)] px-3 py-1.5 shadow-sm backdrop-blur-sm md:px-4 md:py-2 dark:bg-[var(--brand-soft)]">
              <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)] md:h-2 md:w-2" />
              <span className={`truncate text-[10px] font-bold uppercase tracking-widest text-[var(--brand)] dark:text-[var(--brand-text)] md:text-xs ${displayFont}`}>{badge}</span>
            </div>
          </div>
        )}

        <div className="w-full">
          <Component className={`m-0 mx-auto max-w-5xl break-words font-semibold leading-[1.12] tracking-tight ${sizeClasses[size]} ${displayFont}`}>
            {hasHighlight ? <><span className="text-[var(--brand)] dark:text-[var(--brand-text)]">{title.slice(0, index)}</span><span className="text-[var(--brand)] dark:text-[var(--brand-text)]">{titleHighlight}</span><span className="text-[var(--brand)] dark:text-[var(--brand-text)]">{title.slice(index + titleHighlight!.length)}</span></> : <span className="text-[var(--brand)] dark:text-[var(--brand-text)]">{title}</span>}
          </Component>
        </div>

        {subtitle && <p className={`max-w-2xl text-[clamp(0.95rem,2.2vw,1.25rem)] font-normal leading-relaxed text-[var(--brand-muted)] opacity-90 ${bodyFont}`}>{subtitle}</p>}
        {children && <div className="flex w-full justify-center pt-1 sm:pt-2 md:pt-4">{children}</div>}

        {cards && cards.length > 0 && (
          <div className={`mx-auto grid w-full gap-3 pt-2 sm:gap-4 sm:pt-4 ${cards.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} ${cards.length === 1 ? "max-w-sm" : cards.length === 2 ? "max-w-2xl" : "max-w-4xl"} grid-cols-1 sm:grid-cols-2`}>
            {cards.map((card) => <div key={card.title} className="group rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_70%,transparent)] p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md backdrop-blur-sm sm:p-5">{card.icon && <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] dark:text-[var(--brand-text)]">{card.icon}</div>}<h3 className={`m-0 mb-1.5 text-sm font-semibold text-[var(--brand-text)] sm:text-base ${displayFont}`}>{card.title}</h3><p className={`m-0 text-xs leading-relaxed text-[var(--brand-muted)] sm:text-sm ${bodyFont}`}>{card.description}</p></div>)}
          </div>
        )}
      </div>
    </section>
  );
}
