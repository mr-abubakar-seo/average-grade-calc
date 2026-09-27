import { Metadata } from "next";
import { ROUTES } from "@/lib/routes";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.averagegradecalculator.com").replace(/\/$/, "");
const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export interface CalculatorMetadata {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  schemaName: string;
  schemaDescription: string;
}

export interface FAQSchemaItem {
  q: string;
  a: string;
}

export function generateFAQSchema(faqs: FAQSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export const calculatorMetadata: Record<string, CalculatorMetadata> = {
  home: {
    title: "Average Grade Calculator",
    description: "This free Average Grade Calculator can use to calculate your average grade instantly.",
    keywords: ["average grade calculator", "grade average calculator", "simple average calculator", "weighted average calculator", "class average calculator", "course grade calculator", "how to calculate average grade"],
    path: ROUTES.home,
    schemaName: "Average Grade Calculator",
    schemaDescription: "Free online average grade calculator for simple and points-based grade averages.",
  },
  "grade-curve": {
    title: "Grade Curve Calculator - Free Online Test Score Curve Tool",
    description: "Use our free grade curve calculator to see how many questions you need to reach a passing grade. Fast, accurate, and no sign-up required.",
    keywords: ["grade curve calculator", "curve calculator", "test curve calculator", "curved grade calculator", "bell curve grade calculator", "how to curve grades", "square root grading curve"],
    path: ROUTES.gradeCurveCalculator,
    schemaName: "Grade Curve Calculator",
    schemaDescription: "Free online grade curve calculator. Instantly curve test scores using linear, square root, bell curve, or highest-score methods.",
  },
  "average-grade": {
    title: "Get Course Average Instantly",
    description: "Free online average grade calculator. Calculate simple or weighted average grades instantly. Supports category weights, dropped scores, and points-based grading.",
    keywords: ["average grade calculator", "grade average calculator", "simple average calculator", "weighted average calculator", "class average calculator", "course grade calculator", "how to calculate average grade"],
    path: ROUTES.averageGradeCalculator,
    schemaName: "Average Grade Calculator",
    schemaDescription: "Free online average grade calculator for simple, weighted, and points-based grade averages.",
  },
  "semester-grade": {
    title: "Semester Grade Calculator for Students and Teachers",
    description: "Calculate your semester grade from homework, quizzes, exams, projects and finals. Includes category weighting, worked examples and current-grade planning.",
    keywords: ["semester grade calculator", "weighted semester grade calculator", "course grade planner", "semester average calculator"],
    path: ROUTES.semesterGradeCalculator,
    schemaName: "Semester Grade Calculator",
    schemaDescription: "Free Semester Grade Calculator to combine all your assignments, exams, and quizzes into one accurate semester grade.",
  },
  gpa: {
    title: "GPA Calculator | Calculate Your Grade Point Average",
    description: "Free online GPA calculator. Calculate semester GPA, cumulative GPA and weighted GPA instantly. Supports 4.0 scale, credit hours and AP/honors weighting.",
    keywords: ["GPA calculator", "grade point average calculator", "cumulative GPA calculator", "weighted GPA calculator", "college GPA calculator", "high school GPA calculator", "how to calculate GPA"],
    path: ROUTES.gpaCalculator,
    schemaName: "GPA Calculator",
    schemaDescription: "Free online GPA calculator for semester GPA, cumulative GPA, and weighted GPA with credit-hour weighting.",
  },
  "cgpa-calculator": {
    title: "CGPA Calculator | Update Cumulative GPA With Credits",
    description: "Calculate updated CGPA by combining your current cumulative GPA, completed credits, latest SGPA and new semester credits with a worked example.",
    keywords: ["CGPA calculator", "cumulative GPA calculator", "credit weighted CGPA calculator", "update CGPA"],
    path: ROUTES.cgpaCalculator,
    schemaName: "CGPA Calculator",
    schemaDescription: "Free CGPA Calculator to find your cumulative grade point average across multiple semesters. Accurate, fast, and easy to use.",
  },
  "final-grade": {
    title: "Final Grade Calculator - What Score Do You Need on Your Final?",
    description: "Find the exact score you need on your final exam to reach your target grade. Free Final Grade Calculator that is fast, accurate, and easy to use.",
    keywords: ["final exam calculator", "what score do I need on final", "final grade target calculator"],
    path: ROUTES.finalGradeCalculator,
    schemaName: "Final Grade Calculator",
    schemaDescription: "Free Final Grade Calculator shows the exact score you need on your final exam to reach your target grade.",
  },
  "cgpa-to-percentage": {
    title: "Best CGPA to Percentage Calculator | 10-Point & 4-Point",
    description: "Free CGPA to Percentage calculator with instant results.Convert cumulative CGPA to percentage using common 10-point and 4-point formulas.",
    keywords: ["CGPA to percentage", "CGPA to percentage calculator", "10 point CGPA to percentage", "4 point GPA to percentage"],
    path: ROUTES.cgpaToPercentage,
    schemaName: "CGPA to Percentage Converter",
    schemaDescription: "Convert your CGPA into an equivalent percentage instantly using standard 10-point and 4-point scale formulas.",
  },
  "sgpa-to-cgpa": {
    title: "SGPA to CGPA Calculator | Converter",
    description: "Convert your SGPA to CGPA instantly with our free online SGPA to CGPA calculator. To get accurate, fast and reliable tool for students and teachers.",
    keywords: ["SGPA to CGPA", "SGPA to CGPA calculator", "semester GPA to CGPA", "credit weighted SGPA"],
    path: ROUTES.sgpaToCgpa,
    schemaName: "SGPA to CGPA Converter",
    schemaDescription: "Convert your Semester GPA (SGPA) to Cumulative GPA (CGPA) instantly with our free calculator.",
  },
  "sgpa-to-percentage": {
    title: "Online SGPA to Percentage Calculator",
    description: "Convert SGPA to percentage easily with our free online SGPA to Percentage Calculator. Use our calculator to understand your academic performance with the formula.",
    keywords: ["SGPA to percentage", "SGPA to percentage calculator", "semester SGPA percentage", "SGPA x 9.5"],
    path: ROUTES.sgpaToPercentage,
    schemaName: "SGPA to Percentage Converter",
    schemaDescription: "Convert your Semester Grade Point Average (SGPA) to percentage instantly.",
  },
  "percentage-to-cgpa": {
    title: "Free Percentage to CGPA Calculator",
    description: "Convert an existing percentage to CGPA on 10-point or 4-point scales and get the accurate result. with formula notes for university and scholarship forms.",
    keywords: ["percentage to CGPA", "percentage to CGPA calculator", "percentage to GPA conversion", "reverse CGPA conversion"],
    path: ROUTES.percentageToCgpa,
    schemaName: "Percentage to CGPA Converter",
    schemaDescription: "Convert your percentage marks into CGPA instantly using standard university formulas.",
  },
  "marks-percentage": {
    title: "Online Marks Percentage Calculator",
    description: "Calculate exam percentage from obtained marks and subject wise percentage of marks of all classes by using our user-friendly Marks Percentage Calculator.",
    keywords: ["marks percentage calculator", "marks percentage", "aggregate percentage calculator", "exam percentage calculator"],
    path: ROUTES.marksPercentageCalculator,
    schemaName: "Marks Percentage Calculator",
    schemaDescription: "Free Marks Percentage Calculator to find your exam or subject-wise percentage instantly.",
  },
  percentage: {
    title: "Percentage Calculator Online",
    description: "Percentage Calculator is a free online tool that displays the percentage of a given number. Also, other percentage calculators that are often needed.",
    keywords: ["percentage calculator", "percentage increase calculator", "reverse percentage calculator", "discount percentage calculator"],
    path: ROUTES.percentageCalculator,
    schemaName: "Percentage Calculator",
    schemaDescription: "Free Percentage Calculator for percentage of a number, percentage increase/decrease, and reverse percentage.",
  },
  loan: {
    title: "Loan Calculator – EMI, Interest & Monthly Payment",
    description: "Estimate fixed-rate loan payments, total interest, and repayment cost for home, auto, student, or personal loans using amortization math.",
    keywords: ["loan calculator", "loan payment calculator"],
    path: ROUTES.loanCalculator,
    schemaName: "Loan Calculator",
    schemaDescription: "Free Loan (EMI) Calculator to estimate your monthly payment, total interest, and total repayment for home, auto, or personal loans.",
  },
  tip: {
    title: "Tip Calculator – Split Bills and Gratuity Fast",
    description: "Calculate restaurant tips, total bill, and per-person split amounts for groups, including pre-tax and post-tax tipping guidance.",
    keywords: ["tip calculator", "free tip calculator"],
    path: ROUTES.tipCalculator,
    schemaName: "Tip Calculator",
    schemaDescription: "Free Tip Calculator to quickly work out how much to tip and split the bill among any number of people.",
  },
  password: {
    title: "Password Generator | Strong Random Passwords",
    description: "Generate strong random passwords with custom length, numbers, symbols, and mixed-case options, plus practical safety guidance.",
    keywords: ["password generator", "best free password generator"],
    path: ROUTES.passwordGenerator,
    schemaName: "Password Generator",
    schemaDescription: "Free Password Generator to create strong, random, secure passwords instantly.",
  },
  about: {
    title: "About Us",
    description: "Learn more about Average Grade Calculator, our mission to provide free, accurate educational tools, and our commitment to privacy and accessibility.",
    keywords: ["about us", "average grade calculator mission", "education tools"],
    path: ROUTES.about,
    schemaName: "About Average Grade Calculator",
    schemaDescription: "Information about the mission and services of Average Grade Calculator.",
  },
  contact: {
    title: "Contact Us – Get in Touch",
    description: "Have questions or feedback? Contact the Average Grade Calculator team. We're here to help with any inquiries regarding our tools.",
    keywords: ["contact us", "support", "average grade calculator feedback"],
    path: ROUTES.contact,
    schemaName: "Contact Average Grade Calculator",
    schemaDescription: "Contact information for Average Grade Calculator support and feedback.",
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our GPA, CGPA, and grade calculators. Learn how to use our tools effectively.",
    keywords: ["FAQ", "frequently asked questions", "how to use grade calculator"],
    path: ROUTES.faq,
    schemaName: "FAQ - Average Grade Calculator",
    schemaDescription: "Frequently asked questions and answers about using Average Grade Calculator tools.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Read our Privacy Policy to understand how we protect your data. We collect minimal anonymous data and process all calculations locally in your browser.",
    keywords: ["privacy policy", "data protection", "average grade calculator privacy"],
    path: ROUTES.privacyPolicy,
    schemaName: "Privacy Policy",
    schemaDescription: "Our commitment to protecting user privacy and data security.",
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "Learn how we use cookies to improve your experience and serve relevant advertisements. Review our cookie usage and management options.",
    keywords: ["cookie policy", "cookies usage", "average grade calculator cookies"],
    path: ROUTES.cookies,
    schemaName: "Cookie Policy",
    schemaDescription: "Information about how we use cookies and tracking technologies.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    description: "Review the Terms of Service for using Average Grade Calculator. Understand our usage guidelines, disclaimers, and user responsibilities.",
    keywords: ["terms of service", "terms and conditions", "usage guidelines"],
    path: ROUTES.terms,
    schemaName: "Terms of Service",
    schemaDescription: "The legal agreement governing the use of Average Grade Calculator.",
  },
  disclaimer: {
    title: "Disclaimer",
    description: "Important disclaimer regarding the accuracy and intended use of our calculators. Our tools are for informational purposes only.",
    keywords: ["disclaimer", "legal notice", "informational purposes only"],
    path: ROUTES.disclaimer,
    schemaName: "Disclaimer",
    schemaDescription: "Legal disclaimer regarding the use and accuracy of our calculation tools.",
  },
};

export function generateCalculatorMetadata(calculatorKey: string): Metadata {
  const calc = calculatorMetadata[calculatorKey];
  
  if (!calc) {
    return {
      title: "Calculator Not Found",
      description: "The requested calculator could not be found.",
    };
  }

  return {
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
    alternates: {
      canonical: absoluteUrl(calc.path),
    },
    openGraph: {
      title: calc.title,
      description: calc.description,
      url: absoluteUrl(calc.path),
      siteName: "Average Grade Calculator",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/opengraph.webp`,
          width: 1731,
          height: 909,
          alt: calc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: calc.title,
      description: calc.description,
      images: [`${SITE_URL}/opengraph.webp`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateCalculatorSchema(calculatorKey: string) {
  const calc = calculatorMetadata[calculatorKey];
  
  if (!calc) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.schemaName,
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    url: absoluteUrl(calc.path),
    description: calc.schemaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Free to use, no registration required",
      "Instant calculations with real-time results",
      "Mobile-responsive interface",
      "Dark mode support",
      "Browser-based calculator tools",
    ],
  };
}

export function generateWebPageSchema(pageKey: string) {
  const page = calculatorMetadata[pageKey];

  if (!page) return null;

  return {
    "@context": "https://schema.org",
    "@type": pageKey === "faq" ? "FAQPage" : "WebPage",
    name: page.schemaName,
    url: absoluteUrl(page.path),
    description: page.schemaDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "Average Grade Calculator",
      url: `${SITE_URL}/`,
    },
  };
}
