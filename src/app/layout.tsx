import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Toaster } from "sonner";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.averagegradecalculator.com").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "bl9gUD8CXdGdvzh3hRo8vcGI2EBJqUloOVp0jJKTrjY",
  },
  title: "Free Academic Calculators – Average Grade Calculator",
  description: "Free suite of 15 precision calculators for students, homeowners, and professionals. Calculate GPA, CGPA, curved grades, loans, material estimates, and more. No sign-up required.",
  keywords: [
    "grade calculator",
    "GPA calculator",
    "CGPA calculator",
    "grade curve calculator",
    "average grade calculator",
    "weighted grade calculator",
    "final grade calculator",
    "percentage calculator",
    "SGPA to CGPA converter",
    "CGPA to percentage",
    "academic calculator",
    "home and garden calculator",
    "loan calculator",
    "tip calculator",
    "password generator",
  ],
  authors: [{ name: "Average Grade Calculator Team", url: SITE_URL }],
  creator: "Average Grade Calculator",
  publisher: "Average Grade Calculator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Average Grade Calculator",
    title: "Average Grade Calculator",
    description: "Free suite of 15 precision calculators for students and professionals. Calculate GPA, CGPA, curved grades, and more. No sign-up required.",
    images: [
      {
        url: `${SITE_URL}/opengraph.webp`,
        width: 1731,
        height: 909,
        alt: "Average Grade Calculator - Precision Academic & Utility Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Grade Calculator",
    description: "Free suite of 15 precision calculators for students and professionals. Calculate GPA, CGPA, curved grades, and more.",
    images: [`${SITE_URL}/opengraph.webp`],
    creator: "@onlinecalc",
  },
  icons: {
    icon: "/assets/logo.webp",
    shortcut: "/assets/logo.webp",
    apple: "/assets/logo.webp",
  },
  category: "education",
  classification: "Educational Tools & Calculators",
  other: {
    "google-adsense-account": "ca-pub-9511071240919487",
  },
};

// Separating viewport for Next.js 14+ best practices
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Average Grade Calculator",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.webp`,
    description: "Free suite of academic and utility calculators for everyone worldwide.",
    foundingDate: "2023",
    sameAs: [
      "https://twitter.com/onlinecalc",
      "https://github.com/onlinecalc",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@averagegradecalculator.com",
      contactType: "Customer Service",
      availableLanguage: ["English"],
    },
  };

  return (
    <html 
      lang="en" 
      className="scroll-smooth"
      style={{
        "--font-sans": 'Inter, "Segoe UI", Arial, sans-serif',
        "--font-playfair": 'Georgia, "Times New Roman", serif',
      } as CSSProperties}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5DPM8N5V3K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5DPM8N5V3K');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-50">
        {/* Global Layout Wrapper */}
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          {/* Main content container with consistent spacing */}
          <main className="flex-1 pt-24">
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            theme="system"
            richColors
            toastOptions={{
              style: { fontFamily: "var(--font-sans)" },
            }}
          />
        </div>
      </body>
    </html>
  );
}
