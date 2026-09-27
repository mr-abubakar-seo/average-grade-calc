import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function MarksCalcBlog() {
  const relatedLinks = [
    { name: "Percentage Calculator", href: ROUTES.percentageCalculator },
    { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
    { name: "SGPA to Percentage", href: ROUTES.sgpaToPercentage },
  ];
  const faqs = [
    {
      q: "How is percentage different from a grade or GPA?",
      a: "Percentage is a direct ratio of marks scored to marks possible; GPA and letter grades map ranges of percentages to point values or letters, and those mappings vary by institution."
    },
    {
      q: "Can this calculate percentage for board exam results with multiple subjects?",
      a: "Yes, add each subject's marks and totals and the calculator computes both individual and overall percentages."
    },
    {
      q: "Does this account for grace marks or moderation?",
      a: "No, enter your final marks after any grace marks or moderation have already been applied by your board or institution."
    },
    {
      q: "What percentage is considered a good score?",
      a: "This varies widely by country, institution and exam there is no universal cutoff, though many systems consider 60%+ satisfactory and 90%+ excellent."
    },
    {
      q: "Can this handle exams with negative marking?",
      a: "Yes, simply enter your final net marks as the 'marks obtained' value."
    },
    {
      q: "What is aggregate percentage?",
      a: "Aggregate percentage is the overall percentage calculated by combining marks from all subjects or all years of a program, rather than looking at just one subject or one exam in isolation."
    },
    {
      q: "How do universities calculate percentage for merit lists?",
      a: "Most universities calculate aggregate percentage using the same total-obtained-over-total-possible method shown here, though some apply subject-specific weighting or best-of-N subject rules — check your specific merit list criteria."
    }
  ];

  const steps = [
    {
      title: "Enter Obtained Marks",
      description: "Enter the marks you scored in a subject or exam."
    },
    {
      title: "Enter Total Marks",
      description: "Enter the maximum possible marks for that assessment."
    },
    {
      title: "Add More Subjects",
      description: "Click 'Add Subject' to calculate aggregate results across multiple exams."
    },
    {
      title: "Get Percentage",
      description: "Click Calculate to see your individual and overall percentage instantly."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Marks%20Percentage%20Calculator.webp"
        imageAlt="Exam marks analysis"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Marks Percentage Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A marks percentage calculator is a online tool that instantly converts the marks a student has scored into a percentage. Except manually working out the math, users just enter their obtained marks and total marks and the tool does the conversion for them making it immediately and useful for students checking exam results, teachers evaluating performance or anyone verifying eligibility against a required cutoff percentage.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Calculate single subject or multi subject percentage instantly</li>
              <li>Get your overall aggregate percentage across all subjects</li>
              <li>Useful for school, college and competitive exam results</li>
              <li>Free and works on mobile or desktop</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <p className="bg-muted p-4 rounded-xl font-mono text-center">
              Percentage = (Marks Obtained ÷ Total Marks) × 100
            </p>
            <p className="mt-2 italic">Example: 420 out of 500 = 84%</p>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.marksPercentage} />
        <FAQ items={[...faqs, ...calculatorContentDepth.marksPercentage.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
