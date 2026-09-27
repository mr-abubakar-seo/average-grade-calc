import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import TermsPage from "./TermsClient";

export const metadata: Metadata = generateCalculatorMetadata("terms-of-service");

export default function Page() {
  const schema = generateWebPageSchema("terms-of-service");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <TermsPage />
    </>
  );
}
