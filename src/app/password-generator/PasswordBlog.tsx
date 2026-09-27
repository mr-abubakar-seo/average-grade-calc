import { FAQ } from "@/components/sections/FAQ";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { CalculatorContentDepth } from "@/components/sections/CalculatorContentDepth";
import { calculatorContentDepth } from "@/lib/calculatorContentDepth";
import { ROUTES } from "@/lib/routes";

export default function PasswordBlog() {
  const relatedLinks = [
    { name: "Percentage Calculator", href: ROUTES.percentageCalculator },
    { name: "Loan Calculator", href: ROUTES.loanCalculator },
  ];
  const faqs = [
    {
      q: "Is it safe to generate passwords online?",
      a: "Passwords should be generated using a secure, client side random function so nothing is transmitted or stored for maximum security on highly sensitive accounts, a dedicated offline password manager is also recommended."
    },
    {
      q: "How long should my password be?",
      a: "Security experts generally recommend at least 12 characters with 16 or more for important accounts like email or banking."
    },
    {
      q: "Should I include symbols in every password?",
      a: "Include symbols when the website allows them, as they significantly increase the number of possible combinations and make passwords harder to crack — but some sites restrict which characters are allowed."
    },
    {
      q: "How do I remember a randomly generated password?",
      a: "Use a reputable password manager to store and autofill your passwords instead of memorizing them — this also lets you safely use a different strong password for every account."
    },
    {
      q: "What's the difference between a password generator and a password manager?",
      a: "A password generator only creates a random password; a password manager also securely stores, organizes, and autofills passwords across your devices. Many people use both together."
    },
    {
      q: "Can a generated password still be cracked?",
      a: "Any password can theoretically be cracked given enough time and computing power, but a long, random password with mixed character types can take centuries to brute-force with current technology, making it highly impractical to crack."
    },
    {
      q: "How often should I change my passwords?",
      a: "Rather than changing passwords on a fixed schedule, security experts now generally recommend changing a password immediately if a service you use reports a data breach, and using a unique strong password for every account so one breach doesn't compromise others."
    }
  ];

  const steps = [
    {
      title: "Choose Length",
      description: "Select your desired password length."
    },
    {
      title: "Select Character Types",
      description: "Include uppercase, lowercase, numbers and symbols for maximum entropy."
    },
    {
      title: "Generate Password",
      description: "Click Generate to create a cryptographically strong random password."
    },
    {
      title: "Copy to Clipboard",
      description: "Click Copy to safely use your new password in your account settings."
    }
  ];

  return (
    <div className="mt-10 space-y-12">
      <HowItWorks 
        steps={steps} 
        imageSrc="/assets/Password%20Generator.webp"
        imageAlt="Secure password generation"
      />

      <div className="space-y-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Password Generator Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A Password Generator creates strong and random passwords to help protect your online accounts from being guessed or cracked. It lets you customize password length and which character types to include, so you can meet the specific requirements of different websites and services.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Why Use This Calculator</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Generate strong, unique passwords in one click</li>
              <li>Fully customizable length and character sets</li>
              <li>Helps meet website specific password requirements</li>
              <li>Nothing is stored or transmitted generated locally</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-primary">Security Guidelines</h3>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Use at least 12 characters 16+ is recommended</li>
              <li>Include a mix of all character types</li>
              <li>Avoid dictionary words or names</li>
              <li>Use a unique password for every account</li>
            </ul>
          </div>
        </section>

        <CalculatorContentDepth content={calculatorContentDepth.password} />
        <FAQ items={[...faqs, ...calculatorContentDepth.password.extraFaqs]} />
        <RelatedCalculators links={relatedLinks} />
      </div>
    </div>
  );
}
