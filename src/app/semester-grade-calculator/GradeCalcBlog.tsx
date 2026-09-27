import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function GradeCalcBlog() {
  const relatedLinks = [
    { name: "Final Grade Calculator", href: ROUTES.finalGradeCalculator },
    { name: "Grade Curve Calculator", href: ROUTES.gradeCurveCalculator },
    { name: "Average Grade Calculator", href: ROUTES.home },
  ];
  const faqs = [
    {
      q: "How is a semester grade different from a single test grade?",
      a: "A semester grade combines every graded category across the entire term using their assigned weights while a single test grade only reflects one assessment."
    },
    {
      q: "What if my syllabus categories don't add up to 100%?",
      a: "Enter the weights exactly as listed on your syllabus the calculator normalizes them proportionally, but it is worth double checking with your instructor if the numbers seem off."
    },
    {
      q: "Can I use this before the final exam to predict my grade?",
      a: "Yes, leave out categories you have not completed yet or use the Final Grade Calculator to find exactly what score you need on remaining work to hit a target grade."
    },
    {
      q: "Does this work for pass/fail courses?",
      a: "This calculator is designed for point based grading; pass/fail courses typically do not use numeric semester grades in the same way."
    },
    {
      q: "How do I handle a category with multiple assignments, like 10 homework grades?",
      a: "Average all assignments within that category first using the Average Grade Calculator then enter that category average along with its overall weight here."
    },
    {
      q: "Can instructors weight grades differently for different students?",
      a: "No, the weighting scheme in a syllabus applies to the whole class if you believe your grade was calculated incorrectly check directly with your instructor."
    },
    {
      q: "What if my calculated grade doesn't match the official gradebook?",
      a: "Small discrepancies are usually due to rounding or a category weight typo double-check every score and weight against your official gradebook and syllabus."
    }
  ];

  const steps = [
    {
      title: "Create Categories",
      description: "Create a category for each graded component."
    },
    {
      title: "Enter Scores & Weights",
      description: "Enter your score and the weight (%) for each category from your syllabus."
    },
    {
      title: "Add Multiple Assignments",
      description: "Add multiple assignments within a category if needed the calculator averages them first."
    },
    {
      title: "Calculate Total",
      description: "Click Calculate to see your current overall semester grade instantly."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Semester%20Grade%20Calculator.webp"
        imageAlt="Semester grade tracking"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Online Semester Grade Calculator </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This free online Semester Grade Calculator helps you immedatiely calculate your semester average and understand what you still need to acheive your goal. Enter a category for each graded component  and score along with its weight then calculator shows your semester grade. It is the most complete way to see exactly where you stand in a course before the semester ends.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Combine unlimited categories and assignments into one final grade</li>
              <li>See your current semester standing at any point in the term</li>
              <li>Understand exactly how each category affects your final grade</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <div className="bg-muted p-4 rounded-xl text-center">
              <p className="font-mono text-xs">Semester Grade = Σ (Category Average × Category Weight) ÷ Σ (Category Weights)</p>
            </div>
            <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs space-y-1">
              <p><strong>Example:</strong></p>
              <p>Homework: 92% (15%) • Quizzes: 85% (15%)</p>
              <p>Midterm: 78% (30%) • Final: 88% (40%)</p>
              <p className="font-bold text-indigo-500">Result: 85.15%</p>
            </div>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.semesterGrade} />
        <FAQ items={[...faqs, ...calculatorContentDepth.semesterGrade.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
