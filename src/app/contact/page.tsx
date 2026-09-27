import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import ContactPage from "./ContactClient";

export const metadata: Metadata = generateCalculatorMetadata("contact");

export default function Page() {
  const schema = generateWebPageSchema("contact");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ContactPage />
    </>
  );
}
