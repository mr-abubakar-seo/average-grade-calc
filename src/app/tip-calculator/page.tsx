import { Metadata } from "next";
import { UnifiedTipCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import TipCalcBlog from "@/app/tip-calculator/TipCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("tip");

export default function TipPage() {
  const schema = generateCalculatorSchema("tip");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedTipCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <TipCalcBlog />
        </div>
      </article>
    </>
  );
}
