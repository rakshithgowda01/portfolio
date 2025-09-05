import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { RollingGallery } from '@/components/ui/RollingGallery';

interface Project2WindowProps {
  onClose?: () => void;
}

export const Project2Window = ({ onClose }: Project2WindowProps) => {
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
        <motion.div 
          className={`transition-all duration-300 ease-in-out ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-[94vw] max-w-[1080px]'} bg-white rounded-lg shadow-2xl border border-gray-300`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div className={`relative w-full transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-0'} text-gray-800 overflow-hidden`}>
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">P2</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">Project 02</h3>
                    <p className="text-gray-600 text-xs">Simplinno</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <span className="text-gray-600 text-sm">□</span>
                </button>
              </div>
            )}

            {/* Full View */}
            {!isMinimized && (
              <>
                {/* macOS Title Bar */}
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    {/* Traffic Light Buttons */}
                    <button 
                      onClick={onClose}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    ></button>
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                    ></button>
                    <button 
                      className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                    ></button>
                  </div>
                  <div className="text-sm font-medium text-gray-600">Portfolio - LUMIERE</div>
                  <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="p-5 md:p-6 overflow-hidden flex flex-col gap-4">
                  <div>
                    <TextGenerateEffect words="LUMIERE" className="text-2xl md:text-3xl font-bold tracking-wide" />
                    <TextGenerateEffect words="Made a website landing page for a video editing and digital marketing agency." className="text-gray-600 mt-2" duration={2} />
                  </div>
                  <div>
                    <CometCard className="w-full">
                      <div className="w-full rounded-xl border border-gray-200 bg-white p-2 md:p-4">
                        <RollingGallery images={["/songs/lumiere1.png","/songs/lumiere2.png","/songs/lumiere3.png","/songs/lumiere4.png","/songs/lumiere5.png","/songs/lumiere6.png","/songs/lumiere7.png"]} height={220} speedMs={16000} />
                      </div>
                    </CometCard>
                  </div>
                  <div className="-mt-1">
                    <a href="https://example.com" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-black text-white hover:brightness-110 transition-all">
                      Visit Brand Website
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
