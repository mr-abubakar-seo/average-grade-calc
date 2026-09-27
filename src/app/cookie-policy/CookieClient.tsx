'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCoffee, FiCheckCircle, FiSettings, FiClock, FiChevronDown, FiChevronUp, FiBook, FiDatabase, FiShield, FiMail, FiMonitor } from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import FeatureCards from "@/components/sections/FeatureCards";
import InfoSection from "@/components/sections/InfoSection";
import GlobalCTA from "@/components/ui/GlobalCTA";
import { ROUTES } from "@/lib/routes";
import { ContactMethodLink } from "@/components/ui/ContactMethodLink";
import { LinkedText } from "@/components/ui/LinkedText";
import { getLegalNavLabel } from "@/lib/legalNav";

// ─── Data ────────────────────────────────────────────────────────────────────
const lastUpdated = "July 8, 2026";

const features = [
  {
    icon: <FiCheckCircle className="text-orange-500" size={28} />,
    title: "Essential",
    description: "Required for site function",
  },
  {
    icon: <FiSettings className="text-blue-500" size={28} />,
    title: "User Control",
    description: "Manage cookies anytime",
  },
  {
    icon: <FiClock className="text-indigo-500" size={28} />,
    title: "Clear Duration",
    description: "Storage periods explained",
  },
];

const cookieTable = [
  {
    name: "Session Cookie",
    type: "Essential",
    storage: "Session",
    duration: "Session",
    purpose: "Keeps the website functioning, including navigation, preferences, and security. Cannot be disabled.",
    thirdParty: false,
  },
  {
    name: "Preference Cookie",
    type: "Essential",
    storage: "Browser",
    duration: "1 Year",
    purpose: "Remembers your settings such as theme or unit preferences across pages.",
    thirdParty: false,
  },
  {
    name: "Google Analytics (_ga, _gid)",
    type: "Analytics",
    storage: "Browser",
    duration: "Up to 2 Years",
    purpose: "Collects anonymized data about page views and session duration. Helps us improve content and performance.",
    thirdParty: true,
  },
  {
    name: "Google AdSense / DoubleClick",
    type: "Advertising",
    storage: "Browser",
    duration: "Up to 2 Years",
    purpose: "Serves personalized ads based on your interests and browsing history. Measures ad performance. Supports keeping the service free to use.",
    thirdParty: true,
  },
];

interface CookiePolicySection {
  id: string;
  title: string;
  icon: IconType;
  color: string;
  summary: string;
  content: string;
  highlights: string[];
  privacyFeatures?: string[];
  excludedCookies?: string[];
  hasTable?: boolean;
  browserInstructions?: Array<{
    browser: string;
    steps: string;
  }>;
  contactMethods?: Array<{
    type: string;
    value: string;
  }>;
}

const sections: CookiePolicySection[] = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies?",
    icon: FiCoffee,
    color: "orange",
    summary: "Small text files that help websites remember preferences and deliver content",
    content: `Cookies are small text files stored on your device (computer, tablet, or phone) when you visit a website. They help websites remember your preferences, understand how you use the site, and deliver relevant content and advertisements.

Cookies can be first-party (set directly by us) or third-party (set by external services we use). They can also be session cookies (deleted when you close your browser) or persistent cookies (stored for a set period).

This policy explains which cookies we use on Average Grade Calculator, why we use them, and how you can control or opt out of them.`,
    highlights: [
      "Small text files on your device",
      "Remember preferences and settings",
      "Enable personalized content delivery"
    ]
  },
  {
    id: "why-we-use",
    title: "2. Why We Use Cookies",
    icon: FiSettings,
    color: "blue",
    summary: "Essential functionality, preferences, analytics, and advertising support",
    content: `We use cookies to:

• Ensure website features work correctly on your device
• Remember your preferences and settings between visits
• Analyze how visitors use our site so we can improve our service and content
• Display relevant advertisements that help keep our service free

Note: Cookies do not store your inputs or results. Processing runs locally in your browser and your data is never sent to our servers.`,
    highlights: [
      "Essential website functionality",
      "Preference storage between visits",
      "Site improvement through analytics"
    ],
    privacyFeatures: [
      "Input data never stored in cookies",
      "Processing runs locally in browser",
      "No results transmitted to servers",
      "Preferences stored for better user experience"
    ]
  },
  {
    id: "cookies-we-use",
    title: "3. Types of Cookies We Use",
    icon: FiDatabase,
    color: "green",
    summary: "Essential, analytics, and advertising cookies with clear purposes",
    content: `See the table below for a complete list of cookies we use. We categorize them into Essential (required for functionality), Analytics (for improving our service), and Advertising (to support free access).`,
    highlights: [
      "Complete transparency in usage",
      "Clear categorization by purpose",
      "Detailed duration information"
    ],
    hasTable: true
  },
  {
    id: "third-party-cookies",
    title: "4. Third-Party Cookies",
    icon: FiShield,
    color: "purple",
    summary: "Trusted services like Google Analytics and AdSense",
    content: `We use trusted third-party services that may place their own cookies on your device. We do not control these cookies. Please review their privacy policies directly:

• Google Analytics – Google Privacy Policy
• Google AdSense – Google Advertising Policies

These services help us understand how our website is used and support keeping the service free through advertising revenue.`,
    highlights: [
      "Trusted third-party services only",
      "Direct links to privacy policies",
      "Support for free access"
    ]
  },
  {
    id: "managing-cookies",
    title: "5. How to Control or Opt Out of Cookies",
    icon: FiMonitor,
    color: "indigo",
    summary: "Multiple options for managing your cookie preferences",
    content: `You have several options to manage cookies:

Browser Settings: Most browsers let you block or delete cookies. Visit your browser's help section for instructions.

Opt Out of Google Analytics: Install the Google Analytics Opt-Out Browser Add-on.

Opt Out of Personalized Ads: Visit Google Ad Settings to manage personalized advertising preferences. You can also opt out across many advertising vendors at aboutads.info or Your Online Choices.

Please note: Blocking essential cookies may affect website functionality and some features may not work as intended. Blocking analytics or advertising cookies will not break core functionality.`,
    highlights: [
      "Full browser control available",
      "Specific opt-out options provided",
      "Essential vs optional cookies explained"
    ],
    browserInstructions: [
      {
        browser: "Google Chrome",
        steps: "Settings → Privacy and security → Cookies and other site data"
      },
      {
        browser: "Mozilla Firefox", 
        steps: "Settings → Privacy & Security → Cookies and Site Data"
      },
      {
        browser: "Microsoft Edge",
        steps: "Settings → Cookies and site permissions → Cookies and site data"
      },
      {
        browser: "Safari",
        steps: "Preferences → Privacy → Cookies and website data"
      }
    ]
  },
  {
    id: "california-residents",
    title: "6. California Residents (CCPA)",
    icon: FiShield,
    color: "red",
    summary: "Special rights under California Consumer Privacy Act",
    content: `If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to:

• Know what personal data is collected about you through cookies
• Opt out of the sale or sharing of your personal information
• Request deletion of personal data we hold about you
• Not be discriminated against for exercising your privacy rights

We use third-party advertising cookies that may constitute a "sale" or "sharing" of personal data under CCPA. To opt out, use the Google Ad Settings or visit aboutads.info. To submit a data request, contact us using the details below.`,
    highlights: [
      "Specific California resident rights",
      "Clear opt-out procedures",
      "No discrimination for exercising rights"
    ]
  },
  {
    id: "childrens-privacy",
    title: "7. Children's Privacy",
    icon: FiShield,
    color: "violet",
    summary: "Special protections for users under 13",
    content: `We do not knowingly collect personal information from children under the age of 13 through cookies or any other means. If you are under 13, please use our site only with parental supervision. If you believe a child has provided personal data via our site, please contact us so we can remove it promptly.`,
    highlights: [
      "No data collection from under-13 users",
      "Parental supervision recommended",
      "Prompt removal of child data if found"
    ]
  },
  {
    id: "policy-changes",
    title: "8. Updates to This Policy",
    icon: FiBook,
    color: "indigo",
    summary: "How we communicate changes to cookie usage",
    content: `We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this page periodically.`,
    highlights: [
      "Updates reflect practice changes",
      "Last updated date always current",
      "Periodic review recommended"
    ]
  },
  {
    id: "contact",
    title: "9. Contact Us",
    icon: FiMail,
    color: "indigo",
    summary: "Questions welcomed about cookie usage",
    content: `For cookie questions or privacy requests, contact the Average Grade Calculator team.
Use the contact options below for support.`,
    highlights: [
      "Cookie support",
      "Website and email",
      "Prompt response"
    ],
    contactMethods: [
      { type: "Email", value: "support@averagegradecalculator.com" },
      { type: "Website", value: "https://www.averagegradecalculator.com" }
    ]
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    orange: { bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-200 dark:border-orange-500/20", text: "text-orange-600 dark:text-orange-400", icon: "text-orange-500" },
    blue: { bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20", text: "text-blue-600 dark:text-blue-400", icon: "text-blue-500" },
    green: { bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-200 dark:border-green-500/20", text: "text-green-600 dark:text-green-400", icon: "text-green-500" },
    red: { bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-200 dark:border-red-500/20", text: "text-red-600 dark:text-red-400", icon: "text-red-500" },
    purple: { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-500/20", text: "text-purple-600 dark:text-purple-400", icon: "text-purple-500" },
    navyAliasA: { bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", text: "text-indigo-600 dark:text-[var(--brand-text)]", icon: "text-indigo-500" },
    violet: { bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20", text: "text-violet-600 dark:text-violet-400", icon: "text-violet-500" },
    navyAliasB: { bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", text: "text-indigo-600 dark:text-[var(--brand-text)]", icon: "text-indigo-500" },
  };
  return colorMap[color] || colorMap.blue;
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CookiePolicyPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);

    // Scroll to section after a brief delay to allow expansion animation
    setTimeout(() => {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden transition-colors duration-300">

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-28">

        {/* Page Header */}
        <PageHeader 
          title="Cookie Policy" 
          subtitle="How We Use Cookies and Similar Technologies on Average Grade Calculator" 
          lastUpdated={lastUpdated} 
        />

        {/* Feature Cards */}
        <FeatureCards features={features} />

        {/* Info Sections */}
        <InfoSection 
          icon={<FiSettings />}
          title="Take Control of Your Cookies"
          description="You have full control over the cookies used on Average Grade Calculator. Access your browser settings to customize your cookie preferences at any time, or use specific opt-out options for Google Analytics and advertising.

Essential cookies keep the website working properly, while analytics and advertising cookies can be disabled without affecting core functionality."
          variant="blue"
        />
        <InfoSection 
          icon={<FiCheckCircle />}
          title="Our Cookie Commitment"
          description="We use cookies responsibly and transparently to provide a reliable website experience. Essential cookies keep the site working smoothly, analytics help us improve, and advertising keeps our service free.

We never store your input data in cookies. Processing happens locally in your browser for your privacy."
          variant="green"
        />

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Quick Nav</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sections.map((section) => {
              const colors = getColorClasses(section.color);
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center justify-between gap-3 p-3 rounded-xl border text-left transition-all duration-200 hover:scale-105 ${
                    expandedSections.has(section.id) 
                      ? `${colors.bg} ${colors.border} shadow-sm` 
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <IconComponent 
                      className={expandedSections.has(section.id) ? colors.icon : 'text-slate-400 dark:text-slate-500'} 
                      size={16} 
                    />
                    <span className={`text-xs font-medium ${
                      expandedSections.has(section.id) 
                        ? colors.text 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {getLegalNavLabel(section.id, section.title)}
                    </span>
                  </div>
                  <FiArrowRight
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${
                      expandedSections.has(section.id)
                        ? `${colors.icon} translate-x-0.5`
                        : 'text-slate-300 dark:text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Sections */}
        <div className="space-y-6 mb-10">
          {sections.map((section, i) => {
            const isExpanded = expandedSections.has(section.id);
            const colors = getColorClasses(section.color);
            const IconComponent = section.icon;
            
            return (
              <motion.div
                key={section.id}
                id={`section-${section.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden scroll-mt-24`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}>
                      <IconComponent className={colors.icon} size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          {isExpanded && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-full">
                              Read
                            </span>
                          )}
                          {isExpanded ? (
                            <FiChevronUp className="text-slate-400 dark:text-slate-500" size={18} />
                          ) : (
                            <FiChevronDown className="text-slate-400 dark:text-slate-500" size={18} />
                          )}
                        </div>
                      </div>
                      
                      <p className={`text-sm ${colors.text} mb-3`}>{section.summary}</p>
                      
                      {/* Key highlights - always visible */}
                      <div className="flex flex-wrap gap-2">
                        {section.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-6 sm:px-6">
                    <div className="min-w-0 sm:pl-14">
                      
                      {/* Main content */}
                      <div className="prose prose-sm max-w-none min-w-0">
                        <p className="break-words text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                          <LinkedText text={section.content} />
                        </p>
                      </div>

                      {/* Privacy Features */}
                      {section.privacyFeatures && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Privacy Features:</h4>
                          {section.privacyFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                              <FiShield className="text-blue-500" size={16} />
                              <span className="text-sm text-blue-700 dark:text-blue-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Excluded Cookies */}
                      {section.excludedCookies && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">We do NOT use:</h4>
                          <div className="grid gap-2">
                            {section.excludedCookies.map((cookie, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                {cookie}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Browser Instructions */}
                      {section.browserInstructions && (
                        <div className="mt-4 space-y-3">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Clear localStorage in browsers:</h4>
                          {section.browserInstructions.map((instruction, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600">
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">{instruction.browser}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{instruction.steps}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Contact Methods */}
                      {section.contactMethods && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Contact Methods:</h4>
                          {section.contactMethods.map((method, idx) => (
                            <div key={idx} className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex shrink-0 items-center gap-3">
                                <FiMail className="text-indigo-500 shrink-0" size={16} />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{method.type}</span>
                              </div>
                              <div className="min-w-0 sm:max-w-[70%]">
                                <ContactMethodLink type={method.type} value={method.value} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Cookie Table */}
                      {section.hasTable && (
                        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/5">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                                {["Name", "Type", "Storage", "Duration", "Purpose", "3rd Party"].map((h) => (
                                  <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {cookieTable.map((row, idx) => (
                                <tr
                                  key={row.name}
                                  className={idx % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/50 dark:bg-white/[0.02]"}
                                >
                                  <td className="px-4 py-3 font-mono font-semibold text-indigo-600 dark:text-[var(--brand-text)] whitespace-nowrap">{row.name}</td>
                                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.type}</td>
                                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.storage}</td>
                                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.duration}</td>
                                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[220px]">{row.purpose}</td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                      row.thirdParty
                                        ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                                        : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-[var(--brand-text)]"
                                    }`}>
                                      {row.thirdParty ? "Yes" : "No"}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Related policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid sm:grid-cols-2 gap-4"
        >
          {[
            { label: "Privacy", href: ROUTES.privacyPolicy, desc: "How we handle your data." },
            { label: "Terms", href: ROUTES.terms, desc: "Rules for using this site." },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all duration-200"
            >
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{link.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{link.desc}</p>
              </div>
              <FiArrowRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
            </Link>
          ))}
        </motion.div>

        <div className="mt-8">
          <GlobalCTA
            title="Questions about"
            highlightText="our cookie policy?"
            subtitle="If you need clarification about how we use cookies or want to exercise your privacy rights, we're here to help."
            badgeText="Cookie transparency • Privacy first • Always responsive"
            primaryBtnText="Contact Us"
            secondaryBtnText="Privacy"
            primaryLink={ROUTES.contact}
            secondaryLink={ROUTES.privacyPolicy}
          />
        </div>

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
