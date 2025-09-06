import { motion } from 'framer-motion';
import { useRef } from 'react';
import VariableProximity from './VariableProximity';

export const WelcomeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <h3 className="text-2xl md:text-4xl text-gray-900 font-medium variable-proximity select-none">
          <VariableProximity
            label="welcome to my"
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 600"
            containerRef={containerRef}
            radius={120}
            falloff="gaussian"
          />
        </h3>
      </motion.div>
      
      <div className="pointer-events-auto">
        <motion.div
          className="font-normal italic text-gray-900 tracking-tight text-center variable-proximity-serif cursor-pointer select-none"
          style={{ 
            fontSize: 'clamp(80px, 10vw, 160px)', 
            lineHeight: '1.1',
            textAlign: 'center'
          }}
        >
          <VariableProximity
            label="portfolio."
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 800"
            containerRef={containerRef}
            radius={200}
            falloff="gaussian"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};