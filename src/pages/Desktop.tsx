import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DesktopGrid } from '@/components/Desktop/DesktopGrid';
import { TopNavBar } from '@/components/Desktop/TopNavBar';
import { WelcomeText } from '@/components/Desktop/WelcomeText';
import { StickyNote } from '@/components/Desktop/StickyNote';
import { DesktopIcon } from '@/components/Desktop/DesktopIcon';
import { MacDock } from '@/components/Desktop/MacDock';
import { MacWindow } from '@/components/Desktop/MacWindow';
import ProfileCard from '@/components/Desktop/ProfileCard';
import Lanyard from '@/components/Desktop/Lanyard';
import { Project1Window } from '@/components/Desktop/Project1Window';
import { Project2Window } from '@/components/Desktop/Project2Window';
import { Project3Window } from '@/components/Desktop/Project3Window';
import { Project4Window } from '@/components/Desktop/Project4Window';
import { DontLookWindow } from '@/components/Desktop/DontLookWindow';
import { useDragSystem } from '@/hooks/useDragSystem';

const desktopIcons = [
  { id: 'resume', name: 'Resume.pdf', type: 'file' as const, x: 80, y: 600 },
  { id: 'about', name: 'About Me', type: 'folder' as const, x: 80, y: 500 },
  { id: 'project1', name: 'Portfolio', type: 'folder' as const, x: 900, y: 150 },
  { id: 'project2', name: 'Project 02\n(Simplinno)', type: 'folder' as const, x: 950, y: 250 },
  { id: 'project3', name: 'Project 03\n(Leafpress)', type: 'folder' as const, x: 1150, y: 400 },
  { id: 'project4', name: 'Project 04\n(Amazon)', type: 'folder' as const, x: 900, y: 500 },
  { id: 'profile', name: "Don't Look", type: 'app' as const, x: 1150, y: 600 },
];

export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);
  const [showProject1, setShowProject1] = useState(false);
  const [showProject2, setShowProject2] = useState(false);
  const [showProject3, setShowProject3] = useState(false);
  const [showProject4, setShowProject4] = useState(false);
  const [showDontLook, setShowDontLook] = useState(false);
  const { updateItemPosition } = useDragSystem();
  const desktopRef = useRef<HTMLDivElement>(null);

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  const handleIconDoubleClick = (iconId: string) => {
    if (iconId === 'about') {
      setShowProfileCard(true);
      setShowLanyard(false);
      setShowProject1(false);
      setShowProject2(false);
      setShowProject3(false);
      setShowProject4(false);
      setShowDontLook(false);
    } else if (iconId === 'profile') {
      setShowDontLook(true);
      setShowProfileCard(false);
      setShowLanyard(false);
      setShowProject1(false);
      setShowProject2(false);
      setShowProject3(false);
      setShowProject4(false);
    } else if (iconId === 'project1') {
      setShowProject1(true);
      setShowProfileCard(false);
      setShowLanyard(false);
      setShowProject2(false);
      setShowProject3(false);
      setShowProject4(false);
      setShowDontLook(false);
    } else if (iconId === 'project2') {
      setShowProject2(true);
      setShowProfileCard(false);
      setShowLanyard(false);
      setShowProject1(false);
      setShowProject3(false);
      setShowProject4(false);
      setShowDontLook(false);
    } else if (iconId === 'project3') {
      setShowProject3(true);
      setShowProfileCard(false);
      setShowLanyard(false);
      setShowProject1(false);
      setShowProject2(false);
      setShowProject4(false);
      setShowDontLook(false);
    } else if (iconId === 'project4') {
      setShowProject4(true);
      setShowProfileCard(false);
      setShowLanyard(false);
      setShowProject1(false);
      setShowProject2(false);
      setShowProject3(false);
      setShowDontLook(false);
    } else {
      openWindow(iconId);
    }
  };

  const closeProfileCard = () => {
    setShowProfileCard(false);
  };

  const closeLanyard = () => {
    setShowLanyard(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside any window and on the desktop
      if (desktopRef.current && 
          !target.closest('.mac-window') && 
          !target.closest('.desktop-icon') &&
          target.closest('.desktop-grid')) {
        setOpenWindows([]);
        setShowProfileCard(false);
        setShowLanyard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderWindowContent = (iconId: string) => {
    switch (iconId) {
      case 'resume':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Resume</h2>
            <p className="text-gray-600">
              Download my latest resume to learn more about my experience and skills.
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:brightness-110 transition-all">
              Download PDF
            </button>
          </div>
        );

      case 'project1':
      case 'project2':
      case 'project3':
      case 'project4':
        const projectNames = {
          project1: 'AbsolutMess',
          project2: 'Simplinno',
          project3: 'Leafpress',
          project4: 'Amazon'
        };
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {projectNames[iconId as keyof typeof projectNames]}
            </h2>
            <p className="text-gray-600">
              Project details and portfolio showcase coming soon...
            </p>
          </div>
        );

      default:
        return <p>Content loading...</p>;
    }
  };

  return (
    <div className="font-inter min-h-screen overflow-hidden" ref={desktopRef}>
      <TopNavBar />
      
      <DesktopGrid className="desktop-grid">
        {/* Welcome Text */}
        <WelcomeText />
        
        {/* Sticky Note (hidden on mobile) */}
        <div className="hidden md:block">
          <StickyNote />
        </div>
        
        {/* Desktop Icons */}
        <div className="block md:hidden">
          {desktopIcons.map((icon, idx) => {
            const col = idx % 4;
            const row = Math.floor(idx / 4);
            const x = 16 + col * 88; // tuned for mobile
            const y = 120 + row * 120; // leave space for title and nav
            return (
              <DesktopIcon
                key={`m-${icon.id}`}
                id={icon.id}
                name={icon.name}
                type={icon.type}
                initialX={x}
                initialY={y}
                absolute={true}
                onDoubleClick={() => handleIconDoubleClick(icon.id)}
              />
            );
          })}
        </div>
        <>
        <div className="hidden md:block">
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              name={icon.name}
              type={icon.type}
              initialX={icon.x}
              initialY={icon.y}
              onPositionUpdate={updateItemPosition}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
            />
          ))}
        </div>
        </>

        {/* Mac Windows */}
        {openWindows.map((iconId) => (
          <MacWindow
            key={`window-${iconId}`}
            title={desktopIcons.find(icon => icon.id === iconId)?.name.replace('\n', ' ') || ''}
            isOpen={true}
            onClose={() => closeWindow(iconId)}
            initialX={200 + Math.random() * 100}
            initialY={150 + Math.random() * 100}
          >
            {renderWindowContent(iconId)}
          </MacWindow>
        ))}

        {/* Profile Card Overlay */}
        {showProfileCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/50" onClick={closeProfileCard}></div>
            <div className="relative z-10 h-full">
              <ProfileCard />
            </div>
            <button
              onClick={closeProfileCard}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Lanyard Overlay */}
        {showLanyard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/50" onClick={closeLanyard}></div>
            <div className="relative z-10 h-full">
              <Lanyard />
            </div>
            <button
              onClick={closeLanyard}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Project 1 Window */}
        {showProject1 && (
          <Project1Window onClose={() => setShowProject1(false)} />
        )}

        {/* Project 2 Window */}
        {showProject2 && (
          <Project2Window onClose={() => setShowProject2(false)} />
        )}

        {/* Project 3 Window */}
        {showProject3 && (
          <Project3Window onClose={() => setShowProject3(false)} />
        )}

        {/* Project 4 Window */}
        {showProject4 && (
          <Project4Window onClose={() => setShowProject4(false)} />
        )}

        {/* Don't Look Window */}
        {showDontLook && (
          <DontLookWindow onClose={() => setShowDontLook(false)} />
        )}
      </DesktopGrid>

      {/* Dock */}
      <MacDock />
    </div>
  );
};