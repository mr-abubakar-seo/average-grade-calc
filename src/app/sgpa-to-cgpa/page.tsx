import { Metadata } from "next";
import { UnifiedSgpaToCgpaCalculator } from "@/components/calculator/UnifiedCalculatorWidgets";
import SgpaToCgpaBlog from "@/app/sgpa-to-cgpa/SgpaToCgpaBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("sgpa-to-cgpa");

export default function SgpaToCgpaPage() {
  const schema = generateCalculatorSchema("sgpa-to-cgpa");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedSgpaToCgpaCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <SgpaToCgpaBlog />
        </div>
      </article>
    </>
  );
}
