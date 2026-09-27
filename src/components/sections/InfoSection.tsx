'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface InfoSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'green' | 'blue';
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  icon,
  title,
  description,
  variant = 'green',
  className = '',
}) => {
  const colorClasses = {
    green: {
      bg: 'bg-green-50 dark:bg-green-500/10',
      border: 'border-green-200 dark:border-green-500/20',
      iconBg: 'bg-green-100 dark:bg-green-500/20',
      iconColor: 'text-green-600 dark:text-green-400',
      titleColor: 'text-green-800 dark:text-green-300',
      textColor: 'text-green-700 dark:text-green-400',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/20',
      iconBg: 'bg-blue-100 dark:bg-blue-500/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-800 dark:text-blue-300',
      textColor: 'text-blue-700 dark:text-blue-400',
    },
  };

  const colors = colorClasses[variant];

  // Default classes
  const defaultClasses = `mb-8 p-5 rounded-2xl ${colors.bg} ${colors.border} flex gap-4`;
  const iconBgClass = colors.iconBg;
  const iconColorClass = colors.iconColor;
  const titleColorClass = colors.titleColor;
  const textColorClass = colors.textColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`${defaultClasses} ${className || ''}`}
    >
      <div className={`w-9 h-9 rounded-xl ${iconBgClass} flex items-center justify-center shrink-0 mt-0.5`}>
        <span className={iconColorClass}>{icon}</span>
      </div>
      <div>
        <p className={`text-sm font-bold ${titleColorClass} mb-1`}>{title}</p>
        <p className={`text-sm ${textColorClass} leading-relaxed whitespace-pre-line`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default InfoSection;
