'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiShield, FiEyeOff, FiLock, FiSettings, FiGlobe, FiChevronDown, FiChevronUp, FiBook, FiUsers, FiMonitor, FiMail, FiDatabase, FiKey, FiExternalLink, FiDollarSign } from "react-icons/fi";
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
    icon: <FiShield className="text-indigo-500" size={28} />,
    title: "Data Safety",
    description: "Anonymous technical data only",
  },
  {
    icon: <FiEyeOff className="text-indigo-500" size={28} />,
    title: "No PII",
    description: "No names or emails collected",
  },
  {
    icon: <FiLock className="text-amber-500" size={28} />,
    title: "Local Processing",
    description: "Inputs stay in your browser",
  },
];

interface PrivacySection {
  id: string;
  title: string;
  icon: IconType;
  color: string;
  summary: string;
  content: string;
  highlights: string[];
  usagePurposes?: string[];
  optOutMethods?: string[];
  cookieTypes?: Array<{
    type: string;
    purpose: string;
    provider: string;
  }>;
  optOutLinks?: string[];
  gdprRights?: string[];
  ccpaRights?: string[];
  privacyFeatures?: string[];
  collectedData?: string[];
  storageDetails?: Array<{
    type: string;
    desc?: string;
    purpose?: string;
    duration?: string;
    transmitted?: boolean;
  }>;
  securityMeasures?: string[];
  userRights?: string[];
  contactMethods?: Array<{
    type: string;
    value: string;
  }>;
}

const sections: PrivacySection[] = [
  {
    id: "information-collect",
    title: "1. Information We Collect",
    icon: FiDatabase,
    color: "blue",
    summary: "Anonymous technical data only - no personally identifiable information",
    content: `We do not collect any personally identifiable information (PII) such as your name, email address, or phone number. We do not require registration or login to use our website.

We automatically collect limited, anonymous technical data when you visit our website, including browser type and version, pages visited on our website and time spent on them, approximate geographic location (country/city level only, not precise), device type and screen resolution, referring URL (the page that directed you to our site), and IP address (anonymized).

This data is collected automatically via Google Analytics and is used only to understand how visitors use our website and to improve our service.`,
    highlights: [
      "No personally identifiable information collected",
      "Anonymous technical data only",
      "No registration required"
    ],
    collectedData: [
      "Browser type and version",
      "Pages visited and time spent on them",
      "Approximate geographic location (country/city level only)",
      "Device type and screen resolution", 
      "Referring URL",
      "IP address (anonymized)"
    ]
  },
  {
    id: "how-we-use",
    title: "2. How We Use the Information",
    icon: FiSettings,
    color: "green",
    summary: "Anonymous data used for website improvement and relevant advertising",
    content: `The anonymous usage data we collect is used to understand which pages are most popular, improve performance, accuracy, and usability, monitor for technical errors and fix bugs, analyze traffic trends to improve the overall user experience, and serve relevant advertisements to support free access.

We do not sell, rent, or share your personal data with third parties for their own marketing purposes.`,
    highlights: [
      "Understand page popularity",
      "Improve website performance",
      "Support free access"
    ],
    usagePurposes: [
      "Understand which pages are most popular",
      "Improve performance, accuracy, and usability",
      "Monitor for technical errors and fix bugs",
      "Analyze traffic trends to improve user experience",
      "Serve relevant advertisements to support free access"
    ]
  },
  {
    id: "google-analytics",
    title: "3. Google Analytics",
    icon: FiMonitor,
    color: "purple",
    summary: "Web analytics with IP anonymization for privacy protection",
    content: `We use Google Analytics, a web analytics service provided by Google LLC ("Google"), to collect anonymous information about how visitors use our website. Google Analytics uses cookies and similar tracking technologies to collect and report on website interactions.

We have enabled IP Anonymization in Google Analytics. This means your IP address is truncated by Google before it is stored, so it cannot be used to identify you personally.

Google may process this data in accordance with its own privacy policy: https://policies.google.com/privacy`,
    highlights: [
      "IP anonymization enabled",
      "Anonymous visitor information only",
      "Google privacy policy compliance"
    ],
    optOutMethods: [
      "Install the Google Analytics Opt-out Browser Add-on",
      "Adjust your browser settings to block cookies",
      "Use your browser's private or incognito mode"
    ]
  },
  {
    id: "cookies-advertising",
    title: "4. Cookies and Advertising",
    icon: FiGlobe,
    color: "orange",
    summary: "Analytics and advertising cookies for relevant ads and site improvement",
    content: `Our website uses cookies, small text files stored on your device, to enable analytics and to serve relevant advertisements. Specifically:

Analytics cookies: used by Google Analytics to collect anonymous traffic data as described in Section 3.

Advertising cookies: used by Google AdSense and its advertising partners to serve ads that may be relevant to your interests based on your visits to our website and other websites on the internet.

Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.`,
    highlights: [
      "Analytics cookies for traffic data",
      "Advertising cookies for relevant ads",
      "Third-party vendor compliance"
    ],
    cookieTypes: [
      {
        type: "Analytics Cookies",
        purpose: "Collect anonymous traffic data via Google Analytics",
        provider: "Google Analytics"
      },
      {
        type: "Advertising Cookies", 
        purpose: "Serve relevant ads based on website visits and interests",
        provider: "Google AdSense"
      }
    ],
    optOutLinks: [
      "Personalized advertising: https://www.google.com/settings/ads",
      "Third-party cookies: www.aboutads.info/choices"
    ]
  },
  {
    id: "google-adsense",
    title: "5. Google AdSense",
    icon: FiDollarSign,
    color: "indigo",
    summary: "Advertisement service with IAB compliance and data protection",
    content: `We use Google AdSense to display advertisements on our website. Google AdSense is an advertising service provided by Google LLC. Google AdSense may use cookies, web beacons, and similar tracking technologies to collect non-personally identifiable information such as your browser type and version, pages of our website that you visit, time and date of your visit, and information about advertisements you have clicked or scrolled over.

This information is used to provide advertisements about products and services that may be of interest to you. It does not include your name, address, email address, or telephone number.

Google AdSense is compliant with the IAB Europe Transparency and Consent Framework. For more information on how Google uses data collected through its advertising services, visit: https://policies.google.com/technologies/ads`,
    highlights: [
      "Non-personally identifiable information only",
      "IAB Europe compliance",
      "Google data usage transparency"
    ]
  },
  {
    id: "browser-inputs",
    title: "6. Browser Inputs",
    icon: FiLock,
    color: "red",
    summary: "All calculations processed locally - no data transmitted to servers",
    content: `All inputs on Average Grade Calculator are processed entirely within your browser. Any numbers or values you enter are not transmitted to our servers, not stored, and not shared with anyone. Your inputs remain completely private.`,
    highlights: [
      "Browser-only processing",
      "No server transmission",
      "Complete input privacy"
    ],
    privacyFeatures: [
      "All processing happens in your browser",
      "No data transmitted to servers",
      "No storage of browser inputs",
      "No sharing with third parties"
    ]
  },
  {
    id: "children-privacy",
    title: "7. Children's Privacy",
    icon: FiUsers,
    color: "amber",
    summary: "Safe for all ages with no personal data collection from children",
    content: `Our website is available to the general public, including students and educational users of all ages. We do not knowingly collect any personally identifiable information from children under the age of 13 (or under 16 in certain jurisdictions). Since we do not collect personal information from any users, there is no risk of us retaining children's personal data.

If you are a parent or guardian and believe your child has provided personal information to us, please contact us immediately and we will take prompt action to address it.`,
    highlights: [
      "Safe for all educational users",
      "No personal data from children",
      "Immediate response to concerns"
    ]
  },
  {
    id: "gdpr-rights",
    title: "8. GDPR – Rights of Users in the European Union",
    icon: FiKey,
    color: "indigo",
    summary: "European users' rights under GDPR with clear data processing basis",
    content: `If you are located in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR), including the right to access the data we hold about you, the right to request correction or deletion of your data, the right to restrict or object to processing of your data, the right to data portability, and the right to withdraw consent at any time.

Since we collect no personally identifiable information, most of these rights are satisfied by default. For data processed by Google Analytics or Google AdSense, you may exercise your rights directly with Google via: https://myaccount.google.com/privacy

Our legal basis for processing anonymous analytics data is our legitimate interest in improving our website. For advertising cookies, our legal basis is your consent, which you provide through our cookie consent banner.`,
    highlights: [
      "Full GDPR rights protection",
      "Most rights satisfied by design",
      "Clear legal basis for processing"
    ],
    gdprRights: [
      "Right to access data we hold about you",
      "Right to request correction or deletion",
      "Right to restrict or object to processing", 
      "Right to data portability",
      "Right to withdraw consent at any time"
    ]
  },
  {
    id: "ccpa-rights",
    title: "9. CCPA – Rights of California Residents",
    icon: FiShield,
    color: "violet",
    summary: "California residents' privacy rights under CCPA compliance",
    content: `If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected about you, the right to request deletion of your personal information, the right to opt out of the sale of your personal information, and the right not to be discriminated against for exercising your privacy rights.

We do not sell personal information. We do not collect personally identifiable information from visitors. For any questions or requests, please contact us using the details in Section 13.`,
    highlights: [
      "Full CCPA rights available",
      "No personal information sale", 
      "No discrimination for exercising rights"
    ],
    ccpaRights: [
      "Right to know what personal information is collected",
      "Right to request deletion of personal information",
      "Right to opt out of sale of personal information", 
      "Right not to be discriminated against"
    ]
  },
  {
    id: "third-party-links",
    title: "10. Third-Party Links",
    icon: FiExternalLink,
    color: "indigo",
    summary: "External websites have their own privacy policies and practices",
    content: `Our website may contain links to external websites or resources. We are not responsible for the privacy practices or content of those third-party sites. We encourage you to review the privacy policy of any external website you visit through links on our platform.`,
    highlights: [
      "External sites have own policies",
      "No responsibility for third-party practices",
      "Review external privacy policies"
    ]
  },
  {
    id: "data-security", 
    title: "11. Data Security",
    icon: FiLock,
    color: "red",
    summary: "Technical and organizational measures protect anonymous data",
    content: `We take reasonable technical and organizational measures to protect the limited anonymous data we collect from unauthorized access, loss, or misuse. Since we collect no personal data, the risk to individual users is minimal. Anonymous analytics data is secured by Google's own infrastructure and subject to Google's security standards.`,
    highlights: [
      "Reasonable technical measures",
      "Minimal risk to users",
      "Google infrastructure security"
    ]
  },
  {
    id: "policy-changes",
    title: "12. Changes to This Privacy Policy",
    icon: FiBook,
    color: "indigo",
    summary: "Policy updates posted with clear notification of changes",
    content: `We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated "Last Updated" date at the top. We encourage you to review this page periodically. Your continued use of the website after any changes constitutes your acceptance of the updated Privacy Policy.`,
    highlights: [
      "Updates posted on this page",
      "Last updated date revised",
      "Periodic review recommended"
    ]
  },
  {
    id: "contact-us",
    title: "13. Contact Us",
    icon: FiMail,
    color: "blue",
    summary: "Privacy questions and requests welcomed",
    content: `For privacy questions or requests, contact the Average Grade Calculator team.
We aim to respond as soon as possible.`,
    highlights: [
      "Privacy support",
      "Website and email",
      "Prompt response"
    ],
    contactMethods: [
      { type: "Website", value: "https://www.averagegradecalculator.com" },
      { type: "Email", value: "support@averagegradecalculator.com" }
    ]
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    blue: { bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20", text: "text-blue-600 dark:text-blue-400", icon: "text-blue-500" },
    green: { bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-200 dark:border-green-500/20", text: "text-green-600 dark:text-green-400", icon: "text-green-500" },
    purple: { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-500/20", text: "text-purple-600 dark:text-purple-400", icon: "text-purple-500" },
    orange: { bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-200 dark:border-orange-500/20", text: "text-orange-600 dark:text-orange-400", icon: "text-orange-500" },
    navyAliasA: { bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", text: "text-indigo-600 dark:text-[var(--brand-text)]", icon: "text-indigo-500" },
    red: { bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-200 dark:border-red-500/20", text: "text-red-600 dark:text-red-400", icon: "text-red-500" },
    navyAliasB: { bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", text: "text-indigo-600 dark:text-[var(--brand-text)]", icon: "text-indigo-500" },
    violet: { bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20", text: "text-violet-600 dark:text-violet-400", icon: "text-violet-500" },
    amber: { bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20", text: "text-amber-600 dark:text-amber-400", icon: "text-amber-500" },
  };
  return colorMap[color] || colorMap.blue;
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PrivacyPage() {
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
          title="Privacy Policy" 
          subtitle="Your Privacy Rights and Data Protection" 
          lastUpdated={lastUpdated} 
        />

        {/* Feature Cards */}
        <FeatureCards features={features} />

        {/* Info Sections */}
        <InfoSection 
          icon={<FiShield />}
          title="Our Privacy Commitment"
          description="Average Grade Calculator uses Google Analytics with IP anonymization and Google AdSense for advertising. We collect anonymous technical data to improve our service while processing all calculations locally in your browser.

Calculator inputs never leave your device, and we don't collect any personally identifiable information. You have full control over cookies and advertising preferences."
          variant="green"
        />
        <InfoSection 
          icon={<FiGlobe />}
          title="GDPR & CCPA Compliance" 
          description="This website complies with GDPR requirements for European users and CCPA rights for California residents. Our anonymous data collection and IP anonymization protect your privacy by design.

You can opt out of analytics tracking and personalized advertising at any time through browser settings or Google's privacy controls."
          variant="blue"
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
        <div className="space-y-6">
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

                      {/* Usage Purposes */}
                      {section.usagePurposes && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">How we use anonymous data:</h4>
                          <div className="grid gap-2">
                            {section.usagePurposes.map((purpose, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                {purpose}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Opt Out Methods */}
                      {section.optOutMethods && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">To opt out of Google Analytics tracking:</h4>
                          <div className="grid gap-2">
                            {section.optOutMethods.map((method, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cookie Types */}
                      {section.cookieTypes && (
                        <div className="mt-4 space-y-3">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Cookie Types:</h4>
                          {section.cookieTypes.map((cookie, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">{cookie.type}</span>
                                <span className="text-xs text-orange-600 dark:text-orange-500">{cookie.provider}</span>
                              </div>
                              <p className="text-xs text-orange-700 dark:text-orange-400">{cookie.purpose}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Opt Out Links */}
                      {section.optOutLinks && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Opt-out options:</h4>
                          <div className="grid gap-2">
                            {section.optOutLinks.map((link, idx) => (
                              <div key={idx} className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                                <LinkedText text={link} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* GDPR Rights */}
                      {section.gdprRights && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Your GDPR Rights:</h4>
                          <div className="grid gap-2">
                            {section.gdprRights.map((right, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <FiKey className="text-indigo-500" size={12} />
                                {right}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CCPA Rights */}
                      {section.ccpaRights && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Your California Rights:</h4>
                          <div className="grid gap-2">
                            {section.ccpaRights.map((right, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <FiShield className="text-violet-500" size={12} />
                                {right}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Privacy Features */}
                      {section.privacyFeatures && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Privacy Features:</h4>
                          {section.privacyFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                              <FiShield className="text-green-500" size={16} />
                              <span className="text-sm text-green-700 dark:text-green-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Collected Data */}
                      {section.collectedData && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Information we may collect:</h4>
                          <div className="grid gap-2">
                            {section.collectedData.map((data, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {data}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Storage Details */}
                      {section.storageDetails && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Storage Details:</h4>
                          {section.storageDetails.map((detail, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">{detail.type}</span>
                                <span className={`text-xs px-2 py-1 rounded ${detail.transmitted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                  {detail.transmitted ? 'Transmitted' : 'Local Only'}
                                </span>
                              </div>
                              <p className="text-xs text-orange-700 dark:text-orange-400 mb-1">{detail.purpose}</p>
                              <p className="text-xs text-orange-600 dark:text-orange-500">{detail.duration}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Security Measures */}
                      {section.securityMeasures && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Security Measures:</h4>
                          <div className="grid gap-2">
                            {section.securityMeasures.map((measure, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <FiLock className="text-red-500" size={12} />
                                {measure}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* User Rights */}
                      {section.userRights && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Your Privacy Rights:</h4>
                          <div className="grid gap-2">
                            {section.userRights.map((right, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <FiKey className="text-indigo-500" size={12} />
                                {right}
                              </div>
                            ))}
                          </div>
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

                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <GlobalCTA
            title="Have a privacy"
            highlightText="concern?"
            subtitle="We take your privacy seriously. Reach out and we will respond within 1 to 2 business days."
            badgeText="Privacy support • Fast response"
            primaryBtnText="Contact Us"
            secondaryBtnText="View Terms"
            primaryLink={ROUTES.contact}
            secondaryLink={ROUTES.terms}
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
