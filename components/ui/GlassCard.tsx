
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={`
        bg-white/20 dark:bg-gray-800/20 
        backdrop-blur-xl
        border border-white/30 dark:border-gray-700/30
        rounded-2xl shadow-lg 
        p-6
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
