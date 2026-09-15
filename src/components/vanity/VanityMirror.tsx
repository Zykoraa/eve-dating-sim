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
  ShoppingBag,
  HeartHandshake,
  Layers,
  Sparkle
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { WARDROBE_ITEMS } from '../../data/outfits';
import { EVE_ERAS } from '../../data/characters';
import { soundEngine } from '../../state/useAudioStore';
import type { OutfitCategory, WardrobeItem } from '../../types/outfits';
import { getEveOutfitVisual } from '../../utils/outfitVisuals';
import confetti from 'canvas-confetti';

export const VanityMirror: React.FC = () => {
  const { state, setViewMode, equipItem, unlockOutfit, modifyStats, triggerMinigame } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<OutfitCategory>('top');
  const [showSuitorAffinities, setShowSuitorAffinities] = useState(false);

  const currentEra = EVE_ERAS[state.transitionEra];
  const visual = getEveOutfitVisual(state.equippedOutfit, state.transitionEra);
  const itemsForCategory = WARDROBE_ITEMS.filter((i) => i.category === selectedCategory);

  const handleEquip = (item: WardrobeItem) => {
    soundEngine.playSparkle();
    if (item.category === 'fullbody') {
      equipItem('fullbody', item.id);
      equipItem('top' as any, '');
      equipItem('bottom' as any, '');
    } else if (item.category === 'top') {
      equipItem('top', item.id);
      equipItem('fullbody' as any, '');
    } else if (item.category === 'bottom') {
      equipItem('bottom', item.id);
      equipItem('fullbody' as any, '');
    } else {
      equipItem(item.category as any, item.id);
    }

    // Recalculate and update current Eve stats to reflect high-tier wardrobe bonuses
    const updatedVisual = getEveOutfitVisual(
      {
        ...state.equippedOutfit,
        [item.category]: item.id,
        ...(item.category === 'fullbody' ? { top: '', bottom: '' } : {}),
        ...(item.category === 'top' || item.category === 'bottom' ? { fullbody: '' } : {}),
      },
      state.transitionEra
    );

    modifyStats({
      glamRating: Math.max(state.stats.glamRating, Math.min(100, updatedVisual.totalGlam)),
      comfortRating: Math.max(state.stats.comfortRating, Math.min(100, updatedVisual.totalComfort)),
    });
  };

  const handleBuy = (item: WardrobeItem) => {
    if (state.stats.cash < item.cost) {
      soundEngine.playTension();
      return;
    }
    soundEngine.playVictory();
    confetti({ particleCount: 35, spread: 50 });
    modifyStats({ cash: -item.cost });
    unlockOutfit(item.id);
    handleEquip(item);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-3 md:p-6 animate-fadeIn overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-500/20 pb-3 mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-400" /> Eve's Vanity & Dressing Room
          </h1>
          <p className="text-xs text-slate-400">
            Era {state.transitionEra}: {currentEra.title} • Month {state.stats.hrtMonth} on E
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3.5 py-1 rounded-full font-bold text-xs md:text-sm shadow-inner">
            <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4" /> {state.stats.cash}
          </div>

          <button
            onClick={() => setViewMode('novel')}
            className="p-1.5 md:p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
            title="Return to Story"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Wardrobe Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left: Interactive Character Reflection & Current Look */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 rounded-3xl border border-pink-500/30 p-4 md:p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
          {/* Dynamic Background Aura */}
          <div className={`absolute inset-0 bg-gradient-to-t ${visual.themeAura} rounded-3xl filter blur-3xl opacity-80 pointer-events-none transition-all duration-700`} />

          {/* Top Mirror Header / Style Tag */}
          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 bg-pink-950/80 border border-pink-500/40 px-3 py-1 rounded-full text-xs text-pink-300 font-semibold shadow">
              <Sparkle className="w-3 h-3 text-pink-400" /> Mirror Reflection
            </div>
            <div 
              className="bg-slate-950/90 border px-3 py-1 rounded-full text-xs font-bold transition-all shadow"
              style={{ borderColor: visual.glowBorderColor, color: visual.glowBorderColor }}
            >
              {visual.styleTag}
            </div>
          </div>

          {/* Dynamic Mirror Sprite Container */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-h-[46vh] md:max-h-[50vh] w-full my-2">
            {/* Mirror Glass Glare Bar */}
            <div className="absolute inset-x-8 top-0 h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-2xl" />

            <img 
              key={visual.spriteUrl}
              src={visual.spriteUrl} 
              alt="Eve Reflection"
              className="max-h-[38vh] md:max-h-[44vh] object-contain drop-shadow-[0_20px_40px_rgba(236,72,153,0.35)] filter contrast-105 transition-all duration-500 animate-fadeIn select-none pointer-events-none"
            />

            {/* Eve's Dynamic Outfit Reflection Monologue */}
            <div className="w-full mt-2 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md border border-pink-500/20 rounded-xl shadow-lg">
              <p className="text-[11px] md:text-xs text-pink-200 italic text-center leading-relaxed">
                {visual.eveThought}
              </p>
            </div>
          </div>

          {/* Paperdoll Equipped Slots Quick-HUD */}
          <div className="w-full z-10 grid grid-cols-3 sm:grid-cols-6 gap-1.5 my-1">
            {/* Hair Slot */}
            <button
              onClick={() => setSelectedCategory('hair')}
              className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition hover:scale-105 ${
                selectedCategory === 'hair' ? 'bg-pink-600 text-white border-pink-400' : 'bg-slate-900/80 text-slate-300 border-slate-800'
              }`}
              title="Change Hairstyle"
            >
              <Scissors className="w-3 h-3 text-pink-400" />
              <span className="truncate max-w-[70px]">{visual.equippedItems.hair?.name.split(' ')[0] || 'Bangs'}</span>
            </button>

            {/* Makeup Slot */}
            <button
              onClick={() => setSelectedCategory('makeup')}
              className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition hover:scale-105 ${
                selectedCategory === 'makeup' ? 'bg-pink-600 text-white border-pink-400' : 'bg-slate-900/80 text-slate-300 border-slate-800'
              }`}
              title="Change Makeup"
            >
              <Eye className="w-3 h-3 text-rose-400" />
              <span className="truncate max-w-[70px]">{visual.equippedItems.makeup?.name.split(' ')[0] || 'Liner'}</span>
            </button>

            {/* Top / Dress Slot */}
            <button
              onClick={() => setSelectedCategory('top')}
              className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition hover:scale-105 ${
                selectedCategory === 'top' ? 'bg-pink-600 text-white border-pink-400' : 'bg-slate-900/80 text-slate-300 border-slate-800'
              }`}
              title="Change Top or Dress"
            >
              <Shirt className="w-3 h-3 text-purple-400" />
              <span className="truncate max-w-[70px]">
                {visual.equippedItems.fullbody 
                  ? visual.equippedItems.fullbody.name.split(' ')[0] 
                  : visual.equippedItems.top?.name.split(' ')[0] || 'Top'}
              </span>
            </button>

            {/* Bottom Slot */}
            <button
              onClick={() => setSelectedCategory('bottom')}
              disabled={Boolean(visual.equippedItems.fullbody)}
              className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition hover:scale-105 ${
                visual.equippedItems.fullbody 
                  ? 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
                  : selectedCategory === 'bottom' 
                  ? 'bg-pink-600 text-white border-pink-400' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-800'
              }`}
              title="Change Bottom"
            >
              <Layers className="w-3 h-3 text-indigo-400" />
              <span className="truncate max-w-[70px]">
                {visual.equippedItems.fullbody ? 'Dress' : (visual.equippedItems.bottom?.name.split(' ')[0] || 'Skirt')}
              </span>
            </button>

            {/* Shoes Slot */}
            <button
              onClick={() => setSelectedCategory('shoes')}
              className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition hover:scale-105 ${
                selectedCategory === 'shoes' ? 'bg-pink-600 text-white border-pink-400' : 'bg-slate-900/80 text-slate-300 border-slate-800'
              }`}
              title="Change Footwear"
            >
              <Footprints className="w-3 h-3 text-amber-400" />
              <span className="truncate max-w-[70px]">{visual.equippedItems.shoes?.name.split(' ')[0] || 'Shoes'}</span>
            </button>

            {/* Accessory Slot */}
            <button
              onClick={() => setSelectedCategory('accessory')}
              className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition hover:scale-105 ${
                selectedCategory === 'accessory' ? 'bg-pink-600 text-white border-pink-400' : 'bg-slate-900/80 text-slate-300 border-slate-800'
              }`}
              title="Change Accessories"
            >
              <Crown className="w-3 h-3 text-yellow-400" />
              <span className="truncate max-w-[70px]">{visual.equippedItems.accessory?.name.split(' ')[0] || 'None'}</span>
            </button>
          </div>

          {/* Current Stats Summary & Suitor Reaction Toggle */}
          <div className="w-full bg-slate-900/90 z-10 rounded-2xl p-3 border border-slate-800 mt-1">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-1.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-pink-400 font-bold uppercase block">Glam Total</span>
                <strong className="text-sm md:text-base text-white">{visual.totalGlam}</strong>
              </div>
              <div className="p-1.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-purple-400 font-bold uppercase block">Comfort</span>
                <strong className="text-sm md:text-base text-white">{visual.totalComfort}</strong>
              </div>
              <div className="p-1.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Shield</span>
                <strong className="text-sm md:text-base text-white">+{visual.totalShield}</strong>
              </div>
            </div>

            {/* Suitor Affinity Reaction Toggle Button */}
            <button
              onClick={() => setShowSuitorAffinities(!showSuitorAffinities)}
              className="w-full mt-2 py-1 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <HeartHandshake className="w-3 h-3 text-pink-400" />
              <span>{showSuitorAffinities ? 'Hide Date Compatibility' : 'Check Date Compatibility'}</span>
            </button>

            {/* Expanded Suitor Reactions */}
            {showSuitorAffinities && (
              <div className="mt-2 space-y-1.5 max-h-32 overflow-y-auto pr-1 animate-fadeIn">
                {visual.suitorReactions.map((sr) => (
                  <div key={sr.suitorId} className="p-1.5 rounded-lg bg-slate-950/90 border border-slate-800 text-[10px]">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>{sr.name}</span>
                      <span className={sr.bonus > 10 ? 'text-pink-400 font-mono' : 'text-slate-400 font-mono'}>
                        {sr.bonus > 0 ? `+${sr.bonus} Affection` : 'Neutral'}
                      </span>
                    </div>
                    <p className="text-slate-400 italic mt-0.5">{sr.reaction}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vanity Self-Care Minigame Launchers */}
          <div className="w-full z-10 grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => triggerMinigame('eyeliner')}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 hover:to-purple-600/50 border border-pink-500/40 text-pink-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Wing Eyeliner</span>
            </button>
            <button
              onClick={() => triggerMinigame('mirror_monologue')}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-slate-800 hover:from-purple-600/50 hover:to-slate-700 border border-purple-500/40 text-purple-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Face Shadow</span>
            </button>
          </div>
        </div>

        {/* Right: Wardrobe Catalog & Customization */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-900/60 rounded-3xl border border-slate-800 p-4 md:p-6 overflow-hidden">
          {/* Category Tabs */}
          <div className="flex gap-2 pb-3 overflow-x-auto border-b border-slate-800">
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
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto py-3 grid grid-cols-1 md:grid-cols-2 gap-3 pr-1">
            {itemsForCategory.map((item) => {
              const isUnlocked = item.unlocked || state.unlockedOutfits.includes(item.id);
              const isEquipped = Object.values(state.equippedOutfit).includes(item.id);
              const canAfford = state.stats.cash >= item.cost;
              const eraLocked = item.minEra > state.transitionEra;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-pink-950/40 border-pink-500 shadow-lg ring-1 ring-pink-500/50'
                      : isUnlocked
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: item.previewColor }}
                        />
                        <h3 className="font-bold text-sm text-white leading-tight">{item.name}</h3>
                      </div>
                      {isEquipped && (
                        <span className="text-[10px] bg-pink-500 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                          <Check className="w-3 h-3" /> Equipped
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 mb-1.5 leading-relaxed">{item.description}</p>
                    <p className="text-[11px] text-pink-300 italic mb-2.5 leading-tight">"{item.flavorText}"</p>

                    {/* Stat Boosts */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold mb-2.5">
                      {item.glamBonus !== 0 && (
                        <span className={`px-2 py-0.5 rounded ${item.glamBonus > 0 ? 'bg-pink-950/80 text-pink-300 border border-pink-500/30' : 'bg-red-950 text-red-300 border border-red-500/30'}`}>
                          Glam {item.glamBonus > 0 ? `+${item.glamBonus}` : item.glamBonus}
                        </span>
                      )}
                      {item.comfortBonus > 0 && (
                        <span className="bg-purple-950/80 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                          Comfort +{item.comfortBonus}
                        </span>
                      )}
                      {item.dysphoriaShieldBonus > 0 && (
                        <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
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
                        className="w-full py-2 bg-pink-900/40 text-pink-300 text-xs font-bold rounded-xl cursor-default border border-pink-500/30"
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
