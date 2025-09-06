import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project4WindowProps {
  onClose?: () => void;
}

export const Project4Window = ({ onClose }: Project4WindowProps) => {
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, type: "spring", stiffness: 260, damping: 22 }}
      className="fixed inset-0 z-50"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Invisible backdrop to capture outside clicks, no blur */}
      <div className="absolute inset-0" />
      <div ref={cardWrapperRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div 
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
          className={`transition-all duration-300 ease-in-out ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-[94vw] max-w-[1100px] h-[85vh] md:h-[640px]'} bg-white rounded-lg shadow-2xl border border-gray-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ x: position.x, y: position.y }}
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
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between rounded-t-lg cursor-grab active:cursor-grabbing">
                  <div className="flex items-center space-x-2">
                    {/* Traffic Light Buttons */}
                    <button 
                      onClick={onClose}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 active:bg-red-600 transition-colors"
                    ></button>
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 active:bg-yellow-600 transition-colors"
                    ></button>
                    <button 
                      className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 active:bg-green-600 transition-colors"
                    ></button>
                  </div>
                  <div className="text-sm font-medium text-gray-600">Crazy Projects</div>
                  <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="p-6 h-full overflow-y-auto scrollbar-hide">
                  <div className="space-y-8">
                    {/* Project 1 - XSS Demo Lab */}
                    <div>
                      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                        Crazy Projects —<br />
                        <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">XSS Demo Lab</span>
                      </h1>
                      <div>
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200 mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">XSS</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">XSS Demo Lab</h3>
                              <p className="text-sm text-gray-600">Educational Security Testing Platform</p>
                            </div>
                          </div>
                          <p className="text-sm md:text-base text-gray-700 mb-4">
                            An AI-powered educational platform for learning Cross-Site Scripting (XSS) vulnerabilities and web defacement techniques. 
                            Features 30+ educational XSS payloads, 12+ creative defacement templates, and a safe environment for security professionals to understand web security concepts.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">React 18</span>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">TypeScript</span>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Tailwind CSS</span>
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Security Education</span>
                          </div>
                          <div className="flex gap-3">
                            <a 
                              href="https://github.com/rakshithgowda01/xss-demo-lab-rgcodebreak" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                            >
                              View on GitHub
                            </a>
                            <a 
                              href="https://xss-demo-lab-rgcodebreak.lovable.app/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <hr className="border-gray-200" />
                    
                    {/* Project 2 - SocialSync */}
                    <div>
                      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                        SocialSync —<br />
                        <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">Multi-Posting Platform</span>
                      </h1>
                      <div>
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200 mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">SS</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">SocialSync</h3>
                              <p className="text-sm text-gray-600">Multi-Platform Social Media Manager</p>
                            </div>
                          </div>
                          <p className="text-sm md:text-base text-gray-700 mb-4">
                            A comprehensive social media management platform that allows users to post content across multiple platforms with a single click. 
                            Features AI-powered caption generation, OAuth integration for secure social media connections, and a modern full-stack architecture with PostgreSQL database.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">React</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Express.js</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">PostgreSQL</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">OAuth 2.0</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">OpenAI GPT-4o</span>
                          </div>
                          <div className="flex gap-3">
                            <a 
                              href="https://github.com/rakshithgowda01/socialsync" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                            >
                              View on GitHub
                            </a>
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                              90% Complete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <hr className="border-gray-200" />
                    
                    {/* Project 3 - Coming Soon */}
                    <div>
                      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                        More Projects —<br />
                        <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">Coming Soon</span>
                      </h1>
                      <div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">?</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">More Crazy Projects</h3>
                              <p className="text-sm text-gray-600">Stay tuned for more innovative projects</p>
                            </div>
                          </div>
                          <p className="text-sm md:text-base text-gray-700">
                            Working on more exciting projects that push the boundaries of web development, 
                            security research, and creative problem-solving. Check back soon for updates!
                          </p>
                        </div>
                      </div>
                    </div>
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
