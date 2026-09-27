'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardsProps {
  features: Feature[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  const gridClass = features.length === 4
    ? 'sm:grid-cols-2 lg:grid-cols-4'
    : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-4 mb-12`}>
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 text-center"
        >
          <div className="flex justify-center mb-4">{feature.icon}</div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCards;
