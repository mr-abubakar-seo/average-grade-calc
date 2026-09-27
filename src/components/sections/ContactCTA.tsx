import GlobalCTA from "@/components/ui/GlobalCTA";
import { ROUTES } from "@/lib/routes";

export function ContactCTA() {
  return (
    <GlobalCTA
      title="While you're here,"
      highlightText="try our tools."
      subtitle="All Average Grade Calculator tools are free and instant. No account needed — just open a calculator and get your answer."
      badgeText="Free • No sign-up • Instant results"
      primaryBtnText="Explore All Tools"
      secondaryBtnText="Read the FAQ"
      primaryLink={ROUTES.home}
      secondaryLink={ROUTES.faq}
    />
  );
}
