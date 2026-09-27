import Link from "next/link";

interface GlobalCTAProps {
  title: string;
  highlightText?: string;
  subtitle: string;
  badgeText?: string;
  primaryBtnText: string;
  secondaryBtnText?: string;
  primaryLink: string;
  secondaryLink?: string;
}

export default function GlobalCTA({ title, highlightText, subtitle, badgeText, primaryBtnText, secondaryBtnText, primaryLink, secondaryLink }: GlobalCTAProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-5 py-10 text-center shadow-sm sm:px-8 sm:py-14">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,color-mix(in_srgb,var(--brand)_12%,transparent),transparent_70%)]" />
      {badgeText && <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand)]">{badgeText}</p>}
      <h2 className="mx-auto max-w-3xl text-2xl font-bold tracking-tight text-[var(--brand-text)] sm:text-4xl">{title} {highlightText && <span className="text-[var(--brand)]">{highlightText}</span>}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">{subtitle}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href={primaryLink} className="rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-deep)]">{primaryBtnText}</Link>
        {secondaryBtnText && secondaryLink && <Link href={secondaryLink} className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-5 py-3 text-sm font-bold text-[var(--brand-text)] transition-colors hover:bg-[var(--brand-soft)]">{secondaryBtnText}</Link>}
      </div>
    </section>
  );
}
