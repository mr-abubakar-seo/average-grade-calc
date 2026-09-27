import { Metadata } from "next";
import { UnifiedMarksCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import MarksCalcBlog from "@/app/marks-percentage-calculator/MarksCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("marks-percentage");

export default function MarksPercentagePage() {
  const schema = generateCalculatorSchema("marks-percentage");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedMarksCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <MarksCalcBlog />
        </div>
      </article>
    </>
  );
}
