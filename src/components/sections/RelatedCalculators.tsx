import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
  name: string;
  href: string;
}

interface RelatedCalculatorsProps {
  links: RelatedLink[];
}

export function RelatedCalculators({ links }: RelatedCalculatorsProps) {
  return (
    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-xl font-bold tracking-tight mb-6">Related Calculators</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all"
          >
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-[var(--brand-text)]">
              {link.name}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-[var(--brand-text)] group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}
