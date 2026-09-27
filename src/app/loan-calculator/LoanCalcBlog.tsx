import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function LoanCalcBlog() {
  const relatedLinks = [
    { name: "Percentage Calculator", href: ROUTES.percentageCalculator },
    { name: "Tip Calculator", href: ROUTES.tipCalculator },
  ];
  const faqs = [
    {
      q: "What is the difference between fixed and variable interest rate loans?",
      a: "A fixed rate stays the same for the life of the loan so your EMI never changes a variable rate can rise or fall with market conditions, changing your EMI over time this calculator assumes a fixed rate."
    },
    {
      q: "How does loan term affect total interest paid?",
      a: "A longer term lowers your monthly payment but increases the total interest paid over the life of the loan since interest accrues for a longer period."
    },
    {
      q: "Is this financial advice?",
      a: "No. This tool provides estimates for planning purposes only consult a licensed financial advisor or your lender for exact figures and terms before making borrowing decisions."
    },
    {
      q: "What is amortization?",
      a: "Amortization is the process of paying off a loan through regular payments over time where each payment covers both interest and a portion of the principal early payments are interest heavy and later payments pay down more principal."
    },
    {
      q: "Can I pay off a loan early to save on interest?",
      a: "In many cases yes, though some lenders charge prepayment penalties check your specific loan agreement since paying extra toward principal generally reduces total interest paid."
    },
    {
      q: "How does a larger down payment affect my EMI?",
      a: "A larger down payment reduces the principal amount you need to borrow which lowers both your monthly EMI and the total interest paid over the loan's life."
    }
  ];

  const steps = [
    {
      title: "Enter Loan Amount",
      description: "Enter the total principal amount you plan to borrow."
    },
    {
      title: "Enter Interest Rate",
      description: "Enter the annual interest rate offered by your lender."
    },
    {
      title: "Set Loan Term",
      description: "Enter the repayment term in years or months."
    },
    {
      title: "Calculate EMI",
      description: "Click Calculate to see your monthly payment and total interest cost."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Loan%20Calculator.webp"
        imageAlt="Financial loan planning"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Loan Calculator Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A Loan Calculator also called an EMI Calculator, estimates your monthly payment Equated Monthly Installment for a loan such as a home, auto or personal loan, based on the loan amount, interest rate and repayment term. It also shows the total interest you will pay over the life of the loan.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Estimate monthly payments for any fixed rate loan</li>
              <li>See total interest and total repayment over the full term</li>
              <li>Compare how different terms or rates affect your payment</li>
              <li>Useful for home, auto, personal and student loans</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <p className="bg-muted p-4 rounded-xl font-mono text-[10px] text-center">
              EMI = [P × R × (1+R)^N] ÷ [(1+R)^N − 1]
            </p>
            <p className="mt-2 italic">P = Principal, R = Monthly Rate, N = Months</p>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.loan} />
        <FAQ items={[...faqs, ...calculatorContentDepth.loan.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
