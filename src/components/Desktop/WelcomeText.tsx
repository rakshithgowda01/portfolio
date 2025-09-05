import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import VariableProximity from './VariableProximity';

export const WelcomeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="mb-2 text-center"
      >
        <h3 className="text-2xl md:text-4xl text-gray-900 font-bold">
          <VariableProximity
            label="welcome to my"
            fromFontVariationSettings="'wght' 600, 'wdth' 100"
            toFontVariationSettings="'wght' 900, 'wdth' 115"
            containerRef={containerRef}
            radius={120}
            falloff="gaussian"
          />
        </h3>
      </motion.div>
      
      <div className="pointer-events-auto">
        <motion.div
          className="font-black text-gray-900/90 tracking-tight text-center font-rolest cursor-pointer"
          style={{ 
            fontSize: 'clamp(90px, 12vw, 180px)', 
            lineHeight: '1',
            textAlign: 'center'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={{
            scale: isHovering ? 1.1 : 1,
            rotateX: isHovering ? 5 : 0,
            rotateY: isHovering ? 5 : 0,
            textShadow: isHovering 
              ? '0 0 20px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.2)' 
              : '0 0 0px rgba(0,0,0,0)'
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileHover={{
            scale: 1.15,
            rotateX: 8,
            rotateY: 8,
            textShadow: '0 0 30px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.3)'
          }}
          whileTap={{
            scale: 1.05
          }}
        >
          portfolio.
        </motion.div>
      </div>
    </motion.div>
  );
};