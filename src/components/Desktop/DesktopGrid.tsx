import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DesktopGridProps {
  children: ReactNode;
  className?: string;
}

export const DesktopGrid = ({ children, className }: DesktopGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen bg-gray-100 font-inter overflow-hidden desktop-grid ${className || ''}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(209,213,219,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(209,213,219,0.4) 1px, transparent 1px)
        `,
        backgroundSize: 'clamp(18px, 2.4vw, 24px) clamp(18px, 2.4vw, 24px)'
      }}
    >
      <div className="pt-9 pb-12 pr-24 pl-2 md:pl-4 min-h-screen relative">
        {children}
      </div>
    </motion.div>
  );
};