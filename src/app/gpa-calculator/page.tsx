import { Metadata } from "next";
import UnifiedGpaCalculator from "@/components/calculator/UnifiedGpaCalculator";
import GpaCalcBlog from "@/app/gpa-calculator/GpaCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

// Generate dynamic metadata
export const metadata: Metadata = generateCalculatorMetadata("gpa");

export default function GpaPage() {
  const schema = generateCalculatorSchema("gpa");

  return (
    <>
      {/* JSON-LD Schema for this specific calculator */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedGpaCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <GpaCalcBlog />
        </div>
      </article>
    </>
  );
}
