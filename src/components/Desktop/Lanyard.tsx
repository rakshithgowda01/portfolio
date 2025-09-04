'use client';
import { useEffect, useRef } from 'react';

function Lanyard({
  username = "rakshith",
  status = "online",
  activity = "Designing the future",
  avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
}) {
  const lanyardRef = useRef(null);

  useEffect(() => {
    const lanyard = lanyardRef.current;
    if (!lanyard) return;

    const handleMouseMove = (e) => {
      const rect = lanyard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      lanyard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      lanyard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    lanyard.addEventListener('mousemove', handleMouseMove);
    lanyard.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      lanyard.removeEventListener('mousemove', handleMouseMove);
      lanyard.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div
        ref={lanyardRef}
        className="group relative w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header with avatar and status */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30 shadow-lg">
                <img
                  src={avatar}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(status)} rounded-full border-2 border-white/80 animate-pulse`}></div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">@{username}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${getStatusColor(status)} rounded-full`}></div>
                <span className="text-sm text-gray-300 capitalize">{status}</span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300 mb-2">Currently</p>
            <p className="text-white font-medium">{activity}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center bg-white/5 rounded-lg p-3">
              <div className="text-xl font-bold text-white mb-1">24</div>
              <div className="text-xs text-gray-400">Projects</div>
            </div>
            <div className="text-center bg-white/5 rounded-lg p-3">
              <div className="text-xl font-bold text-white mb-1">3+</div>
              <div className="text-xs text-gray-400">Years</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Portfolio
            </button>
            <button className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-200 border border-white/20">
              Contact
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-30 blur-lg"></div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}

export default Lanyard;
