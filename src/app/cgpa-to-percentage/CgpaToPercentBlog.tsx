import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function CgpaToPercentBlog() {
  const relatedLinks = [
    { name: "Percentage to CGPA", href: ROUTES.percentageToCgpa },
    { name: "SGPA to Percentage", href: ROUTES.sgpaToPercentage },
    { name: "GPA Calculator", href: ROUTES.gpaCalculator },
  ];
  const faqs = [
    {
      q: "Is the CGPA to percentage formula the same everywhere?",
      a: "No, it depends on the grading system of your specific university. The 9.5 multiplier is common in India under certain university guidelines but your institution's exact formula may differ slightly."
    },
    {
      q: "Why do I need to convert CGPA to percentage?",
      a: "Some employers require academic records in percentage form rather than CGPA for standardized comparison."
    },
    {
      q: "Can this conversion be officially certified?",
      a: "No, for official documents always request an official transcript from your university's registrar this calculator is for quick personal reference only."
    },
    {
      q: "What if my university uses a different scale like 7.0 or 5.0?",
      a: "Select the closest matching scale option or check with your institution for their specific official conversion formula."
    },
    {
      q: "Does rounding affect the accuracy of this conversion?",
      a: "Small rounding differences can occur; for official use, ask your university registrar for the exact figure they calculate."
    },
    {
      q: "Can I convert percentage back to CGPA using the same formula?",
      a: "Yes, simply reverse the formula or use our dedicated Percentage to CGPA converter for that direction."
    }
  ];

  const steps = [
    {
      title: "Select Scale",
      description: "Select your CGPA scale (commonly 4.0 or 10.0)."
    },
    {
      title: "Enter CGPA",
      description: "Enter your CGPA value as it appears on your transcript."
    },
    {
      title: "Convert",
      description: "Click Convert to see the equivalent percentage instantly."
    },
    {
      title: "Verify Formula",
      description: "Check if your university uses the standard 9.5 multiplier or another factor."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/CGPA%20to%20Percentage%20Calculator.webp"
        imageAlt="Grade conversion analysis"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">CGPA to Percentage Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Many universities issue transcripts in CGPA on a 4.0 or 10.0 scale but employers, immigration authorities or other institutions often require academic performance expressed as a percentage. This tool converts your CGPA into an equivalent percentage using standard conversion formulas.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Supports both 10-point and 4-point CGPA scales</li>
              <li>Instant, formula based conversion</li>
              <li>Useful for job applications and scholarships</li>
              <li>No sign up required</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Conversion Formulas</h3>
            <div className="bg-muted p-4 rounded-xl space-y-3">
              <div className="text-center">
                <p className="text-xs font-bold text-primary mb-1">10-Point Scale</p>
                <p className="font-mono text-sm">Percentage = CGPA × 9.5</p>
              </div>
              <div className="text-center border-t border-border pt-3">
                <p className="text-xs font-bold text-primary mb-1">4-Point Scale</p>
                <p className="font-mono text-sm">Percentage = (CGPA ÷ 4) × 100</p>
              </div>
            </div>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.cgpaToPercentage} />
        <FAQ items={[...faqs, ...calculatorContentDepth.cgpaToPercentage.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
