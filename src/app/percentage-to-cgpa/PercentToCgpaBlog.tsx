import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function PercentToCgpaBlog() {
  const relatedLinks = [
    { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
    { name: "SGPA to CGPA", href: ROUTES.sgpaToCgpa },
    { name: "Marks Percentage Calculator", href: ROUTES.marksPercentageCalculator },
  ];
  const faqs = [
    {
      q: "Is percentage to CGPA conversion officially recognized?",
      a: "Not universally it is a useful estimate. Only your university's official transcript or an equivalency certificate is valid for formal use."
    },
    {
      q: "Why would I need to convert percentage to CGPA?",
      a: "Some universities or scholarship application forms specifically ask for CGPA even if your original transcript shows a percentage."
    },
    {
      q: "Is this exactly the inverse of the CGPA-to-percentage formula?",
      a: "Yes, mathematically they invert each other but official conversions may use institution specific tables rather than a single universal formula."
    },
    {
      q: "Does this work for engineering colleges under AICTE?",
      a: "The ÷9.5 formula is commonly cited for many AICTE-affiliated institutions but always confirm the exact formula with your specific university."
    },
    {
      q: "Can I use this for high school results?",
      a: "This tool is intended primarily for university level CGPA systems school boards often maintain their own separate conversion tables."
    },
    {
      q: "What if my percentage is above 95%?",
      a: "In rare edge cases the formula may produce a value above the scale's maximum; treat any result above the top of the scale as capped at the maximum."
    },
    {
      q: "Should I use this for a visa or immigration application?",
      a: "No, for any legal or immigration purpose, use an official equivalency certificate from a recognized credential evaluation service instead of an estimated conversion."
    }
  ];

  const steps = [
    {
      title: "Select Target Scale",
      description: "Select your target CGPA scale."
    },
    {
      title: "Enter Percentage",
      description: "Enter your percentage score as it appears on your result sheet."
    },
    {
      title: "Convert",
      description: "Click Convert to see your estimated CGPA equivalent instantly."
    },
    {
      title: "Verify Standards",
      description: "Confirm if your target institution uses the 9.5 divisor or a different table."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Percentage%20to%20CGPA%20Calculator.webp"
        imageAlt="Grade conversion process"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Percentage to CGPA Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have your academic result in percentage form but need to state it as CGPA for a university application, scholarship or job requirement this calculator reverses the standard CGPA to percentage formula to give you an estimated CGPA equivalent.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Convert percentage to CGPA on 10-point or 4-point scales</li>
              <li>Useful for applications that specifically require CGPA</li>
              <li>Instant, formula based results</li>
              <li>Free with no sign-up required</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Conversion Formulas</h3>
            <div className="bg-muted p-4 rounded-xl space-y-3">
              <div className="text-center">
                <p className="text-xs font-bold text-primary mb-1">10-Point Scale</p>
                <p className="font-mono text-sm">CGPA = Percentage ÷ 9.5</p>
              </div>
              <div className="text-center border-t border-border pt-3">
                <p className="text-xs font-bold text-primary mb-1">4-Point Scale</p>
                <p className="font-mono text-sm">CGPA = (Percentage ÷ 100) × 4</p>
              </div>
            </div>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.percentageToCgpa} />
        <FAQ items={[...faqs, ...calculatorContentDepth.percentageToCgpa.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
