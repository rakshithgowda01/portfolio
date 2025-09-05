import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Settings, 
  Trash2,
  Folder,
} from 'lucide-react';
import { SpotifyPlayer } from './SpotifyPlayer';
import { ContactCard } from './ContactCard';

const dockItems = [
  { id: 'finder', label: 'Finder', group: 1 },
  { id: 'calendar', label: 'Calendar', group: 1 },
  { id: 'mail', label: 'Contact', group: 1 },
  { id: 'messages', label: 'Messages', group: 1 },
  { id: 'separator1', label: '', group: 0 },
  { id: 'spotify', label: 'Spotify', group: 2 },
  { id: 'separator2', label: '', group: 0 },
  { id: 'settings', label: 'Settings', group: 3 },
  { id: 'files', label: 'Files', group: 3 },
  { id: 'trash', label: 'Trash', group: 3 },
];

export const MacDock = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeWindows, setActiveWindows] = useState<string[]>([]);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false);

  const handleDockClick = (itemId: string) => {
    if (itemId === 'spotify') {
      setShowSpotifyPlayer(!showSpotifyPlayer);
      return;
    }
    
    if (itemId === 'mail') {
      setShowContactCard(!showContactCard);
      return;
    }
    
    if (activeWindows.includes(itemId)) {
      // If already open, close it
      setActiveWindows(activeWindows.filter(id => id !== itemId));
    } else {
      // Open new window
      setActiveWindows([...activeWindows, itemId]);
    }
  };

  const getIconScale = (itemId: string, index: number) => {
    if (!hoveredItem) return 1;
    
    const hoveredIndex = dockItems.findIndex(item => item.id === hoveredItem);
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return 1.6;
    if (distance === 1) return 1.4;
    if (distance === 2) return 1.2;
    return 1;
  };

  const getIconTranslateY = (itemId: string, index: number) => {
    if (!hoveredItem) return 0;
    
    const hoveredIndex = dockItems.findIndex(item => item.id === hoveredItem);
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return -12;
    if (distance === 1) return -8;
    if (distance === 2) return -4;
    return 0;
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-40 mac-dock flex justify-center" style={{ bottom: 'max(16px, env(safe-area-inset-bottom) + 8px)' }}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="bg-black/30 backdrop-blur-md rounded-2xl px-3 py-3 shadow-2xl border border-transparent scale-[0.3] sm:scale-[0.5] md:scale-100"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
        }}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="flex items-end gap-3 justify-center">
          {dockItems.filter(item => {
            // Show different icons based on screen size
            if (window.innerWidth < 640) {
              // Mobile: show only 4 specific icons
              return ['mail', 'messages', 'spotify', 'files'].includes(item.id);
            } else {
              // Desktop: show all icons including separators
              return true;
            }
          }).map((item, index) => {
            if (item.id.startsWith('separator')) {
              return (
                <div
                  key={item.id}
                  className="w-px h-8 bg-black/80 mx-2 rounded-full opacity-90"
                />
              );
            }
            

            const scale = getIconScale(item.id, index);
            const translateY = getIconTranslateY(item.id, index);
            
            return (
              <motion.div
                key={item.id}
                className="relative group dock-item"
                onMouseEnter={() => setHoveredItem(item.id)}
                onTouchStart={() => setHoveredItem(item.id)}
                onTouchEnd={() => setHoveredItem(null)}
                animate={{ 
                  scale,
                  y: translateY
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.8
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDockClick(item.id)}
                  className="relative w-16 h-16 rounded-full overflow-hidden m-0 flex items-center justify-center transition-transform duration-150 bg-transparent"
                  style={{ boxShadow: 'none' }}
                >
                  <img
                    src={`/icons/${item.id}.png`}
                    alt={item.label}
                    className="w-full h-full rounded-full object-cover bg-transparent"
                    loading="lazy"
                    draggable={false}
                  />
                </motion.button>

                
                {/* Tooltip (hidden for finder, calendar, settings, files, trash) */}
                {!["finder","calendar","settings","files","trash"].includes(item.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                      y: hoveredItem === item.id ? -50 : -40,
                      scale: hoveredItem === item.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 pointer-events-none z-50"
                  >
                    <div className="bg-gray-900/90 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-sm whitespace-nowrap shadow-lg border border-white/10">
                      {item.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Spotify Player Overlay */}
      {showSpotifyPlayer && (
        <SpotifyPlayer onClose={() => setShowSpotifyPlayer(false)} />
      )}
      
      {/* Contact Card Overlay */}
      {showContactCard && (
        <ContactCard onClose={() => setShowContactCard(false)} />
      )}
    </div>
  );
};
