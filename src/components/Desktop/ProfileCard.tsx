'use client';
import { useEffect, useRef } from 'react';

function ProfileCard({
  name = "Rakshith",
  role = "UX Designer & Developer",
  avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  bio = "Passionate about creating beautiful and functional digital experiences. I love bringing ideas to life through thoughtful design and clean code.",
  stats = [
    { label: "Projects", value: "24" },
    { label: "Experience", value: "3+ years" },
    { label: "Skills", value: "12+" }
  ]
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div
        ref={cardRef}
        className="group relative w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-80"></div>
        
        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-600 font-medium">{role}</p>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-center leading-relaxed mb-8">
            {bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  );
}

export default ProfileCard;
