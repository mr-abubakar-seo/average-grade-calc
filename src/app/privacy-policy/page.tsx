import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import PrivacyPage from "./PrivacyClient";

export const metadata: Metadata = generateCalculatorMetadata("privacy-policy");

export default function Page() {
  const schema = generateWebPageSchema("privacy-policy");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <PrivacyPage />
    </>
  );
}
