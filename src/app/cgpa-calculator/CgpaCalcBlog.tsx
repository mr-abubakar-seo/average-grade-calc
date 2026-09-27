import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function CgpaCalcBlog() {
  const relatedLinks = [
    { name: "CGPA to Percentage", href: ROUTES.cgpaToPercentage },
    { name: "GPA Calculator", href: ROUTES.gpaCalculator },
    { name: "Semester Grade Calculator", href: ROUTES.semesterGradeCalculator },
  ];
  const faqs = [
    {
      q: "What's the difference between GPA and CGPA?",
      a: "GPA is for one semester and CGPA is the average across all semesters completed to date."
    },
    {
      q: "Can CGPA go down after a next semester?",
      a: "Yes, if the new semester's GPA is lower than your existing CGPA, it will pull the average down; a higher one will raise it but the more total credits you have already accumulated, the little bit the effect any single semester has."
    },
    {
      q: "Is CGPA calculated the same way in every country?",
      a: "No. Some countries use a 4.0 scale, others a 10.0 or 7.0 point scale and formulas for converting CGPA to percentage different by institution."
    },
    {
      q: "Do repeated or failed courses affect CGPA?",
      a: "Yes, unless your institution has a specific grade replacement policy to check your academic handbook."
    },
    {
      q: "Do all universities use the same CGPA scale?",
      a: "No, common scales include 4.0, 5.0, 7.0 and 10.0 and each has its own grade point mapping, so a 3.5 CGPA on one scale is not comparable to a 3.5 on another without conversion."
    },
    {
      q: "What is considered a good CGPA?",
      a: "This depends on the scale and country to on a 4.0 scale, 3.5+ is considered strong on a 10.0 scale, 8.0+ is often considered strong. Always check what is competitive within your specific field and institution."
    },
    {
      q: "How can I improve a low CGPA?",
      a: "Focus on study to get better grades in your remaining semesters and improve your low grade courses in previous semesters."
    }
  ];

  const steps = [
    {
      title: "Enter Current CGPA",
      description: "Add your existing cumulative grade point average."
    },
    {
      title: "Add Completed Credits",
      description: "Enter the credit hours already included in your current CGPA."
    },
    {
      title: "Add New Semester",
      description: "Enter your latest semester SGPA and credit hours."
    },
    {
      title: "Calculate Updated CGPA",
      description: "Click Calculate to see your new cumulative grade point average."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/CGPA%20Calculator.webp"
        imageAlt="Cumulative GPA analysis"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">CGPA Calculator Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            CGPA reflects a student's overall academic performance across completed coursework. This calculator updates your existing CGPA by combining your current cumulative record with your latest semester GPA and credit hours.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use CGPA Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Update an existing CGPA after a new semester</li>
              <li>See m the new semester raises or lowers your CGPA</li>
              <li>Free, fast and works on any device</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <h3 className="font-bold text-lg text-primary">Calculation Formula</h3>
            <p className="bg-muted p-4 rounded-xl font-mono text-[10px] text-center">
              New CGPA = ((Current CGPA × Completed Credits) + (Semester GPA × Semester Credits)) ÷ Total Credits
            </p>
            <p className="mt-2 italic">Example: Current CGPA 8.2 over 80 credits plus semester GPA 8.7 over 20 credits gives an updated CGPA of 8.30.</p>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.cgpa} />
        <FAQ items={[...faqs, ...calculatorContentDepth.cgpa.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
