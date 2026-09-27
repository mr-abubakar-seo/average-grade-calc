import { Metadata } from "next";
import { UnifiedFinalGradeCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import FinalCalcBlog from "./FinalCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("final-grade");

export default function FinalGradePage() {
  const schema = generateCalculatorSchema("final-grade");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedFinalGradeCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <FinalCalcBlog />
        </div>
      </article>
    </>
  );
}
