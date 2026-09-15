import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Scissors, 
  Palette, 
  Eye, 
  Smile, 
  Check, 
  X, 
  RotateCcw, 
  Heart, 
  Shirt, 
  Sparkle
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import { EveCompositeSprite } from './EveCompositeSprite';
import { 
  SKIN_TONE_OPTIONS, 
  HAIR_COLOR_OPTIONS, 
  HAIR_STYLE_OPTIONS, 
  EYE_COLOR_OPTIONS, 
  LIP_COLOR_OPTIONS, 
  BLUSH_COLOR_OPTIONS, 
  SILHOUETTE_OPTIONS, 
  PRONOUN_OPTIONS, 
  DEFAULT_CUSTOM_EVE 
} from '../../data/characterCreationPresets';
import type { CustomEveConfig, CharacterExpression } from '../../types/character';
import confetti from 'canvas-confetti';

export const CharacterCreatorModal: React.FC = () => {
  const { state, setViewMode, updateCustomEve } = useGameStore();

  const [activeTab, setActiveTab] = useState<'identity' | 'body' | 'hair' | 'makeup' | 'wardrobe'>('identity');
  const [config, setConfig] = useState<CustomEveConfig>(state.customEve || DEFAULT_CUSTOM_EVE);
  const [testExpression, setTestExpression] = useState<CharacterExpression>('smile');
  const [previewMode, setPreviewMode] = useState<'fullbody' | 'portrait'>('fullbody');

  const handleUpdate = (partial: Partial<CustomEveConfig>) => {
    soundEngine.playClick();
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleSave = () => {
    soundEngine.playVictory();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    updateCustomEve(config);
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-3 md:p-6 animate-fadeIn overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-pink-500/20 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300">
              Character Creation & Styling Studio
            </h1>
            <p className="text-xs text-slate-400">
              Customize your transition journey: name, physical traits, hair, eyes, and aesthetic silhouette.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            title="Reset to classic Eve defaults"
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

      {/* Main Studio Workspace: Two Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column: Real-Time Dynamic Interactive Sprite Stage */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 rounded-3xl border border-pink-500/30 p-4 md:p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-600/10 via-purple-600/10 to-transparent pointer-events-none rounded-3xl" />

          {/* Top Stage Controls: Zoom & Expression */}
          <div className="w-full flex items-center justify-between z-10">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setPreviewMode('fullbody')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  previewMode === 'fullbody'
                    ? 'bg-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Body
              </button>
              <button
                onClick={() => setPreviewMode('portrait')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  previewMode === 'portrait'
                    ? 'bg-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Portrait
              </button>
            </div>

            {/* Live Name & Pronoun Tag */}
            <div className="px-3 py-1 bg-pink-950/80 border border-pink-500/40 rounded-full text-xs text-pink-300 font-bold flex items-center gap-1.5 shadow">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              <span>{config.name} ({config.pronouns})</span>
            </div>
          </div>

          {/* Central Layered Composite Sprite View */}
          <div className="relative z-10 flex-1 w-full flex items-center justify-center max-h-[48vh] md:max-h-[52vh] my-2">
            <EveCompositeSprite
              customConfig={config}
              equipped={state.equippedOutfit}
              era={state.transitionEra}
              expression={testExpression}
              mode={previewMode}
              className="max-h-[44vh] md:max-h-[48vh] w-full"
            />
          </div>

          {/* Bottom Stage Bar: Expression Tester */}
          <div className="w-full z-10 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
              <span className="flex items-center gap-1">
                <Smile className="w-3 h-3 text-pink-400" /> Expression Preview:
              </span>
              <span className="text-pink-300 capitalize">{testExpression}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
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

        {/* Right Column: Interactive Customization Controls */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-2 gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('identity')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'identity'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Identity
            </button>
            <button
              onClick={() => setActiveTab('body')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'body'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Complexion & Body
            </button>
            <button
              onClick={() => setActiveTab('hair')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'hair'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" /> Hair Salon
            </button>
            <button
              onClick={() => setActiveTab('makeup')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'makeup'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Face & Makeup
            </button>
            <button
              onClick={() => setActiveTab('wardrobe')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'wardrobe'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" /> Wardrobe Preview
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
            {/* TAB 1: IDENTITY */}
            {activeTab === 'identity' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-pink-950/30 border border-pink-500/20 p-4 rounded-2xl text-xs text-pink-200">
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 text-pink-400" /> Affirmation:
                  </p>
                  Your journey is entirely yours. Choose the name and pronouns you want to see reflected across every scene, dialogue box, and phone notification.
                </div>

                {/* Character Name */}
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
                    Default is "Eve". Changing this updates how suitors and friends address you throughout the story.
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
              </div>
            )}

            {/* TAB 2: COMPLEXION & BODY */}
            {activeTab === 'body' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Skin Tone Swatches */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Skin Complexion
                    </label>
                    <span className="text-xs text-pink-300 font-semibold">{config.skinToneName}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SKIN_TONE_OPTIONS.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => handleUpdate({ skinTone: tone.hex, skinToneName: tone.name })}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                          config.skinTone === tone.hex
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shadow-inner border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: tone.hex }}
                        />
                        <div className="text-left min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{tone.name}</p>
                          <span className="text-[10px] text-slate-400 capitalize">{tone.undertone}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Silhouette */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Body Silhouette & Frame
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SILHOUETTE_OPTIONS.map((sil) => (
                      <button
                        key={sil.id}
                        onClick={() => handleUpdate({ bodySilhouette: sil.id })}
                        className={`p-3.5 rounded-2xl border text-left transition ${
                          config.bodySilhouette === sil.id
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-slate-200">{sil.name}</h4>
                          {config.bodySilhouette === sil.id && <Check className="w-3.5 h-3.5 text-pink-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{sil.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Physical Nuances & Features */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Facial Nuances & Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Beauty Mark Toggle */}
                    <button
                      onClick={() => handleUpdate({ beautyMark: !config.beautyMark })}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition ${
                        config.beautyMark
                          ? 'bg-pink-950/40 border-pink-500 text-pink-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Delicate Cheek Beauty Mark</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        config.beautyMark ? 'bg-pink-500 border-pink-400 text-white' : 'border-slate-700'
                      }`}>
                        {config.beautyMark && <Check className="w-3 h-3" />}
                      </span>
                    </button>

                    {/* Stubble Shadow Toggle */}
                    <button
                      onClick={() => handleUpdate({ showStubbleShadow: !config.showStubbleShadow })}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition ${
                        config.showStubbleShadow
                          ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Faint Early Stubble (Boy-Mode Realism)</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        config.showStubbleShadow ? 'bg-amber-500 border-amber-400 text-white' : 'border-slate-700'
                      }`}>
                        {config.showStubbleShadow && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: HAIR SALON */}
            {activeTab === 'hair' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Hair Color */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Hair Color
                    </label>
                    <span className="text-xs text-pink-300 font-semibold">{config.hairColorName}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {HAIR_COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleUpdate({ hairColor: c.hex, hairColorName: c.name })}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                          config.hairColor === c.hex
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shadow-inner border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <p className="text-xs font-semibold text-slate-200 truncate">{c.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Style */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Hair Cut & Style
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HAIR_STYLE_OPTIONS.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => handleUpdate({ hairStyle: style.id })}
                        className={`p-3.5 rounded-2xl border text-left transition ${
                          config.hairStyle === style.id
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-slate-200">{style.name}</h4>
                          <span className="text-[10px] text-pink-400 uppercase font-semibold">{style.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{style.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: FACE & MAKEUP */}
            {activeTab === 'makeup' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Eye Color */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Eye Iris Color
                    </label>
                    <span className="text-xs text-pink-300 font-semibold">{config.eyeColorName}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {EYE_COLOR_OPTIONS.map((eye) => (
                      <button
                        key={eye.id}
                        onClick={() => handleUpdate({ eyeColor: eye.hex, eyeColorName: eye.name })}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                          config.eyeColor === eye.hex
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-inner border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: eye.hex }}
                        />
                        <p className="text-xs font-semibold text-slate-200 truncate">{eye.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lip Tint */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Lip Tint & Gloss
                    </label>
                    <span className="text-xs text-pink-300 font-semibold">{config.lipColorName}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {LIP_COLOR_OPTIONS.map((lip) => (
                      <button
                        key={lip.id}
                        onClick={() => handleUpdate({ lipColor: lip.hex, lipColorName: lip.name })}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                          config.lipColor === lip.hex
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-inner border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: lip.hex }}
                        />
                        <p className="text-xs font-semibold text-slate-200 truncate">{lip.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cheek Blush */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Cheek Blush Glow
                    </label>
                    <span className="text-xs text-pink-300 font-semibold">{config.blushColorName}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BLUSH_COLOR_OPTIONS.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleUpdate({ blushColor: b.hex, blushColorName: b.name })}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 transition ${
                          config.blushColor === b.hex
                            ? 'bg-pink-950/40 border-pink-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full shadow-inner border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: b.hex }}
                        />
                        <p className="text-xs font-semibold text-slate-200 truncate">{b.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: WARDROBE PREVIEW */}
            {activeTab === 'wardrobe' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-slate-950/80 border border-purple-500/30 p-4 rounded-2xl text-xs text-purple-200">
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5 text-purple-400" /> Dynamic Visual Layering:
                  </p>
                  Every top, bottom, fullbody dress, shoe, hairstyle, and accessory (like Chloe’s silver safety pins, the velvet moon choker, or noise-canceling headphones) is rendered in real time onto your character sprite.
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Currently Equipped on Eve
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Top / Outfit:</span>
                      <span className="text-pink-300 font-semibold">{state.equippedOutfit.fullbody || state.equippedOutfit.top || 'Default'}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Bottom:</span>
                      <span className="text-pink-300 font-semibold">{state.equippedOutfit.bottom || 'None'}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Shoes:</span>
                      <span className="text-pink-300 font-semibold">{state.equippedOutfit.shoes || 'Default'}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Accessory:</span>
                      <span className="text-pink-300 font-semibold">{state.equippedOutfit.accessory || 'None'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      handleSave();
                      setViewMode('vanity');
                    }}
                    className="w-full py-3 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-500/40 text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Open Full Vanity Wardrobe & Dressing Room</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
