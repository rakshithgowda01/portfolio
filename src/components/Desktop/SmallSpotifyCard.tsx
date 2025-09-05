import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';

interface SmallSpotifyCardProps {
  onClose?: () => void;
}

export const SmallSpotifyCard = ({ onClose }: SmallSpotifyCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const currentSong = {
    title: "Switched Up",
    artist: "Oliver Malcolm",
    album: "Single (2020)",
    image: "/songs/anime.jpg",
    duration: 180,
    src: "/songs/song1.mp3"
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentSong || !currentSong.src) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    const audio = audioRef.current;
    if (audio && !Number.isNaN(newTime)) {
      audio.currentTime = newTime;
    }
  };

  // Update duration when metadata loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(Math.floor(audio.duration || 0) || 0);
    const onTime = () => setCurrentTime(Math.floor(audio.currentTime || 0));
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
    };
  }, []);

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
      <div ref={cardWrapperRef}>
        <CometCard className={`transition-all duration-300 ease-in-out transform -translate-y-[20vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-64 h-[250px] md:w-80 md:h-[300px]'}`}>
          <div className={`relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-900 rounded-2xl transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-4 md:p-6'} text-white overflow-hidden`}>
            <audio ref={audioRef} preload="metadata" src={currentSong.src} />
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/songs/logospotify.jpg" alt="Spotify" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
                    <p className="text-white/60 text-xs">{currentSong.artist}</p>
                  </div>
                </div>
                <button 
                  onClick={handlePlayPause}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  <span className="text-gray-800 text-sm">
                    {isPlaying ? '⏸' : '▶'}
                  </span>
                </button>
              </div>
            )}

            {/* Full View */}
            {!isMinimized && (
              <>
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/songs/logospotify.jpg" alt="Spotify" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg font-semibold">Spotify</span>
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

                {/* Album Art */}
                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden shadow-lg mx-auto">
                    <img 
                      src={currentSong.image} 
                      alt={currentSong.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Song Info */}
                <div className="relative z-10 mb-4 text-center">
                  <h3 className="text-sm font-bold mb-1 truncate">{currentSong.title}</h3>
                  <p className="text-white/80 text-xs">{currentSong.artist}</p>
                </div>

                {/* Progress Bar */}
                <div className="relative z-10 mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="relative z-10 flex justify-center">
                  <button 
                    onClick={handlePlayPause}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  >
                    <span className="text-gray-800 text-lg">
                      {isPlaying ? '⏸' : '▶'}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </CometCard>
      </div>
    </motion.div>
  );
};
