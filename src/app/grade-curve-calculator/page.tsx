import { Metadata } from "next";
import { UnifiedGradeCurveCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import GradeCurveBlog from "./GradeCurveBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("grade-curve");

export default function GradeCurvePage() {
  const schema = generateCalculatorSchema("grade-curve");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedGradeCurveCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <GradeCurveBlog />
        </div>
      </article>
    </>
  );
}
