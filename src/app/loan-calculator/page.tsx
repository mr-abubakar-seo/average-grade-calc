import { Metadata } from "next";
import { UnifiedLoanCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import LoanCalcBlog from "./LoanCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("loan");

export default function LoanPage() {
  const schema = generateCalculatorSchema("loan");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedLoanCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <LoanCalcBlog />
        </div>
      </article>
    </>
  );
}
