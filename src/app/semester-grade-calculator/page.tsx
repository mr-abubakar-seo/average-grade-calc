import { Metadata } from "next";
import SemesterGradeCalculator from "@/components/calculator/SemesterGradeCalculator";
import GradeCalcBlog from "./GradeCalcBlog";
import { generateCalculatorMetadata, generateCalculatorSchema } from "@/lib/metadata";

export const metadata: Metadata = generateCalculatorMetadata("semester-grade");

export default function GradePage() {
  const schema = generateCalculatorSchema("semester-grade");

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <article className="-my-8 overflow-x-clip overflow-y-visible">
        <SemesterGradeCalculator />
        <div className="container mx-auto max-w-6xl px-4">
          <GradeCalcBlog />
        </div>
      </article>
    </>
  );
}
