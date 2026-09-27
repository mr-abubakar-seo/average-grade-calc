import { Metadata } from "next";
import { UnifiedPercentToCgpaCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import PercentToCgpaBlog from "./PercentToCgpaBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("percentage-to-cgpa");

export default function PercentageToCgpaPage() {
  const schema = generateCalculatorSchema("percentage-to-cgpa");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedPercentToCgpaCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <PercentToCgpaBlog />
        </div>
      </article>
    </>
  );
}
