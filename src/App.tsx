import React, { useState, useRef, useEffect } from 'react';
import VerticesPage from './components/VerticesPage';

function App() {
  const [showPrologue, setShowPrologue] = useState(false);
  const [showVertices, setShowVertices] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showText, setShowText] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoLoad = () => {
      setVideoLoaded(true);
      video.muted = true; // Ensure muted for autoplay
      video.play().catch(console.error);
    };

    const handleVideoError = () => {
      console.error('Video failed to load');
    };

    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('error', handleVideoError);
    
    // Force load
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('error', handleVideoError);
    };
  }, []);

  // Handle audio loading
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioLoad = () => {
      setAudioLoaded(true);
      audio.volume = 0.3;
      audio.muted = isMuted;
    };

    const handleAudioError = () => {
      console.error('Audio failed to load');
    };

    audio.addEventListener('loadeddata', handleAudioLoad);
    audio.addEventListener('error', handleAudioError);
    
    // Force load
    audio.load();

    return () => {
      audio.removeEventListener('loadeddata', handleAudioLoad);
      audio.removeEventListener('error', handleAudioError);
    };
  }, [isMuted]);

  // Handle mute state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    if (audioRef.current && audioLoaded) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [isMuted, audioLoaded]);

  useEffect(() => {
    const textSequence = async () => {
      // Wait for video to load before starting sequence
      if (!videoLoaded) return;
      
      // Delay initial appearance by 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show text with fade-in over 1.5 seconds
      setShowText(true);
      
      // Wait for text to fully appear, then show buttons
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowButtons(true);
    };

    textSequence();
  }, [videoLoaded]);

  const handleTeaserClick = () => {
    window.open('https://www.instagram.com/enterthehexagon?igsh=MWx6bG5xcWFsZW05dQ==', '_blank');
  };

  const handlePrologueClick = () => {
    setShowPrologue(true);
  };

  const handleVerticesClick = () => {
    setShowVertices(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle any user interaction to enable audio
  const handleUserInteraction = () => {
    if (isMuted && audioRef.current && audioLoaded) {
      setIsMuted(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      onClick={handleUserInteraction}
    >
      {/* Vertices Page */}
      {showVertices && (
        <VerticesPage onClose={() => setShowVertices(false)} />
      )}

      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/dark-intro.mp3" type="audio/mpeg" />
        <source src="/dark-intro.mp3" type="audio/wav" />
      </audio>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
          }}
        >
          <source src="/Hexagon-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        </video>
      </div>

      {/* Loading indicator while video loads - Changed to black background */}
      {!videoLoaded && (
        <div className="absolute inset-0 z-5 bg-black flex items-center justify-center">
          <div className="text-white/70 font-garamond text-sm tracking-[0.2em] uppercase animate-pulse">
            Loading...
          </div>
        </div>
      )}

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

      {/* Main Floating Text */}
      <div className="absolute inset-0 z-10 flex items-start justify-center pt-[15vh]">
        <div 
          className={`text-center transition-all duration-[1500ms] ease-out ${
            showText 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-5'
          }`}
        >
          <h1 className="text-white/70 font-garamond text-[0.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] xl:text-[1.8rem] tracking-[0.35em] uppercase leading-[1.6] font-light animate-soft-float">
            BEFORE TIME BROKE<br />
            THEY WERE ONE
          </h1>
        </div>
      </div>

      {/* Cinematic Text Buttons */}
      {showButtons && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div 
            className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 items-center transition-all duration-[1500ms] ease-out animate-fade-in-slow"
          >
            <button
              onClick={handleTeaserClick}
              className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out"
            >
              <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase font-garamond">
                TEASER
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
            </button>
            
            <button
              onClick={handleVerticesClick}
              className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out"
            >
              <span className="text-sm md:text-base font-light tracking-[0.2em] uppercase font-garamond">
                THE VERTICES
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-500 ease-out group-hover:shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
            </button>
            
            <button
              onClick={handlePrologueClick}
              className="group relative text-white/90 hover:text-white transition-all duration-300 ease-out"
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
                In a world where the extraordinary dwells unseen among the mundane, six chosen bearers walk unnoticed. They call themselves the Vertex, keepers of Air, Earth, Water, Fire, Light, and Darkness, the six elements that shape creation.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                The Light Vertex, blessed by the sun, stands as the leader of the Hexagon, a beacon of purity and order.<br />
                The Darkness Vertex, touched by the moon, commands from behind the shadows.<br />
                The Fire Vertex carries the flame of destruction and rebirth.<br />
                The Water Vertex channels the pulse of oceans and tides.<br />
                The Air Vertex, born of the winds and endless skies, commands the breath of life and freedom.<br />
                The Earth Vertex draws strength from mountain and stone, embodying endurance and balance.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                These enigmatic bearers, collectively called the Hexagon, are scattered across the globe, each a solitary figure shrouded in mystery. Their identities remain unknown, even to each other, connected only by the ethereal thread of thought that allows them to communicate silently.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                Each Vertex dwells in obscurity, their days indistinguishable from any other soul's, save for the weight that settles upon their shoulders when dusk falls. In solitude, they bear what mortals were never meant to carry. Yet there exists a moment, rare as eclipses, when all six align. In that convergence, something transcendent awakens—a consciousness vast and terrible, wielding powers that reshape the very fabric of existence. Time bends. Minds lay bare. The boundary between life and death dissolves entirely. In those fleeting instances, they are not merely guardians but architects of fate itself, the hidden hand that has turned aside cataclysms the world will never know to fear.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light mb-4 font-garamond">
                Billions walk the earth, unaware of the six who guard them.
              </p>
              
              <p className="text-white/80 leading-relaxed text-base font-light font-garamond">
                But power, even divine, demands a price. And Hikaru, the Light Vertex, had begun to suspect they had not yet paid it. The old prophecies spoke of shattering. They spoke of sacrifice. Yet the question that tormented Hikaru most was this: What if their very existence feeds the darkness they've sworn to fight?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;