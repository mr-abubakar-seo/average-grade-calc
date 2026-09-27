import GlobalCTA from "@/components/ui/GlobalCTA";
import { ROUTES } from "@/lib/routes";

export function AboutCTA() {
  return (
    <GlobalCTA
      title="Ready to calculate with"
      highlightText="confidence?"
      subtitle="Pick any tool from the Average Grade Calculator suite - free, instant, and always will be. No account, clear formulas, no guesswork."
      badgeText="Precision tools • Always free"
      primaryBtnText="Explore All Tools"
      secondaryBtnText="Contact Us"
      primaryLink={ROUTES.home}
      secondaryLink={ROUTES.contact}
    />
  );
}
