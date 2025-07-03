import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [showPrologue, setShowPrologue] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showText, setShowText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const textSequence = async () => {
      // Delay initial appearance by 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show text with fade-in over 1.5 seconds
      setShowText(true);
      
      // Wait for text to fully appear, then show buttons
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowButtons(true);
      
      // Handle audio autoplay for desktop after text sequence is complete
      if (!isMobile && audioRef.current) {
        setTimeout(() => {
          setIsMuted(false);
          audioRef.current.play().catch((error) => {
            console.log('Autoplay failed:', error);
          });
        }, 500);
      }
    };

    textSequence();
  }, [isMobile]);

  const handleTeaserClick = () => {
    window.open('https://www.instagram.com/thehexagonbook?igsh=MW5scmU4bmY2cWxtag%3D%3D&utm_source=qr', '_blank');
  };

  const handlePrologueClick = () => {
    setShowPrologue(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // If unmuting, try to play audio
    if (isMuted && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  // Handle mobile interaction to unmute
  const handleMobileInteraction = () => {
    if (isMobile && isMuted && audioRef.current) {
      setIsMuted(false);
      audioRef.current.play().catch(console.error);
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

      {/* Parallax Floating Cinematic Headline */}
      <div className="absolute inset-0 z-10 flex items-start justify-center pt-[20vh]">
        <div 
          className={`text-center transition-all duration-[1500ms] ease-out parallax-text ${
            showText 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-5'
          }`}
        >
          {/* Main floating text with multiple animation layers */}
          <div className="relative">
            {/* Background ethereal layer */}
            <h1 className="absolute inset-0 text-white/20 font-garamond text-[1rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] tracking-[0.25em] uppercase leading-[1.4] animate-ethereal-drift font-normal blur-[1px]">
              BEFORE TIME BROKE<br />
              THEY WERE ONE
            </h1>
            
            {/* Mid-layer with parallax float */}
            <h1 className="absolute inset-0 text-white/40 font-garamond text-[1rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] tracking-[0.25em] uppercase leading-[1.4] animate-parallax-float font-normal">
              BEFORE TIME BROKE<br />
              THEY WERE ONE
            </h1>
            
            {/* Main text layer with cosmic breathe */}
            <h1 className="relative text-white/60 font-garamond text-[1rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] tracking-[0.25em] uppercase leading-[1.4] animate-cosmic-breathe font-normal">
              BEFORE TIME BROKE<br />
              THEY WERE ONE
            </h1>
            
            {/* Top highlight layer with reverse parallax */}
            <h1 className="absolute inset-0 text-white/80 font-garamond text-[1rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] tracking-[0.25em] uppercase leading-[1.4] animate-parallax-float-reverse font-normal opacity-30">
              BEFORE TIME BROKE<br />
              THEY WERE ONE
            </h1>
          </div>
        </div>
      </div>

      {/* Cinematic Text Buttons */}
      {showButtons && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div 
            className="flex flex-col md:flex-row gap-4 md:gap-16 items-center transition-all duration-[1500ms] ease-out animate-fade-in-slow"
          >
            <button
              onClick={handleTeaserClick}
              className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out animate-parallax-float"
            >
              <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase font-garamond">
                TEASER
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
            </button>
            
            <button
              onClick={handlePrologueClick}
              className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out animate-parallax-float-reverse"
            >
              <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase font-garamond">
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
              <h2 className="text-2xl font-light text-white/90 tracking-wide font-garamond">PROLOGUE</h2>
              <button
                onClick={() => setShowPrologue(false)}
                className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                In a world where the extraordinary lies hidden amidst the ordinary, six powerful individuals, known as the Vertex, are seemingly chosen by fate to wield the essence of six mighty elements: Air, Earth, Water, Fire, Light, and Darkness. These enigmatic bearers, collectively called the Hexagon, are scattered across the globe, each a solitary figure shrouded in mystery. Their identities remain unknown, even to each other, connected only by the ethereal thread of thought that allows them to communicate silently.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                Each Vertex leads a life cloaked in the mundane, yet their hearts carry the burden of immense power. When the six form a perfect hexagon, their individual strengths merge, granting them a god-like consciousness. This unity bestows upon them unparalleled powers: immense strength, mastery over minds, and some forbidden arts like soul splitting, time reversal. Their collective presence becomes a force of nature, a hidden shield that has safeguarded the world from countless calamities. Though the ordinary folk remain blissfully unaware of their existence, these six guardians have, through the ages, stood as silent sentinels.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                But a dark prophecy looms on the horizon—one that foretells the shattering of the Hexagon and a sacrifice that must be made to maintain the cosmic balance of powers.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light font-garamond">
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