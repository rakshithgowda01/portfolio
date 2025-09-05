import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';

interface AboutMeWindowProps {
  onClose?: () => void;
}

export const AboutMeWindow = ({ onClose }: AboutMeWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the card
  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const el = cardWrapperRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        onClose && onClose();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside as any);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="fixed inset-0 z-50"
      onMouseDown={(e) => {
        const el = cardWrapperRef.current;
        if (!el) return;
        if (!el.contains(e.target as Node)) {
          onClose && onClose();
        }
      }}
    >
      <div ref={cardWrapperRef}>
        <CometCard 
          ref={dragRef}
          drag={!isMinimized}
          dragMomentum={false}
          dragElastic={0}
          onDrag={(event, info) => {
            if (isMinimized) return;
            setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className={`transition-all duration-300 ease-in-out ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-80 h-[400px] md:w-[500px] md:h-[500px]'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ x: position.x, y: position.y }}
        >
          <div className={`relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-900 rounded-2xl transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-4 md:p-6'} text-white overflow-hidden`}>
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-slate-800 text-sm font-bold">AM</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">About Me</h3>
                    <p className="text-white/60 text-xs">aboutme.txt</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  <span className="text-gray-800 text-sm">□</span>
                </button>
              </div>
            )}

            {/* Full View */}
            {!isMinimized && (
              <>
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <span className="text-slate-800 text-sm font-bold">AM</span>
                    </div>
                    <span className="text-lg font-semibold">aboutme.txt</span>
                  </div>
                  
                  {/* macOS Window Controls */}
                  <div className="flex items-center space-x-2">
                    {/* Close Button (Red) */}
                    <button 
                      onClick={onClose}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 active:bg-red-600 transition-colors flex items-center justify-center group"
                    >
                      <span className="text-red-500 group-hover:text-red-600 group-active:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">✕</span>
                    </button>
                    
                    {/* Minimize Button (Yellow) */}
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 active:bg-yellow-600 transition-colors flex items-center justify-center group"
                    >
                      <span className="text-yellow-500 group-hover:text-yellow-600 group-active:text-yellow-600 text-xs font-bold opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">−</span>
                    </button>
                    
                    {/* Maximize Button (Green) */}
                    <button 
                      className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 active:bg-green-600 transition-colors flex items-center justify-center group"
                    >
                      <span className="text-green-500 group-hover:text-green-600 group-active:text-green-600 text-xs font-bold opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">□</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-white/90 leading-relaxed text-sm md:text-base">
                      Hi! I'm Rakshith.R, a designer with a sharp eye for detail and a soft spot for bold, human-centered ideas. I craft intuitive products and interfaces that simplify complexity—whether it's streamlining workflows, visualizing data, or making technology feel less... techy.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-white/90 leading-relaxed text-sm md:text-base">
                      Currently pursuing my master's in Human-Computer Interaction at UMD, I thrive at the intersection of strategy, aesthetics, and usability. Whether I'm building seamless experiences or breaking the grid with experimental visuals, my goal is always the same: 'make it work beautifully.'
                    </p>
                  </div>

                  <div className="bg-emerald-800/30 rounded-lg p-4 border border-emerald-700/50">
                    <p className="text-emerald-200 leading-relaxed text-sm md:text-base italic">
                      "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CometCard>
      </div>
    </motion.div>
  );
};
