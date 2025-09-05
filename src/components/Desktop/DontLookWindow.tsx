import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { SeriesAnimeExpandable } from './SeriesAnimeExpandable';

interface DontLookWindowProps {
  onClose?: () => void;
}

export const DontLookWindow = ({ onClose }: DontLookWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSeriesAnime, setShowSeriesAnime] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'series' | 'anime'>('main');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  // Your Series Collection
  const seriesCards = [
    {
      title: "Breaking Bad",
      description: "Crime Drama Series",
      src: "/songs/series1.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Breaking Bad is an American crime drama television series created and produced by Vince Gilligan. 
            The show follows Walter White, a struggling high school chemistry teacher diagnosed with inoperable lung cancer.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>5 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>62 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>2008-2013</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>IMDb: 9.5/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Game of Thrones",
      description: "Fantasy Drama Series",
      src: "/songs/series2.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss 
            for HBO. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>8 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>73 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>2011-2019</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>IMDb: 9.2/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Stranger Things",
      description: "Supernatural Horror Series",
      src: "/songs/series3.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Stranger Things is an American science fiction horror drama television series created by the Duffer Brothers 
            for Netflix. The show is set in the 1980s in the fictional town of Hawkins, Indiana.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>4 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>42 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>2016-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>IMDb: 8.7/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "All of Us Are Dead",
      description: "Zombie Horror Series",
      src: "/songs/series4.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            All of Us Are Dead is a South Korean coming-of-age zombie apocalypse horror streaming television series. 
            The series follows a group of high school students trapped in their school during a zombie outbreak.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>1 Season</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>12 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>2022-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>IMDb: 7.1/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Wednesday",
      description: "Supernatural Comedy Series",
      src: "/songs/series5.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Wednesday is an American coming-of-age supernatural comedy horror television series based on the character 
            Wednesday Addams from The Addams Family. It follows Wednesday's years as a student at Nevermore Academy.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span>1 Season</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span>8 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span>2022-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span>IMDb: 8.1/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Outer Banks",
      description: "Adventure Mystery Series",
      src: "/songs/series6.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Outer Banks is an American action-adventure mystery teen drama television series. The show follows a group 
            of teenagers in the Outer Banks of North Carolina who discover a treasure map and get caught up in a dangerous adventure.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>3 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>30 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>2020-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>IMDb: 7.5/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Dark",
      description: "Sci-Fi Thriller Series",
      src: "/songs/series7.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Dark is a German science fiction thriller television series. The story follows characters from the fictional 
            town of Winden as they pursue the truth in the aftermath of a child's disappearance.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>3 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>26 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>2017-2020</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>IMDb: 8.7/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "From",
      description: "Supernatural Horror Series",
      src: "/songs/series8.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            From is an American horror television series that follows the residents of a mysterious town in middle America 
            that traps all those who enter. The residents must try to survive and escape from the monsters that come out at night.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>2 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>20 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>2022-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>IMDb: 7.8/10</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Your Anime Collection
  const animeCards = [
    {
      title: "One Piece",
      description: "Adventure Shounen Anime",
      src: "/songs/anime1.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. 
            It follows the adventures of Monkey D. Luffy, a boy whose body gained the properties of rubber after unintentionally eating a Devil Fruit.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>20+ Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>1000+ Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>1999-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>IMDb: 9.0/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Naruto",
      description: "Ninja Adventure Anime",
      src: "/songs/anime2.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. 
            It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>9 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>220 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>2002-2007</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>IMDb: 8.4/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Attack on Titan",
      description: "Action Fantasy Anime",
      src: "/songs/anime3.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Attack on Titan is a Japanese manga series written and illustrated by Hajime Isayama. 
            It depicts a world where humanity lives inside cities surrounded by enormous walls that protect them from gigantic man-eating humanoids.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>4 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>75 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>2013-2023</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>IMDb: 9.0/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Haikyuu!!",
      description: "Sports Anime",
      src: "/songs/anime4.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Haikyuu!! is a Japanese manga series written and illustrated by Haruichi Furudate. 
            The story follows Shoyo Hinata, a boy determined to become a great volleyball player despite his small stature.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>4 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>85 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>2014-2020</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>IMDb: 8.7/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Bleach",
      description: "Supernatural Action Anime",
      src: "/songs/anime5.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Bleach is a Japanese manga series written and illustrated by Tite Kubo. 
            It follows the adventures of Ichigo Kurosaki, a teenager with the ability to see ghosts who becomes a Soul Reaper.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>16 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>366 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>2004-2012</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>IMDb: 8.2/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Death Note",
      description: "Psychological Thriller Anime",
      src: "/songs/anime6.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Death Note is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata. 
            The story follows Light Yagami, a high school student who discovers a supernatural notebook that allows him to kill anyone.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>1 Season</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>37 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>2006-2007</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span>IMDb: 9.0/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tokyo Revengers",
      description: "Time Travel Action Anime",
      src: "/songs/anime7.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Tokyo Revengers is a Japanese manga series written and illustrated by Ken Wakui. 
            It follows Takemichi Hanagaki, a 26-year-old who discovers he can time travel and decides to save his ex-girlfriend.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>2 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>37 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>2021-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>IMDb: 8.1/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Dr. Stone",
      description: "Sci-Fi Adventure Anime",
      src: "/songs/anime8.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Dr. Stone is a Japanese manga series written by Riichiro Inagaki and illustrated by Boichi. 
            It follows Senku Ishigami, a scientific genius who plans to rebuild civilization after humanity was mysteriously petrified.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              <span>3 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              <span>47 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              <span>2019-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              <span>IMDb: 8.2/10</span>
            </div>
          </div>
        </div>
      ),
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, type: "spring", stiffness: 260, damping: 22 }}
      className="fixed inset-0 z-50"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Invisible backdrop to capture outside clicks, no blur */}
      <div className="absolute inset-0" />
      <div ref={cardWrapperRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          ref={dragRef}
          drag={!isMinimized}
          dragMomentum={false}
          dragElastic={0}
          onDrag={(event, info) => {
            if (isMinimized) return;
            setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className={`transition-all duration-300 ease-in-out ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-80 h-[500px] md:w-[600px] md:h-[600px]'} bg-white rounded-lg shadow-2xl border border-gray-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ x: position.x, y: position.y }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div className={`relative w-full h-full transition-all duration-300 ease-in-out ${isMinimized ? 'p-3 md:p-4' : 'p-0'} text-gray-800 overflow-hidden`}>
            
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👁️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate">Don't Look</h3>
                    <p className="text-gray-600 text-xs">Personal Collection</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <span className="text-gray-600 text-sm">□</span>
                </button>
              </div>
            )}

            {/* Full View */}
            {!isMinimized && (
              <>
                {/* macOS Title Bar */}
                <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between rounded-t-lg cursor-grab active:cursor-grabbing">
                  <div className="flex items-center space-x-2">
                    {/* Traffic Light Buttons */}
                    <button 
                      onClick={onClose}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 active:bg-red-600 transition-colors"
                    ></button>
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 active:bg-yellow-600 transition-colors"
                    ></button>
                    <button 
                      className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 active:bg-green-600 transition-colors"
                    ></button>
                  </div>
                  <div className="text-sm font-medium text-gray-600">Don't Look</div>
                  <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="p-6 h-full overflow-y-auto">
                  {!showSeriesAnime ? (
                    /* 3D Card Container - Inside the window */
                    <CardContainer className="inter-var">
                      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-full h-auto rounded-xl p-6 border">
                        
                        {/* Don't Look Heading */}
                        <CardItem
                          translateZ="50"
                          className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                        >
                          Don't Look
                        </CardItem>

                        {/* Small line */}
                        <CardItem
                          translateZ="40"
                          className="text-center mb-8"
                        >
                          <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
                        </CardItem>

                        {/* Three Big Folders */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Series Folder */}
                          <CardItem
                            translateZ="60"
                            className="text-center"
                          >
                            <motion.div 
                              className="w-24 h-24 md:w-32 md:h-32 rounded-lg mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCurrentView('series');
                                setShowSeriesAnime(true);
                              }}
                            >
                              <img 
                                src="/songs/series.jpg" 
                                alt="Series" 
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Series</h3>
                          </CardItem>

                          {/* Anime Folder */}
                          <CardItem
                            translateZ="60"
                            className="text-center"
                          >
                            <motion.div 
                              className="w-24 h-24 md:w-32 md:h-32 rounded-lg mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCurrentView('anime');
                                setShowSeriesAnime(true);
                              }}
                            >
                              <img 
                                src="/songs/anime.jpg" 
                                alt="Anime" 
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Anime</h3>
                          </CardItem>

                          {/* Games Folder */}
                          <CardItem
                            translateZ="60"
                            className="text-center"
                          >
                            <motion.div 
                              className="w-24 h-24 md:w-32 md:h-32 rounded-lg mx-auto mb-4 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img 
                                src="/songs/games.jpg" 
                                alt="Games" 
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Games</h3>
                          </CardItem>
                        </div>
                      </CardBody>
                    </CardContainer>
                  ) : (
                    /* Expandable Cards View - Series or Anime */
                    <div className="h-full">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {currentView === 'series' ? 'Series' : 'Anime'}
                        </h2>
                        <button
                          onClick={() => {
                            setShowSeriesAnime(false);
                            setCurrentView('main');
                          }}
                          className="w-6 h-6 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group"
                          title="Close"
                        >
                          <span className="text-red-500 group-hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                        </button>
                      </div>
                      <SeriesAnimeExpandable 
                        cards={currentView === 'series' ? seriesCards : animeCards} 
                        onClose={() => {
                          setShowSeriesAnime(false);
                          setCurrentView('main');
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
