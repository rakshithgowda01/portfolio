import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

interface ContactCardProps {
  onClose?: () => void;
}

export const ContactCard = ({ onClose }: ContactCardProps) => {
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
        <CometCard className={`transition-all duration-300 ease-in-out transform -translate-y-[50vh] md:-translate-y-[55vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-64 h-[400px] md:w-80 md:h-[450px]'}`}>
          <div className={`relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-4 md:p-6'} text-white overflow-hidden`}>
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/songs/logocontact.jpg" alt="Contact" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">Contact</h3>
                    <p className="text-white/60 text-xs">Rakshith, R</p>
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
                      <img src="/songs/logocontact.jpg" alt="Contact" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg font-semibold">Contact</span>
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

                {/* Contact Information */}
                <div className="relative z-10 space-y-6">
                  {/* Name */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Rakshith, R</h2>
                    <p className="text-white/80 text-sm">UX Designer & Developer</p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-white/60 text-sm">📞</span>
                      <span className="text-white/90">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white/60 text-sm">✉️</span>
                      <span className="text-white/90">rakshith@example.com</span>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-px bg-white/20"></div>

                  {/* Social Icons */}
                  <div className="flex justify-center space-x-4">
                    {/* Instagram */}
                    <button className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>
                    
                    {/* LinkedIn */}
                    <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    
                    {/* GitHub */}
                    <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                    
                    {/* Email */}
                    <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h20.728c.904 0 1.636.732 1.636 1.636zM12 14.182L21.818 7.09H2.182L12 14.182z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Connect Button */}
                  <div className="flex justify-center pt-4">
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      className="bg-gray-800 text-white flex items-center space-x-2"
                      as="button"
                      duration={1}
                      clockwise={true}
                    >
                      <span>CONNECT</span>
                    </HoverBorderGradient>
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
