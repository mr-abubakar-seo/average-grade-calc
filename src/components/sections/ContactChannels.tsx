'use client';

import { motion, type Variants } from "framer-motion";
import { FiFacebook, FiMail } from "react-icons/fi";
import GlobalCard from "@/components/ui/GlobalCard";
import GlobalHeading from "@/components/ui/GlobalHeading";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const contactChannels = [
  {
    icon: FiMail,
    title: "Email Us",
    desc: "For general enquiries, bug reports, or feature requests.",
    value: "support@averagegradecalculator.com",
    href: "mailto:support@averagegradecalculator.com",
    accent: "var(--brand)",
    bg: "var(--brand-soft)",
  },
  {
    icon: FiFacebook,
    title: "Facebook",
    desc: "Follow our official page for updates and support notices.",
    value: "facebook.com/averagegradecalculator",
    href: "https://www.facebook.com/averagegradecalculator/",
    accent: "var(--brand)",
    bg: "var(--brand-soft)",
  },
];

export function ContactChannels() {
  return (
    <section className="mb-16 sm:mb-20 lg:mb-24">
      <GlobalHeading
        as="h2"
        badge="Contact options"
        title="Choose the best way to reach us"
        subtitle="Use email for support, or follow Facebook for updates and announcements."
        size="md"
        alignment="center"
        className="py-0 mb-8"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2"
      >
        {contactChannels.map((ch, i) => (
          <motion.div key={ch.title} variants={itemVariants}>
            <GlobalCard
              icon={ch.icon}
              title={ch.title}
              description={ch.desc}
              href={ch.href}
              categoryColor={ch.accent}
              categoryBg={ch.bg}
              accent={ch.accent}
              index={i}
              footer={
                <span className="text-xs font-semibold" style={{ color: ch.accent }}>
                  {ch.value}
                </span>
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
