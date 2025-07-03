import React from 'react';
import { Play, ArrowRight, Download } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
          }}
        >
          <source
            src="/Hexagon-video.mp4"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        </video>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Welcome to the
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Hexagon Universe
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            Experience the future of digital innovation with cutting-edge technology that transforms possibilities into reality.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fade-in-slow">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 animate-glow">
              <Play size={20} className="group-hover:scale-110 transition-transform" />
              Enter Universe
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 flex items-center gap-3">
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              Discover More
            </button>
            
            <button className="group px-8 py-4 bg-white/10 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/20 border border-white/20 hover:border-white/30">
              View Gallery
            </button>
          </div>
          
          {/* Stats or Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-slow">
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                ∞
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                Infinite Possibilities
              </div>
            </div>
            
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                6D
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                Dimensional Experience
              </div>
            </div>
            
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                24/7
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                Always Connected
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-bounce-slow">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default App;