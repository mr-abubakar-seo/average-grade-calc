import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function PercentCalcBlog() {
  const relatedLinks = [
    { name: "Marks Percentage Calculator", href: ROUTES.marksPercentageCalculator },
    { name: "Tip Calculator", href: ROUTES.tipCalculator },
    { name: "Loan Calculator", href: ROUTES.loanCalculator },
  ];
  const faqs = [
    {
      q: "What is the difference between percentage increase and percentage points?",
      a: "A percentage increase is relative while a percentage point difference is absolute. These are commonly confused."
    },
    {
      q: "Can percentage be negative?",
      a: "Yes, a negative result in a percentage change calculation indicates a decrease rather than an increase."
    },
    {
      q: "How do I calculate a percentage discount?",
      a: "Use 'What is X% of Y' to find the discount amount, then subtract it from the original price or use the increase/decrease formula with the discounted price as the 'new value.'"
    },
    {
      q: "Why do my manual calculations sometimes differ slightly from the tool?",
      a: "Usually due to rounding try carrying more decimal places in manual calculations for an exact match."
    },
    {
      q: "How do I calculate a reverse percentage, like finding the original price before a discount?",
      a: "Divide the discounted price by. For example, if $76 is the price after a 5% discount, the original price = 76 ÷ 0.95 = $80."
    },
    {
      q: "What is percentage error and how is it calculated?",
      a: "Percentage error measures how far an estimated or measured value is from the true value: [(|Estimated − Actual|) ÷ Actual] × 100. It's commonly used in science and engineering to express measurement accuracy."
    },
    {
      q: "How do I convert a fraction to a percentage?",
      a: "Divide the numerator by the denominator then multiply by 100. For example, 3/4 = 0.75, and 0.75 × 100 = 75%."
    }
  ];

  const steps = [
    {
      title: "Select Calculation Type",
      description: "Choose between 'X is what % of Y', 'X% of Y', or 'Percentage Increase/Decrease'."
    },
    {
      title: "Enter Numbers",
      description: "Enter the required numeric values into the input fields."
    },
    {
      title: "Click Calculate",
      description: "Get your result instantly along with a breakdown of the math."
    },
    {
      title: "Switch Variants",
      description: "Try different variants of the same numbers to solve different parts of the problem."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Percentage%20Calculator.webp"
        imageAlt="Percentage math analysis"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Percentage Calculator Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A general purpose Percentage Calculator handles the most common percentage problems people run into finding what percentage one number is of another, finding a percentage of a number and calculating percentage increase or decrease between two values.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Handles multiple percentage calculation types in one tool</li>
              <li>Great for shopping discounts, grades, and financial math</li>
              <li>Instant, accurate results with no manual formulas</li>
              <li>Works for both increases and decreases</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Common Formulas</h3>
            <div className="bg-muted p-4 rounded-xl space-y-2 text-xs font-mono">
              <p><strong>Ratio:</strong> (X ÷ Y) × 100</p>
              <p><strong>Value:</strong> (X ÷ 100) × Y</p>
              <p><strong>Change:</strong> [(New − Old) ÷ Old] × 100</p>
            </div>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.percentage} />
        <FAQ items={[...faqs, ...calculatorContentDepth.percentage.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
