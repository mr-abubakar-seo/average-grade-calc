import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import DisclaimerPage from "./DisclaimerClient";

export const metadata: Metadata = generateCalculatorMetadata("disclaimer");

export default function Page() {
  const schema = generateWebPageSchema("disclaimer");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <DisclaimerPage />
    </>
  );
}
