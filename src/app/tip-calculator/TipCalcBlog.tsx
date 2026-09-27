import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function TipCalcBlog() {
  const relatedLinks = [
    { name: "Percentage Calculator", href: ROUTES.percentageCalculator },
    { name: "Loan Calculator", href: ROUTES.loanCalculator },
  ];
  const faqs = [
    {
      q: "What is a standard tip percentage?",
      a: "In the U.S., 15–20% is typical for restaurant service, though this varies by country, service quality and local custom."
    },
    {
      q: "Should I tip on the pre-tax or post-tax amount?",
      a: "Convention varies many people tip on the pre-tax subtotal, though tipping on the total including tax is also common and simply results in a slightly higher tip."
    },
    {
      q: "Is tipping customary everywhere?",
      a: "No, tipping norms vary significantly by country. In some countries, service charges are already included in the bill or tipping is not customary at all."
    },
    {
      q: "How do I split a bill unevenly, when people ordered different amounts?",
      a: "This calculator assumes an even split; for itemized splitting, add up each person's individual order total and apply the tip percentage separately."
    },
    {
      q: "How do I calculate a tip for a large group?",
      a: "The same formula applies regardless of group size enter the total bill, choose your tip percentage and enter the number of people to get an even per person amount which is especially useful for large groups where many restaurants also add an automatic gratuity."
    },
    {
      q: "Should I tip on takeout or delivery orders?",
      a: "Tipping norms for takeout are generally lower or optional compared to sit down service while delivery orders typically warrant a tip similar to restaurant dining check the specific service's guidance if unsure."
    },
    {
      q: "How does tipping differ across countries?",
      a: "Tipping culture varies widely: it is expected and significant in the U.S. more modest in much of Europe, and sometimes considered unnecessary or even discouraged in countries like Japan research local customs when traveling."
    }
  ];

  const steps = [
    {
      title: "Enter Bill Amount",
      description: "Type the total amount of your bill."
    },
    {
      title: "Select Tip %",
      description: "Choose a standard percentage or enter a custom tip amount."
    },
    {
      title: "Enter Group Size",
      description: "Enter the number of people splitting the total bill."
    },
    {
      title: "Get Breakdown",
      description: "See the tip amount, total bill, and what each person owes instantly."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Tip%20Calculator.webp"
        imageAlt="Restaurant bill splitting"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Tip Calculator Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A Tip Calculator quickly works out how much to tip at a restaurant or for a service and how to split the total bill, including tip, evenly among a group.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Instantly calculate tip amount and total bill</li>
              <li>Split bills evenly among any number of people</li>
              <li>Try different tip percentages to compare totals</li>
              <li>Great for restaurants, delivery and service tipping</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <div className="bg-muted p-4 rounded-xl space-y-2 text-xs font-mono">
              <p>Tip = Bill × (Tip % ÷ 100)</p>
              <p>Total = Bill + Tip</p>
              <p>Per Person = Total ÷ Group Size</p>
            </div>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.tip} />
        <FAQ items={[...faqs, ...calculatorContentDepth.tip.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
