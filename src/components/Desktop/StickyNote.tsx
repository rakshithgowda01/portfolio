import { motion, useAnimationControls } from 'framer-motion';
import { useState, useEffect } from 'react';

export const StickyNote = () => {
  const [position] = useState({ x: 32, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimationControls();

  // Ensure the sticky note is visible on load
  useEffect(() => {
    controls.start({ x: 0, y: 0, rotate: -1, opacity: 1, transition: { type: 'spring', stiffness: 450, damping: 32 } });
  }, [controls]);

  const todoItems = [
    "🥗 Maintain a healthy diet & join gym and stay consistent",
    "🌆 Work in NYC and experience the city life",
    "🌍 Build a career that allows me to work remotely across countries",
    "🎵 Curate and grow that banger Spotify playlist",
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: -20, rotate: -1 }}
      animate={controls}
      transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 300 }}
      className={`absolute w-40 md:w-64 bg-yellow-200 rounded-sm shadow-md select-none z-30 sticky-note ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} scale-75 md:scale-100`}
      style={{
        left: position.x,
        top: position.y,
        boxShadow: '4px 4px 12px rgba(180, 180, 120, 0.3)',
      }}
      drag
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        controls.start({ x: 0, y: 0, rotate: -1, opacity: 1, transition: { type: 'spring', stiffness: 450, damping: 32 } });
      }}
    >
      <div className="p-3 md:p-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
          To do:
        </h3>
        <ul className="space-y-1 text-xs md:text-sm text-gray-700">
          {todoItems.map((item, index) => (
            <li
              key={index}
              className="leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Sticky Note Shadow */}
      <div className="absolute inset-0 bg-yellow-200 rounded-sm -z-10 translate-x-1 translate-y-1 opacity-20"></div>
    </motion.div>
  );
};