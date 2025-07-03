import React, { useState } from 'react';

function App() {
  const [showPrologue, setShowPrologue] = useState(false);

  const handleTeaserClick = () => {
    window.open('https://www.instagram.com/thehexagonbook?igsh=MW5scmU4bmY2cWxtag%3D%3D&utm_source=qr', '_blank');
  };

  const handlePrologueClick = () => {
    setShowPrologue(true);
  };

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
      </div>

      {/* Cinematic Text Buttons */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <button
            onClick={handleTeaserClick}
            className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out"
          >
            <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase">
              TEASER
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
          </button>
          
          <button
            onClick={handlePrologueClick}
            className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out"
          >
            <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase">
              PROLOGUE
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
          </button>
        </div>
      </div>

      {/* Prologue Overlay */}
      {showPrologue && (
        <div 
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowPrologue(false)}
        >
          <div 
            className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white animate-fade-in-slow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-light text-white/90 tracking-wide">PROLOGUE</h2>
              <button
                onClick={() => setShowPrologue(false)}
                className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed text-base font-light mb-4">
                In a world where the extraordinary lies hidden amidst the ordinary, six powerful individuals, known as the Vertex, are seemingly chosen by fate to wield the essence of six mighty elements: Air, Earth, Water, Fire, Light, and Darkness. These enigmatic bearers, collectively called the Hexagon, are scattered across the globe, each a solitary figure shrouded in mystery. Their identities remain unknown, even to each other, connected only by the ethereal thread of thought that allows them to communicate silently.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4">
                Each Vertex leads a life cloaked in the mundane, yet their hearts carry the burden of immense power. When the six form a perfect hexagon, their individual strengths merge, granting them a god-like consciousness. This unity bestows upon them unparalleled powers: immense strength, mastery over minds, and some forbidden arts like soul splitting, time reversal. Their collective presence becomes a force of nature, a hidden shield that has safeguarded the world from countless calamities. Though the ordinary folk remain blissfully unaware of their existence, these six guardians have, through the ages, stood as silent sentinels.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4">
                But a dark prophecy looms on the horizon—one that foretells the shattering of the Hexagon and a sacrifice that must be made to maintain the cosmic balance of powers.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light">
                Against this rising tide of darkness stands Hikaru, the young light vertex, struggling to unite the scattered Vertices. As ancient conspiracies come to light and the origins of both elemental and dark energies are revealed, the Hexagon must confront a terrible truth: what if their very existence feeds the darkness they've sworn to fight?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;