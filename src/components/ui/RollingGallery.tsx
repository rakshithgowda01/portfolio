import React from 'react';

interface RollingGalleryProps {
  images: string[];
  height?: number; // px
  speedMs?: number; // duration for one full loop
}

export const RollingGallery: React.FC<RollingGalleryProps> = ({
  images,
  height = 160,
  speedMs = 20000,
}) => {
  const track = [...images, ...images];

  const style: React.CSSProperties = {
    ['--rg-height' as any]: `${height}px`,
    ['--rg-speed' as any]: `${speedMs}ms`,
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white" style={style}>
      <style>{`
        @keyframes rg-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex w-[200%]"
        style={{ animation: `rg-marquee var(--rg-speed) linear infinite` }}
      >
        {track.map((src, idx) => (
          <div key={idx} className="shrink-0" style={{ width: `${height}px`, height: `var(--rg-height)` }}>
            <div className="w-full h-full p-1">
              <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
                <img src={src} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingGallery;

