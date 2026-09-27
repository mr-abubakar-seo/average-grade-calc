import { Metadata } from "next";
import { UnifiedCgpaCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import CgpaCalcBlog from "./CgpaCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("cgpa-calculator");

export default function CgpaCalculatorPage() {
  const schema = generateCalculatorSchema("cgpa-calculator");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedCgpaCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <CgpaCalcBlog />
        </div>
      </article>
    </>
  );
}
