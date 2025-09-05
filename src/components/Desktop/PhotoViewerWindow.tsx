import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';

interface PhotoViewerWindowProps {
  onClose?: () => void;
  imageSrc: string;
  title: string;
  position: 'left' | 'right';
}

export const PhotoViewerWindow = ({ onClose, imageSrc, title, position }: PhotoViewerWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onMouseDown={(e) => {
        const el = cardWrapperRef.current;
        if (!el) return;
        if (!el.contains(e.target as Node)) {
          onClose && onClose();
        }
      }}
    >
      <div ref={cardWrapperRef}>
        <CometCard className={`transition-all duration-300 ease-in-out transform -translate-y-[20vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-72 h-[400px] md:w-[400px] md:h-[500px]'}`}>
          <div className={`relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-900 rounded-2xl transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-4 md:p-6'} text-white overflow-hidden`}>
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">{title}</h3>
                    <p className="text-white/60 text-xs">Photo Viewer</p>
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
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg font-semibold">{title}</span>
                  </div>
                  
                  {/* macOS Window Controls */}
                  <div className="flex items-center space-x-2">
                    {/* Close Button (Red) */}
                    <button 
                      onClick={onClose}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group"
                    >
                      <span className="text-red-500 group-hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                    </button>
                    
                    {/* Minimize Button (Yellow) */}
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                    >
                      <span className="text-yellow-500 group-hover:text-yellow-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                    </button>
                    
                    {/* Maximize Button (Green) */}
                    <button 
                      className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center group"
                    >
                      <span className="text-green-500 group-hover:text-green-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">□</span>
                    </button>
                  </div>
                </div>

                {/* Photo Content */}
                <div className="relative z-10 flex-1">
                  <div className="w-full h-full bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                    <img 
                      src={imageSrc} 
                      alt={title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
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
