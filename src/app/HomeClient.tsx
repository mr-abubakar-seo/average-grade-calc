'use client';

import { useState } from "react";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { HomeCard } from "@/components/sections/HomeCard";
import { HomeHero } from "@/components/sections/HomeHero";
import { UnifiedAverageGradeCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import AverageGradeBlog from "@/app/average-grade-calculator/AverageGradeBlog";

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const [showAverageGradeDetails, setShowAverageGradeDetails] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden transition-colors duration-300">

      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_12%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,var(--brand-soft)_0%,transparent_65%)] blur-[40px]" />
      </div>

      {/* ── Hero ── */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <HomeHero />

        <div id="average-grade-calculator">
          <UnifiedAverageGradeCalculator />
          <div className="container mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
            <button
              type="button"
              aria-expanded={showAverageGradeDetails}
              aria-controls="average-grade-details"
              onClick={() => setShowAverageGradeDetails((visible) => !visible)}
              className="mx-auto mt-5 flex items-center rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--brand)] shadow-sm transition-colors hover:bg-[var(--brand-soft)]"
            >
              {showAverageGradeDetails ? "Show less" : "Show more"}
            </button>

            {showAverageGradeDetails && (
              <div id="average-grade-details">
                <AverageGradeBlog />
              </div>
            )}
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div id="calculator-library">
          <HomeCard />
        </div>
      </main>

      {/* ── Home CTA ── */}
      <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8 lg:pb-10">
        <HomeCTA />
      </div>

      {/* ── Global styles ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--brand-border); border-radius: 99px; }
        .dark ::-webkit-scrollbar-thumb { background: var(--brand-border); }
      `}</style>
    </div>
  );
}
