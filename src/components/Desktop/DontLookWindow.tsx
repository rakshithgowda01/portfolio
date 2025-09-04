import { useState, useRef } from 'react';
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
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  // Sample data for Series - you can provide the actual list
  const seriesCards = [
    {
      title: "Breaking Bad",
      description: "Crime Drama Series",
      src: "/songs/series.jpg",
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
      src: "/songs/series.jpg",
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
      src: "/songs/series.jpg",
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
      title: "The Office",
      description: "Mockumentary Comedy Series",
      src: "/songs/series.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            The Office is an American mockumentary sitcom television series that depicts the everyday work lives 
            of office employees in the Scranton, Pennsylvania, branch of the fictional Dunder Mifflin Paper Company.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>9 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>201 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>2005-2013</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>IMDb: 8.9/10</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Sample data for Anime - you can provide the actual list
  const animeCards = [
    {
      title: "Attack on Titan",
      description: "Action Fantasy Anime",
      src: "/songs/anime.jpg",
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
      title: "Demon Slayer",
      description: "Supernatural Action Anime",
      src: "/songs/anime.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. 
            It follows teenage Tanjiro Kamado, who strives to become a demon slayer after his family was slaughtered.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>3 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>44 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>2019-Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>IMDb: 8.7/10</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "One Piece",
      description: "Adventure Shounen Anime",
      src: "/songs/anime.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. 
            It has been serialized in Shueisha's Weekly Shōnen Jump magazine since July 1997.
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
      src: "/songs/anime.jpg",
      ctaText: "Watch",
      ctaLink: "#",
      content: () => (
        <div>
          <p className="mb-4">
            Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. 
            It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>9 Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>220 Episodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>2002-2007</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>IMDb: 8.4/10</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
        <motion.div 
          className={`transition-all duration-300 ease-in-out transform -translate-y-[30vh] md:-translate-y-[20vh] ${isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-80 h-[500px] md:w-[600px] md:h-[600px]'} bg-white rounded-lg shadow-2xl border border-gray-300`}
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
