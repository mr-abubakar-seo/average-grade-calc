import { FiInfo } from "react-icons/fi";

interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
  imageSrc: string;
  imageAlt: string;
  title?: string;
}

export function HowItWorks({ steps, imageSrc, imageAlt, title = "How It Works" }: HowItWorksProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-[var(--brand-text)]">
            <FiInfo size={22} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-indigo-600 dark:text-[var(--brand-text)] text-sm font-black flex items-center justify-center shadow-sm group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all duration-300">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-1 group-hover:text-indigo-600 dark:group-hover:text-[var(--brand-text)] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-20 dark:opacity-30"></div>
            <div className="relative aspect-video md:aspect-auto md:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
