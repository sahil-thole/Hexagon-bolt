import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [showPrologue, setShowPrologue] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showFixedText, setShowFixedText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    if (audioRef.current) {
      // Set audio volume to 30% for desktop, muted for mobile
      audioRef.current.volume = isMobile ? 0 : 0.3;
      audioRef.current.muted = isMuted;
      
      if (!isMuted && !isMobile) {
        // Fade in audio after 1 second on desktop
        setTimeout(() => {
          audioRef.current?.play().catch(console.error);
        }, 1000);
      } else if (!isMuted && isMobile) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, isMobile]);

  useEffect(() => {
    // Show fixed text after 1 second
    const textTimer = setTimeout(() => {
      setShowFixedText(true);
    }, 1000);

    // Show buttons after text has fully appeared (1s delay + 1.5s fade-in)
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleTeaserClick = () => {
    window.open('https://www.instagram.com/thehexagonbook?igsh=MW5scmU4bmY2cWxtag%3D%3D&utm_source=qr', '_blank');
  };

  const handlePrologueClick = () => {
    setShowPrologue(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle mobile interaction to unmute
  const handleMobileInteraction = () => {
    if (isMobile && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      onClick={handleMobileInteraction}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/dark-intro.mp3" type="audio/mpeg" />
      </audio>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
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

      {/* Audio Control Icon - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleMute}
          className="group p-3 hover:bg-black/20 transition-all duration-300 ease-out"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            // Muted Speaker Icon
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white/70 hover:text-white/90 transition-colors duration-300"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            // Unmuted Speaker Icon
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white/70 hover:text-white/90 transition-colors duration-300"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Fixed Cinematic Text - Golden Third Position */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div 
          className={`text-center transition-all duration-[1500ms] ease-out ${
            showFixedText 
              ? 'opacity-80 transform translate-y-0' 
              : 'opacity-0 transform translate-y-5'
          }`}
        >
          <h1 className="text-white font-thin uppercase animate-float-text animate-shimmer text-base md:text-2xl lg:text-3xl tracking-[0.3em] md:tracking-[0.25em] leading-relaxed">
            <span className="block">Before Time Broke</span>
            <span className="block mt-2">They Were One</span>
          </h1>
        </div>
      </div>

      {/* Cinematic Text Buttons */}
      {showButtons && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div 
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center transition-all duration-[1500ms] ease-out animate-fade-in-slow"
          >
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
      )}

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