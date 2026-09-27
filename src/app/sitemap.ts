import { MetadataRoute } from "next";
import { CALCULATOR_ROUTES, ROUTES } from "@/lib/routes";
import { BLOG_AUTHORS, BLOG_POSTS, getAuthorUrl, getBlogPostUrl } from "@/lib/blog";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.averagegradecalculator.com").replace(/\/$/, "");

// Static pages
const staticPages = [
  { url: ROUTES.home, priority: 1.0, changeFrequency: "weekly" as const },
  { url: ROUTES.about, priority: 0.8, changeFrequency: "monthly" as const },
  { url: ROUTES.contact, priority: 0.7, changeFrequency: "monthly" as const },
  { url: ROUTES.faq, priority: 0.7, changeFrequency: "monthly" as const },
  { url: ROUTES.blog, priority: 0.7, changeFrequency: "daily" as const },
  { url: ROUTES.privacyPolicy, priority: 0.3, changeFrequency: "yearly" as const },
  { url: ROUTES.cookies, priority: 0.3, changeFrequency: "yearly" as const },
  { url: ROUTES.terms, priority: 0.3, changeFrequency: "yearly" as const },
  { url: ROUTES.disclaimer, priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static utility pages do not have trustworthy per-page edit dates. A
  // generation timestamp is not a modification date and should not be sent to
  // crawlers as one.
  const staticEntries = staticPages.map((page) => ({
    url: page.url === ROUTES.home ? `${SITE_URL}/` : `${SITE_URL}${page.url}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Calculator pages were last meaningfully reviewed on this fixed date.
  const calculatorEntries = CALCULATOR_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}${getBlogPostUrl(post.slug)}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const authorEntries = BLOG_AUTHORS.map((author) => ({
    url: `${SITE_URL}${getAuthorUrl(author.slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...calculatorEntries, ...blogEntries, ...authorEntries];
}
