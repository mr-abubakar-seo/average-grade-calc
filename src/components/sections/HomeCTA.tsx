import GlobalCTA from "@/components/ui/GlobalCTA";
import { ROUTES } from "@/lib/routes";

export function HomeCTA() {
  return (
    <GlobalCTA
      title="Stop guessing."
      highlightText="Start calculating."
      subtitle="Average Grade Calculator gives you free, precision-engineered tools to track grades, plan for finals, convert scores, and take control of your academic performance."
      badgeText="15 precision tools • Always free"
      primaryBtnText="Explore All Tools"
      secondaryBtnText="Read the FAQ"
      primaryLink={ROUTES.home}
      secondaryLink={ROUTES.faq}
    />
  );
}
