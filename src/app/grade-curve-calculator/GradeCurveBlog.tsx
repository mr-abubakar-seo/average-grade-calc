import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { ROUTES } from "@/lib/routes";

export default function GradeCurveBlog() {
  const relatedLinks = [
    { name: "Semester Grade Calculator", href: ROUTES.semesterGradeCalculator },
    { name: "Average Grade Calculator", href: ROUTES.home },
    { name: "Final Grade Calculator", href: ROUTES.finalGradeCalculator },
  ];
  const faqs = [
    {
      q: "What's the easiest way to curve grades?",
      a: "Adding a flat number of points or using the highest score method. Both take a minute. For big classes, many teachers prefer the square root method because it helps lower scores the most."
    },
    {
      q: "Can a curve lower my grade?",
      a: "Almost never. The bell curve method is the only common one that can bring a score down, since it rebuilds every result around the class average."
    },
    {
      q: "Is curving common in college?",
      a: "Yes, especially in STEM courses. Many professors aim for a class average around a B minus or C plus and curve the exam to get there."
    },
    {
      q: "How is a curve different from extra credit?",
      a: "Extra credit is extra work a student chooses to do. A curve is a formula applied to the whole class's existing scores."
    },
    {
      q: "Can a curved score go above 100 percent?",
      a: "Usually not. Most instructors cap the result at 100, even if the formula gives a higher number."
    },
  ];

  const steps = [
    {
      title: "Total questions",
      description: "Type in how many questions or points the test had."
    },
    {
      title: "Correct answers",
      description: "Enter how many you got right."
    },
    {
      title: "Minimum passing percentage",
      description: "Use the pass mark your teacher or school gave you, like 60 or 70."
    },
    {
      title: "Calculate",
      description: "Your percentage, the gap to passing, and your grade band show up straight away."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Grade%20Curve%20Calculator.webp"
        imageAlt="Grade curving analysis"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">An Example</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Take a 50-question test where you got 32 right. That&apos;s 64 percent. If the pass mark is 70, you needed 35 correct answers, so you&apos;re three questions short, or roughly six percentage points. A curve of about six points would be enough to get you over the line.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What Is a Grade Curve?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Teachers curve grades when a test turns out harder than they meant it to be. Picture a class that averages 52 percent on an exam the instructor expected people to average 75 on. Failing half the room doesn&apos;t say much about what they learned, so the instructor adjusts the scores upward.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A good curve keeps the order the same. Whoever scored highest is still first, and nobody jumps ahead of anyone else. What changes is the overall level of the marks. You see this most in college science, engineering, and math classes, where professors often write tough exams on purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Common Ways Teachers Curve Grades</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            There&apos;s no single standard. Your instructor could use any of the methods below, and knowing which one helps you guess where your own score will land.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-primary">Highest Score Method</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Find the best score in the class and see how far it is from 100. That gap gets added to everybody. If the top mark is 88, every student gets 12 extra points, so a 61 becomes a 73.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-primary">Flat Point Curve</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The teacher adds a fixed number, often 5 or 10 points, to every paper. It&apos;s the quickest option, but it ignores how far each student was from the average.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-primary">Square Root Method</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take the square root of your score and multiply it by 10. A 64 turns into an 80, and a 36 turns into a 60. Weaker scores get the biggest lift, which is why large lecture courses like this one.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-primary">Bell Curve Method</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This method uses the class mean and the standard deviation. Say the class averaged 58 and the professor wants an average of 75. A student who scored well above the class mean ends up far above 75, while a student below it may land under 75. If the target is lower than the real average, some marks go down, which makes this the one method that can actually hurt.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-primary">Target Average and Rank-Based Curves</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A target average curve adds whatever it takes to reach a chosen class average, like 75 percent. A rank-based curve ignores raw scores and hands out grades by position, for example an A for the top ten percent.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Why Use a Grade Curve Calculator?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li>It&apos;s quick. You get a result in seconds instead of working through percentages by hand.</li>
            <li>Fewer slips. Small arithmetic mistakes are easy to make when you&apos;re stressed. A calculator doesn&apos;t make them.</li>
            <li>A clear gap. You see exactly how many questions decided the outcome.</li>
            <li>It&apos;s free. No registration and no limit on how often you use it.</li>
            <li>It works on a phone. Handy when you&apos;ve just walked out of the exam hall.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Who Uses This Tool?</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-base text-primary">Students</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you missed the pass mark by a few points, the result tells you whether asking your instructor about a curve is worth a try. It also gives you a real number to work with when you plan for the next test.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base text-primary">Teachers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Try a few different pass marks and see how the class results shift before you decide whether to curve at all.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Terms Worth Knowing</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
            <li><strong>Raw score:</strong> the mark you earned before any adjustment.</li>
            <li><strong>Curved score:</strong> the mark after the curve is applied.</li>
            <li><strong>Class mean:</strong> the average of everyone&apos;s scores.</li>
            <li><strong>Standard deviation:</strong> a measure of how spread out the scores are.</li>
            <li><strong>Z-score:</strong> how many standard deviations a score sits above or below the mean.</li>
            <li><strong>Percentile rank:</strong> where you stand compared with the rest of the class.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">When a Curve Isn&apos;t a Good Idea</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If only a few students struggled, the problem probably isn&apos;t the exam, so most teachers leave the marks alone. The same goes for a curve that would push the class average unrealistically high. And some schools simply don&apos;t allow curving without approval, so check your policy first.
          </p>
        </section>

        <FAQ items={faqs} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
