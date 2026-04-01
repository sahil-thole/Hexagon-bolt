import React, { useState } from 'react';

interface Character {
  id: string;
  name: string;
  title: string;
  element: string;
  age: number;
  powerSource: string;
  techniques: string[];
  signatureMove: string;
  glowColor: string;
  particleColor: string;
  image?: string;
}

const characters: Character[] = [
  {
    id: 'hikaru',
    name: 'Luminex',
    title: 'LIGHT VERTEX',
    element: 'Light',
    age: 22,
    powerSource: 'Sun',
    techniques: ['Seiko (Radiant orb)', 'Hakai (Destructive Light)', 'Komyo Saisei (Radiant Restoration)', 'Hikari no Kusari (Heavenly chains of Light)'],
    signatureMove: 'Hikari no Fūin: Eien no Tobira (Light sealing - Gate of eternal light)',
    glowColor: 'rgba(255,215,0,0.15)',
    particleColor: 'bg-yellow-400',
    image: '/Hikaru_chr_profile.jpg'
  },
  {
    id: 'kosei',
    name: 'Kosei',
    title: 'DARKNESS VERTEX',
    element: 'Darkness',
    age: 32,
    powerSource: 'Lunar Eclipse',
    techniques: ['Shadow Bind', 'Void Step', 'Dark Matter', 'Eclipse Strike'],
    signatureMove: 'Eternal Darkness',
    glowColor: 'rgba(139,69,255,0.15)',
    particleColor: 'bg-purple-500',
    image: '/23.png'
  },
  {
    id: 'pyraxis',
    name: 'Pyraxis',
    title: 'FIRE VERTEX',
    element: 'Fire',
    age: 26,
    powerSource: 'Volcanic Core',
    techniques: ['Flame Tornado', 'Molten Armor', 'Phoenix Rise', 'Inferno Blast'],
    signatureMove: 'Solar Flare Devastation',
    glowColor: 'rgba(255,100,50,0.15)',
    particleColor: 'bg-orange-500',
    image: '/Pyraxis_char_pro.jpeg'
  },
  {
    id: 'zephyra',
    name: 'Zephyra',
    title: 'AIR VERTEX',
    element: 'Air',
    age: 24,
    powerSource: 'Stratospheric Winds',
    techniques: ['Wind Blade', 'Cyclone Shield', 'Atmospheric Pressure', 'Gale Force'],
    signatureMove: 'Tempest Dominion',
    glowColor: 'rgba(6,182,212,0.15)',
    particleColor: 'bg-cyan-400',
    image: '/Zephyra_char_pro.jpeg'
  },
  {
    id: 'aquara',
    name: 'Aquara',
    title: 'WATER VERTEX',
    element: 'Water',
    age: 27,
    powerSource: 'Oceanic Depths',
    techniques: ['Tidal Wave', 'Ice Crystallization', 'Mist Veil', 'Hydro Cannon'],
    signatureMove: 'Tsunami Genesis',
    glowColor: 'rgba(59,130,246,0.15)',
    particleColor: 'bg-blue-400',
    image: '/Aquara_char_pro.jpeg'
  },
  {
    id: 'terraga',
    name: 'Terraga',
    title: 'EARTH VERTEX',
    element: 'Earth',
    age: 35,
    powerSource: 'Tectonic Core',
    techniques: ['Stone Barrier', 'Earthquake Pulse', 'Crystal Spear', 'Mountain Rise'],
    signatureMove: 'Continental Shift',
    glowColor: 'rgba(34,197,94,0.15)',
    particleColor: 'bg-green-500',
    image: '/Terraga_char_rpo.jpeg'
  }
];

interface VerticesPageProps {
  onClose: () => void;
}

const VerticesPage: React.FC<VerticesPageProps> = ({ onClose }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseExpanded = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-[#050505] to-[#0a0a0a] overflow-y-auto">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px bg-white rounded-full animate-twinkle opacity-5`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/60 hover:text-white transition-colors text-3xl leading-none"
      >
        ×
      </button>

      {/* Header Section */}
      <div className="relative z-10 text-center pt-16 pb-12">
        <h1 className="text-white/70 font-garamond text-[0.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] xl:text-[1.8rem] tracking-[0.35em] uppercase leading-[1.6] font-light animate-soft-float mb-4">
          THE HEXAGON
        </h1>
        <p className="text-white/60 font-garamond text-sm md:text-base tracking-[0.2em] uppercase font-light">
          Six Guardians. Six Elements. One Destiny.
        </p>
      </div>

      {/* Character Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCardClick(character)}
              className="group relative cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1.5"
              style={{
                willChange: 'transform'
              }}
            >
              {/* Card Container */}
              <div
                className="relative overflow-hidden transition-all duration-700"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px ${character.glowColor}`,
                }}
              >
                {/* Glow overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${character.glowColor}, transparent 70%)`,
                  }}
                />

                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Dark overlay for consistency */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

                  {/* Vignette */}
                  <div className="absolute inset-0 z-10 pointer-events-none" style={{
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
                  }} />

                  {character.image ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                      style={{
                        filter: 'contrast(1.05) saturate(0.95)'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-black/80 flex items-center justify-center">
                      <div className={`w-20 h-20 ${character.particleColor} rounded-full opacity-40`} />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  {/* Character Name */}
                  <h2 className="font-garamond text-white text-3xl mb-1 font-normal">
                    {character.name}
                  </h2>

                  {/* Vertex Title */}
                  <h3 className="font-garamond text-white/70 text-xs tracking-[0.3em] uppercase font-light">
                    {character.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Character Modal */}
      {selectedCharacter && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
          onClick={handleCloseExpanded}
        >
          <div
            className="relative max-w-3xl w-full my-8 text-white animate-fade-in-slow"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05), 0 24px 64px ${selectedCharacter.glowColor}`,
            }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseExpanded}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors text-2xl leading-none z-10"
            >
              ×
            </button>

            {/* Character Image */}
            <div className="relative overflow-hidden" style={{ borderRadius: '16px' }}>
              <div className="aspect-[3/4]">
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 z-10 pointer-events-none" style={{
                  background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
                }} />

                {selectedCharacter.image ? (
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.05) saturate(0.95)' }}
                  />
                ) : (
                  <div className="w-full h-full bg-black/80 flex items-center justify-center">
                    <div className={`w-32 h-32 ${selectedCharacter.particleColor} rounded-full opacity-40`} />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VerticesPage;