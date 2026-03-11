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
  borderColor: string;
  elementColor: string;
}

const characters: Character[] = [
  {
    id: 'hikaru',
    name: 'Hikaru',
    title: 'LUMINEX - Light Vertex',
    element: 'Light',
    age: 28,
    powerSource: 'Solar Convergence',
    techniques: ['Radiant Burst', 'Photon Shield', 'Luminous Healing', 'Prism Strike'],
    signatureMove: 'Divine Illumination',
    glowColor: 'shadow-[0_0_40px_rgba(255,215,0,0.5)]',
    particleColor: 'bg-yellow-400',
    borderColor: 'border-yellow-400/30',
    elementColor: 'text-yellow-300'
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
    glowColor: 'shadow-[0_0_40px_rgba(139,69,255,0.5)]',
    particleColor: 'bg-purple-500',
    borderColor: 'border-purple-500/30',
    elementColor: 'text-purple-300'
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
    glowColor: 'shadow-[0_0_40px_rgba(255,69,0,0.5)]',
    particleColor: 'bg-red-500',
    borderColor: 'border-red-500/30',
    elementColor: 'text-red-300'
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
    glowColor: 'shadow-[0_0_40px_rgba(226,232,240,0.4)]',
    particleColor: 'bg-slate-300',
    borderColor: 'border-slate-300/30',
    elementColor: 'text-slate-300'
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
    glowColor: 'shadow-[0_0_40px_rgba(6,182,212,0.5)]',
    particleColor: 'bg-cyan-400',
    borderColor: 'border-cyan-400/30',
    elementColor: 'text-cyan-300'
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
    glowColor: 'shadow-[0_0_40px_rgba(34,197,94,0.5)]',
    particleColor: 'bg-green-500',
    borderColor: 'border-green-500/30',
    elementColor: 'text-green-300'
  }
];

interface VerticesPageProps {
  onClose: () => void;
}

const VerticesPage: React.FC<VerticesPageProps> = ({ onClose }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div
      className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white animate-fade-in-slow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-light text-white/90 tracking-[0.25em] uppercase font-garamond">
            The Vertices
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <p className="text-white/40 font-garamond text-sm tracking-[0.2em] uppercase font-light mb-8">
          Six guardians. Six elements. One convergence.
        </p>

        {/* Character Grid */}
        <div className="grid grid-cols-3 gap-4">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => setSelectedCharacter(character)}
              className={`group relative bg-black/50 border ${character.borderColor} rounded-xl cursor-pointer transition-all duration-500 ease-out hover:${character.glowColor} hover:scale-[1.03] hover:border-white/30 overflow-hidden aspect-[3/4]`}
            >
              {/* Elemental glow core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-10 h-10 ${character.particleColor} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md`}
                />
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 ${character.particleColor} rounded-full animate-twinkle opacity-50`}
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              {/* Element label — fades in on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className={`font-garamond text-xs tracking-[0.3em] uppercase ${character.elementColor} font-light`}>
                  {character.element}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Character Modal */}
      {selectedCharacter && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            className={`max-w-md w-full max-h-[85vh] overflow-y-auto bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white animate-fade-in-slow ${selectedCharacter.glowColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className={`font-garamond text-xs tracking-[0.35em] uppercase font-light mb-1 ${selectedCharacter.elementColor}`}>
                  {selectedCharacter.element} Vertex
                </p>
                <h2 className="text-3xl font-light text-white/90 tracking-wide font-garamond">
                  {selectedCharacter.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Elemental orb */}
            <div className="relative mb-8 flex items-center justify-center h-32">
              <div className={`w-20 h-20 ${selectedCharacter.particleColor} rounded-full opacity-30 blur-xl animate-pulse`} />
              <div className={`absolute w-8 h-8 ${selectedCharacter.particleColor} rounded-full opacity-60 animate-pulse`} />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1.5 h-1.5 ${selectedCharacter.particleColor} rounded-full animate-float opacity-50`}
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${4 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="text-center border-b border-white/10 pb-5">
                <p className="text-white/50 font-garamond text-sm tracking-wide">
                  Age {selectedCharacter.age} &nbsp;·&nbsp; {selectedCharacter.powerSource}
                </p>
              </div>

              <div>
                <h4 className="text-white/60 font-garamond text-xs tracking-[0.3em] uppercase mb-3">
                  Techniques
                </h4>
                <ul className="space-y-2">
                  {selectedCharacter.techniques.map((technique, index) => (
                    <li key={index} className="text-white/70 font-garamond text-sm flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 ${selectedCharacter.particleColor} rounded-full flex-shrink-0 opacity-80`} />
                      {technique}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center pt-4 border-t border-white/10">
                <h4 className="text-white/50 font-garamond text-xs tracking-[0.3em] uppercase mb-3">
                  Signature
                </h4>
                <p className={`text-lg font-garamond font-light tracking-wide animate-soft-float ${selectedCharacter.elementColor}`}>
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
