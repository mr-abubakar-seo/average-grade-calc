import { Metadata } from "next";
import { generateCalculatorMetadata, generateWebPageSchema } from "@/lib/metadata";
import CookiePage from "./CookieClient";

export const metadata: Metadata = generateCalculatorMetadata("cookie-policy");

export default function Page() {
  const schema = generateWebPageSchema("cookie-policy");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <CookiePage />
    </>
  );
}
