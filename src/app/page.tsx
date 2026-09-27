import { Metadata } from "next";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";
import HomeClient from "./HomeClient";

export const metadata: Metadata = generateCalculatorMetadata("home");

export default function Page() {
  const schema = generateCalculatorSchema("home");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <HomeClient />
    </>
  );
}
