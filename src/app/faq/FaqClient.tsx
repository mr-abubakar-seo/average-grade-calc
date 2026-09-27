'use client';

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { FAQ } from "@/components/sections/FAQ";
import { FaqCTA } from "@/components/sections/FaqCTA";
import { FaqHero } from "@/components/sections/FaqHero";
import GlobalHeading from "@/components/ui/GlobalHeading";
import { ROUTES } from "@/lib/routes";

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const categories = [
  {
    label: "General Questions",
    color: "var(--brand)",
    bg: "var(--brand-soft)",
    items: [
      {
        q: "What is Average Grade Calculator?",
        a: "Average Grade Calculator is a free online website designed to help users get quick and reliable results for everyday calculations.",
      },
      {
        q: "Is Average Grade Calculator free to use?",
        a: "Yes. The website is free to use with no hidden charges.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. You do not need to register or create an account. Simply visit the website and start using it instantly.",
      },
      {
        q: "What can I use this website for?",
        a: "You can use it to enter values, compare results and get clear answers.",
      },
    ],
  },
  {
    label: "Using the Tools",
    color: "var(--brand)", 
    bg: "var(--brand-soft)",
    items: [
      {
        q: "How do I use the website?",
        a: "Choose the page you need, give input and click the Calculate button. Your result will appear on the screen.",
      },
      {
        q: "Are the results accurate?",
        a: "Results are based on reviewed formulas and are designed to be reliable. For important decisions, always verify results independently.",
      },
      {
        q: "Can I use the website on my mobile phone?",
        a: "Yes. Average Grade Calculator is fully mobile friendly and works smoothly on all devices.",
      },
      {
        q: "Do I need to install any software?",
        a: "No installation is required. Everything runs directly in your web browser.",
      },
    ],
  },
  {
    label: "Students & General Public",
    color: "var(--brand)",
    bg: "var(--brand-soft)",
    items: [
      {
        q: "Who can use this website?",
        a: "Anyone can use this website. The website is built for simple, practical calculations across common everyday needs.",
      },
      {
        q: "Can I use results for real life decisions?",
        a: "You can use results as helpful estimates but important decisions should always be checked independently before to take descions in real life.",
      },
      {
        q: "Are there any usage limits?",
        a: "No. You can use the website as many times as you need with no daily limits.",
      },
    ],
  },
  {
    label: "Technical & Support",
    color: "var(--brand-deep)",
    bg: "var(--brand-soft)",
    items: [
      {
        q: "What should I do if something is not working correctly?",
        a: "Please try refreshing the page or clearing your browser cache. If the issue continues, feel free to contact us through our Contact page and we will resolve it as soon as possible.",
      },
      {
        q: "How often is the website updated?",
        a: "We regularly improve the website based on user needs, feedback and quality checks.",
      },
      {
        q: "Is my data safe?",
        a: "Yes. We do not collect, store or share values you enter. Processing happens directly in your browser.",
      },
    ],
  },
];

// Flatten all items for search
const allItems = categories.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.label }))
);

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.q.toLowerCase().includes(query.toLowerCase()) ||
          item.a.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const visibleCategories = activeCategory
    ? categories.filter((c) => c.label === activeCategory)
    : categories;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden transition-colors duration-300">

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>

      <div className="relative z-10 pb-8 py-4">
        <FaqHero />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20">

        <GlobalHeading
          as="h2"
          badge="FAQ Center"
          title="Find answers fast"
          subtitle="Search common questions or browse by topic below."
          size="md"
          alignment="center"
          className="py-0 mb-8"
        />

        {/* ── Search ── */}
        <motion.div id="faq-search" {...fadeUp(0.22)} className="mb-6 sm:mb-8 relative">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveCategory(null); }}
            placeholder="Search questions…"
            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm font-medium outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </motion.div>

        {/* ── Category Filter Pills ── */}
        {!query && (
          <motion.div {...fadeUp(0.28)} className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeCategory === null
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                  : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide border transition-all duration-200 cursor-pointer ${
                  activeCategory === c.label
                    ? "text-white border-transparent shadow-md"
                    : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30"
                }`}
                style={
                  activeCategory === c.label
                    ? { backgroundColor: c.color, boxShadow: `0 4px 12px ${c.color}30` }
                    : {}
                }
              >
                {c.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Search Results ── */}
        {filtered !== null ? (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">No results for "{query}"</p>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Try a different keyword, or{" "}
                  <Link href={ROUTES.contact} className="text-indigo-500 hover:underline">contact us</Link>{" "}
                  directly.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-4">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query}"
                </p>
                <FAQ
                  items={filtered.map((i) => ({ q: i.q, a: i.a }))}
                  title=""
                />
              </>
            )}
          </motion.div>
        ) : (
          /* ── Categorised FAQ sections ── */
          <motion.div
            key="categorised"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-12 sm:space-y-14 lg:space-y-16"
          >
            {visibleCategories.map((cat) => (
              <motion.div key={cat.label} variants={itemVariants}>
                {/* Category heading */}
                <div className="mb-5 flex items-center gap-3 sm:mb-6">
                  <span
                    className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--brand)_18%,transparent)] bg-[var(--brand-soft)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--brand)] dark:text-white"
                  >
                    {cat.label}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--brand-border)] to-transparent" />
                </div>

                <FAQ items={cat.items} title="" />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      </div>

      <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8 lg:pb-10">
        <FaqCTA />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
