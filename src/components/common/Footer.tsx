import Image from "next/image";
import Link from "next/link";
import { Calculator, GraduationCap, DollarSign, Info } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const FOOTER_SECTIONS = [
  {
    title: "Academic Tools",
    icon: GraduationCap,
    links: [
      { name: "GPA Calculator", href: ROUTES.gpaCalculator },
      { name: "CGPA Calculator", href: ROUTES.cgpaCalculator },
      { name: "Final Grade Target", href: ROUTES.finalGradeCalculator },
      { name: "Semester Grade", href: ROUTES.semesterGradeCalculator },
    ],
  },
  {
    title: "Conversions",
    icon: Calculator,
    links: [
      { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
      { name: "SGPA to CGPA", href: ROUTES.sgpaToCgpa },
      { name: "SGPA to Percentage", href: ROUTES.sgpaToPercentage },
      { name: "Percentage to CGPA", href: ROUTES.percentageToCgpa },
    ],
  },
  {
    title: "Utility Metrics",
    icon: DollarSign,
    links: [
      { name: "Marks Percentage", href: ROUTES.marksPercentageCalculator },
      { name: "Loan Calculator", href: ROUTES.loanCalculator },
      { name: "Percentage Calculator", href: ROUTES.percentageCalculator },
      { name: "Tip Calculator", href: ROUTES.tipCalculator },
      { name: "Password Generator", href: ROUTES.passwordGenerator },
    ],
  },
  {
    title: "Platform",
    icon: Info,
    links: [
      { name: "About Our Suite", href: ROUTES.about },
      { name: "Contact & Support", href: ROUTES.contact },
      { name: "Frequently Asked", href: ROUTES.faq },
      { name: "Blog", href: ROUTES.blog },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60 dark:border-slate-800/80 dark:bg-slate-950/60 py-16 px-6 mt-12 print:hidden transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        {/* Top Section: Branding + Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 pb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1 sm:col-span-2">
            <Link 
              href={ROUTES.home}
              className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md w-fit"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700">
                <Image
                  src="/assets/logo.webp"
                  alt="Average Grade Calculator logo"
                  fill
                  sizes="56px"
                  quality={100}
                  unoptimized
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium max-w-sm">
              Average Grade Calculator brings together academic and utility tools in one clean, fast, and free experience.
            </p>
          </div>

          {/* Dynamic Category Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                <section.icon className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>{section.title}</span>
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)] transition-colors duration-200 block w-fit outline-none focus-visible:text-indigo-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Compliance & Legal */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Average Grade Calculator. All tools are open-access, verified, and completely free.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href={ROUTES.privacyPolicy} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors outline-none focus-visible:text-slate-700">Privacy Policy</Link>
            <Link href={ROUTES.cookies} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors outline-none focus-visible:text-slate-700">Cookie Policy</Link>
            <Link href={ROUTES.disclaimer} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors outline-none focus-visible:text-slate-700">Disclaimer</Link>
            <Link href={ROUTES.terms} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors outline-none focus-visible:text-slate-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
