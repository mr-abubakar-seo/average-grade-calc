import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function SgpaToPercentBlog() {
  const relatedLinks = [
    { name: "SGPA to CGPA", href: ROUTES.sgpaToCgpa },
    { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
    { name: "Percentage to CGPA", href: ROUTES.percentageToCgpa },
  ];
  const faqs = [
    {
      q: "Why multiply SGPA by 9.5 and not 10?",
      a: "The 9.5 multiplier accounts for the fact that a perfect 10 CGPA does not always correspond to exactly 100%; it is the formula prescribed by several university systems, though it is an approximation rather than a universal rule."
    },
    {
      q: "Does every university use the 9.5 multiplier?",
      a: "No, some use 10, others use a custom formula. Always confirm with your specific institution for anything official."
    },
    {
      q: "Can I convert a single semester's SGPA, or only overall CGPA?",
      a: "This tool converts a single semester's SGPA; use the CGPA to Percentage tool for your overall cumulative result."
    },
    {
      q: "Is this percentage valid for job applications?",
      a: "Treat it as a close estimate; request an official percentage equivalent certificate from your university registrar for formal use."
    },
    {
      q: "What if my SGPA is on a 4-point scale instead of 10-point?",
      a: "Use the CGPA to Percentage converter's 4-point option instead which applies a different formula suited to that scale."
    },
    {
      q: "Why does my transcript already show a percentage alongside SGPA?",
      a: "Some universities calculate and print both automatically each semester using their own official formula which may differ slightly from this generic conversion."
    },
    {
      q: "Can the SGPA-to-percentage formula vary by department?",
      a: "Occasionally, if different departments or programs within the same university follow different grading policies check with your specific department if you are unsure."
    }
  ];

  const steps = [
    {
      title: "Enter SGPA",
      description: "Enter your SGPA for the single semester you want to convert."
    },
    {
      title: "Convert",
      description: "Click Convert to see the equivalent percentage instantly."
    },
    {
      title: "Verify Factor",
      description: "Check if your university uses 9.5 or a different conversion multiplier."
    },
    {
      title: "Record Result",
      description: "Use the result for your resume or application tracking."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/SGPA%20to%20Percentage%20Calculator.webp"
        imageAlt="Student academic conversion"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">SGPA to Percentage Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This calculator converts your SGPA for a single term directly into an equivalent percentage, using the standard multiplier formula followed by many universities on the 10-point grading system.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Instantly convert any single semester's SGPA into percentage</li>
              <li>Uses the standard 9.5 multiplier formula</li>
              <li>Useful for resumes, applications, and personal tracking</li>
              <li>No login or download required</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <p className="bg-muted p-4 rounded-xl font-mono text-center">
              Percentage = SGPA × 9.5
            </p>
            <p className="mt-2 italic">Example: SGPA 8.6 = 81.7%</p>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.sgpaToPercentage} />
        <FAQ items={[...faqs, ...calculatorContentDepth.sgpaToPercentage.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
