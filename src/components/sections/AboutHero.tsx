import GlobalHeading from "@/components/ui/GlobalHeading";
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiGlobe, FiLock, FiZap } from "react-icons/fi";
import { ROUTES } from "@/lib/routes";

export function AboutHero() {
  return (
    <section className="px-6 pb-6 pt-4 md:pt-5">
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,430px)]">
        <div>
          <GlobalHeading
            as="h1"
            badge="About Average Grade Calculator"
            title="Making Everyday Calculations Simple for Everyone"
            subtitle="Powerful, accurate calculators should be free and easy to use for students, homeowners, and anyone who needs quick, reliable answers."
            size="xl"
            alignment="left"
            fullHeight={false}
            className="py-0"
          >
            <div className="w-full space-y-4">
              <div className="flex flex-wrap gap-3">
                <a href="#story" className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--brand-deep)]">
                  Our Story
                  <FiArrowRight className="h-4 w-4" />
                </a>
                <a href={ROUTES.home} className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-text)] shadow-sm transition-colors hover:bg-[var(--brand-soft)]">
                  Explore Tools
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] dark:text-[var(--brand-text)]">Platform Snapshot</p>
                <h2 className="mt-1 text-base font-semibold text-[var(--brand-text)]">Built for practical accuracy</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-[var(--brand-text)]">
                <FiBookOpen className="h-4 w-4" />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,var(--brand-soft))] p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-muted)]">Core Promises</span>
                <span className="rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)] dark:text-[var(--brand-text)]">Free</span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: FiCheckCircle, label: "Verified formulas", value: "Reliable results" },
                  { icon: FiLock, label: "Private by design", value: "Local inputs" },
                  { icon: FiGlobe, label: "Works everywhere", value: "All devices" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-[var(--brand-surface)] px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-[var(--brand)]" />
                      <span className="text-sm font-medium text-[var(--brand-text)]">{item.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-[var(--brand-muted)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {[
                { label: "Tools", value: "15" },
                { label: "Access", value: "Free" },
                { label: "Speed", value: "Fast" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-2.5 text-center">
                  <div className="text-base font-bold text-[var(--brand-text)]">{item.value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-muted)]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
