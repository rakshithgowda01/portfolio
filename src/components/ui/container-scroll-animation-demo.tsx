"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Github, Instagram, Mail, Linkedin, Twitter } from "lucide-react"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-gray-900">
      {/* Mobile Welcome Text */}
      <div className="block sm:hidden px-4 py-2 text-center">
        <h1 className="text-xl font-semibold text-white">
          Welcome to my <br />
          <span className="text-xl font-bold mt-1 leading-none text-white">PROFILE</span>
        </h1>
      </div>
      
      <ContainerScroll
        titleComponent={
          <div className="hidden sm:block">
            <h1 className="text-2xl sm:text-4xl font-semibold text-white">
              Welcome to my <br />
              <span className="text-2xl sm:text-4xl md:text-[6rem] font-bold mt-1 leading-none text-white">PROFILE</span>
            </h1>
          </div>
        }
      >
        <div className="mx-auto rounded-2xl sm:rounded-3xl bg-black border border-gray-700 shadow-2xl min-h-[300px] w-full max-w-sm sm:max-w-md overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-black border-b border-gray-700">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg"></div>
            </div>
            <div className="text-white text-xs sm:text-sm font-medium bg-gray-800 px-2 sm:px-3 py-1 rounded-full border border-gray-600">
              profile.dev
            </div>
            <div className="w-16 sm:w-20"></div>
          </div>

          <div className="min-h-[calc(100%-50px)] sm:min-h-[calc(100%-60px)] overflow-y-auto scrollbar-hide bg-black">
            <div className="p-3 space-y-3 text-white bg-black min-h-full">
              <div className="bg-black rounded-lg p-3 border border-gray-700 font-mono text-xs">
                <div className="text-purple-400">// Hi, I'm Rakshith 👋</div>
                <div className="text-pink-400 ml-2">// Full-Stack Developer & Creative Technologist</div>
                <div className="text-blue-400 ml-2">// I craft digital experiences with code & creativity</div>
                <div className="text-cyan-400 ml-2">// Passionate about AI, animations, and user-centric design</div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-cyan-400">Skills & Technologies</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-black rounded-lg p-2 border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                    <div className="text-sm mb-1 group-hover:scale-110 transition-transform">🎨</div>
                    <div className="font-semibold text-purple-400 mb-1 text-xs">Frontend Mastery</div>
                    <div className="text-xs text-gray-400">
                      React, Next.js, TypeScript, Tailwind CSS, Framer Motion
                    </div>
                  </div>
                  <div className="bg-black rounded-lg p-2 border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                    <div className="text-sm mb-1 group-hover:scale-110 transition-transform">⚡</div>
                    <div className="font-semibold text-pink-400 mb-1 text-xs">Backend & APIs</div>
                    <div className="text-xs text-gray-400">Node.js, Express, Python, PostgreSQL, MongoDB</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-green-400">Tech Stack</h3>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { name: "React", icon: "⚛️", color: "text-blue-400" },
                    { name: "Next.js", icon: "▲", color: "text-white" },
                    { name: "TypeScript", icon: "📘", color: "text-blue-400" },
                    { name: "Tailwind", icon: "🎨", color: "text-cyan-400" },
                    { name: "Node.js", icon: "🟢", color: "text-green-400" },
                    { name: "Python", icon: "🐍", color: "text-yellow-400" },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-black rounded-lg p-1.5 text-center hover:border-gray-600 transition-all duration-300 border border-gray-700 group"
                    >
                      <div className="text-xs mb-1 group-hover:scale-110 transition-transform">{tech.icon}</div>
                      <div className={`text-xs font-medium ${tech.color}`}>{tech.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <h3 className="text-sm font-bold text-center mb-3 text-purple-400">Let's Connect</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
                  >
                    <Instagram className="w-3 h-3 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
                  >
                    <Github className="w-3 h-3 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  >
                    <Mail className="w-3 h-3 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    <Linkedin className="w-3 h-3 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  )
}