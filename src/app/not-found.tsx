import Link from 'next/link';
import { FiArrowRight, FiHome, FiSearch } from 'react-icons/fi';
import { ROUTES } from '@/lib/routes';

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 left-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
      </div>

      <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,transparent)] p-8 shadow-[0_24px_80px_-24px_color-mix(in_srgb,var(--brand)_28%,transparent)] backdrop-blur md:p-12">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300">
            Error 404
          </p>

          <h1 className="text-4xl font-medium leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl [font-family:var(--font-playfair)]">
            This page took a wrong turn.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
            The page you requested does not exist or may have been moved. Use the actions below to get
            back to Average Grade Calculator tools and continue where you left off.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={ROUTES.home}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
            >
              <FiHome className="h-4 w-4" />
              Go to Homepage
            </Link>

            <Link
              href={ROUTES.faq}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <FiSearch className="h-4 w-4" />
              Browse FAQs
            </Link>
          </div>

          <div className="mt-10 grid gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-xs text-slate-600 md:grid-cols-3 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            <Link href={ROUTES.gpaCalculator} className="group inline-flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/80 dark:hover:bg-white/10">
              <span>GPA Calculator</span>
              <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href={ROUTES.finalGradeCalculator} className="group inline-flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/80 dark:hover:bg-white/10">
              <span>Final Grade Calculator</span>
              <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href={ROUTES.contact} className="group inline-flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/80 dark:hover:bg-white/10">
              <span>Contact Support</span>
              <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
