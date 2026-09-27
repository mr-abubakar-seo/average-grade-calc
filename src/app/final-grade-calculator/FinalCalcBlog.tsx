import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { ROUTES } from "@/lib/routes";

export default function FinalCalcBlog() {
  const relatedLinks = [
    { name: "Semester Grade Calculator", href: ROUTES.semesterGradeCalculator },
    { name: "Grade Curve Calculator", href: ROUTES.gradeCurveCalculator },
    { name: "Average Grade Calculator", href: ROUTES.home },
    { name: "GPA Calculator", href: ROUTES.gpaCalculator },
    { name: "CGPA Calculator", href: ROUTES.cgpaCalculator },
  ];
  const faqs = [
    {
      q: "What if I need more than 100 percent?",
      a: "Then your target can't be reached with the final alone. You'd need extra credit or a curve, or you can pick a lower target."
    },
    {
      q: "What if the score I need is very low or negative?",
      a: "You're in a strong position. A negative result means your target is already secured, however the final goes."
    },
    {
      q: "Does this work for cumulative finals?",
      a: "Yes. Enter the weight the final carries in your overall course grade, whether it covers the whole course or just part of it."
    },
    {
      q: "Can I use it for other remaining assignments?",
      a: "Yes. If a single project is worth a set share of your grade, enter that weight in place of the final."
    },
    {
      q: "Can I enter the weight as a decimal?",
      a: "Enter it as a percentage, for example 30 for 30 percent."
    },
    {
      q: "What if I still have a midterm and a final?",
      a: "Add their weights together and use your grade from before both. For a fuller breakdown, try the Semester Grade Calculator."
    },
    {
      q: "Is this the same as a what-do-I-need-to-pass calculator?",
      a: "Yes. Set your target to the minimum passing grade, and it shows the lowest exam score that keeps you in the clear."
    }
  ];

  const steps = [
    {
      title: "Current grade",
      description: "Enter your overall percentage in the course before the final."
    },
    {
      title: "Target grade",
      description: "Type the final course grade you want, such as 90 for an A."
    },
    {
      title: "Final exam weight",
      description: "Enter the percentage of your total grade that the final is worth."
    },
    {
      title: "Calculate",
      description: "The tool shows the minimum score you need on the exam."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Final%20Grade%20Calculator.webp"
        imageAlt="Student preparing for final exams"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What Is a Final Grade Calculator?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A final grade calculator, sometimes called a final exam calculator, works out the lowest mark you can get on your last exam and still finish the course with the grade you want. It only needs three numbers: where you stand now, where you want to end up, and how much the final is worth. It also tells you early on whether your goal is realistic, so you can change your plan while there&apos;s still time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">The Formula Behind the Calculator</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The math isn&apos;t complicated. This is what the tool runs for you:
          </p>
          <div className="bg-muted p-4 rounded-xl text-center">
            <p className="font-mono text-xs">Required Score = [Target Grade - (Current Grade × (1 - Final Weight))] / Final Weight</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">A Worked Example</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Say you&apos;re sitting at 85 percent, you want a 90, and the final is worth 30 percent. Start with 85 times 0.70, which is 59.5. Subtract that from 90 and you get 30.5. Divide by 0.30 and the answer is 101.7 percent. That&apos;s more than a perfect score, so an A isn&apos;t possible unless there&apos;s extra credit or a curve. Better to learn that now than after the exam.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What Your Result Means</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-base text-primary">The Score Needed Is Over 100 Percent</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The final alone can&apos;t get you to your target. You can ask about extra credit, find out whether a curve is likely, or aim a little lower.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base text-primary">The Score Needed Is Reasonable</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Good news. You have a number to aim for. Use it to decide how much study time this course really deserves compared with your other exams.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base text-primary">The Score Needed Is Zero or Negative</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your current grade already locks in your target, even if you scored nothing on the final. Read your syllabus before you relax, though. Some courses require a minimum exam mark to pass.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Real Scenarios</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Here&apos;s how the numbers play out for four different students.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-bold">Current Grade</th>
                  <th className="text-left py-2 px-3 font-bold">Target</th>
                  <th className="text-left py-2 px-3 font-bold">Final Weight</th>
                  <th className="text-left py-2 px-3 font-bold">Score Needed</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-3">92%</td>
                  <td className="py-2 px-3">90%</td>
                  <td className="py-2 px-3">30%</td>
                  <td className="py-2 px-3">85.3%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">88%</td>
                  <td className="py-2 px-3">90%</td>
                  <td className="py-2 px-3">40%</td>
                  <td className="py-2 px-3">93.0%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">70%</td>
                  <td className="py-2 px-3">80%</td>
                  <td className="py-2 px-3">50%</td>
                  <td className="py-2 px-3">90.0%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">62%</td>
                  <td className="py-2 px-3">60%</td>
                  <td className="py-2 px-3">25%</td>
                  <td className="py-2 px-3">54.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The first student is comfortable. The second needs a strong exam. The third has a lot of work ahead, and the fourth can pass with a modest score, which takes some of the pressure off.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Tips to Boost Your Final Exam Score</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>Start early. A week of steady revision beats one night of cramming.</li>
            <li>Go after weak spots. Look through old tests to see where you lost marks.</li>
            <li>Practice with past papers. Timing yourself builds speed and confidence.</li>
            <li>Protect your sleep. A rested brain remembers far more than a tired one.</li>
            <li>Ask for help. Go to office hours or set up a study group before the exam.</li>
            <li>Check the weight. Confirm the final&apos;s exact value in your syllabus so the result is accurate.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Who Is This Tool For?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            High school students use it to protect their GPA before finals. College students use it to decide which exam deserves the most study time. Parents and teachers use it to set realistic goals and give students honest numbers. It works for any course with weighted grades, from biology to business.
          </p>
        </section>

        <FAQ items={faqs} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
