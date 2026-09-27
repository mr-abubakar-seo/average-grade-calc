import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, CalendarDays, Clock, ExternalLink, Mail, PenLine, Sparkles, UserRound } from "lucide-react";
import { BlogAuthor, BlogPost, getAuthorUrl, getBlogAuthor, getBlogPostUrl } from "@/lib/blog";
import { ROUTES } from "@/lib/routes";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// Converts the inline Markdown used by blog articles into React elements.
// Supported syntax: [link label](/url) and **bold text**.
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);

    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a
            key={`${href}-${index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--brand)] underline-offset-4 hover:underline"
          >
            {label}
          </a>
        );
      }

      return (
        <Link key={`${href}-${index}`} href={href} className="font-medium text-[var(--brand)] underline-offset-4 hover:underline">
          {label}
        </Link>
      );
    }

    if (boldMatch) {
      return (
        <strong key={`bold-${index}`} className="font-semibold text-slate-950 dark:text-white">
          {boldMatch[1]}
        </strong>
      );
    }

    return part;
  });
}

function isTableLine(line: string) {
  return line.startsWith("|") && line.endsWith("|");
}

function isTableSeparator(line: string) {
  return /^\|[\s:-]+\|/.test(line);
}

function isFormulaLine(line: string) {
  return /^[A-Za-z].*=/.test(line) || line.includes(" = ");
}

function renderParagraph(line: string, index: number) {
  if (isFormulaLine(line)) {
    return (
      <p
        key={index}
        className="overflow-x-auto rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-base leading-7 text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
      >
        {renderInline(line)}
      </p>
    );
  }

  return (
    <p key={index} className="text-lg leading-8 text-slate-600 dark:text-slate-300">
      {renderInline(line)}
    </p>
  );
}

// Lightweight markdown renderer for blog post content stored in src/lib/blog.ts.
// Keep this intentionally simple so daily blog edits only require changing data.
function BlogContent({ content }: { content: string }) {
  const lines = content
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={index} className="mt-8 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {renderInline(line.replace("### ", ""))}
        </h3>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={index} className="mt-10 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {renderInline(line.replace("## ", ""))}
        </h2>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={index}
          className="border-l-4 border-[var(--brand)] bg-[var(--brand-soft)] px-5 py-4 text-lg leading-8 text-slate-700 dark:text-slate-200"
        >
          {renderInline(line.replace("> ", ""))}
        </blockquote>
      );
      index += 1;
      continue;
    }

    if (isTableLine(line) && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      const header = line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && isTableLine(lines[index])) {
        rows.push(
          lines[index]
            .split("|")
            .map((cell) => cell.trim())
            .filter(Boolean)
        );
        index += 1;
      }

      blocks.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <table className="w-full min-w-[560px] text-left text-base">
            <thead className="bg-slate-50 text-slate-950 dark:bg-slate-900 dark:text-white">
              <tr>
                {header.map((cell) => (
                    <th key={cell} className="px-4 py-3 font-semibold">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join("-")}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].replace("- ", ""));
        index += 1;
      }

      blocks.push(
        <ul key={`ul-${index}`} className="ml-5 list-disc space-y-2 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s/, ""));
        index += 1;
      }

      blocks.push(
        <ol key={`ol-${index}`} className="ml-5 list-decimal space-y-2 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    blocks.push(renderParagraph(line, index));
    index += 1;
  }

  return <div className="space-y-4">{blocks}</div>;
}

// Blog listing page UI. Data comes from BLOG_POSTS in src/lib/blog.ts.
export function BlogIndexLayout({ posts }: { posts: BlogPost[] }) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="relative overflow-hidden bg-background px-4 pb-16 pt-24 text-[var(--brand-text)] sm:px-6">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[4%] right-[-12%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,420px)]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] bg-[var(--brand-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Average Grade Calculator Blog
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[var(--brand-text)] sm:text-6xl">
              Helpful guides for better grades.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">
              Practical articles about GPA, percentages, marks, credit hours, and the formulas students use most.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={featuredPost ? getBlogPostUrl(featuredPost.slug) : ROUTES.blog}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--brand-deep)]"
              >
                Read Latest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={ROUTES.gpaCalculator}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-text)] shadow-sm transition-colors hover:bg-[var(--brand-soft)]"
              >
                Open GPA Calculator
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--brand)_18%,transparent),transparent_55%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_92%,transparent)] p-4 shadow-[0_20px_60px_color-mix(in_srgb,var(--brand)_10%,transparent)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Knowledge Hub</p>
                  <h2 className="mt-1 text-base font-semibold text-[var(--brand-text)]">Study support at a glance</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-white">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,var(--brand-soft))] p-3.5">
                <div className="space-y-2">
                  {[
                    { icon: PenLine, label: "Published Guides", value: `${posts.length} articles` },
                    { icon: UserRound, label: "Expert Authors", value: "Named contributors" },
                    { icon: Clock, label: "Reading Time", value: "Quick practical lessons" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-[var(--brand-surface)] px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-[var(--brand)] dark:text-white" />
                        <span className="text-sm font-medium text-[var(--brand-text)]">{item.label}</span>
                      </div>
                      <span className="text-xs font-semibold text-[var(--brand-muted)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {featuredPost && (
          <article className="mt-12 grid overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-sm lg:grid-cols-[0.95fr_1.35fr]">
            <div className="relative min-h-[260px] bg-[var(--brand)] p-6 text-white sm:p-8">
              <Image
                src={featuredPost.featuredImage}
                alt={featuredPost.featuredImageAlt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover opacity-20 mix-blend-screen"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Featured Article</p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{featuredPost.title}</h2>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[featuredPost.category, featuredPost.readingTime, formatDate(featuredPost.publishedAt)].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--brand-muted)]">
                <Link href={getAuthorUrl(featuredPost.authorSlug)} className="font-medium text-[var(--brand)] underline-offset-4 hover:underline">
                  {featuredPost.author}
                </Link>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(featuredPost.publishedAt)}
                </span>
              </div>
              <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">{featuredPost.excerpt}</p>
              <Link
                href={getBlogPostUrl(featuredPost.slug)}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--brand-deep)]"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {remainingPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)]">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] dark:text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--brand-muted)]">
                <span className="rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--brand)] dark:text-white">
                  {post.category}
                </span>
                <Link href={getAuthorUrl(post.authorSlug)} className="font-medium text-[var(--brand)] underline-offset-4 hover:underline">
                  {post.author}
                </Link>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--brand-text)]">
                <Link href={getBlogPostUrl(post.slug)}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--brand-muted)]">{post.excerpt}</p>
              <Link
                href={getBlogPostUrl(post.slug)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
              >
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

// Author box shown under every blog post.
function AuthorSummary({ author }: { author: BlogAuthor }) {
  return (
    <section className="mt-14 overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-sm">
      <div className="bg-[var(--brand)] px-6 py-5 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">About the author</p>
      </div>
      <div className="p-6 sm:p-8">
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand)] text-2xl font-semibold text-white">
          {author.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={getAuthorUrl(author.slug)} className="text-2xl font-semibold tracking-tight text-slate-950 underline-offset-4 hover:underline dark:text-white">
            {author.name}
          </Link>
          <p className="mt-1 text-base font-medium text-[var(--brand)]">{author.role}</p>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{author.bio}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {author.expertise.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                {item}
              </span>
            ))}
          </div>
          <a href={`mailto:${author.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
            <Mail className="h-4 w-4" />
            {author.email}
          </a>
          <div className="mt-4 flex flex-wrap gap-3">
            {author.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] px-3 py-2 text-sm font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--brand-soft)]"
              >
                {link.label}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

// Individual blog post page UI. Route data comes from src/app/blog/[slug]/page.tsx.
export function BlogPostLayout({ post }: { post: BlogPost }) {
  const author = getBlogAuthor(post.authorSlug);

  return (
    <main className="relative overflow-hidden bg-background px-4 pb-16 pt-24 text-[var(--brand-text)] sm:px-6">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[4%] right-[-12%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>
      <article className="relative z-10 mx-auto max-w-4xl">
        <Link href={ROUTES.blog} className="text-sm font-semibold text-[var(--brand)]">
          Back to Blog
        </Link>
        <header className="mt-8 overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-sm">
          <div className="relative min-h-[360px] bg-[var(--brand)] p-6 text-white sm:p-8">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover opacity-20 mix-blend-screen"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
            <div className="relative z-10 flex min-h-[296px] flex-col justify-end">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">{post.category}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{post.title}</h1>
            </div>
          </div>
          <div className="p-6 sm:p-8">
          <p className="text-xl leading-8 text-[var(--brand-muted)]">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--brand-muted)]">
            <Link href={getAuthorUrl(post.authorSlug)} className="font-medium text-[var(--brand)] underline-offset-4 hover:underline">
              {post.author}
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
          </div>
        </header>

        <section className="mt-10 rounded-[28px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm sm:p-8">
          <BlogContent content={post.content} />
        </section>

        {author && <AuthorSummary author={author} />}
      </article>
    </main>
  );
}
