import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { BlogPost } from "./blog";

// Keep the article source with the application code. These files are read only
// while Next.js generates the static blog pages; they are never fetched by a
// visitor at runtime.
const articleDirectory = join(process.cwd(), "src", "lib", "articleContent");

function loadArticle(filename: string): string {
  const source = readFileSync(join(articleDirectory, filename), "utf8").replace(/\r\n/g, "\n");
  const afterMetadata = source.match(/\*\*H1:\*\*[^\n]*\n\s*---\s*\n([\s\S]*)$/)?.[1]
    ?? source.replace(/^[\s\S]*?\n---\s*\n/, "");

  return afterMetadata
    .replace(/^# [^\n]+\n+/, "")
    // Exclude source-only author, internal-linking, and publishing notes. The
    // public author card is rendered separately from the post's author data.
    .replace(/\n---\s*\n#{2,6}\s+(?:About the Author|Internal source notes)[\s\S]*$/, "")
    .replace(/\n(?:---\s*\n){2,}[\s\S]*$/, "")
    .replace(/<cite index="[^"]+">([\s\S]*?)<\/cite>/g, "$1")
    .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, "[$2]($1)")
    .trim();
}

export const REPLACEMENT_BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-calculate-curve-grade",
    title: "How to Calculate a Curve Grade",
    description: "Learn how to calculate a curve grade using flat, percentage, square-root, bell-curve and linear methods with worked examples.",
    excerpt: "A practical guide to the six common grading-curve methods, how to identify your instructor's method, and how to calculate the result.",
    featuredImage: "/assets/how-to-calculate-curve-grade.webp",
    featuredImageAlt: "How to calculate a curve grade with formulas and examples",
    publishedAt: "2026-07-26",
    updatedAt: "2026-08-30",
    author: "Sami",
    authorSlug: "abubakar",
    category: "Academic",
    readingTime: "14 min read",
    keywords: ["curve grade", "grade curve calculator", "bell curve grading", "square root curve", "how to curve grades"],
    content: loadArticle("curve-grade.txt"),
  },
  {
    slug: "how-to-calculate-weighted-average-grades",
    title: "How to Calculate Weighted Average Grades",
    description: "Learn how to calculate weighted average grades using category weights, credit hours, mid-semester scenarios, and worked examples.",
    excerpt: "A step-by-step guide to weighted grades, category weights, GPA credit-hour weighting, and planning what you need on the final.",
    featuredImage: "/assets/how-to-calculate-weighted-average-grades.webp",
    featuredImageAlt: "How to calculate weighted average grades with category weights and example scores",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    author: "Abubakar",
    authorSlug: "abubakar",
    category: "Academic",
    readingTime: "15 min read",
    keywords: ["weighted average grades", "weighted grade calculator", "weighted grade formula", "category weights", "weighted GPA"],
    content: loadArticle("weighted-average-grades.txt"),
  },
  {
    slug: "how-to-calculate-semester-grade-without-final",
    title: "How to Calculate Your Semester Grade Without the Final Exam",
    description: "Learn how to calculate your semester grade without a final exam, including mid-semester snapshots, exemptions, weight normalization, and examples.",
    excerpt: "Use the right formula for a pending, waived, or absent final exam and find your accurate grade from completed coursework.",
    featuredImage: "/assets/how-to-calculate-semester-grade-without-final.webp",
    featuredImageAlt: "How to calculate a semester grade without the final exam using completed category weights",
    publishedAt: "2026-07-26",
    updatedAt: "2026-07-26",
    author: "Abubakar",
    authorSlug: "abubakar",
    category: "Academic",
    readingTime: "15 min read",
    keywords: ["semester grade without final", "calculate current grade", "final exam exemption", "weighted semester grade", "grade normalization"],
    content: loadArticle("semester-grade-without-final.txt"),
  },
  {
    slug: "cgpa-to-percentage-conversion-guide",
    title: "CGPA to Percentage: Formula, Examples & University Rules",
    description: "Convert CGPA to percentage using the correct formula for your university. CBSE, SPPU, VTU rules explained with worked examples, a quick table, and FAQs.",
    excerpt: "Convert CGPA to percentage with CBSE, SPPU, VTU, 10-point, 5-point, and 4-point formulas, plus examples and official-use cautions.",
    featuredImage: "/assets/cgpa-to-percentage-conversion-guide.webp",
    featuredImageAlt: "CGPA to percentage conversion guide with formulas and university rules",
    publishedAt: "2026-07-30",
    updatedAt: "2026-07-30",
    author: "Abubakar",
    authorSlug: "abubakar",
    category: "Academic",
    readingTime: "11 min read",
    keywords: ["CGPA to percentage", "CGPA percentage formula", "CBSE CGPA to percentage", "SPPU CGPA formula", "VTU CGPA conversion"],
    content: loadArticle("cgpa-to-percentage-conversion-guide.txt"),
  },
  {
    slug: "how-to-calculate-daily-interest-on-a-loan",
    title: "How to Calculate Daily Interest on a Loan (Formula + Examples)",
    description: "Learn how to calculate daily interest on a loan using formulas and worked examples. Understand APR, daily simple interest, compounding, and how payments affect total interest.",
    excerpt: "Most people find out how loan interest actually works only after they've already signed the paperwork. Learn the formulas lenders use internally and how daily interest affects what you pay.",
    featuredImage: "/assets/loan.webp",
    featuredImageAlt: "How to calculate daily interest on a loan with formulas and examples",
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    author: "Sami",
    authorSlug: "abubakar",
    category: "Academic",
    readingTime: "13 min read",
    keywords: ["daily interest", "loan interest calculator", "APR", "interest formula", "daily compound interest", "simple interest", "how to calculate loan interest"],
    content: loadArticle("daily-interest-on-a-loan.txt"),
  },
  {
    slug: "how-to-calculate-gpa",
    title: "How to Calculate GPA: A Complete, Step-by-Step Guide",
    description: "Learn exactly how GPA is calculated with the formula, worked examples, and case studies. Understand weighted vs. unweighted GPA, and how to raise a low GPA.",
    excerpt: "Learn exactly how GPA is calculated, see worked examples and real case studies, and find out how to raise a low GPA — with a formula you can apply to any grading system.",
    featuredImage: "/assets/how-to-calculate-gpa.webp",
    featuredImageAlt: "How to calculate GPA with formulas, examples, and step-by-step guide",
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    author: "Abubakar",
    authorSlug: "abubakar",
    category: "Academic",
    readingTime: "13 min read",
    keywords: ["how to calculate GPA", "GPA calculator", "GPA formula", "weighted GPA", "unweighted GPA", "cumulative GPA", "raise GPA", "GPA scale"],
    content: loadArticle("how-to-calculate-gpa.txt"),
  },
];
