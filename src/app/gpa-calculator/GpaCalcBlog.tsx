import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { ROUTES } from "@/lib/routes";

const gradeScale = [
  { letter: "A", value: "4.0" },
  { letter: "A-", value: "3.7" },
  { letter: "B+", value: "3.3" },
  { letter: "B", value: "3.0" },
  { letter: "B-", value: "2.7" },
  { letter: "C+", value: "2.3" },
  { letter: "C", value: "2.0" },
  { letter: "C-", value: "1.7" },
  { letter: "D+", value: "1.3" },
  { letter: "D", value: "1.0" },
  { letter: "F", value: "0.0" },
];

export default function GpaCalcBlog() {
  const faqs = [
    {
      q: "How do I calculate my GPA by hand?",
      a: "Convert each letter grade to grade points, multiply each by the course's credit hours, add those totals together then divide by the total number of credit hours."
    },
    {
      q: "What is a good GPA?",
      a: "A 3.0 is generally considered solid, a 3.5+ is competitive for many colleges and a 3.7–4.0 is considered excellent. 'Good' varies significantly by school and program though."
    },
    {
      q: "What is the difference between weighted and unweighted GPA?",
      a: "Unweighted GPA caps at 4.0 and treats all classes equally. Weighted GPA gives extra points for AP, IB or honors courses, allowing GPAs above 4.0 to reflect course difficulty."
    },
    {
      q: "How is cumulative GPA different from semester GPA?",
      a: "Semester GPA covers only the current term's courses. Cumulative GPA averages every completed semester together, weighted by each semester's total credit hours, giving a full academic career picture."
    },
    {
      q: "Can my GPA go above 4.0?",
      a: "Only on a weighted scale that awards bonus points for advanced coursework. On a standard unweighted 4.0 scale, 4.0 is the maximum possible GPA."
    },
    {
      q: "How many credits do I need for my GPA to change significantly?",
      a: "Because cumulative GPA is credit weighted the more total credits you have already completed, the less impact new courses have. Early in a program, a single semester can shift your GPA substantially later on, it takes many more credits to move the needle."
    },
    {
      q: "Does a pass/fail class affect my GPA?",
      a: "Typically no, most institutions exclude pass/fail courses from GPA calculations entirely though the credits may still count toward graduation requirements."
    },
  ];

  const steps = [
    {
      title: "Enter Each Course",
      description: "Enter each course, its letter grad and its number of credit hours."
    },
    {
      title: "Choose GPA Type",
      description: "Choose weighted or unweighted GPA, depending on whether your school gives extra grade points for AP/honors courses."
    },
    {
      title: "Add Previous Semesters",
      description: "Add previous semester GPA and credits if you want a cumulative GPA rather than just this semester."
    },
    {
      title: "Get Instant Results",
      description: "See your semester GPA, cumulative GPA and the GPA needed on remaining courses to hit a target."
    }
  ];

  const relatedLinks = [
    { name: "Semester Grade Calculator", href: ROUTES.semesterGradeCalculator },
    { name: "Grade Curve Calculator", href: ROUTES.gradeCurveCalculator },
    { name: "Final Grade Calculator", href: ROUTES.finalGradeCalculator },
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks
        steps={steps}
        imageSrc="/assets/GPA%20Calculator.webp"
        imageAlt="Student working with GPA calculator"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Free Online GPA Calculator</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our Free Online GPA calculator calculate your GPA using letter grades and credit hours on the 4.0 scale. GPA is used by colleges and universities to summarize a student&apos;s overall academic performance.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our GPA Calculator lets you enter your grades and credit hours to instantly calculate your semester GPA, cumulative GPA or weighted GPA.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Why Use an Online GPA Calculator?</h3>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li><strong>Avoids manual conversion errors</strong> between letter grades, percentages and grade points.</li>
            <li><strong>Handles credit-hour weighting automatically</strong>, so a 4-credit course counts more than a 1-credit course.</li>
            <li><strong>Supports weighted GPA</strong> for AP, IB and honors classes that use a 5.0 scale instead of 4.0.</li>
            <li><strong>Projects future GPA</strong> showing what grades you&apos;d need next semester to reach a target cumulative GPA.</li>
            <li><strong>Useful for college applications and academic probation checks</strong> all of which reference GPA cutoffs.</li>
          </ul>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Common GPA Calculation Methods</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Unweighted GPA:</strong> Each letter grade converts to a fixed number of grade points.</li>
              <li><strong>Weighted GPA:</strong> Advanced courses award extra grade points to reflect their difficulty.</li>
              <li><strong>Cumulative GPA:</strong> Combines all semesters into one overall GPA, weighted by each semester&apos;s total credit hours.</li>            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Key Metrics Explained</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Quality Points:</strong> Grade points earned for a course, calculated as grade value multiplied by credit hours.</li>
              <li><strong>Total Credit Hours:</strong> The sum of credit hours  overall courses entered.</li>
              <li><strong>Semester GPA:</strong> Your grade point average for the courses entered in this calculation.</li>
              <li><strong>Grade Points:</strong> The numeric value assigned to each letter grade such as A = 4.0 and B = 3.0.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Standard Grade Scale</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
                <tr>
                  <th className="px-4 py-3 font-bold">Letter</th>
                  <th className="px-4 py-3 font-bold">Grade Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {gradeScale.map((grade) => (
                  <tr key={grade.letter}>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{grade.letter}</td>
                    <td className="px-4 py-3 text-muted-foreground">{grade.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FAQ items={faqs} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
