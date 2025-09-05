import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ContainerScroll as ContainerScrollLite } from '@/components/ui/ContainerScroll';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

interface Project4WindowProps {
  onClose?: () => void;
}

export const Project4Window = ({ onClose }: Project4WindowProps) => {
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
          className={`transition-all duration-300 ease-in-out transform -translate-y-[20vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-[94vw] max-w-[1100px] h-[85vh] md:h-[640px]'} bg-white rounded-lg shadow-2xl border border-gray-300`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div className={`relative w-full h-full transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-0'} text-gray-800 overflow-hidden`}>
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">P4</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">Project 04</h3>
                    <p className="text-gray-600 text-xs">Amazon</p>
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
                  <div className="text-sm font-medium text-gray-600">Crazy Projects</div>
                  <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="p-0 h-full overflow-y-auto">
                  <div className="px-5 md:px-8 py-4">
                    <ContainerScroll
                      titleComponent={
                        <>
                          <h1 className="text-3xl md:text-4xl font-semibold text-black">
                            Crazy Projects —<br />
                            <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">Scroll Animations</span>
                          </h1>
                        </>
                      }
                    >
                      <div>
                        <img
                          src={'/songs/lumiere1.png'}
                          alt="hero"
                          height={720}
                          width={1400}
                          className="mx-auto rounded-2xl object-cover h-full object-center"
                          draggable={false}
                        />
                        <p className="text-sm md:text-base text-gray-700 mt-3 md:mt-3 px-2 md:px-1">
                          A playful exploration combining parallax motion and sticky titles to showcase interactive branding moments. Built to test scroll-linked animation performance and layout responsiveness.
                        </p>
                      </div>
                    </ContainerScroll>
                    <hr className="border-gray-200 mt-1 mb-2" />
                  </div>
                  <div className="px-5 md:px-8 py-4">
                    <ContainerScroll
                      titleComponent={
                        <>
                          <h1 className="text-3xl md:text-4xl font-semibold text-black">
                            LUMIERE —<br />
                            <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">Project Showcase</span>
                          </h1>
                        </>
                      }
                    >
                      <div>
                        <img
                          src={'/songs/lumiere2.png'}
                          alt="lumiere"
                          height={720}
                          width={1400}
                          className="mx-auto rounded-2xl object-cover h-full object-center"
                          draggable={false}
                        />
                        <p className="text-sm md:text-base text-gray-700 mt-3 md:mt-3 px-2 md:px-1">
                          Landing page concepts for a video editing and digital marketing studio. Focused on bold typography, clean sections, and fast content reveal as users scroll.
                        </p>
                        {/* removed divider after project 2 as requested */}
                      </div>
                    </ContainerScroll>
                  </div>
                  <div className="px-5 md:px-8 py-4">
                    <ContainerScroll
                      titleComponent={
                        <>
                          <h1 className="text-3xl md:text-4xl font-semibold text-black">
                            Concept —<br />
                            <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">Third Project</span>
                          </h1>
                        </>
                      }
                    >
                      <div>
                        <img
                          src={'/songs/lumiere3.png'}
                          alt="concept"
                          height={720}
                          width={1400}
                          className="mx-auto rounded-2xl object-cover h-full object-center"
                          draggable={false}
                        />
                        <p className="text-sm md:text-base text-gray-700 mt-3 md:mt-3 px-2 md:px-1">
                          Experimental visuals with smooth scroll effects and layered transitions. Designed to test component reusability and animation timing.
                        </p>
                        <hr className="border-gray-200 mt-1 mb-2" />
                      </div>
                    </ContainerScroll>
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
