import type { Metadata } from "next";
import { BlogIndexLayout } from "@/components/blog/BlogLayout";
import { BLOG_INDEX_META, getSortedBlogPosts } from "@/lib/blog";
import { ROUTES } from "@/lib/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.averagegradecalculator.com";

export const metadata: Metadata = {
  title: BLOG_INDEX_META.title,
  description: BLOG_INDEX_META.description,
  alternates: {
    canonical: `${SITE_URL}${ROUTES.blog}`,
  },
  openGraph: {
    title: BLOG_INDEX_META.title,
    description: BLOG_INDEX_META.description,
    url: `${SITE_URL}${ROUTES.blog}`,
    type: "website",
  },
};

// Main /blog page. Blog cards are rendered from BLOG_POSTS in src/lib/blog.ts.
export default function BlogPage() {
  return <BlogIndexLayout posts={getSortedBlogPosts()} />;
}
