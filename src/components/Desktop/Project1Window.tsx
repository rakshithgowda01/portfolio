import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

interface Project1WindowProps {
  onClose?: () => void;
}

export const Project1Window = ({ onClose }: Project1WindowProps) => {
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
          className={`transition-all duration-300 ease-in-out transform -translate-y-[30vh] md:-translate-y-[20vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-72 h-[400px] md:w-[500px] md:h-[500px]'} bg-white rounded-lg shadow-2xl border border-gray-300`}
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
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">P1</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">Portfolio</h3>
                    <p className="text-gray-600 text-xs">Personal Portfolio</p>
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
                  <div className="text-sm font-medium text-gray-600">Portfolio</div>
                  <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="p-6 h-full overflow-y-auto">
                  {/* 3D Card Container - Inside the window */}
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-full h-auto rounded-xl p-6 border">
                      
                      {/* Portfolio Title */}
                      <CardItem
                        translateZ="50"
                        className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                      >
                        Portfolio
                      </CardItem>

                      {/* Project Image */}
                      <CardItem translateZ="100" className="w-full mb-4 md:mb-6">
                        <div className="flex justify-center">
                                                  <img
                          src="/songs/project1.png"
                          alt="Portfolio Project"
                          className="h-32 w-full max-w-xs md:h-48 md:max-w-sm object-cover rounded-xl group-hover/card:shadow-xl"
                        />
                        </div>
                      </CardItem>

                      {/* Animated Text with TextGenerateEffect */}
                      <CardItem
                        translateZ="60"
                        className="text-center mb-4 md:mb-6"
                      >
                        <TextGenerateEffect 
                          words="Portfolio site inspired by Inika portfolio with my creativity of modifications. A modern, interactive showcase of my work and skills built with cutting-edge technology."
                          className="text-sm md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                        />
                      </CardItem>

                      {/* Project Links */}
                      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 md:mt-8 gap-3">
                        <CardItem
                          translateZ={20}
                          as="a"
                          href="#"
                          className="px-3 py-2 md:px-4 rounded-xl text-xs font-normal dark:text-white text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Learn more →
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          as="a"
                          href="#"
                          className="px-3 py-2 md:px-4 rounded-xl bg-blue-500 dark:bg-blue-600 dark:text-white text-white text-xs font-bold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                        >
                          View Project
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
