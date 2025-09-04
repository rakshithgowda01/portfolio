import { motion } from 'framer-motion';
import { Wifi, Battery } from 'lucide-react';

export const TopNavBar = () => {
  return (
    <motion.div
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-2 left-2 right-2 md:left-4 md:right-4 z-50 h-7 bg-white/80 backdrop-blur-mac border border-white/20 rounded-lg shadow-mac font-inter"
    >
      <div className="h-full flex items-center justify-between px-2 md:px-4 text-xs md:text-sm">
        {/* Left Side */}
        <div className="flex items-center gap-2 md:gap-6 text-gray-800">
          <span className="font-medium text-xs md:text-sm truncate">RAKSHITH'S PORTFOLIO</span>
          <button className="hover:text-gray-600 transition-colors text-xs md:text-sm hidden md:inline">
            CONTACT
          </button>
          <button className="hover:text-gray-600 transition-colors text-xs md:text-sm hidden md:inline">
            RESUME
          </button>
        </div>

        {/* Right Side - System Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* System Status Icons */}
          <div className="flex items-center gap-1 md:gap-2 text-gray-700">
            <Wifi className="w-3 h-3 md:w-4 md:h-4" />
            <div className="flex items-center gap-1">
              <Battery className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs hidden sm:inline">85%</span>
            </div>
            <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>
          
          <div className="flex gap-1">
            {/* Traffic Light Style Icons */}
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-red-500 hover:brightness-110 cursor-pointer transition-all"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-yellow-400 hover:brightness-110 cursor-pointer transition-all"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-green-500 hover:brightness-110 cursor-pointer transition-all"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};