import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FileText, Folder, User } from 'lucide-react';

interface DesktopIconProps {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'app';
  initialX: number;
  initialY: number;
  absolute?: boolean;
  onPositionUpdate?: (id: string, x: number, y: number) => void;
  onDoubleClick?: () => void;
}

export const DesktopIcon = ({
  id,
  name,
  type,
  initialX,
  initialY,
  absolute = true,
  onPositionUpdate,
  onDoubleClick
}: DesktopIconProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);

  // Intentionally avoid calling onPositionUpdate on every render to prevent update loops.

  const getIcon = () => {
    switch (type) {
      case 'file':
        return (
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={`/icons/${id}.png`}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        );
      case 'folder':
        return (
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={id === 'about' ? `/icons/${id}.png` : "/icons/folder.png"}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        );
      case 'app':
        return (
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={`/icons/${id}.png`}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={`/icons/${id}.png`}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={selfRef}
      drag={absolute}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(event, info) => {
        if (!absolute) return;
        const el = selfRef.current;
        if (!el) return;
        const iconWidth = el.offsetWidth || 80;
        const iconHeight = el.offsetHeight || 80;
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const nx = position.x + (info.delta.x || 0);
        const ny = position.y + (info.delta.y || 0);
        const clampedX = Math.max(0, Math.min(nx, containerWidth - iconWidth));
        const clampedY = Math.max(0, Math.min(ny, containerHeight - iconHeight));
        setPosition({ x: clampedX, y: clampedY });
      }}
      onDragStart={() => absolute && setIsDragging(true)}
      onDragEnd={() => {
        if (!absolute) return;
        const el = selfRef.current;
        if (!el) return;
        const iconWidth = el.offsetWidth || 80;
        const iconHeight = el.offsetHeight || 80;
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const clampedX = Math.max(0, Math.min(position.x, containerWidth - iconWidth));
        const clampedY = Math.max(0, Math.min(position.y, containerHeight - iconHeight));

        setPosition({ x: clampedX, y: clampedY });
        setIsDragging(false);
      }}
      className={`${absolute ? 'absolute' : ''} select-none ${absolute ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''} group desktop-icon z-20`}
      style={absolute ? { left: position.x, top: position.y } as React.CSSProperties : undefined}
      onDoubleClick={onDoubleClick}
    >
      <div className={`flex flex-col items-center gap-1 p-2 rounded-lg`}>
        
        <div>
          {getIcon()}
        </div>
        
        <span className={`text-xs text-gray-800 max-w-20 text-center leading-tight font-medium`}>
          {name}
        </span>
      </div>
      
      {/* No hover/drag highlight to keep it minimal */}
    </motion.div>
  );
};