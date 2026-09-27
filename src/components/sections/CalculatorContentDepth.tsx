import type { FAQSchemaItem } from "@/lib/metadata";

export interface CalculatorContentDepthData {
  exampleTitle: string;
  exampleIntro: string;
  exampleSteps: string[];
  interpretation: string;
  differentiatorTitle: string;
  differentiator: string;
  mistakes: string[];
  extraFaqs: FAQSchemaItem[];
}

interface CalculatorContentDepthProps {
  content: CalculatorContentDepthData;
}

export function CalculatorContentDepth({ content }: CalculatorContentDepthProps) {
  return (
    <section className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{content.exampleTitle}</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{content.exampleIntro}</p>
        </div>
        <ol className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {content.exampleSteps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-[var(--brand-text)]">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-slate-950 dark:text-slate-300">
          {content.interpretation}
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-primary">{content.differentiatorTitle}</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{content.differentiator}</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white">Common mistakes to avoid</h4>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {content.mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
