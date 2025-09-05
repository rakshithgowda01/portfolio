import { motion } from 'framer-motion';
import { useRef } from 'react';

interface AboutMeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutMe = ({ isOpen, onClose }: AboutMeProps) => {
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        const el = cardWrapperRef.current;
        if (!el) return;
        if (!el.contains(e.target as Node)) onClose();
      }}
    >
      <motion.div
        ref={cardWrapperRef}
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        drag
        dragMomentum={false}
        className="mac-window shadow-mac-window"
        style={{ width: Math.min(1100, window.innerWidth - 48), height: Math.min(620, window.innerHeight - 120) }}
      >
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full h-full">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white/80 backdrop-blur window-header cursor-move">
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500" />
              <button className="w-3 h-3 rounded-full bg-yellow-400" />
              <button className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs font-medium text-gray-700">aboutme.txt</div>
            <div className="w-16" />
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-[calc(100%-44px)]">
            {/* Left photo */}
            <div className="border-r border-gray-200 h-full">
              <div className="w-full h-full">
                <img src="/songs/image1.jpg" alt="About Left" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Middle aboutme.txt */}
            <div className="border-r border-gray-200 h-full bg-white">
              <div className="h-full p-5 overflow-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">aboutme.txt</h3>
                <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
                  <p>
                    Hi! I’m Rakshith.R, a designer with a sharp eye for detail and a soft spot for bold, human-centered ideas. I craft intuitive products and interfaces that simplify complexity—whether it’s streamlining workflows, visualizing data, or making technology feel less… techy.
                  </p>
                  <p>
                    Currently pursuing my master’s in Human-Computer Interaction, I thrive at the intersection of strategy, aesthetics, and usability. Whether I’m building seamless experiences or breaking the grid with experimental visuals, my goal is always the same: “make it work beautifully.”
                  </p>
                </div>
              </div>
            </div>

            {/* Right: photo + Spotify */}
            <div className="h-full flex flex-col">
              <div className="flex-1 border-b border-gray-200 overflow-hidden">
                <img src="/songs/image2.jpg" alt="About Right" className="w-full h-full object-cover" />
              </div>
              <div className="h-40 md:h-44 bg-[#7a0c0c]">
                <iframe
                  title="Spotify"
                  src="https://open.spotify.com/embed/track/0o1uFxZ1VTviqvNaYkTJek?utm_source=generator"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;

