'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon, Calculator, Menu, X, ChevronDown, GraduationCap, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "@/lib/routes";

import { motion, AnimatePresence } from "framer-motion";
const NAV_ITEMS = [
  {
    name: "Academic",
    icon: GraduationCap,
    links: [
      { name: "GPA Calculator", href: ROUTES.gpaCalculator },
      { name: "CGPA Calculator", href: ROUTES.cgpaCalculator },
      { name: "Grade Curve Calculator", href: ROUTES.gradeCurveCalculator },
      { name: "Final Grade Target", href: ROUTES.finalGradeCalculator },
      { name: "Semester Grade", href: ROUTES.semesterGradeCalculator },
    ]
  },
  {
    name: "Conversions",
    icon: Calculator,
    links: [
      { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
      { name: "SGPA to CGPA", href: ROUTES.sgpaToCgpa },
      { name: "SGPA to Percentage", href: ROUTES.sgpaToPercentage },
      { name: "Percentage to CGPA", href: ROUTES.percentageToCgpa },
    ]
  },
  {
    name: "Other Tools",
    icon: DollarSign,
    links: [
      { name: "Marks Percentage", href: ROUTES.marksPercentageCalculator },
      { name: "Loan Calculator", href: ROUTES.loanCalculator },
      { name: "Percentage Calculator", href: ROUTES.percentageCalculator },
      { name: "Tip Calculator", href: ROUTES.tipCalculator },
      { name: "Password Generator", href: ROUTES.passwordGenerator },
    ]
  }
];

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const showSolidHeader = scrolled || pathname !== "/";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
      toast("Light mode on", {
        icon: <Sun className="h-4 w-4 text-[var(--brand)]" />,
        duration: 2000,
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
      toast("Dark mode on", {
        icon: <Moon className="h-4 w-4 text-[var(--brand)]" />,
        duration: 2000,
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-[65px] flex items-center px-4 md:px-6 transition-all duration-300 print:hidden ${
        showSolidHeader 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href={ROUTES.home} className="group flex items-center gap-2 z-50">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="relative h-11 w-11 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700"
          >
            <Image
              src="/assets/logo.webp"
              alt="Average Grade Calculator logo"
              fill
              sizes="44px"
              quality={100}
              unoptimized
              className="object-contain"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Home link */}
          <Link
            href={ROUTES.home}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === "/"
                ? "text-indigo-600 dark:text-[var(--brand-text)] bg-indigo-50 dark:bg-indigo-950/50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            Home
          </Link>

          {/* About link */}
          <Link
            href={ROUTES.about}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === "/about"
                ? "text-indigo-600 dark:text-[var(--brand-text)] bg-indigo-50 dark:bg-indigo-950/50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            About
          </Link>

          {/* Contact link */}
          <Link
            href={ROUTES.contact}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === "/contact"
                ? "text-indigo-600 dark:text-[var(--brand-text)] bg-indigo-50 dark:bg-indigo-950/50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            Contact
          </Link>

          {/* FAQ link */}
          <Link
            href={ROUTES.faq}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === "/faq"
                ? "text-indigo-600 dark:text-[var(--brand-text)] bg-indigo-50 dark:bg-indigo-950/50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            FAQ
          </Link>

          <Link
            href={ROUTES.blog}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname?.startsWith(ROUTES.blog)
                ? "text-indigo-600 dark:text-[var(--brand-text)] bg-indigo-50 dark:bg-indigo-950/50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            Blog
          </Link>

          {NAV_ITEMS.map((item) => (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                <span>{item.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`} />
              </button>

              {/* Submenu Dropdown Overlay */}
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-950"
                  >
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          pathname === link.href
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-[var(--brand-text)]"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions & Responsive Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4 z-50">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/50 text-slate-700 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-900 shadow-sm cursor-pointer focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div key="sun" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Sun className="h-5 w-5 text-[var(--brand)] fill-[var(--brand-soft)]" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Moon className="h-5 w-5 text-indigo-600 fill-indigo-600/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/50 text-slate-700 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-900 shadow-sm md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[65px] left-0 right-0 border-b border-slate-200 bg-white px-6 py-6 shadow-xl dark:border-slate-800 dark:bg-slate-950 md:hidden max-h-[calc(100vh-65px)] overflow-y-auto"
          >
            <div className="space-y-6">
              {/* About + Contact links */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  <span>Company</span>
                </div>
                <div className="grid grid-cols-1 gap-1 pl-6">
                  <Link
                    href={ROUTES.home}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      pathname === "/"
                        ? "text-indigo-600 dark:text-[var(--brand-text)]"
                        : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)]"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href={ROUTES.about}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      pathname === "/about"
                        ? "text-indigo-600 dark:text-[var(--brand-text)]"
                        : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)]"
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    href={ROUTES.contact}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      pathname === "/contact"
                        ? "text-indigo-600 dark:text-[var(--brand-text)]"
                        : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)]"
                    }`}
                  >
                    Contact
                  </Link>
                  <Link
                    href={ROUTES.faq}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      pathname === "/faq"
                        ? "text-indigo-600 dark:text-[var(--brand-text)]"
                        : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)]"
                    }`}
                  >
                    FAQ
                  </Link>
                  <Link
                    href={ROUTES.blog}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      pathname?.startsWith(ROUTES.blog)
                        ? "text-indigo-600 dark:text-[var(--brand-text)]"
                        : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)]"
                    }`}
                  >
                    Blog
                  </Link>
                </div>
              </div>

              {NAV_ITEMS.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 pl-6">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block py-2 text-sm font-medium transition-colors ${
                          pathname === link.href
                            ? "text-indigo-600 dark:text-[var(--brand-text)]"
                            : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[var(--brand-text)]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
