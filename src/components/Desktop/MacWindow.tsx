import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface MacWindowProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  showHeader?: boolean;
  zIndex?: number;
  onFocus?: () => void;
  contentOverflow?: 'auto' | 'hidden';
}

export const MacWindow = ({
  title,
  children,
  isOpen,
  onClose,
  initialX = 100,
  initialY = 100,
  width = 400,
  height = 300,
  showHeader = true,
  zIndex,
  onFocus,
  contentOverflow = 'auto'
}: MacWindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  // Responsive sizing
  const responsiveWidth = Math.min(width, window.innerWidth - 40);
  const responsiveHeight = Math.min(height, window.innerHeight - 120);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: isMinimized ? 0 : 1,
        scale: isMinimized ? 0.1 : 1,
        y: isMinimized ? 500 : 0
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      drag
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - responsiveWidth,
        top: 40,
        bottom: window.innerHeight - responsiveHeight
      }}
      onDrag={(_, info) => {
        setPosition({
          x: position.x + info.delta.x,
          y: position.y + info.delta.y
        });
      }}
      className="fixed z-50 shadow-mac-window mac-window"
      style={{
        left: Math.max(0, Math.min(position.x, window.innerWidth - responsiveWidth)),
        top: Math.max(40, Math.min(position.y, window.innerHeight - responsiveHeight)),
        width: responsiveWidth,
        height: responsiveHeight
      }}
      onMouseDown={() => onFocus && onFocus()}
      style={{ zIndex: zIndex ?? 50, left: Math.max(0, Math.min(position.x, window.innerWidth - responsiveWidth)), top: Math.max(40, Math.min(position.y, window.innerHeight - responsiveHeight)), width: responsiveWidth, height: responsiveHeight }}
    >
      <div className={`${showHeader ? 'bg-white/95 border border-gray-300 shadow-mac-window' : 'bg-transparent border-0 shadow-none'} backdrop-blur-md rounded-xl overflow-hidden`}>
        {showHeader && (
          <div className="window-header flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-white/5 to-white/10 border-b border-gray-200 cursor-move">
            <div className="flex items-center gap-1 md:gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 hover:brightness-110 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(true)}
                className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400 hover:brightness-110 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 hover:brightness-110 transition-all"
              />
            </div>
            <h3 className="text-xs md:text-sm font-medium text-gray-800 flex-1 text-center truncate px-2">{title}</h3>
            <div className="w-8 md:w-14"></div>
          </div>
        )}

        {/* Content */}
        <div className={`${showHeader ? 'p-3 md:p-4' : 'p-0'} h-full ${contentOverflow === 'hidden' ? 'overflow-hidden' : 'overflow-auto'}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};