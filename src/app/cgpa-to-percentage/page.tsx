import { Metadata } from "next";
import { UnifiedCgpaToPercentCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import CgpaToPercentBlog from "./CgpaToPercentBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("cgpa-to-percentage");

export default function CgpaPage() {
  const schema = generateCalculatorSchema("cgpa-to-percentage");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedCgpaToPercentCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <CgpaToPercentBlog />
        </div>
      </article>
    </>
  );
}
