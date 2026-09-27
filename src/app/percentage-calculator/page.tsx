import { Metadata } from "next";
import { UnifiedPercentageCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import PercentCalcBlog from "@/app/percentage-calculator/PercentCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("percentage");

export default function PercentagePage() {
  const schema = generateCalculatorSchema("percentage");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedPercentageCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <PercentCalcBlog />
        </div>
      </article>
    </>
  );
}
