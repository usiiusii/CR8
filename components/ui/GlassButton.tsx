
import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        px-6 py-3 rounded-xl 
        bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 
        shadow-lg
        text-transparent bg-clip-text 
        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
        dark:from-cyan-400 dark:via-teal-400 dark:to-emerald-500
        font-bold text-lg
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl hover:bg-white/20 dark:hover:bg-black/20
        focus:outline-none focus:ring-2 focus:ring-white/50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;
