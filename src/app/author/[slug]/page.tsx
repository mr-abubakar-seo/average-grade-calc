import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, Mail, PenLine, ShieldCheck, Sparkles, Target } from "lucide-react";
import { BLOG_AUTHORS, getAuthorPosts, getAuthorUrl, getBlogAuthor, getBlogPostUrl } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.averagegradecalculator.com";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  // Creates one static author page for every object in BLOG_AUTHORS.
  return BLOG_AUTHORS.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getBlogAuthor(slug);

  if (!author) {
    return {};
  }

  return {
    title: author.name,
    description: author.bio,
    alternates: {
      canonical: `${SITE_URL}${getAuthorUrl(author.slug)}`,
    },
    openGraph: {
      title: `${author.name} - Average Grade Calculator`,
      description: author.bio,
      url: `${SITE_URL}${getAuthorUrl(author.slug)}`,
      type: "profile",
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getBlogAuthor(slug);

  if (!author) {
    notFound();
  }

  const posts = getAuthorPosts(author.slug);

  return (
    <main className="relative overflow-hidden bg-background px-4 pb-16 pt-24 text-[var(--brand-text)] sm:px-6">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[4%] right-[-12%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-5xl">
        <div className="grid items-stretch overflow-hidden rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative overflow-hidden bg-[var(--brand)] p-5 text-white sm:p-6">
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
            <div aria-hidden="true" className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden="true" className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl font-semibold text-white shadow-lg shadow-black/10">
                    {author.name.charAt(0)}
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Verified author</p>
                    <p className="mt-1 text-sm font-bold text-white">Academic tools</p>
                  </div>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Author Profile</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight">{author.name}</h1>
                <p className="mt-2 text-base leading-6 text-white/85">{author.role}</p>
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Focus areas</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {author.expertise.slice(0, 6).map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
                        <PenLine className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-semibold leading-snug text-white">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[`${posts.length} articles`, "Student guides", "Formula clarity"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] bg-[var(--brand-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)] dark:text-white">
              <Sparkles className="h-4 w-4" />
              Contributor
            </div>
            <p className="mt-4 text-base leading-7 text-[var(--brand-muted)]">{author.bio}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { icon: CheckCircle2, label: "Tested formulas" },
                { icon: ShieldCheck, label: "Privacy-first tools" },
                { icon: Target, label: "Clear examples" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-soft)] p-3 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-surface)] text-[var(--brand)] shadow-sm dark:text-white">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xs font-bold leading-snug text-[var(--brand-text)]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,var(--brand-soft))] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)] dark:text-white">Connect</p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--brand-muted)]">
                Reach the author directly or view professional profiles.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3.5 py-2 text-sm font-semibold text-[var(--brand)] shadow-sm transition-colors hover:bg-[var(--brand-soft)]"
                >
                  Email
                  <Mail className="h-4 w-4" />
                </a>
                {author.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3.5 py-2 text-sm font-semibold text-[var(--brand)] shadow-sm transition-colors hover:bg-[var(--brand-soft)]"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] shadow-sm">
          <div className="relative overflow-hidden bg-[var(--brand)] p-5 text-white sm:p-6">
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
              <div className="relative z-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Author story</p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                    Building calculators that explain the answer.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">{author.mission}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-white/10 p-3">
                  {[
                    { value: "15", label: "Tools" },
                    { value: "3", label: "Skill areas" },
                    { value: "100%", label: "Free" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-xl font-black text-white">{item.value}</div>
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
          </div>

          <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_86%,var(--brand-soft))] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Core values</p>
              <div className="mt-4 grid gap-2">
                {author.coreValues.slice(0, 4).map((value, index) => (
                  <div key={value} className="flex items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-[var(--brand-text)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Full biography</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {author.fullBio.map((paragraph, index) => (
                  <article key={paragraph} className="group rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_86%,var(--brand-soft))] p-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] text-xs font-black text-white shadow-sm">
                        0{index + 1}
                      </div>
                      <p className="text-sm leading-6 text-[var(--brand-muted)]">{paragraph}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Expertise</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Author skills and focus areas</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {author.skills.map((group) => (
              <div key={group.title} className="rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,var(--brand-soft))] p-5">
                <h3 className="text-lg font-semibold text-[var(--brand-text)]">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-muted)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {author.expertise.map((item) => (
              <span key={item} className="rounded-full bg-[var(--brand-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--brand)] dark:text-white">
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Editorial standards</p>
            <ListGrid items={author.editorialStandards} />
          </section>

          <section className="rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Calculator testing process</p>
            <ListGrid items={author.testingProcess} />
          </section>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Accuracy commitment</p>
            <p className="mt-4 text-base leading-7 text-[var(--brand-muted)]">{author.accuracyCommitment}</p>
          </section>

          <section className="rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Writing philosophy</p>
            <ListGrid items={author.writingPhilosophy} />
          </section>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">What Abubakar works on</p>
            <ListGrid items={author.worksOn} />
          </section>

          <section className="rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Content promise</p>
            <ListGrid items={author.contentPromise} />
          </section>
        </div>

        <section className="mt-10 rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Latest topics written by Abubakar</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {author.latestTopics.map((topic) => (
              <span key={topic} className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-soft)] px-3 py-1.5 text-sm font-semibold text-[var(--brand-text)]">
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Frequently asked questions</p>
          <div className="mt-5 grid gap-3">
            {author.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand-surface)_82%,var(--brand-soft))] p-4">
                <h3 className="text-base font-semibold text-[var(--brand-text)]">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[24px] bg-[var(--brand)] p-6 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Closing statement</p>
          <p className="mt-4 text-base leading-7 text-white/85">{author.closingStatement}</p>
        </section>

        <div className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">Published work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Articles by {author.name}</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="group rounded-[24px] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
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
                <p className="text-sm font-medium text-[var(--brand)]">{post.category}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--brand-text)]">
                  <Link href={getBlogPostUrl(post.slug)}>{post.title}</Link>
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--brand-muted)]">{post.excerpt}</p>
                <Link href={getBlogPostUrl(post.slug)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ListGrid({ items }: { items: string[] }) {
  // Reusable compact list style for author profile detail sections.
  return (
    <div className="mt-5 grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-soft)] px-3 py-2 text-sm font-semibold text-[var(--brand-text)]">
          {item}
        </div>
      ))}
    </div>
  );
}
