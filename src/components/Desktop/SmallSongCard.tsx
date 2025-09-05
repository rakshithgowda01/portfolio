import { useEffect, useMemo, useRef, useState } from 'react';

interface SmallSongCardProps {
  className?: string;
}

const trackConfig = {
  title: 'Sweater Weather',
  artist: 'The Neighbourhood · 2013',
  image: '/songs/image4.jpg',
  src: '/songs/song4.mp3',
};

export const SmallSongCard = ({ className }: SmallSongCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = trackConfig;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(Math.floor(audio.duration || 0));
    const onTime = () => setCurrentTime(Math.floor(audio.currentTime || 0));
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setCurrentTime(val);
    const audio = audioRef.current;
    if (audio && !Number.isNaN(val)) audio.currentTime = val;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className={`w-full h-full bg-white rounded-xl border border-gray-200 shadow-mac-window overflow-hidden ${className || ''}`}
      style={{
        background: 'linear-gradient(135deg, #3b3b3b 0%, #111 60%)'
      }}
    >
      <audio ref={audioRef} src={track.src} preload="metadata" />
      <div className="flex p-3 gap-3 items-center">
        <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 shadow">
          <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate text-white">{track.title}</div>
          <div className="text-xs text-gray-300 truncate">{track.artist}</div>
          <div className="mt-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-full appearance-none slider"
            />
            <div className="flex justify-between text-[10px] text-gray-300 mt-1">
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>
        </div>
        <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black grid place-items-center shadow hover:scale-105 transition-transform">
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
};

export default SmallSongCard;

