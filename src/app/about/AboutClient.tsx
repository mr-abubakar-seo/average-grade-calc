import Link from "next/link";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiEye,
  FiLock,
  FiMail,
  FiRefreshCw,
  FiZap,
} from "react-icons/fi";
import GlobalHeading from "@/components/ui/GlobalHeading";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { AboutHero } from "@/components/sections/AboutHero";
import { ROUTES } from "@/lib/routes";

const buildPrinciples = [
  {
    icon: FiBookOpen,
    title: "Standard formulas",
    text: "The calculators use common academic conventions and weighted-average methods where they apply.",
  },
  {
    icon: FiCheckCircle,
    title: "Manual testing",
    text: "Each tool is checked against worked examples before it is published or updated.",
  },
  {
    icon: FiEye,
    title: "Clear context",
    text: "When a formula can vary by school or institution, the calculator page explains that difference.",
  },
];

const privacyPoints = [
  "Calculations run in your browser",
  "No account is required",
  "Inputs are not stored on our servers",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[10%] right-[-12%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>

      <div className="relative z-10 pb-8 pt-4">
        <AboutHero />

        <main className="mx-auto max-w-6xl space-y-14 px-4 pt-12 sm:px-6 sm:pt-16 lg:space-y-16 lg:pt-20">
          <section id="story">
            <GlobalHeading
              as="h2"
              badge="About Average Grade Calculator"
              title="Why I Built This"
              subtitle="The story, the person, and the principles behind the tools you're using."
              size="md"
              alignment="center"
              className="mb-8 py-0"
            />

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
              <article className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm sm:p-8">
                <p className="text-lg leading-8 text-[var(--brand-muted)]">
                  I'm <strong className="font-bold text-[var(--brand-text)]">Abubakar</strong>, and I built Average Grade Calculator because I was tired of opening five different tabs just to check a GPA, convert a CGPA, or figure out what I needed on a final exam.
                </p>
                <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
                  Most calculator sites I found were cluttered with pop-ups, gave no context on how the math actually worked, or buried a simple formula behind pages of unrelated content. I wanted one clean place with tools that just work, and that explain the formula behind every result instead of hiding it.
                </p>
                <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
                  This site started as a small side project to solve my own problem as a student, and grew into a set of 15 tools covering grades, GPA and CGPA conversions, and a few everyday utility calculators people asked me to add along the way.
                </p>
              </article>

              <aside className="relative overflow-hidden rounded-3xl bg-[var(--brand)] p-6 text-white shadow-xl shadow-[color-mix(in_srgb,var(--brand)_20%,transparent)] sm:p-8">
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <FiZap className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Clean tools</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight">Simple results without the noise.</h3>
                  <div className="mt-7 grid gap-3">
                    {["15 useful calculators", "Formula explanations", "Fast browser-based results"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                        <FiCheckCircle className="h-5 w-5 shrink-0 text-white" />
                        <span className="text-sm font-bold text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section>
            <GlobalHeading
              as="h2"
              badge="How it works"
              title="How the calculators are built"
              subtitle="Every formula is selected carefully, tested manually, and explained clearly on the relevant calculator page."
              size="md"
              alignment="center"
              className="mb-8 py-0"
            />

            <div className="grid gap-4 md:grid-cols-3">
              {buildPrinciples.map((item, index) => (
                <div key={item.title} className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--brand-text)]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--brand-muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-white">
                <FiLock className="h-5 w-5" />
              </div>
              <GlobalHeading
                as="h2"
                badge="Privacy, by design"
                title="Your inputs stay private"
                size="sm"
                alignment="left"
                className="mb-5 py-0"
              />
              <p className="text-base leading-7 text-[var(--brand-muted)]">
                Every calculation runs locally in your browser. The numbers you type in, including grades, loan amounts, or bill totals, are never sent to a server or stored anywhere.
              </p>
              <div className="mt-5 grid gap-2">
                {privacyPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] px-4 py-3">
                    <FiCheckCircle className="h-5 w-5 shrink-0 text-[var(--brand)] dark:text-white" />
                    <span className="text-sm font-bold text-[var(--brand-text)]">{point}</span>
                  </div>
                ))}
              </div>
              <Link href={ROUTES.privacyPolicy} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] dark:text-white">
                Full details in the Privacy Policy <FiArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-white">
                <FiRefreshCw className="h-5 w-5" />
              </div>
              <GlobalHeading
                as="h2"
                badge="How this site stays free"
                title="Free access, supported responsibly"
                size="sm"
                alignment="left"
                className="mb-5 py-0"
              />
              <p className="text-base leading-7 text-[var(--brand-muted)]">
                Average Grade Calculator is free to use, with no signups, subscriptions, or paywalls. To cover hosting and keep building new tools, the site displays advertising through Google AdSense.
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--brand-muted)]">
                Ads never appear inside the calculators themselves and never affect the accuracy of a result.
              </p>
              <Link href={ROUTES.disclaimer} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] dark:text-white">
                Full details in the Disclaimer <FiArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </section>

          <section className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <GlobalHeading
                as="h2"
                badge="What's next"
                title="Built from real requests"
                subtitle="I add and update tools based on what people actually ask for."
                size="md"
                alignment="left"
                className="py-0"
              />
              <div>
                <p className="text-lg leading-8 text-[var(--brand-muted)]">
                  If there is a calculator you wish existed, or something on an existing page that feels confusing or wrong, reach out through the Contact page. I read every message myself.
                </p>
                <Link href={ROUTES.contact} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                  Contact Abubakar <FiMail className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className="relative z-10 px-4 pb-6 sm:px-6 sm:pb-8 lg:pb-10">
        <AboutCTA />
      </div>
    </div>
  );
}
