import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface GlobalCardProps {
  icon: IconType;
  title: string;
  description: string;
  href: string;
  category?: string;
  categoryColor?: string;
  categoryBg?: string;
  accent?: string;
  index?: number;
  footer?: ReactNode;
}

export default function GlobalCard({ icon: Icon, title, description, href, category, categoryColor, categoryBg, accent, footer }: GlobalCardProps) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]" style={{ color: accent }}><Icon size={21} /></div>
        {category && <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: categoryColor, backgroundColor: categoryBg }}>{category}</span>}
      </div>
      <h3 className="text-base font-bold text-[var(--brand-text)] transition-colors group-hover:text-[var(--brand)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{description}</p>
      {footer ?? <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)]">Open calculator <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>}
    </Link>
  );
}
