import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Component as CircularGallery } from '@/components/ui/circular-gallery';

interface PhotoViewerWindowProps {
  onClose?: () => void;
  imageSrc: string;
  title: string;
  position: 'left' | 'right';
}

export const PhotoViewerWindow = ({ onClose, imageSrc, title, position }: PhotoViewerWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  // Photo gallery data using available images
  const photoItems = [
    {
      image: "/songs/photo1.jpg",
      text: "Portrait 1",
    },
    {
      image: "/songs/photo2.jpg", 
      text: "Portrait 2",
    },
    {
      image: "/songs/lumiere1.png",
      text: "Lumiere 1",
    },
    {
      image: "/songs/lumiere2.png",
      text: "Lumiere 2",
    },
    {
      image: "/songs/lumiere3.png",
      text: "Lumiere 3",
    },
    {
      image: "/songs/lumiere4.png",
      text: "Lumiere 4",
    },
    {
      image: "/songs/lumiere5.png",
      text: "Lumiere 5",
    },
    {
      image: "/songs/lumiere6.png",
      text: "Lumiere 6",
    },
    {
      image: "/songs/lumiere7.png",
      text: "Lumiere 7",
    },
    {
      image: "/songs/image1.jpg",
      text: "Image 1",
    },
    {
      image: "/songs/image2.jpg",
      text: "Image 2",
    },
    {
      image: "/songs/image3.jpg",
      text: "Image 3",
    },
    {
      image: "/songs/image4.jpg",
      text: "Image 4",
    },
  ];

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed inset-0 z-50"
          onMouseDown={(e) => {
            const el = cardWrapperRef.current;
            if (!el) return;
            if (!el.contains(e.target as Node)) {
              onClose && onClose();
            }
          }}
        >
          <div ref={cardWrapperRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div 
          ref={dragRef}
          className={`transition-all duration-300 ease-in-out ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-[300px] h-[300px] md:w-[600px] md:h-[600px]'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            width: isMinimized ? undefined : window.innerWidth < 768 ? '300px' : '600px',
            height: isMinimized ? undefined : window.innerWidth < 768 ? '300px' : '600px',
            position: 'relative'
          }}
        >
          <div 
            className={`relative w-full h-full bg-white rounded-lg shadow-2xl border border-gray-300 transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-0'} text-gray-800 overflow-hidden flex flex-col`}
            style={{
              width: isMinimized ? undefined : window.innerWidth < 768 ? '300px' : '600px',
              height: isMinimized ? undefined : window.innerWidth < 768 ? '300px' : '600px'
            }}
          >
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate text-gray-800">{title}</h3>
                    <p className="text-gray-600 text-xs">Photo Viewer</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
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
                  <div className="text-sm font-medium text-gray-600">{title}</div>
                  <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Photo Gallery Content */}
                <div className="relative z-10 flex-1">
                  <div className="w-full h-full bg-black overflow-hidden">
                    <div className="w-full h-full object-contain max-h-full">
                      <CircularGallery 
                        items={photoItems}
                        bend={3}
                        textColor="#ffffff"
                        borderRadius={0.05}
                        font="bold 24px DM Sans"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
