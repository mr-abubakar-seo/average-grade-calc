'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  lastUpdated,
}) => {
  return (
    <section className="pt-16 pb-12 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(32px,5vw,48px)] font-black tracking-tight leading-[1.05] text-slate-900 dark:text-white mb-4"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-2"
        >
          {subtitle}
        </motion.p>
      )}
      {lastUpdated && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-slate-400 dark:text-slate-500"
        >
          Last Updated: {lastUpdated}
        </motion.p>
      )}
    </section>
  );
};

export default PageHeader;
