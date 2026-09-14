import React, { useState } from 'react';
import { 
  Sparkles, 
  Scissors, 
  Shirt, 
  Footprints, 
  Crown, 
  DollarSign, 
  X, 
  Check, 
  Eye,
  ShoppingBag
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { WARDROBE_ITEMS } from '../../data/outfits';
import { EVE_ERAS } from '../../data/characters';
import { soundEngine } from '../../state/useAudioStore';
import type { OutfitCategory, WardrobeItem } from '../../types/outfits';
import { getEveOutfitVisual } from '../../utils/outfitVisuals';
import confetti from 'canvas-confetti';

export const VanityMirror: React.FC = () => {
  const { state, setViewMode, equipItem, unlockOutfit, modifyStats } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<OutfitCategory>('top');

  const currentEra = EVE_ERAS[state.transitionEra];
  const visual = getEveOutfitVisual(state.equippedOutfit, state.transitionEra);
  const itemsForCategory = WARDROBE_ITEMS.filter((i) => i.category === selectedCategory);

  const handleEquip = (item: WardrobeItem) => {
    soundEngine.playSparkle();
    if (item.category === 'fullbody') {
      equipItem('fullbody', item.id);
      equipItem('top' as any, '');
    } else if (item.category === 'top') {
      equipItem('top', item.id);
      equipItem('fullbody' as any, '');
    } else {
      equipItem(item.category as any, item.id);
    }
    modifyStats({
      glamRating: item.glamBonus,
      comfortRating: item.comfortBonus,
    });
  };

  const handleBuy = (item: WardrobeItem) => {
    if (state.stats.cash < item.cost) {
      soundEngine.playTension();
      return;
    }
    soundEngine.playVictory();
    confetti({ particleCount: 30, spread: 45 });
    modifyStats({ cash: -item.cost });
    unlockOutfit(item.id);
    handleEquip(item);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 md:p-8 animate-fadeIn overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-400" /> Eve's Vanity & Dressing Room
          </h1>
          <p className="text-xs text-slate-400">
            Era {state.transitionEra}: {currentEra.title} • Month {state.stats.hrtMonth} on E
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full font-bold text-sm">
            <DollarSign className="w-4 h-4" /> {state.stats.cash}
          </div>

          <button
            onClick={() => setViewMode('novel')}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
            title="Return to Story"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Wardrobe Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Left: Interactive Character Reflection & Current Look */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-pink-500/30 p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
          {/* Dynamic Background Aura */}
          <div className={`absolute inset-0 bg-gradient-to-t ${visual.themeAura} rounded-3xl filter blur-2xl opacity-70 pointer-events-none`} />

          <div className="w-full flex items-center justify-between z-10">
            <div className="bg-pink-950/80 border border-pink-500/40 px-3 py-1 rounded-full text-xs text-pink-300 font-medium">
              Mirror Reflection
            </div>
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs text-pink-400 font-bold">
              {visual.styleTag}
            </div>
          </div>

          {/* Sprite Frame */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-h-[50vh] mt-4">
            <img 
              key={visual.spriteUrl}
              src={visual.spriteUrl} 
              alt="Eve Reflection"
              className="max-h-[46vh] object-contain drop-shadow-[0_15px_30px_rgba(236,72,153,0.4)] filter contrast-105 transition-all duration-500 animate-fadeIn"
            />
            {/* Eve's Outfit Reflection Thought */}
            <p className="text-[11px] text-pink-200/90 italic text-center px-4 mt-2 max-w-xs drop-shadow">
              {visual.eveThought}
            </p>
          </div>

          {/* Current Stats Summary */}
          <div className="w-full bg-slate-900/90 z-10 rounded-2xl p-4 border border-slate-800 grid grid-cols-3 gap-3 text-center text-xs mt-2">
            <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-pink-400 font-bold uppercase block">Glam Rating</span>
              <strong className="text-base text-white">{state.stats.glamRating}</strong>
            </div>
            <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-purple-400 font-bold uppercase block">Comfort</span>
              <strong className="text-base text-white">{state.stats.comfortRating}</strong>
            </div>
            <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Shield</span>
              <strong className="text-base text-white">{100 - state.stats.dysphoria}%</strong>
            </div>
          </div>
        </div>

        {/* Right: Wardrobe Catalog & Customization */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-900/60 rounded-3xl border border-slate-800 p-6 overflow-hidden">
          {/* Category Tabs */}
          <div className="flex gap-2 pb-4 overflow-x-auto border-b border-slate-800">
            {[
              { id: 'top', label: 'Tops & Outfits', icon: Shirt },
              { id: 'bottom', label: 'Bottoms & Skirts', icon: Sparkles },
              { id: 'hair', label: 'Hairstyles', icon: Scissors },
              { id: 'makeup', label: 'Makeup & Lips', icon: Eye },
              { id: 'shoes', label: 'Shoes', icon: Footprints },
              { id: 'accessory', label: 'Accessories', icon: Crown },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as OutfitCategory)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {itemsForCategory.map((item) => {
              const isUnlocked = item.unlocked || state.unlockedOutfits.includes(item.id);
              const isEquipped = Object.values(state.equippedOutfit).includes(item.id);
              const canAfford = state.stats.cash >= item.cost;
              const eraLocked = item.minEra > state.transitionEra;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-pink-950/40 border-pink-500 shadow-lg ring-1 ring-pink-500/50'
                      : isUnlocked
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: item.previewColor }}
                        />
                        <h3 className="font-bold text-sm text-white">{item.name}</h3>
                      </div>
                      {isEquipped && (
                        <span className="text-[10px] bg-pink-500 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Equipped
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">{item.description}</p>
                    <p className="text-[11px] text-pink-300 italic mb-3">"{item.flavorText}"</p>

                    {/* Stat Boosts */}
                    <div className="flex flex-wrap gap-2 text-[10px] font-semibold mb-3">
                      {item.glamBonus !== 0 && (
                        <span className={`px-2 py-0.5 rounded ${item.glamBonus > 0 ? 'bg-pink-950/80 text-pink-300' : 'bg-red-950 text-red-300'}`}>
                          Glam {item.glamBonus > 0 ? `+${item.glamBonus}` : item.glamBonus}
                        </span>
                      )}
                      {item.comfortBonus > 0 && (
                        <span className="bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded">
                          Comfort +{item.comfortBonus}
                        </span>
                      )}
                      {item.dysphoriaShieldBonus > 0 && (
                        <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded">
                          Shield +{item.dysphoriaShieldBonus}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Button Action */}
                  <div>
                    {eraLocked ? (
                      <div className="text-center py-2 text-xs text-red-400 font-mono bg-red-950/30 rounded-xl border border-red-500/20">
                        Unlocks in Era {item.minEra}
                      </div>
                    ) : isEquipped ? (
                      <button 
                        disabled
                        className="w-full py-2 bg-pink-900/40 text-pink-300 text-xs font-bold rounded-xl cursor-default"
                      >
                        Currently Wearing
                      </button>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => handleEquip(item)}
                        className="w-full py-2 bg-slate-800 hover:bg-pink-600 text-white text-xs font-bold rounded-xl transition shadow"
                      >
                        Wear Outfit
                      </button>
                    ) : (
                      <button
                        disabled={!canAfford}
                        onClick={() => handleBuy(item)}
                        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                          canAfford 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Purchase for ${item.cost}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
