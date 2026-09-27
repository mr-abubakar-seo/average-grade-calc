import { Metadata } from "next";
import { UnifiedPasswordGenerator } from "@/components/calculator/UnifiedCalculatorWidgets";
import PasswordBlog from "@/app/password-generator/PasswordBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("password");

export default function PasswordPage() {
  const schema = generateCalculatorSchema("password");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <UnifiedPasswordGenerator />
        <div className="container mx-auto max-w-6xl px-4">
          <PasswordBlog />
        </div>
      </article>
    </>
  );
}
