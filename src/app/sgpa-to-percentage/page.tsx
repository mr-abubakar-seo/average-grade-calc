import { Metadata } from "next";
import { UnifiedSgpaToPercentCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import SgpaToPercentBlog from "@/app/sgpa-to-percentage/SgpaToPercentBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("sgpa-to-percentage");

export default function SgpaToPercentagePage() {
  const schema = generateCalculatorSchema("sgpa-to-percentage");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedSgpaToPercentCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <SgpaToPercentBlog />
        </div>
      </article>
    </>
  );
}
