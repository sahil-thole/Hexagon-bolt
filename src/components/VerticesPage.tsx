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
    glowColor: 'shadow-[0_0_30px_rgba(255,215,0,0.6)]',
    particleColor: 'bg-yellow-400',
    image: '/Hikaru_chr_profile.jpg'
  },
  {
    id: 'kosei',
    name: 'Kosei',
    title: 'UMBRIX - Darkness Vertex',
    element: 'Darkness',
    age: 32,
    powerSource: 'Lunar Eclipse',
    techniques: ['Shadow Bind', 'Void Step', 'Dark Matter', 'Eclipse Strike'],
    signatureMove: 'Eternal Darkness',
    glowColor: 'shadow-[0_0_30px_rgba(139,69,255,0.6)]',
    particleColor: 'bg-purple-500',
    image: '/23.png'
  },
  {
    id: 'pyraxis',
    name: 'Pyraxis',
    title: 'IGNITUS - Fire Vertex',
    element: 'Fire',
    age: 26,
    powerSource: 'Volcanic Core',
    techniques: ['Flame Tornado', 'Molten Armor', 'Phoenix Rise', 'Inferno Blast'],
    signatureMove: 'Solar Flare Devastation',
    glowColor: 'shadow-[0_0_30px_rgba(255,69,0,0.6)]',
    particleColor: 'bg-red-500',
    image: '/Pyraxis_char_pro.jpeg'
  },
  {
    id: 'zephyra',
    name: 'Zephyra',
    title: 'AERIUS - Air Vertex',
    element: 'Air',
    age: 24,
    powerSource: 'Stratospheric Winds',
    techniques: ['Wind Blade', 'Cyclone Shield', 'Atmospheric Pressure', 'Gale Force'],
    signatureMove: 'Tempest Dominion',
    glowColor: 'shadow-[0_0_30px_rgba(226,232,240,0.6)]',
    particleColor: 'bg-slate-300',
    image: '/Zephyra_char_pro.jpeg'
  },
  {
    id: 'aquara',
    name: 'Aquara',
    title: 'HYDRIX - Water Vertex',
    element: 'Water',
    age: 27,
    powerSource: 'Oceanic Depths',
    techniques: ['Tidal Wave', 'Ice Crystallization', 'Mist Veil', 'Hydro Cannon'],
    signatureMove: 'Tsunami Genesis',
    glowColor: 'shadow-[0_0_30px_rgba(6,182,212,0.6)]',
    particleColor: 'bg-cyan-400'
  },
  {
    id: 'terraga',
    name: 'Terraga',
    title: 'GEODEX - Earth Vertex',
    element: 'Earth',
    age: 35,
    powerSource: 'Tectonic Core',
    techniques: ['Stone Barrier', 'Earthquake Pulse', 'Crystal Spear', 'Mountain Rise'],
    signatureMove: 'Continental Shift',
    glowColor: 'shadow-[0_0_30px_rgba(34,197,94,0.6)]',
    particleColor: 'bg-green-500'
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
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-y-auto">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
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
        <h1 className="text-white/70 font-garamond text-3xl md:text-5xl lg:text-6xl tracking-[0.35em] uppercase leading-[1.6] font-light animate-soft-float mb-4">
          THE HEXAGON
        </h1>
        <p className="text-white/60 font-garamond text-lg md:text-xl tracking-[0.2em] uppercase font-light">
          Six Guardians. Six Elements. One Destiny.
        </p>
      </div>

      {/* Character Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCardClick(character)}
              className="group relative cursor-pointer transition-all duration-500 ease-out hover:scale-105 transform"
            >
              {/* Card wrapper with border */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-500">
                {/* Character Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                  {character.image ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`w-16 h-16 ${character.particleColor} rounded-full opacity-60 animate-pulse`} />
                  )}
                </div>
                {/* Hover particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 ${character.particleColor} rounded-full animate-float opacity-60`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Character Modal */}
      {selectedCharacter && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
          onClick={handleCloseExpanded}
        >
          <div
            className={`relative max-w-2xl w-full my-8 bg-black/70 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 text-white animate-fade-in-slow ${selectedCharacter.glowColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-light text-white/90 tracking-wide font-garamond">
                {selectedCharacter.title}
              </h2>
              <button
                onClick={handleCloseExpanded}
                className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Character Image - Larger */}
            <div className="relative mb-8 overflow-hidden rounded-xl border-2 border-white/20">
              <div className="aspect-[4/5] bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center">
                {selectedCharacter.image ? (
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className={`w-24 h-24 ${selectedCharacter.particleColor} rounded-full opacity-60 animate-pulse`} />
                )}
              </div>
              {/* Animated particles */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-3 h-3 ${selectedCharacter.particleColor} rounded-full animate-float opacity-40`}
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${4 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Character Details */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-3xl font-garamond font-light text-white mb-2">
                  {selectedCharacter.name}
                </h3>
                <p className="text-white/70 font-garamond text-lg tracking-wide">
                  Age: {selectedCharacter.age} | Element: {selectedCharacter.element}
                </p>
                <p className="text-white/60 font-garamond text-base tracking-wide mt-2">
                  Power Source: {selectedCharacter.powerSource}
                </p>
              </div>

              {/* Techniques */}
              <div>
                <h4 className="text-white/90 font-garamond text-xl font-medium mb-3 tracking-wide">
                  Techniques
                </h4>
                <ul className="space-y-2">
                  {selectedCharacter.techniques.map((technique, index) => (
                    <li key={index} className="text-white/70 font-garamond flex items-center">
                      <span className={`w-2 h-2 ${selectedCharacter.particleColor} rounded-full mr-3 animate-pulse`} />
                      {technique}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signature Move */}
              <div className="text-center pt-4 border-t border-white/20">
                <h4 className="text-white/90 font-garamond text-lg font-medium mb-2 tracking-wide">
                  Signature Move
                </h4>
                <p className={`text-xl font-garamond font-light tracking-wide animate-pulse ${selectedCharacter.glowColor.includes('255,215,0') ? 'text-yellow-300' : 
                  selectedCharacter.glowColor.includes('139,69,255') ? 'text-purple-300' :
                  selectedCharacter.glowColor.includes('255,69,0') ? 'text-red-300' :
                  selectedCharacter.glowColor.includes('226,232,240') ? 'text-slate-300' :
                  selectedCharacter.glowColor.includes('6,182,212') ? 'text-cyan-300' : 'text-green-300'}`}>
                  {selectedCharacter.signatureMove}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticesPage;