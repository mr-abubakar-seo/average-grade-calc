import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import AboutPage from "./AboutClient";

export const metadata: Metadata = generateCalculatorMetadata("about");

export default function Page() {
  const schema = generateWebPageSchema("about");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <AboutPage />
    </>
  );
}
