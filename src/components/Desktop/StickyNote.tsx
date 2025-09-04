import { motion } from 'framer-motion';
import { useState } from 'react';

export const StickyNote = () => {
  const [position, setPosition] = useState({ x: 32, y: 60 });
  const [isDragging, setIsDragging] = useState(false);

  const todoItems = [
    "Land my dream UX job",
    "Drink water",
    "Stop doom scrolling",
    "Finish grad school without losing my mind",
    "Build that banger spotify playlist",
    "World domination",
    "Get really good at making pasta",
    "Travel somewhere new every year"
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: -20, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 300 }}
      className="absolute w-48 md:w-64 bg-yellow-200 rounded-sm shadow-md select-none z-30 sticky-note"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: '4px 4px 12px rgba(180, 180, 120, 0.3)',
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
              className={`leading-relaxed ${
                index === 6 ? 'line-through opacity-60' : ''
              }`}
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