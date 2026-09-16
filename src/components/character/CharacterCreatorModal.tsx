import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Shirt, 
  Palette, 
  Heart, 
  Check, 
  X, 
  RotateCcw, 
  Smile, 
  Sparkle, 
  Volume2, 
  Flame, 
  Compass, 
  Sun,
  CheckCircle2
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import { EveCompositeSprite } from './EveCompositeSprite';
import { 
  VISUAL_OUTFIT_PRESETS, 
  DEFAULT_CUSTOM_EVE,
  PRONOUN_OPTIONS,
  type VisualOutfitOption 
} from '../../data/characterCreationPresets';
import type { CustomEveConfig, CharacterExpression } from '../../types/character';
import type { TransitionEra } from '../../types/game';
import confetti from 'canvas-confetti';

const BACKGROUND_OPTIONS = [
  { id: 'bedroom', name: 'Eve\'s Bedroom', url: '/assets/backgrounds/bedroom.png' },
  { id: 'cafe', name: 'Sunset Cafe', url: '/assets/backgrounds/cafe.png' },
  { id: 'punk_club', name: 'Neon Punk Club', url: '/assets/backgrounds/punk_club.png' },
  { id: 'rooftop', name: 'Rooftop Lounge', url: '/assets/backgrounds/rooftop.png' },
  { id: 'studio', name: 'Studio Glow', url: '' },
];

const AURA_COLORS = [
  { name: 'Neon Rose', hex: '#f43f5e' },
  { name: 'Lavender Dream', hex: '#c084fc' },
  { name: 'Electric Violet', hex: '#8b5cf6' },
  { name: 'Sunset Gold', hex: '#f59e0b' },
  { name: 'Emerald Aurora', hex: '#10b981' },
  { name: 'Cyberpunk Cyan', hex: '#06b6d4' },
  { name: 'Midnight Velvet', hex: '#6366f1' },
];

const VOICE_OPTIONS: { id: NonNullable<CustomEveConfig['voiceFocus']>; name: string; desc: string; sample: string }[] = [
  { id: 'warm', name: 'Warm Heart-Resonance', desc: 'Comforting, gentle feminine melodic tones with organic chest warmth.', sample: '“Hi... it’s really good to see you today.”' },
  { id: 'bright', name: 'Bright Head-Resonance', desc: 'Clear, lively, melodic bell-like chime with expressive pitch lifts.', sample: '“Oh my gosh, you won’t believe what happened!”' },
  { id: 'sultry', name: 'Sultry Velvety Lilt', desc: 'Low-register, velvety chest-warmth, magnetic, alluring, and intimate.', sample: '“Come closer... let’s not talk about the past tonight.”' },
];

const ARCHETYPE_OPTIONS: { id: NonNullable<CustomEveConfig['vibeArchetype']>; name: string; desc: string; motto: string }[] = [
  { id: 'romantic', name: 'The Romantic Muse', desc: 'Tender-hearted dreamer searching for deep intimacy, gentle touches, and poetic connection.', motto: '“Love isn’t something you earn; it’s something you allow yourself to feel.”' },
  { id: 'rebel', name: 'The Rebel Queen', desc: 'Fierce, unapologetic riot grrrl who laughs in the face of transphobia and chasers.', motto: '“I bled too much to be quiet for someone else’s comfort.”' },
  { id: 'dreamer', name: 'The Introspective Dreamer', desc: 'Thoughtful, creative soul finding joy in quiet bookstores, thrift markets, and rain.', motto: '“Every brush stroke and cup of tea is a love letter to who I’m becoming.”' },
  { id: 'siren', name: 'The Magnetic Siren', desc: 'Radiant, hypnotic confidence turning every room into her personal runway.', motto: '“They can look, but adoration requires respect.”' },
];

export const CharacterCreatorModal: React.FC = () => {
  const { state, setViewMode, updateCustomEve, equipItem, modifyStats } = useGameStore();

  const [activeTab, setActiveTab] = useState<'outfits' | 'identity' | 'aura' | 'eras'>('outfits');
  const [config, setConfig] = useState<CustomEveConfig>(state.customEve || DEFAULT_CUSTOM_EVE);
  const [testExpression, setTestExpression] = useState<CharacterExpression>('smile');
  const [previewMode, setPreviewMode] = useState<'fullbody' | 'portrait'>('fullbody');
  const [selectedBg, setSelectedBg] = useState<string>('studio');

  // Selected outfit preset
  const selectedPreset: VisualOutfitOption = 
    VISUAL_OUTFIT_PRESETS.find((p) => p.id === config.selectedOutfitId) || 
    VISUAL_OUTFIT_PRESETS[1]; // default to first steps sweater

  const handleUpdate = (partial: Partial<CustomEveConfig>) => {
    soundEngine.playClick();
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleSelectOutfit = (preset: VisualOutfitOption) => {
    soundEngine.playSparkle();
    setConfig((prev) => ({
      ...prev,
      selectedOutfitId: preset.id,
      selectedSpriteUrl: preset.spriteUrl,
      auraGlowColor: preset.paletteColor,
      previewEra: preset.era as TransitionEra,
    }));
  };

  const handleSave = () => {
    soundEngine.playVictory();
    confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });

    // Apply custom config
    updateCustomEve(config);

    // Also equip the matching items into the wardrobe state so Vanity and Story match perfectly
    if (selectedPreset.defaultItems.fullbody) {
      equipItem('fullbody', selectedPreset.defaultItems.fullbody);
      equipItem('top' as any, '');
      equipItem('bottom' as any, '');
    } else {
      if (selectedPreset.defaultItems.top) equipItem('top', selectedPreset.defaultItems.top);
      if (selectedPreset.defaultItems.bottom) equipItem('bottom', selectedPreset.defaultItems.bottom);
      equipItem('fullbody' as any, '');
    }

    if (selectedPreset.defaultItems.hair) equipItem('hair', selectedPreset.defaultItems.hair);
    if (selectedPreset.defaultItems.makeup) equipItem('makeup', selectedPreset.defaultItems.makeup);
    if (selectedPreset.defaultItems.shoes) equipItem('shoes', selectedPreset.defaultItems.shoes);
    if (selectedPreset.defaultItems.accessory) equipItem('accessory', selectedPreset.defaultItems.accessory);

    // Apply perks to stats
    modifyStats({
      glamRating: Math.max(state.stats.glamRating, selectedPreset.statBonuses.glam),
      comfortRating: Math.max(state.stats.comfortRating, selectedPreset.statBonuses.comfort),
    });

    // Return to previous view mode or novel
    setViewMode(state.previousViewMode === 'creator' || state.previousViewMode === 'title' ? 'novel' : state.previousViewMode);
  };

  const handleReset = () => {
    soundEngine.playTension();
    setConfig(DEFAULT_CUSTOM_EVE);
  };

  const handleClose = () => {
    soundEngine.playClick();
    setViewMode(state.previousViewMode === 'creator' ? 'novel' : state.previousViewMode);
  };

  const currentBgUrl = BACKGROUND_OPTIONS.find((b) => b.id === selectedBg)?.url;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-3 md:p-6 animate-fadeIn overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-pink-500/20 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300">
              Character Creation & Outfits Studio
            </h1>
            <p className="text-xs text-slate-400">
              Customize Eve’s identity, selectable anime visual novel outfits, voice resonance, and aesthetic glow.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            title="Reset to default classic Eve"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-pink-600/30 hover:scale-105 active:scale-95 transition border border-pink-400/50"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Apply</span>
          </button>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
            title="Close without saving"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Studio Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        
        {/* Left Column: Visual Novel Character Stage */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-950 rounded-3xl border border-pink-500/30 p-4 md:p-5 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
          
          {/* Dynamic Scene Background Backdrop */}
          {currentBgUrl ? (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm pointer-events-none transition-all duration-700 rounded-3xl scale-105"
              style={{ backgroundImage: `url(${currentBgUrl})` }}
            />
          ) : (
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-700 rounded-3xl opacity-40"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${config.auraGlowColor || selectedPreset.paletteColor}35, transparent 75%)`,
              }}
            />
          )}

          {/* Top Bar: View Mode & Backdrop Selector */}
          <div className="w-full flex items-center justify-between z-10 gap-2">
            {/* Fullbody vs Portrait Toggle */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setPreviewMode('fullbody')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  previewMode === 'fullbody' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Body
              </button>
              <button
                onClick={() => setPreviewMode('portrait')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  previewMode === 'portrait' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Portrait
              </button>
            </div>

            {/* Background Location Selector */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1 rounded-xl">
              {BACKGROUND_OPTIONS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg transition ${
                    selectedBg === bg.id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title={bg.name}
                >
                  {bg.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Character Identity & Archetype Pills */}
          <div className="w-full flex items-center justify-between z-10 mt-1">
            <div className="px-3 py-1 bg-pink-950/80 border border-pink-500/40 rounded-full text-xs text-pink-300 font-bold flex items-center gap-1.5 shadow">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              <span>{config.name} ({config.pronouns})</span>
            </div>

            <div 
              className="px-3 py-1 rounded-full text-xs font-bold border shadow transition-all duration-300"
              style={{
                borderColor: `${config.auraGlowColor || selectedPreset.paletteColor}60`,
                backgroundColor: `${config.auraGlowColor || selectedPreset.paletteColor}20`,
                color: config.auraGlowColor || selectedPreset.paletteColor,
              }}
            >
              {selectedPreset.name.split(':')[0]}
            </div>
          </div>

          {/* The High-Resolution Visual Novel Character Sprite */}
          <div className="relative z-10 flex-1 w-full flex items-center justify-center max-h-[46vh] md:max-h-[50vh] my-1">
            <EveCompositeSprite
              customConfig={{
                ...config,
                selectedSpriteUrl: selectedPreset.spriteUrl,
              }}
              era={selectedPreset.era as TransitionEra}
              expression={testExpression}
              mode={previewMode}
              glowAura={true}
              className="max-h-[44vh] md:max-h-[48vh] w-auto"
            />
          </div>

          {/* Live Outfit Monologue & Aesthetic Thought */}
          <div className="w-full z-10 px-3 py-2 bg-slate-950/85 backdrop-blur-md border border-pink-500/20 rounded-2xl shadow-lg mb-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-pink-300 mb-0.5">
              <span>{selectedPreset.aesthetic}</span>
              <div className="flex gap-2 text-[10px]">
                <span className="text-pink-400">Glam +{selectedPreset.statBonuses.glam}</span>
                <span className="text-purple-400">Comfort +{selectedPreset.statBonuses.comfort}</span>
                <span className="text-emerald-400">Shield +{selectedPreset.statBonuses.shield}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 italic line-clamp-2">
              "{selectedPreset.tagline}"
            </p>
          </div>

          {/* Expression Preview Bar */}
          <div className="w-full z-10 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-1">
              <span className="flex items-center gap-1">
                <Smile className="w-3 h-3 text-pink-400" /> Expression Preview:
              </span>
              <span className="text-pink-300 capitalize font-bold">{testExpression}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              {(['neutral', 'smile', 'blush', 'laugh', 'nervous', 'fierce', 'smirk', 'sad'] as CharacterExpression[]).map((exp) => (
                <button
                  key={exp}
                  onClick={() => setTestExpression(exp)}
                  className={`py-1 text-[10px] font-bold rounded-lg transition capitalize ${
                    testExpression === exp
                      ? 'bg-pink-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          
          {/* Tabs Navigation */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-2 gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('outfits')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'outfits'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" /> Outfits Gallery
            </button>
            <button
              onClick={() => setActiveTab('identity')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'identity'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Identity & Voice
            </button>
            <button
              onClick={() => setActiveTab('aura')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'aura'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Aesthetic Aura
            </button>
            <button
              onClick={() => setActiveTab('eras')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'eras'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> Transition Journey
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
            
            {/* TAB 1: OUTFITS GALLERY */}
            {activeTab === 'outfits' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-pink-950/30 border border-pink-500/20 p-3.5 rounded-2xl text-xs text-pink-200">
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 text-pink-400" /> Selectable Visual Novel Outfits:
                  </p>
                  Choose any authentic outfit for Eve. Each look changes the character art across all dialogue scenes, the Vanity Mirror, and phone memories, complete with unique stat perks and suitor chemistry!
                </div>

                {/* 9 Selectable Outfits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {VISUAL_OUTFIT_PRESETS.map((preset) => {
                    const isSelected = config.selectedOutfitId === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectOutfit(preset)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between relative group ${
                          isSelected
                            ? 'bg-gradient-to-br from-pink-950/60 to-slate-900 border-pink-500 shadow-xl ring-2 ring-pink-500/40 scale-[1.01]'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        {/* Header & Tag */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-3 h-3 rounded-full border border-white/20 shrink-0" 
                                style={{ backgroundColor: preset.paletteColor }}
                              />
                              <h3 className="font-bold text-sm text-white leading-tight">
                                {preset.name}
                              </h3>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900 border border-slate-700 text-slate-300 shrink-0">
                              Era {preset.era}
                            </span>
                          </div>

                          <p className="text-xs text-pink-300 font-medium mb-1.5 leading-snug">
                            {preset.tagline}
                          </p>

                          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                            {preset.description}
                          </p>
                        </div>

                        {/* Stat Boosts & Action Footer */}
                        <div>
                          <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold mb-3">
                            <span className="bg-pink-950/60 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded">
                              Glam +{preset.statBonuses.glam}
                            </span>
                            <span className="bg-purple-950/60 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                              Comfort +{preset.statBonuses.comfort}
                            </span>
                            <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                              Shield +{preset.statBonuses.shield}
                            </span>
                          </div>

                          <button
                            type="button"
                            className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                                : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                <span>Selected Look</span>
                              </>
                            ) : (
                              <span>Equip & Preview Look</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: IDENTITY & VOICE */}
            {activeTab === 'identity' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Chosen Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Chosen Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => handleUpdate({ name: e.target.value })}
                    placeholder="Enter character name..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl text-slate-100 font-semibold text-sm outline-none transition shadow-inner"
                    maxLength={24}
                  />
                  <span className="text-[11px] text-slate-400">
                    Default is "Eve". Changing this updates dialogue, suitors' address, and phone threads.
                  </span>
                </div>

                {/* Pronouns */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Pronouns
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PRONOUN_OPTIONS.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleUpdate({ pronouns: p === 'Custom' ? 'She/Her' : p })}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          config.pronouns === p
                            ? 'bg-pink-600/30 border-pink-500 text-pink-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <span>{p}</span>
                        {config.pronouns === p && <Check className="w-3.5 h-3.5 text-pink-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice Resonance Focus */}
                <div className="space-y-2.5 pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-pink-400" /> Voice Resonance Focus
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {VOICE_OPTIONS.map((v) => {
                      const isSelected = (config.voiceFocus || 'warm') === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => handleUpdate({ voiceFocus: v.id })}
                          className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                            isSelected
                              ? 'bg-pink-950/40 border-pink-500 shadow-md ring-1 ring-pink-500/50'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-xs font-bold text-white">{v.name}</h4>
                              {isSelected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug mb-2">{v.desc}</p>
                          </div>
                          <p className="text-[10px] text-pink-300 italic bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                            {v.sample}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personality Archetype */}
                <div className="space-y-2.5 pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-400" /> Personality Archetype
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ARCHETYPE_OPTIONS.map((a) => {
                      const isSelected = (config.vibeArchetype || 'romantic') === a.id;
                      return (
                        <button
                          key={a.id}
                          onClick={() => handleUpdate({ vibeArchetype: a.id })}
                          className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                            isSelected
                              ? 'bg-purple-950/40 border-purple-500 shadow-md ring-1 ring-purple-500/50'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-xs font-bold text-white">{a.name}</h4>
                              {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug mb-2">{a.desc}</p>
                          </div>
                          <p className="text-[10px] text-purple-300 italic">
                            {a.motto}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AESTHETIC AURA & NUANCES */}
            {activeTab === 'aura' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-purple-950/30 border border-purple-500/20 p-3.5 rounded-2xl text-xs text-purple-200">
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-purple-400" /> Ambient Lighting & Glow:
                  </p>
                  Bathe Eve in custom ambient lighting that highlights her anime silhouette during dramatic dates, intimate scenes, and mirror reflections.
                </div>

                {/* Aura Glow Colors */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Signature Aura Glow
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {AURA_COLORS.map((aura) => {
                      const isSelected = config.auraGlowColor === aura.hex;
                      return (
                        <button
                          key={aura.hex}
                          onClick={() => handleUpdate({ auraGlowColor: aura.hex })}
                          className={`p-3 rounded-2xl border flex items-center gap-3 transition ${
                            isSelected
                              ? 'bg-slate-900 border-pink-500 shadow-md ring-1 ring-pink-500'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full shadow-lg border border-white/20 shrink-0"
                            style={{ backgroundColor: aura.hex }}
                          />
                          <p className="text-xs font-semibold text-slate-200">{aura.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Facial Nuances & Toggles */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Facial Nuances & Realism Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Beauty Mark Toggle */}
                    <button
                      onClick={() => handleUpdate({ beautyMark: !config.beautyMark })}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold transition ${
                        config.beautyMark
                          ? 'bg-pink-950/40 border-pink-500 text-pink-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-bold text-slate-200">Cheek Beauty Mark</p>
                        <p className="text-[10px] text-slate-400">Delicate signature mole below the left eye</p>
                      </div>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        config.beautyMark ? 'bg-pink-500 border-pink-400 text-white' : 'border-slate-700'
                      }`}>
                        {config.beautyMark && <Check className="w-3 h-3" />}
                      </span>
                    </button>

                    {/* Stubble Shadow Toggle */}
                    <button
                      onClick={() => handleUpdate({ showStubbleShadow: !config.showStubbleShadow })}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold transition ${
                        config.showStubbleShadow
                          ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-bold text-slate-200">Faint Early Stubble</p>
                        <p className="text-[10px] text-slate-400">Boy-mode realism during closeted Era 0</p>
                      </div>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        config.showStubbleShadow ? 'bg-amber-500 border-amber-400 text-white' : 'border-slate-700'
                      }`}>
                        {config.showStubbleShadow && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TRANSITION JOURNEY & ERAS */}
            {activeTab === 'eras' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-slate-950/80 border border-pink-500/20 p-3.5 rounded-2xl text-xs text-pink-200">
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-pink-400" /> Five Stages of Evolution:
                  </p>
                  Experience Eve’s full emotional and visual trajectory from closeted dysphoria to absolute sovereign confidence.
                </div>

                <div className="space-y-3">
                  {[
                    { era: 0, title: 'Era 0: The Closeted Chrysalis', desc: 'Wearing heavy boy-mode armor, terrified of perception, hiding your true self in baggy hoodies.' },
                    { era: 1, title: 'Era 1: The Awkward Egg', desc: 'First tentative feminine steps. Self-cut fringe bangs, oversized thrift sweaters, shaky eyeliner, and pure wonder.' },
                    { era: 2, title: 'Era 2: Finding Voice & Edge', desc: 'Riot grrrl punk energy with Chloe and spinning in sunflower sundresses. Developing courage and community.' },
                    { era: 3, title: 'Era 3: Blossoming Grace', desc: 'Tailored silhouettes, emerald silk velvet, laser sessions completed, and magnetic confidence with Julian or Maya.' },
                    { era: 4, title: 'Era 4: Radiant & Unapologetic', desc: 'Sovereign womanhood. Complete self-acceptance, effortless allure, and an unshakeable inner peace.' },
                  ].map((e) => (
                    <div 
                      key={e.era}
                      className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-pink-950/80 border border-pink-500/30 text-pink-300 font-bold flex items-center justify-center text-xs shrink-0">
                        {e.era}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">{e.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
