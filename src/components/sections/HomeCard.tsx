import {
  FiBookOpen, FiTrendingUp, FiAward,
  FiRefreshCw, FiLayers, FiPercent, FiDollarSign,
  FiLock, FiZap, FiSliders,
} from 'react-icons/fi';
import GlobalCard from '../ui/GlobalCard';
import GlobalHeading from '../ui/GlobalHeading';
import { ROUTES } from '@/lib/routes';

// ─── Data ────────────────────────────────────────────────────────────────────
const categoryColors = {
  Academic:  { bg: 'var(--brand-soft)', text: 'var(--brand)', accent: 'var(--brand)' },
  Financial: { bg: 'var(--brand-soft)', text: 'var(--brand)', accent: 'var(--brand)' },
  Math:      { bg: 'var(--brand-soft)', text: 'var(--brand)', accent: 'var(--brand)' },
  Security:  { bg: 'var(--brand-soft)', text: 'var(--brand)', accent: 'var(--brand-deep)' },
};

const tools = [
  { name: 'Grade Curve Calculator', path: ROUTES.gradeCurveCalculator, desc: 'Adjust test scores using linear, square root or bell curve methods.', category: 'Academic' as const, icon: FiSliders },
  { name: 'Semester Grade Calculator', path: ROUTES.semesterGradeCalculator, desc: 'Build weighted grading tables and see your score breakdown instantly.',     category: 'Academic'  as const, icon: FiBookOpen   },
  { name: 'GPA Calculator',        path: ROUTES.gpaCalculator,                desc: 'Track semester GPA and cumulative average on a standard 4.0 scale.',        category: 'Academic'  as const, icon: FiTrendingUp },
  { name: 'CGPA Calculator',       path: ROUTES.cgpaCalculator,               desc: 'Multi-semester engineering trackers with credit-weighted precision.',        category: 'Academic'  as const, icon: FiLayers     },
  { name: 'Final Grade Calculator', path: ROUTES.finalGradeCalculator,        desc: 'Find the exact exam score you need to hit your target grade.',              category: 'Academic'  as const, icon: FiSliders    },
  { name: 'CGPA to Percentage',    path: ROUTES.cgpaToPercentage, desc: 'University-approved conversion algorithms for any institution scale.',      category: 'Academic'  as const, icon: FiAward      },
  { name: 'SGPA to CGPA',          path: ROUTES.sgpaToCgpa,       desc: 'Weighted average accumulation across every semester you\'ve completed.',    category: 'Academic'  as const, icon: FiRefreshCw  },
  { name: 'Marks Percentage',      path: ROUTES.marksPercentageCalculator,   desc: 'Subject-wise aggregates and raw score percentage in one click.',            category: 'Academic'  as const, icon: FiPercent    },
  { name: 'Percentage to CGPA',    path: ROUTES.percentageToCgpa, desc: 'Reverse-engineer university metrics from your percentage score.',          category: 'Academic'  as const, icon: FiRefreshCw  },
  { name: 'SGPA to Percentage',    path: ROUTES.sgpaToPercentage, desc: 'Lightning-fast mathematical percentage translation from SGPA.',            category: 'Academic'  as const, icon: FiZap        },
  { name: 'Loan Calculator',       path: ROUTES.loanCalculator,               desc: 'Amortization schedules and monthly breakdowns for student financing.',     category: 'Financial' as const, icon: FiDollarSign },
  { name: 'Percentage Calculator', path: ROUTES.percentageCalculator,         desc: '3-in-1 multi-variant percentage math for any scenario.',                   category: 'Math'      as const, icon: FiPercent    },
  { name: 'Password Generator',    path: ROUTES.passwordGenerator,           desc: 'Cryptographically secure passwords with custom rules and entropy scores.', category: 'Security'  as const, icon: FiLock       },
  { name: 'Tip Calculator',        path: ROUTES.tipCalculator,                desc: 'Quickly calculate tips and split bills with friends.',                     category: 'Math'      as const, icon: FiDollarSign },
];

// Split tools into 2 columns for masonry
const col1 = tools.filter((_, i) => i % 2 === 0);
const col2 = tools.filter((_, i) => i % 2 !== 0);

// ─── Component ───────────────────────────────────────────────────────────────
export function HomeCard() {
  return (
    <section className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20">
      <GlobalHeading
        as="h2"
        badge="Calculator Library"
        title="Explore Every Calculator"
        titleHighlight="Calculator"
        subtitle="Pick the exact tool you need from our academic, conversion, finance and utility calculators."
        size="md"
        alignment="center"
        className="py-0 mb-8"
      />

      {/* Masonry grid — 1 col mobile, 2 col desktop */}
      <div className="block sm:hidden">
        {/* Mobile: single column staggered list */}
        <div className="flex flex-col gap-4">
          {tools.map((tool, i) => {
            const cat = categoryColors[tool.category];
            return (
              <GlobalCard
                key={tool.path}
                icon={tool.icon}
                title={tool.name}
                description={tool.desc}
                href={tool.path}
                category={tool.category}
                categoryColor={cat.text}
                categoryBg={cat.bg}
                accent={cat.accent}
                index={i}
              />
            );
          })}
        </div>
      </div>

      <div className="hidden sm:flex gap-4 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 flex-1">
          {col1.map((tool, i) => {
            const cat = categoryColors[tool.category];
            return (
              <GlobalCard
                key={tool.path}
                icon={tool.icon}
                title={tool.name}
                description={tool.desc}
                href={tool.path}
                category={tool.category}
                categoryColor={cat.text}
                categoryBg={cat.bg}
                accent={cat.accent}
                index={i * 2}
              />
            );
          })}
        </div>

        {/* Column 2 — offset downward for masonry feel */}
        <div className="mt-8 flex flex-1 flex-col gap-4 lg:mt-10">
          {col2.map((tool, i) => {
            const cat = categoryColors[tool.category];
            return (
              <GlobalCard
                key={tool.path}
                icon={tool.icon}
                title={tool.name}
                description={tool.desc}
                href={tool.path}
                category={tool.category}
                categoryColor={cat.text}
                categoryBg={cat.bg}
                accent={cat.accent}
                index={i * 2 + 1}
              />
            );
          })}
        </div>
      </div>

    </section>
  );
}
