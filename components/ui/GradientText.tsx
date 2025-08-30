
import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className }) => {
  return (
    <span
      className={`
        text-transparent bg-clip-text
        bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
        dark:from-cyan-400 dark:via-fuchsia-500 dark:to-orange-400
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default GradientText;
