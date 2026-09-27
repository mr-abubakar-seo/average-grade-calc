import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { ROUTES } from "@/lib/routes";

export default function AverageGradeBlog() {
  const relatedLinks = [
    { name: "Semester Grade Calculator", href: ROUTES.semesterGradeCalculator },
    { name: "Grade Curve Calculator", href: ROUTES.gradeCurveCalculator },
    { name: "Marks Percentage Calculator", href: ROUTES.marksPercentageCalculator },
  ];
  const faqs = [
    {
      q: "How do I calculate my grade in a class?",
      a: "Add up all your scores and divide by the number of scores for a simple average. If your course uses categories like homework, quizzes, viva and exams with different weights multiply each category average by its weight and add the results together for a weighted average."
    },
    {
      q: "Difference between a simple average and a weighted average?",
      a: "A simple average treats every score equally. A weighted average gives some categories more influence over the final grade — for example, a final exam might count for 50% while homework only counts for 10%."
    },
    {
      q: "How do I calculate what grade I need on my final exam?",
      a: "Use your current weighted average and the final exam is weight to work backward subtract your current weighted contribution from your target grade, then divide by the exam's weight to find the score you need."
    },
    {
      q: "Does dropping the lowest score always help my average?",
      a: "Yes, dropping your lowest score in a category will either raise or maintain your average it can never lower it, since you are removing your worst result from the calculation."
    },
    {
      q: "Is a weighted average always higher than a simple average?",
      a: "Not necessarily. It depends on whether your best scores fall in the higher-weighted or lower-weighted categories."
    },
    {
      q: "How is a points-based average different from a percentage average?",
      a: "A points based average sums all points earned and divides by all points possible, so assignments with more points naturally have more influence. A percentage average first converts each assignment to a percentage, so every assignment influences the result more evenly regardless of point value."
    },
    {
      q: "Can I use this for a running average during the semester?",
      a: "Yes, simply add scores as you receive them throughout the term to see your average update in real time."
    },
    {
      q: "Does this calculator automatically drop the lowest score?",
      a: "No, it averages all entered scores as-is. If your instructor drops the lowest score, remove that score before calculating."
    },
    {
      q: "How many scores can I add?",
      a: "There is no practical limit add as many scores as you have for an accurate average across the full term."
    },
    {
      q: "Is a simple average the same as a GPA?",
      a: "No. A simple average is a raw numeric or percentage mean of scores while GPA converts letter grades into grade points weighted by course credit hours they measure different things."
    },
    {
      q: "What if some scores are letter grades and others are percentages?",
      a: "Convert letter grades to their percentage or point equivalent first, using a standard grade scale so all values are in the same format before averaging."
    }
  ];

  const steps = [
    {
      title: "Enter Each Score",
      description: "Enter each score you want to average test scores, quiz grades, assignment percentages or category totals."
    },
    {
      title: "Choose Average Type",
      description: "Choose simple or weighted average. For weighted averages, assign a percentage weight to each category."
    },
    {
      title: "Add Extra Options",
      description: "Add extra credit or drop lowest score options if your course allows them."
    },
    {
      title: "Get Instant Results",
      description: "See your overall average, letter grade and if a target grade is set what score you need on remaining work."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Average%20Grade%20Calculator.webp"
        imageAlt="Calculating course average"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What Is an Average Grade Calculator?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An average grade calculator adds up a set of scores from tests, homework or assignments and works out the overall grade a student has earned. Depending on how a course is graded this can be a <strong>simple average</strong> or a <strong>weighted average</strong>.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our Average Grade Calculator lets you enter individual scores, apply weights if needed and instantly see your overall percentage and letter grade.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Why Use an Online Average Grade Calculator?</h3>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li><strong>Handles both simple and weighted averages</strong> without manual formula entry.</li>
            <li><strong>Tracks grades throughout a semester</strong> so you always know where you stand before the final exam.</li>
            <li><strong>Removes calculation errors</strong> that are easy to make when averaging many scores by hand.</li>
            <li><strong>Shows what you need on remaining assignments</strong> to hit a target overall grade.</li>
            <li><strong>Works for teachers grading a whole class</strong> not just individual students.</li>
          </ul>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Common Averaging Methods</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Simple Average </strong> Every score counts equally, regardless of category.</li>
              <li><strong>Weighted Average:</strong> Different categories count for different percentages of the final grade.</li>
              <li><strong>Weighted Average with Dropped Lowest Score:</strong> Removes the lowest score in a category before averaging.</li>
              <li><strong>Points-Based Average</strong> Totals raw points earned versus points possible across all assignments.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Key Metrics Explained</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Simple Average:</strong> The mean of all scores where each score has equal weight.</li>
              <li><strong>Weighted Average:</strong> The mean where some scores count more than others based on assigned weights.</li>
              <li><strong>Category Weight:</strong> The percentage of the final grade that a category represents.</li>
              <li><strong>Letter Grade:</strong> The alphabetic grade corresponding to your numeric average based upon your school scale.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">When Should You NOT Use a Simple Average?</h3>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>When one category has dramatically more influence on your final grade than others.</li>
            <li>When you need to project future grades or determine what you need on remaining assignments.</li>
            <li>When your school calculates GPA using credit hour weighting rather than simple score averaging.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Tips for Getting the Most from This Calculator</h3>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li><strong>Enter scores as you receive them</strong> Update your average after each quiz or assignment to track trends in real time.</li>
            <li><strong>Model different scenarios:</strong> Add hypothetical future scores to see how they would affect your overall average before the grade is finalized.</li>
            <li><strong>Keep records:</strong> Save screenshots of your calculated averages at different points in the semester to track your progress over time.</li>
          </ul>
        </section>

        <FAQ items={faqs} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
