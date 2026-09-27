import GlobalHeading from "@/components/ui/GlobalHeading";
import {
  FiArrowRight,
  FiBarChart2,
  FiBook,
  FiClock,
  FiShield,
} from "react-icons/fi";
import { ROUTES } from "@/lib/routes";

export function HomeHero() {
  return (
    <section className="px-4 pb-12 pt-4 sm:px-6 sm:pb-16 md:pt-5 lg:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,430px)]">
        <div>
          <GlobalHeading
            as="h1"
            badge="Average Grade Calculator Suite"
            title="Average Grade Calculator"
            subtitle="A sharper way to calculate your average grade — fast tools, clean layout and results you can trust."
            size="xl"
            alignment="left"
            fullHeight={false}
            className="py-0"
          >
            <div className="w-full space-y-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#calculator-library"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--brand-deep)]"
                >
                  Explore Calculators
                  <FiArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={ROUTES.gpaCalculator}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-text)] shadow-sm transition-colors hover:bg-[var(--brand-soft)]"
                >
                  Open GPA Calculator
                </a>
              </div>
            </div>
          </GlobalHeading>
        </div>

        <div className="relative mx-auto w-full max-w-[430px]">
          <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--brand)_18%,transparent),transparent_55%),radial-gradient(circle_at_bottom_left,color-mix(in_srgb,var(--brand)_18%,transparent),transparent_48%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_92%,transparent)] p-4 shadow-[0_20px_60px_color-mix(in_srgb,var(--brand)_10%,transparent)] backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] dark:text-[var(--brand-text)]">
                  Smart Dashboard
                </p>
                <h2 className="mt-1 text-base font-semibold text-[var(--brand-text)]">
                  Study metrics at a glance
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-[var(--brand-text)]">
                <FiBarChart2 className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,var(--brand-soft))] p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-muted)]">
                  Quick Highlights
                </span>
                <span className="rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)] dark:text-[var(--brand-text)]">
                  Live
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: FiBook, label: "Academic tools", value: "11 calculators", color: "text-[var(--brand)]" },
                  { icon: FiClock, label: "Fast workflow", value: "Manual calculate mode", color: "text-[var(--brand)]" },
                  { icon: FiShield, label: "Reliable output", value: "Structured result panels", color: "text-[var(--brand)]" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-[var(--brand-surface)] px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-sm font-medium text-[var(--brand-text)]">{item.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-[var(--brand-muted)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {[
                { label: "Accuracy", value: "99%" },
                { label: "Tools", value: "15" },
                { label: "Access", value: "Free" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-2.5 text-center">
                  <div className="text-base font-bold text-[var(--brand-text)]">{item.value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-muted)]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
