import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import FaqPage from "./FaqClient";

export const metadata: Metadata = generateCalculatorMetadata("faq");

export default function Page() {
  const schema = generateWebPageSchema("faq");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <FaqPage />
    </>
  );
}
