import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';

interface SpotifyPlayerProps {
  onClose?: () => void;
}

export const SpotifyPlayer = ({ onClose }: SpotifyPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [showLogo, setShowLogo] = useState(false);

  // Motion values for 3D hover on album image
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const rotateX = useTransform(hoverY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(hoverX, [-0.5, 0.5], [-10, 10]);
  const isTouchDevice = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator as any).maxTouchPoints > 0);

  const playlist = [
    {
      title: "Sweater Weather",
      artist: "The Neighbourhood",
      album: "Single (2013)",
      image: "/songs/image4.jpg",
      duration: 240,
      src: "/songs/song4.mp3"
    },
    {
      title: "Sunflower",
      artist: "Post Malone, Swae Lee",
      album: "Spider-Man: Into the Spider-Verse",
      image: "/songs/image1.jpg",
      duration: 180,
      src: "/songs/song1.mp3"
    },
    {
      title: "End of Beginning",
      artist: "Joe Keery",
      album: "Single (2022)",
      image: "/songs/image2.jpg",
      duration: 210,
      src: "/songs/song2.mp3"
    },
    {
      title: "I Can't Fit In",
      artist: "Marino",
      album: "Single (2025)",
      image: "/songs/image3.jpg",
      duration: 185,
      src: "/songs/song3.mp3"
    }
  ];
  const [trackIndex, setTrackIndex] = useState(0);
  const currentSong = playlist[trackIndex];
  
  const goNext = () => {
    setTrackIndex((i) => (i + 1) % playlist.length);
    setCurrentTime(0);
  };
  const goPrev = () => {
    setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  // Sync audio element with current track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Load new source
    if ((currentSong as any).src) {
      audio.src = (currentSong as any).src;
      audio.load();
      setIsPlaying(false);
      setCurrentTime(0);
    } else {
      audio.removeAttribute('src');
      setIsPlaying(false);
    }
  }, [trackIndex]);

  // Update duration when metadata loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(Math.floor(audio.duration || 0) || 0);
    const onTime = () => setCurrentTime(Math.floor(audio.currentTime || 0));
    const onEnded = () => goNext();
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentSong || !(currentSong as any).src) return;
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
        <CometCard className={`transition-all duration-300 ease-in-out transform -translate-y-[60vh] md:-translate-y-[55vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-64 h-[300px] md:w-80 md:h-[380px]'}`}>
        <div onClick={() => setShowLogo(true)} className={`relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-4 md:p-6'} text-white overflow-hidden`}>
          <audio ref={audioRef} preload="metadata" />
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>

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
            <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="/songs/logospotify.jpg" alt="Spotify" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-semibold">Spotify</span>
            </div>
            
            {/* macOS Window Controls */}
            <div className="flex items-center space-x-2">
              {/* Close Button (Red) */}
              {onClose && (
                <button 
                  onClick={onClose}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group"
                >
                  <span className="text-red-500 group-hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                </button>
              )}
              
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

          {/* Album Art with 3D hover pop */}
          <div className="relative z-10 mb-4 md:mb-6">
            <motion.div
              className="w-full aspect-square bg-white/10 rounded-xl overflow-hidden shadow-2xl"
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              onMouseMove={(e) => {
                const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const px = (e.clientX - bounds.left) / bounds.width - 0.5;
                const py = (e.clientY - bounds.top) / bounds.height - 0.5;
                hoverX.set(px);
                hoverY.set(py);
              }}
              onMouseLeave={() => {
                hoverX.set(0);
                hoverY.set(0);
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const px = (touch.clientX - bounds.left) / bounds.width - 0.5;
                const py = (touch.clientY - bounds.top) / bounds.height - 0.5;
                hoverX.set(px);
                hoverY.set(py);
              }}
              onTouchEnd={() => {
                hoverX.set(0);
                hoverY.set(0);
              }}
            >
              <img 
                src={currentSong.image} 
                alt={currentSong.album}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Song Info */}
          <div className="relative z-10 mb-6">
            <h3 className="text-xl font-bold mb-1 truncate">{currentSong.title}</h3>
            <p className="text-white/80 mb-2">{currentSong.artist}</p>
            <p className="text-white/60 text-sm">{currentSong.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="relative z-10 mb-4">
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

          {/* Controls */}
          <div className="relative z-10 flex items-center justify-center space-x-6 mb-6">
            <button onClick={goPrev} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <span className="text-lg">⏮</span>
            </button>
            <button 
              onClick={handlePlayPause}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            >
              <span className="text-gray-800 text-2xl">
                {isPlaying ? '⏸' : '▶'}
              </span>
            </button>
            <button onClick={goNext} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <span className="text-lg">⏭</span>
            </button>
          </div>

          

          {/* Click to reveal logo */}
          {showLogo && (
            <div className="absolute bottom-4 right-4">
              <img src="/songs/logospotify.jpg" alt="Spotify" className="w-12 h-12 rounded-full object-cover" />
            </div>
          )}
            </>
          )}
        </div>
        </CometCard>
      </div>
    </motion.div>
  );
};
