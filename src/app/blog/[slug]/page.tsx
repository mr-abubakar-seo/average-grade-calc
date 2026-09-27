import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/blog/BlogLayout";
import { BLOG_POSTS, getBlogPost, getBlogPostUrl } from "@/lib/blog";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.averagegradecalculator.com").replace(/\/$/, "");

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  // Creates one static blog page for every object in BLOG_POSTS.
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = `${SITE_URL}${getBlogPostUrl(post.slug)}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}${getBlogPostUrl(post.slug)}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.featuredImage ? `${SITE_URL}${post.featuredImage}` : `${SITE_URL}/opengraph.webp`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${SITE_URL}/author/${post.authorSlug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Average Grade Calculator",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostLayout post={post} />
    </>
  );
}
