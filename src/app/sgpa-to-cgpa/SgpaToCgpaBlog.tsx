import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function SgpaToCgpaBlog() {
  const relatedLinks = [
    { name: "SGPA to Percentage", href: ROUTES.sgpaToPercentage },
    { name: "CGPA Calculator", href: ROUTES.cgpaCalculator },
    { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
  ];
  const faqs = [
    {
      q: "Is CGPA just the average of all my SGPAs?",
      a: "Yes, if every semester carries equal credit hours. If credit loads differ, use the credit weighted formula for an accurate result."
    },
    {
      q: "Which universities use the SGPA/CGPA system?",
      a: "This system is common at many technical and AICTE-affiliated universities in India and at other institutions that follow a 10-point grading structure."
    },
    {
      q: "Does one bad semester ruin my CGPA?",
      a: "It will lower your CGPA but as more semesters accumulate, the impact of any single term on the overall average shrinks."
    },
    {
      q: "Can I recalculate CGPA if I retake a failed course?",
      a: "Usually yes, depending on your university's grade improvement or backlog-clearing policy check your academic regulations for the exact rule."
    },
    {
      q: "What's considered a good CGPA on the 10-point scale?",
      a: "This varies by institution and field but generally 7.5+ is considered solid, and 8.5+ is often viewed as excellent check placement or admission cutoffs specific to your goals."
    },
    {
      q: "Do backlogs or failed courses affect CGPA calculation?",
      a: "Typically yes, until they are cleared many universities exclude or specially flag backlog semesters until the course is passed."
    },
    {
      q: "Is CGPA rounded when printed on official transcripts?",
      a: "Often yes, usually to two decimal places but the exact rounding convention depends on your university's official policy."
    }
  ];

  const steps = [
    {
      title: "Enter Semester SGPAs",
      description: "Enter the SGPA you earned in each individual semester."
    },
    {
      title: "Add Multiple Semesters",
      description: "Click 'Add Semester' to include data for every term you have completed."
    },
    {
      title: "Enter Credit Hours (Optional)",
      description: "If semesters have different credit loads, enter credit hours for weighted precision."
    },
    {
      title: "Calculate Overall CGPA",
      description: "Click Calculate to see your cumulative grade point average instantly."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/SGPA%20to%20CGPA%20Calculator.webp"
        imageAlt="Semester grade analysis"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">SGPA to CGPA Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            SGPA reflects your performance in a single semester while CGPA reflects your overall performance across every semester completed so far. This calculator converts a list of your semester wise SGPA scores into one overall CGPA the figure that typically appears on your final degree transcript.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Combine any number of semesters' SGPA into one CGPA</li>
              <li>Supports simple averaging or credit-weighted averaging</li>
              <li>Widely used by students on the 10-point grading system</li>
              <li>Instant results, no manual math required</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <div className="bg-muted p-4 rounded-xl space-y-3">
              <div className="text-center">
                <p className="text-xs font-bold text-primary mb-1">Simple Average (Equal Credits)</p>
                <p className="font-mono text-sm">CGPA = (Sum of SGPAs) ÷ (Number of Semesters)</p>
              </div>
              <div className="text-center border-t border-border pt-3">
                <p className="text-xs font-bold text-primary mb-1">Credit-Weighted Average</p>
                <p className="font-mono text-[10px]">CGPA = Σ (SGPA × Credits) ÷ Σ (Credits)</p>
              </div>
            </div>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.sgpaToCgpa} />
        <FAQ items={[...faqs, ...calculatorContentDepth.sgpaToCgpa.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
