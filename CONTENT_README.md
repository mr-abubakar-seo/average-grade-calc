# Website Text Guide

This is a simple map of every place where website words are stored. You can update text without changing the design or calculations.

## Safe Editing Steps

1. Find the type of text you want to change below.
2. Open the linked file.
3. Press `Ctrl+F` and search for the old words.
4. Change only the words inside quotation marks, or the words in a `.txt` article.
5. Save the file and check the page.

Example:

```text
Before: "Calculate your GPA instantly"
After:  "Calculate your GPA quickly and accurately"
```

Keep all quotation marks, commas, brackets, and other symbols exactly as they are. Do not change code, formulas, colors, spacing, buttons, or layout lines.

## Blog Text

### Article Body

Edit these files to change paragraphs, headings, examples, tables, or FAQs inside an article:

- [Curve Grade](src/lib/articleContent/curve-grade.txt)
- [Weighted Average Grades](src/lib/articleContent/weighted-average-grades.txt)
- [Semester Grade Without Final](src/lib/articleContent/semester-grade-without-final.txt)
- [CGPA to Percentage](src/lib/articleContent/cgpa-to-percentage-conversion-guide.txt)
- [Daily Interest on a Loan](src/lib/articleContent/daily-interest-on-a-loan.txt)
- [How to Calculate GPA](src/lib/articleContent/how-to-calculate-gpa.txt)

Keep the headings and `---` separator lines in place. Change the words after them, not the separators themselves.

### Article Title And Search Information

Open [replacementBlogPosts.ts](src/lib/replacementBlogPosts.ts) to change an article's title, summary, search description, keywords, date, author name, category, reading time, or image description.

Each article is one block. Edit only the text after these labels: `title`, `description`, `excerpt`, `publishedAt`, `updatedAt`, `author`, `category`, `readingTime`, and `keywords`.

Keep dates in this format: `YYYY-MM-DD`.

### Blog Page And Author Text

- Blog page title and description: [blog.ts](src/lib/blog.ts), near `BLOG_INDEX_META`
- Author biography, skills, FAQs, topics, and social links: [blog.ts](src/lib/blog.ts), inside `BLOG_AUTHORS`
- Labels and buttons shown around articles: [BlogLayout.tsx](src/components/blog/BlogLayout.tsx)
- Author page labels: [author/[slug]/page.tsx](src/app/author/%5Bslug%5D/page.tsx)

## Calculator Text

There are three places where calculator words can be stored:

1. The calculator page file contains page headings and page-level text.
2. The `Blog.tsx` file contains the longer explanation, examples, and FAQs.
3. Shared calculator files contain common labels, fields, buttons, results, and messages used by several calculators.

### Calculator Pages And Explanations

The table below covers all 15 calculator routes. Use the page file for the calculator page and the explanation file for the longer text below it.

| Calculator | Page | Longer explanation |
| --- | --- | --- |
| Average Grade | [page.tsx](src/app/average-grade-calculator/page.tsx) | [AverageGradeBlog.tsx](src/app/average-grade-calculator/AverageGradeBlog.tsx) |
| CGPA | [page.tsx](src/app/cgpa-calculator/page.tsx) | [CgpaCalcBlog.tsx](src/app/cgpa-calculator/CgpaCalcBlog.tsx) |
| CGPA to Percentage | [page.tsx](src/app/cgpa-to-percentage/page.tsx) | [CgpaToPercentBlog.tsx](src/app/cgpa-to-percentage/CgpaToPercentBlog.tsx) |
| Final Grade | [page.tsx](src/app/final-grade-calculator/page.tsx) | [FinalCalcBlog.tsx](src/app/final-grade-calculator/FinalCalcBlog.tsx) |
| GPA | [page.tsx](src/app/gpa-calculator/page.tsx) | [GpaCalcBlog.tsx](src/app/gpa-calculator/GpaCalcBlog.tsx) |
| Grade Curve | [page.tsx](src/app/grade-curve-calculator/page.tsx) | [GradeCurveBlog.tsx](src/app/grade-curve-calculator/GradeCurveBlog.tsx) |
| Loan | [page.tsx](src/app/loan-calculator/page.tsx) | [LoanCalcBlog.tsx](src/app/loan-calculator/LoanCalcBlog.tsx) |
| Marks Percentage | [page.tsx](src/app/marks-percentage-calculator/page.tsx) | [MarksCalcBlog.tsx](src/app/marks-percentage-calculator/MarksCalcBlog.tsx) |
| Password Generator | [page.tsx](src/app/password-generator/page.tsx) | [PasswordBlog.tsx](src/app/password-generator/PasswordBlog.tsx) |
| Percentage | [page.tsx](src/app/percentage-calculator/page.tsx) | [PercentCalcBlog.tsx](src/app/percentage-calculator/PercentCalcBlog.tsx) |
| Percentage to CGPA | [page.tsx](src/app/percentage-to-cgpa/page.tsx) | [PercentToCgpaBlog.tsx](src/app/percentage-to-cgpa/PercentToCgpaBlog.tsx) |
| Semester Grade | [page.tsx](src/app/semester-grade-calculator/page.tsx) | [GradeCalcBlog.tsx](src/app/semester-grade-calculator/GradeCalcBlog.tsx) |
| SGPA to CGPA | [page.tsx](src/app/sgpa-to-cgpa/page.tsx) | [SgpaToCgpaBlog.tsx](src/app/sgpa-to-cgpa/SgpaToCgpaBlog.tsx) |
| SGPA to Percentage | [page.tsx](src/app/sgpa-to-percentage/page.tsx) | [SgpaToPercentBlog.tsx](src/app/sgpa-to-percentage/SgpaToPercentBlog.tsx) |
| Tip | [page.tsx](src/app/tip-calculator/page.tsx) | [TipCalcBlog.tsx](src/app/tip-calculator/TipCalcBlog.tsx) |

### Shared Calculator Words

If the same label appears on multiple calculators, it may be in one of these shared files:

- [CalculatorFramework.tsx](src/components/calculator/CalculatorFramework.tsx): chart titles, field labels, buttons, placeholders, and result labels
- [UnifiedCalculatorWidgets.tsx](src/components/calculator/UnifiedCalculatorWidgets.tsx): headings, subtitles, help text, fields, results, and status messages
- [UnifiedGpaCalculator.tsx](src/components/calculator/UnifiedGpaCalculator.tsx): GPA labels, placeholders, headings, and results
- [SemesterGradeCalculator.tsx](src/components/calculator/SemesterGradeCalculator.tsx): semester calculator labels and default text
- [useCalculatorLogic.ts](src/components/calculator/useCalculatorLogic.ts): generated assignment names and grading labels
- [useGpaCalculatorLogic.ts](src/components/calculator/useGpaCalculatorLogic.ts): generated course names and GPA labels
- [calculatorContentDepth.ts](src/lib/calculatorContentDepth.ts): worked examples, explanations, common mistakes, and extra FAQs

Change only visible words in these files. Do not change the calculation code.

## Home And Shared Website Text

- Home page composition: [HomeClient.tsx](src/app/HomeClient.tsx)
- Home page metadata and schema: [page.tsx](src/app/page.tsx)
- Home hero words and dashboard labels: [HomeHero.tsx](src/components/sections/HomeHero.tsx)
- Calculator names, descriptions, categories, and library heading: [HomeCard.tsx](src/components/sections/HomeCard.tsx)
- Home closing message: [HomeCTA.tsx](src/components/sections/HomeCTA.tsx)
- Shared headings and badges: [GlobalHeading.tsx](src/components/ui/GlobalHeading.tsx)
- Shared calculator card text: [GlobalCard.tsx](src/components/ui/GlobalCard.tsx)
- Shared call-to-action text: [GlobalCTA.tsx](src/components/ui/GlobalCTA.tsx)
- Menu and navigation text: [Navbar.tsx](src/components/common/Navbar.tsx)
- Footer text, categories, links, and copyright: [Footer.tsx](src/components/common/Footer.tsx)
- 404 page text: [not-found.tsx](src/app/not-found.tsx)

Other reusable text may be in [src/components/sections](src/components/sections) and [src/components/ui](src/components/ui). Search these folders only when the text is shared by multiple pages.

## About, Contact, And FAQ

- About page story and privacy text: [AboutClient.tsx](src/app/about/AboutClient.tsx)
- About hero and closing text: [AboutHero.tsx](src/components/sections/AboutHero.tsx), [AboutCTA.tsx](src/components/sections/AboutCTA.tsx)
- Contact form labels, placeholders, topics, and messages: [ContactClient.tsx](src/app/contact/ContactClient.tsx)
- Contact hero, contact methods, email, and closing text: [ContactHero.tsx](src/components/sections/ContactHero.tsx), [ContactChannels.tsx](src/components/sections/ContactChannels.tsx), [ContactCTA.tsx](src/components/sections/ContactCTA.tsx)
- FAQ questions, answers, categories, search text, and empty messages: [FaqClient.tsx](src/app/faq/FaqClient.tsx)
- FAQ hero and closing text: [FaqHero.tsx](src/components/sections/FaqHero.tsx), [FaqCTA.tsx](src/components/sections/FaqCTA.tsx)

## Legal Text

Edit the matching file to change the complete legal page:

- [PrivacyClient.tsx](src/app/privacy-policy/PrivacyClient.tsx)
- [CookieClient.tsx](src/app/cookie-policy/CookieClient.tsx)
- [TermsClient.tsx](src/app/terms-of-service/TermsClient.tsx)
- [DisclaimerClient.tsx](src/app/disclaimer/DisclaimerClient.tsx)

These files contain headings, paragraphs, dates, notices, highlights, contact details, and expandable sections.

Shared legal labels and formatting are in [legalNav.ts](src/lib/legalNav.ts), [PageHeader.tsx](src/components/ui/PageHeader.tsx), [ContactMethodLink.tsx](src/components/ui/ContactMethodLink.tsx), [LinkedText.tsx](src/components/ui/LinkedText.tsx), [FeatureCards.tsx](src/components/sections/FeatureCards.tsx), and [InfoSection.tsx](src/components/sections/InfoSection.tsx).

## Website Name And Google Text

- Website name, global description, keywords, social preview text, organization details, and contact information: [layout.tsx](src/app/layout.tsx)
- Calculator Google titles, descriptions, keywords, and schema descriptions: [metadata.ts](src/lib/metadata.ts)
- Page addresses used by links: [routes.ts](src/lib/routes.ts). Change this only when changing a website address.

## Public Text Files

- Website and calculator summary for search systems: [llms.txt](public/llms.txt)
- Search crawler rules: [robots.txt](public/robots.txt)
- Advertising seller information: [ads.txt](public/ads.txt)

## Do Not Edit For Text Changes

Leave these alone when changing words:

- [academicFormulas.ts](src/core/academicFormulas.ts)
- [financialFormulas.ts](src/core/financialFormulas.ts)
- [mathEngine.ts](src/core/mathEngine.ts)
- [securityFormulas.ts](src/core/securityFormulas.ts)
- [globals.css](src/app/globals.css)
- Any line containing `className`

These control calculations, colors, spacing, buttons, and layout. Changing them can break the website.
