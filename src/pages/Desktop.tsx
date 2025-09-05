import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DesktopGrid } from '@/components/Desktop/DesktopGrid';
import { TopNavBar } from '@/components/Desktop/TopNavBar';
import { ContactCard } from '@/components/Desktop/ContactCard';
import { WelcomeText } from '@/components/Desktop/WelcomeText';
import { StickyNote } from '@/components/Desktop/StickyNote';
import { DesktopIcon } from '@/components/Desktop/DesktopIcon';
// import { MacDock } from '@/components/Desktop/MacDock';
import MacOSDock from '@/components/ui/mac-os-dock';
import { MacWindow } from '@/components/Desktop/MacWindow';
import ProfileCard from '@/components/Desktop/ProfileCard';
import Lanyard from '@/components/Desktop/Lanyard';
import { Project1Window } from '@/components/Desktop/Project1Window';
import { Project2Window } from '@/components/Desktop/Project2Window';
import { Project3Window } from '@/components/Desktop/Project3Window';
import { Project4Window } from '@/components/Desktop/Project4Window';
import { DontLookWindow } from '@/components/Desktop/DontLookWindow';
import { PhotoViewerWindow } from '@/components/Desktop/PhotoViewerWindow';
// About Me multi-window uses built-in MacWindow instances
import { useDragSystem } from '@/hooks/useDragSystem';
import { SmallSongCard } from '@/components/Desktop/SmallSongCard';
import { CometCard } from '@/components/ui/comet-card';
import { SpotifyPlayer } from '@/components/Desktop/SpotifyPlayer';

const desktopIcons = [
  { id: 'resume', name: 'Resume.pdf', type: 'file' as const, x: 80, y: 600 },
  { id: 'about', name: 'About Me', type: 'folder' as const, x: 80, y: 500 },
  { id: 'project1', name: 'Portfolio', type: 'folder' as const, x: 900, y: 150 },
  { id: 'project2', name: 'Project 02\n(Lumiere)', type: 'folder' as const, x: 950, y: 250 },
  { id: 'project3', name: 'Project 03\n(Leafpress)', type: 'folder' as const, x: 1150, y: 400 },
  { id: 'project4', name: 'Crazy Projects', type: 'folder' as const, x: 900, y: 500 },
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
  const [showTopContact, setShowTopContact] = useState(false);
  const [showAboutMeInfo, setShowAboutMeInfo] = useState(false);
  const [showAboutPhotoRightTop, setShowAboutPhotoRightTop] = useState(false);
  const [showAboutPhotoLeftBottom, setShowAboutPhotoLeftBottom] = useState(false);
  const [showAboutSpotify, setShowAboutSpotify] = useState(false);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [openDockApps, setOpenDockApps] = useState<string[]>(['finder', 'safari']);
  const [zCounter, setZCounter] = useState(60);
  const [zInfo, setZInfo] = useState(61);
  const [zRight, setZRight] = useState(62);
  const [zLeft, setZLeft] = useState(63);
  const [zSong, setZSong] = useState(64);
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
      // Open 4 separate About Me windows
      setShowAboutMeInfo(true);
      setShowAboutPhotoRightTop(true);
      setShowAboutPhotoLeftBottom(true);
      setShowAboutSpotify(true);
      // Close other windows
      setShowProfileCard(false);
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

  const closeAboutMeInfo = () => setShowAboutMeInfo(false);
  const closeAboutPhotoRightTop = () => setShowAboutPhotoRightTop(false);
  const closeAboutPhotoLeftBottom = () => setShowAboutPhotoLeftBottom(false);
  const closeAboutSpotify = () => setShowAboutSpotify(false);

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
        setShowAboutMeInfo(false);
        setShowAboutPhotoRightTop(false);
        setShowAboutPhotoLeftBottom(false);
        setShowAboutSpotify(false);
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

  // Dock apps list (includes your requested macOS-style apps + spotify)
  const dockApps = [
    { id: 'finder', name: 'Finder', icon: '/icons/finder.png' },
    { id: 'calculator', name: 'Calculator', icon: '/icons/calculator.png' },
    { id: 'terminal', name: 'Terminal', icon: '/icons/terminal.png' },
    { id: 'mail', name: 'Contact', icon: '/icons/mail.png' },
    { id: 'notes', name: 'Notes', icon: '/icons/notes.png' },
    { id: 'safari', name: 'Safari', icon: '/icons/safari.png' },
    { id: 'photos', name: 'Photos', icon: '/icons/photos.png' },
    { id: 'netflix', name: 'Netflix', icon: '/icons/netflix.png' },
    { id: 'spotify', name: 'Spotify', icon: '/icons/spotify.png' },
  ];

  const handleDockAppClick = (appId: string) => {
    if (appId === 'spotify') {
      setShowSpotifyPlayer(prev => !prev);
    } else if (appId === 'mail') {
      setShowTopContact(true);
    } else if (appId === 'photos') {
      setShowPhotos(prev => !prev);
    }
    // Toggle indicator dot state
    setOpenDockApps(prev => prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]);
  };

  return (
    <div className="font-inter min-h-screen overflow-hidden" ref={desktopRef}>
      <TopNavBar onContact={() => setShowTopContact(true)} />
      
      <DesktopGrid className="desktop-grid">
        {/* Welcome Text */}
        <WelcomeText />
        
        {/* Sticky Note (desktop only) */}
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

        {/* Photos Window */}
        {showPhotos && (
          <PhotoViewerWindow 
            onClose={() => setShowPhotos(false)} 
            imageSrc="/songs/photo1.jpg"
            title="Photos"
            position="left"
          />
        )}

        {/* About Me - Right Top Photo (1:1) */}
        {showAboutPhotoRightTop && (
          <MacWindow
            title="IMG_0001.heic"
            isOpen={true}
            onClose={closeAboutPhotoRightTop}
            width={typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 300}
            height={typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 300}
            initialX={typeof window !== 'undefined' ? Math.max(16, window.innerWidth - (typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 360)) : 900}
            initialY={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 90}
            zIndex={zRight}
            onFocus={() => { const nz = zCounter + 1; setZCounter(nz); setZRight(nz); }}
            contentOverflow="hidden"
          >
            <CometCard className="w-full h-full">
              <div className="w-full h-full overflow-hidden rounded-md">
                <img src="/songs/photo2.jpg" alt="About Right" className="w-full h-full object-cover" />
              </div>
            </CometCard>
          </MacWindow>
        )}

        {/* About Me - Left Bottom Photo (1:1) */}
        {showAboutPhotoLeftBottom && (
          <MacWindow
            title="IMG_0002.heic"
            isOpen={true}
            onClose={closeAboutPhotoLeftBottom}
            width={typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 300}
            height={typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 300}
            initialX={typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 60}
            initialY={typeof window !== 'undefined' ? Math.max(80, window.innerHeight - (typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 420)) : 420}
            zIndex={zLeft}
            onFocus={() => { const nz = zCounter + 1; setZCounter(nz); setZLeft(nz); }}
            contentOverflow="hidden"
          >
            <CometCard className="w-full h-full">
              <div className="w-full h-full overflow-hidden rounded-md">
                <img src="/songs/photo1.jpg" alt="About Left" className="w-full h-full object-cover" />
              </div>
            </CometCard>
          </MacWindow>
        )}

        {/* About Me - Small Song Card */}
        {showAboutSpotify && (
          <MacWindow
            title=""
            isOpen={true}
            onClose={closeAboutSpotify}
            width={typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 420}
            height={typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 220}
            initialX={typeof window !== 'undefined' ? Math.max(16, window.innerWidth - (typeof window !== 'undefined' && window.innerWidth < 768 ? 360 : 500)) : 800}
            initialY={typeof window !== 'undefined' ? Math.max(80, window.innerHeight - (typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 360)) : 520}
            showHeader={false}
            zIndex={zSong}
            onFocus={() => { const nz = zCounter + 1; setZCounter(nz); setZSong(nz); }}
            contentOverflow="hidden"
          >
            <div className="w-full h-full p-2">
              <CometCard className="w-full h-full">
                <SmallSongCard />
              </CometCard>
            </div>
          </MacWindow>
        )}

        {/* About Me - Info Center Window (render last to be on top) */}
        {showAboutMeInfo && (
          <MacWindow
            title="aboutme.txt"
            isOpen={true}
            onClose={closeAboutMeInfo}
            width={typeof window !== 'undefined' ? (window.innerWidth < 1024 ? Math.min(window.innerWidth - 80, 720) : 560) : 560}
            height={typeof window !== 'undefined' ? (window.innerWidth < 1024 ? Math.min(window.innerHeight - 160, 520) : 420) : 420}
            initialX={typeof window !== 'undefined' ? Math.max(40, window.innerWidth / 2 - ((window.innerWidth < 1024 ? Math.min(window.innerWidth - 80, 720) : 560) / 2)) : 120}
            initialY={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 120}
            zIndex={zInfo}
            onFocus={() => { const nz = zCounter + 1; setZCounter(nz); setZInfo(nz); }}
          >
            <div className="h-full overflow-auto pb-2">
              <div className="space-y-4 text-gray-800">
                <p className="text-base md:text-lg">
                  Hi, I’m Rakshith R — a creative mind who loves building websites and landing pages with clean design, cool UI, and smooth animations. I’m also exploring AI SaaS, cybersecurity, and a touch of design, always learning and experimenting to push ideas into reality. My long-term goal is to build something big or work remotely in NYC while exploring the world.
                </p>
                <div className="text-base md:text-lg">
                  <p className="font-semibold mb-1">🎓 Education</p>
                  <p>
                    I’m currently pursuing my BCA at Gopalan College in Bangalore. Alongside academics, I focus on hands-on projects that combine creativity, technology, and problem-solving.
                  </p>
                </div>
              </div>
            </div>
          </MacWindow>
        )}
      </DesktopGrid>

      {/* Dock */}
      <div className="fixed left-1/2 -translate-x-1/2 z-40" style={{ bottom: 'max(16px, env(safe-area-inset-bottom) + 8px)' }}>
        <MacOSDock
          apps={dockApps.filter(app => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              // On mobile, remove notes and terminal
              return !['notes', 'terminal'].includes(app.id);
            }
            return true;
          })}
          onAppClick={handleDockAppClick}
          openApps={openDockApps}
        />
      </div>

      {/* Spotify Player Overlay */}
      {showSpotifyPlayer && (
        <SpotifyPlayer onClose={() => setShowSpotifyPlayer(false)} />
      )}

      {/* Top Contact overlay */}
      {showTopContact && (
        <ContactCard centered onClose={() => setShowTopContact(false)} />
      )}
    </div>
  );
};