import React, { useState } from 'react';
import { Camera, Lock, Sparkles, Heart, Eye, X } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';

interface PhotoMemory {
  id: string;
  title: string;
  subtitle: string;
  era: number;
  month: number;
  location: string;
  imageUrl: string;
  caption: string;
  hint: string;
}

const MEMORIES: PhotoMemory[] = [
  {
    id: 'cg_prologue_mirror',
    title: 'The First Wing',
    subtitle: 'Vanity Debut',
    era: 1,
    month: 1,
    location: 'Eve’s Bedroom',
    imageUrl: '/assets/backgrounds/eve_room.png',
    caption: '“Hands shaking with cheap liquid eyeliner. Slightly crooked, but from two feet away? It looked like me. A real girl.”',
    hint: 'Complete the prologue makeover.',
  },
  {
    id: 'cg_liam_cafe',
    title: 'Coffee & Jasmine',
    subtitle: 'First Date with Liam',
    era: 1,
    month: 3,
    location: 'The Sunlit Roast Cafe',
    imageUrl: '/assets/backgrounds/cafe.png',
    caption: '“Liam looked at me like I was the only person in the room. He held my hand as Buster chased autumn leaves in the park.”',
    hint: 'Go on your first date with Liam in Era 1.',
  },
  {
    id: 'cg_chloe_punk',
    title: 'Riot Bass & Eyeliner',
    subtitle: 'Underground with Chloe',
    era: 2,
    month: 6,
    location: 'The Velvet Underpass',
    imageUrl: '/assets/backgrounds/punk_club.png',
    caption: '“Chloe handed me her bass pick and winked from the stage. T4T magic, loud drums, and zero apologies for existing.”',
    hint: 'Experience the punk club concert in Era 2.',
  },
  {
    id: 'cg_julian_museum',
    title: 'Constellations & Code',
    subtitle: 'Night with Julian',
    era: 3,
    month: 14,
    location: 'Starlight Observatory Lounge',
    imageUrl: '/assets/characters/julian.png',
    caption: '“Gentle hearts always win. Julian showed me that someone can fall in love with your mind, your dreams, and your laugh.”',
    hint: 'Visit Julian’s studio and observatory in Era 3.',
  },
  {
    id: 'cg_tara_sisterhood',
    title: 'Sisterhood Armor',
    subtitle: 'Thrift Quest with Tara',
    era: 1,
    month: 2,
    location: 'Vintage Thrift Boutique',
    imageUrl: '/assets/characters/tara.png',
    caption: '“Tara standing guard outside the dressing room while I put on my first sundress. Best friends save lives.”',
    hint: 'Explore thrift fashion with Tara.',
  },
  {
    id: 'cg_eve_radiant',
    title: 'Queen of Her Universe',
    subtitle: 'Two Years Radiant',
    era: 4,
    month: 24,
    location: 'The Luminary Rooftop',
    imageUrl: '/assets/backgrounds/rooftop.png',
    caption: '“Month 24. No longer hiding. No longer asking for permission. Just Eve—fierce, beautiful, and completely free.”',
    hint: 'Reach the Chapter 4 Climax.',
  },
  {
    id: 'cg_chloe_intimacy',
    title: 'Velvet Riot & Neon Sheets',
    subtitle: 'After-Hours with Chloe (18+)',
    era: 2,
    month: 6,
    location: 'Chloe’s Loft Studio',
    imageUrl: '/assets/cg/cg_chloe_intimacy.png',
    caption: '“I’m trans too, Eve. Every single inch of you is a woman, and I’m going to worship every piece of you tonight.”',
    hint: 'Unlock Chloe’s intimate encounter in After-Dark.',
  },
  {
    id: 'cg_liam_intimacy',
    title: 'Hearthside Blossom & Cedar Embers',
    subtitle: 'Fireside Intimacy with Liam (18+)',
    era: 1,
    month: 3,
    location: 'Liam’s Rustic Cottage',
    imageUrl: '/assets/cg/cg_liam_intimacy.png',
    caption: '“Eve... you’re trembling. Let me hold you. There is nowhere else on earth I’d rather be than right here with you.”',
    hint: 'Unlock Liam’s intimate encounter in After-Dark.',
  },
  {
    id: 'cg_julian_intimacy',
    title: 'Twilight Starlight & Horizons',
    subtitle: 'Cyberpunk Chemistry with Julian (18+)',
    era: 3,
    month: 14,
    location: 'Julian’s Highrise Loft Bed',
    imageUrl: '/assets/cg/cg_julian_intimacy.png',
    caption: '“Every line of code, every game universe I ever built... none of it compares to holding you in my arms tonight.”',
    hint: 'Unlock Julian’s intimate encounter in After-Dark.',
  },
  {
    id: 'cg_maya_intimacy',
    title: 'Candlelit Silk & Sapphic Adoration',
    subtitle: 'Velvet Devotion with Maya (18+)',
    era: 2,
    month: 8,
    location: 'Maya’s Bohemian Studio',
    imageUrl: '/assets/cg/cg_maya_intimacy.png',
    caption: '“Women are the only true divinity in this cold world, Eve. And you have fought so hard for your joy. Let me adore your temple.”',
    hint: 'Unlock Maya’s intimate encounter in After-Dark.',
  },
  {
    id: 'cg_jesse_intimacy',
    title: 'Chrome & Thorn: Inked Collarbone',
    subtitle: 'Workshop Sanctuary with Jesse (18+)',
    era: 2,
    month: 10,
    location: 'Jesse’s Workshop Loft',
    imageUrl: '/assets/cg/cg_jesse_intimacy.png',
    caption: '“Any time the world gets too loud or cruel, Eve... you ride straight here. You will always have a sanctuary with me.”',
    hint: 'Unlock Jesse’s intimate encounter in After-Dark.',
  },
  {
    id: 'cg_eve_euphoria',
    title: 'The Awakening: Mirror of Euphoria',
    subtitle: 'Eve’s Private Discovery (18+)',
    era: 1,
    month: 4,
    location: 'Eve’s Apartment Sanctuary',
    imageUrl: '/assets/cg/cg_eve_euphoria.png',
    caption: '“For the first time in twenty-three years, my body does not feel like an alien vessel or a cage. It feels like home.”',
    hint: 'Embrace physical euphoria in Eve’s Apartment.',
  },
];

export const PhotoAlbumApp: React.FC = () => {
  const { state } = useGameStore();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Photos are unlocked if in state.unlockedCGs or automatically as player progresses eras
  const isUnlocked = (photo: PhotoMemory) => {
    return state.unlockedCGs.includes(photo.id) || state.transitionEra >= photo.era;
  };

  const unlockedCount = MEMORIES.filter(isUnlocked).length;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-4 overflow-hidden">
      {/* App Header */}
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300 flex items-center gap-2">
            <Camera className="w-5 h-5 text-pink-400" /> HerSpace Memories
          </h2>
          <p className="text-[10px] text-slate-400">Captured snapshots & Polaroids</p>
        </div>

        <span className="text-xs bg-pink-950/60 border border-pink-500/40 text-pink-300 px-2.5 py-1 rounded-full font-mono font-bold">
          {unlockedCount} / {MEMORIES.length} Snaps
        </span>
      </div>

      {/* Grid of Polaroid Snaps */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        <div className="grid grid-cols-2 gap-3">
          {MEMORIES.map((photo) => {
            const unlocked = isUnlocked(photo);

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (unlocked) {
                    soundEngine.playSparkle();
                    setSelectedPhoto(photo);
                  } else {
                    soundEngine.playTension();
                  }
                }}
                className={`group relative rounded-2xl overflow-hidden border p-2.5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  unlocked
                    ? 'bg-slate-900/90 border-pink-500/30 hover:border-pink-400 hover:scale-105 shadow-xl'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                {/* Photo Window */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center mb-2">
                  {unlocked ? (
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-600 gap-1">
                      <Lock className="w-6 h-6" />
                      <span className="text-[9px] font-mono">Locked Snap</span>
                    </div>
                  )}

                  {unlocked && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] text-pink-300 font-bold flex items-center gap-1">
                        <Eye className="w-3 h-3" /> View Polaroid
                      </span>
                    </div>
                  )}
                </div>

                {/* Polaroid Bottom Caption */}
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-pink-400 font-semibold mb-0.5">
                    <span>Era {photo.era} • M{photo.month}</span>
                    <Heart className={`w-3 h-3 ${unlocked ? 'fill-pink-500 text-pink-500' : 'text-slate-700'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 truncate">{photo.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{photo.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Inspector Modal */}
      {selectedPhoto && (
        <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-4 animate-fadeIn justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="font-bold text-xs text-slate-200">{selectedPhoto.title}</span>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-3">
            {/* Polaroid Frame */}
            <div className="w-full max-w-[280px] bg-slate-100 p-3 rounded-2xl shadow-2xl text-slate-900">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-3 relative">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1 pb-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1">
                  <span>{selectedPhoto.location}</span>
                  <span>Month {selectedPhoto.month}</span>
                </div>
                <p className="text-xs text-slate-800 font-serif italic leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedPhoto(null)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
          >
            Put Photo Back in Album
          </button>
        </div>
      )}
    </div>
  );
};
