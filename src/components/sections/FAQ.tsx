import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { generateFAQSchema, type FAQSchemaItem } from "@/lib/metadata";

type FAQItem = FAQSchemaItem;

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const schema = generateFAQSchema(items);

  return (
    <section className="space-y-6 border-t pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-[var(--brand-text)]"><FiHelpCircle size={22} /></div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="grid gap-3">
        {items.map((faq, index) => (
          <details key={faq.q} name="faq-accordion" open={index === 0} className="group rounded-2xl border border-slate-200 bg-white transition-all duration-300 open:border-indigo-500/30 open:bg-indigo-50/30 open:shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:open:bg-indigo-500/5">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between p-5 text-left outline-none [&::-webkit-details-marker]:hidden">
              <span className="text-base font-bold text-slate-700 transition-colors group-open:text-indigo-600 dark:text-slate-200 dark:group-open:text-[var(--brand-text)]">{faq.q}</span>
              <FiChevronDown size={20} className="shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-indigo-500" />
            </summary>
            <div className="px-5 pb-5 pt-0">
              <div className="mb-4 h-px bg-slate-200/50 dark:bg-slate-800/50" />
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
