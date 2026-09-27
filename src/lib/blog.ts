import { ROUTES } from "@/lib/routes";
import { REPLACEMENT_BLOG_POSTS } from "./replacementBlogPosts";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorSlug: string;
  category: string;
  readingTime: string;
  keywords: string[];
  content: string;
};

export type BlogAuthor = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  fullBio: string[];
  expertise: string[];
  skills: Array<{
    title: string;
    items: string[];
  }>;
  worksOn: string[];
  editorialStandards: string[];
  testingProcess: string[];
  accuracyCommitment: string;
  writingPhilosophy: string[];
  mission: string;
  coreValues: string[];
  contentPromise: string[];
  latestTopics: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  closingStatement: string;
  email: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const BLOG_INDEX_META = {
  title: "Blog",
  description:
    "Read practical guides from Average Grade Calculator about GPA, percentages, grades, and better study planning.",
};

// Blog author profiles.
// To update an author page, edit the matching object here.
// Keep `slug` stable because blog posts link to it through `authorSlug`.
export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    slug: "abubakar",
    name: "Abubakar",
    role: "Educational Technology Writer & Full Stack Developer",
    bio: "Abubakar is an educational technology writer and full stack developer who specializes in building accurate academic calculators and creating easy-to-understand learning resources. His work focuses on simplifying complex grading systems, GPA calculations, academic percentages, and other educational concepts into practical tools that students, teachers, and professionals can use with confidence.",
    fullBio: [
      "Abubakar is the lead developer and primary educational content author at Average Grade Calculator. He has spent years building web applications that help users solve real-world academic problems through accurate, reliable, and easy-to-use calculators.",
      "His expertise combines software engineering, educational technology, user experience, and technical research. Rather than simply publishing formulas, Abubakar develops interactive tools that explain how calculations work while allowing users to verify results instantly.",
      "Abubakar researches grading systems used by schools, colleges, universities, and professional organizations to ensure the calculators reflect widely accepted academic standards. Every formula is manually tested before publication, and educational articles are reviewed regularly to keep them aligned with current grading practices.",
      "Beyond calculator development, Abubakar writes comprehensive educational guides that explain topics such as GPA calculations, weighted grading systems, grade curves, semester averages, cumulative GPAs, percentage conversions, and academic performance tracking.",
    ],
    expertise: [
      "Academic Grading Systems",
      "GPA & CGPA Calculations",
      "Grade Curve Analysis",
      "Weighted Grade Calculations",
      "Final Grade Prediction",
      "Academic Percentage Conversion",
      "Educational Technology",
      "Full Stack Web Development",
      "JavaScript Applications",
      "Technical SEO",
      "User Experience Design",
      "Web Performance Optimization",
      "Accessibility Standards",
      "Data Validation",
      "Mathematical Formula Verification",
    ],
    skills: [
      {
        title: "Development",
        items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Node.js", "Express.js", "React", "Next.js", "REST APIs", "SQL", "PostgreSQL", "MongoDB"],
      },
      {
        title: "Technical",
        items: ["Performance Optimization", "Technical SEO", "Responsive Design", "Accessibility (WCAG)", "Progressive Web Apps", "Core Web Vitals", "Structured Data", "Schema.org", "Google Search Optimization"],
      },
      {
        title: "Research",
        items: ["Educational Content Research", "Mathematical Validation", "Data Verification", "Technical Documentation", "Information Architecture"],
      },
    ],
    worksOn: [
      "Grade Calculator",
      "GPA Calculator",
      "CGPA Calculator",
      "Final Grade Calculator",
      "Grade Curve Calculator",
      "Average Grade Calculator",
      "Percentage Calculator",
      "Semester GPA Calculator",
      "Weighted Grade Calculator",
      "Letter Grade Calculator",
    ],
    editorialStandards: [
      "Independent topic research",
      "Formula verification",
      "Multiple calculation tests",
      "Real-world example validation",
      "Content editing",
      "Readability review",
      "Internal linking review",
      "SEO optimization",
      "Accessibility checks",
      "Mobile usability testing",
    ],
    testingProcess: [
      "Manual formula verification",
      "Edge case testing",
      "Decimal precision testing",
      "Cross-browser compatibility",
      "Mobile responsiveness",
      "Performance optimization",
      "User interface testing",
      "Accessibility validation",
      "Input validation",
      "Error handling verification",
    ],
    accuracyCommitment:
      "Accuracy is the foundation of every calculator and educational guide published on Average Grade Calculator. Abubakar personally reviews calculation logic, validates mathematical formulas, and tests calculators using multiple real-world scenarios before release.",
    writingPhilosophy: [
      "Easy to understand",
      "Free of unnecessary jargon",
      "Backed by research",
      "Transparent about formulas",
      "Helpful for beginners",
      "Useful for experienced learners",
      "Continuously updated",
    ],
    mission:
      "Average Grade Calculator exists to make academic calculations easier, faster, and more accurate for students, teachers, parents, and professionals.",
    coreValues: [
      "Accuracy First",
      "User-Focused Design",
      "Transparency",
      "Accessibility",
      "Privacy",
      "Continuous Improvement",
      "Educational Value",
      "Reliable Information",
    ],
    contentPromise: [
      "Providing fact-based educational information",
      "Explaining formulas clearly",
      "Including practical examples",
      "Using plain English",
      "Avoiding misleading claims",
      "Respecting user privacy",
      "Remaining free to access",
      "Keeping information up to date",
    ],
    latestTopics: [
      "How GPA Is Calculated",
      "Understanding Grade Curves",
      "Weighted vs Unweighted GPA",
      "Final Grade Calculation Guide",
      "GPA Scale Comparison",
      "Percentage to GPA Conversion",
      "Common GPA Mistakes",
      "How Professors Curve Grades",
      "Semester GPA Explained",
      "Academic Standing Requirements",
    ],
    faqs: [
      {
        question: "Who is Abubakar?",
        answer: "Abubakar is an educational technology writer and full stack developer who specializes in creating academic calculators and educational resources.",
      },
      {
        question: "What does Abubakar specialize in?",
        answer: "He focuses on grading systems, GPA calculations, educational technology, calculator development, and technical content writing.",
      },
      {
        question: "How are calculators tested?",
        answer: "Each calculator undergoes manual formula verification, extensive testing, and validation using real-world academic scenarios before publication.",
      },
      {
        question: "How often is content updated?",
        answer: "Content is reviewed regularly and updated whenever grading standards, academic policies, or calculation methods change.",
      },
      {
        question: "Can I trust the calculator results?",
        answer: "The calculators are built using verified mathematical formulas and tested extensively. Users should still consult their institution's official policies for institution-specific grading rules.",
      },
      {
        question: "Does Average Grade Calculator require registration?",
        answer: "No. All calculators are freely accessible without creating an account.",
      },
      {
        question: "Is my information stored?",
        answer: "The website is designed with privacy in mind and does not require users to provide personal information to use its calculators.",
      },
    ],
    closingStatement:
      "Abubakar is committed to making academic calculations more accessible through carefully researched educational content and reliable online tools. By combining technical expertise with a focus on clarity and usability, he aims to help learners make informed academic decisions with confidence.",
    email: "mrabubakarseo@gmail.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mrabubakarseo" },
      { label: "GitHub", href: "https://github.com/mr-abubakar-seo" },
    ],
  },
];

// The current public blog feed is maintained in src/lib/articleContent.
export const BLOG_POSTS: BlogPost[] = REPLACEMENT_BLOG_POSTS;

export const getBlogPostUrl = (slug: string) => `${ROUTES.blog}/${slug}`;
export const getAuthorUrl = (slug: string) => `${ROUTES.author}/${slug}`;

export const getSortedBlogPosts = () =>
  [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

export const getBlogPost = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug);
export const getBlogAuthor = (slug: string) => BLOG_AUTHORS.find((author) => author.slug === slug);
export const getAuthorPosts = (slug: string) => BLOG_POSTS.filter((post) => post.authorSlug === slug);
