import React from 'react';
import type { CustomEveConfig, CharacterExpression } from '../../types/character';
import type { EquippedOutfit } from '../../types/outfits';
import type { TransitionEra } from '../../types/game';
import { DEFAULT_CUSTOM_EVE } from '../../data/characterCreationPresets';
import { getEveOutfitVisual } from '../../utils/outfitVisuals';

export interface EveCompositeSpriteProps {
  customConfig?: CustomEveConfig;
  equipped?: EquippedOutfit;
  era?: TransitionEra;
  expression?: CharacterExpression;
  mode?: 'fullbody' | 'portrait' | 'avatar';
  className?: string;
  glowAura?: boolean;
}

const DEFAULT_EQUIPPED: EquippedOutfit = {
  hair: 'era1_messy_bangs',
  makeup: 'era1_first_eyeliner',
  top: 'era1_thrift_cardigan',
  bottom: 'era1_pleated_skirt',
  shoes: 'era1_worn_sneakers',
  accessory: '',
};

export const EveCompositeSprite: React.FC<EveCompositeSpriteProps> = ({
  customConfig = DEFAULT_CUSTOM_EVE,
  equipped,
  era = 0,
  expression = 'smile',
  mode = 'fullbody',
  className = '',
  glowAura = true,
}) => {
  const activeEquipped: EquippedOutfit = equipped || {
    ...DEFAULT_EQUIPPED,
    top: era === 0 ? 'era0_navy_hoodie' : DEFAULT_EQUIPPED.top,
    bottom: era === 0 ? 'era0_loose_jeans' : DEFAULT_EQUIPPED.bottom,
    shoes: era === 0 ? 'era0_worn_skaters' : DEFAULT_EQUIPPED.shoes,
  };

  const visual = getEveOutfitVisual(activeEquipped, era, customConfig);

  // If customConfig specifies an explicit spriteUrl that is valid, respect it
  const spriteUrl = customConfig?.selectedSpriteUrl || visual.spriteUrl;
  const auraColor = customConfig?.auraGlowColor || visual.glowBorderColor || '#ec4899';

  // Mode container styling
  let containerStyles = 'relative inline-flex items-center justify-center select-none overflow-visible';
  let imageStyles = 'w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)] contrast-[1.03] transition-all duration-300';

  if (mode === 'avatar') {
    containerStyles = 'relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xl border-2 shrink-0';
    imageStyles = 'w-[200%] h-[200%] object-cover object-top -mt-2 -ml-[50%] filter contrast-[1.04]';
  } else if (mode === 'portrait') {
    containerStyles = 'relative w-48 h-64 sm:w-60 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border shrink-0';
    imageStyles = 'w-[160%] h-[160%] object-cover object-top -mt-4 -ml-[30%] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] contrast-[1.03]';
  }

  return (
    <div
      className={`${containerStyles} ${className}`}
      style={mode !== 'fullbody' ? { borderColor: `${auraColor}60` } : undefined}
    >
      {/* Dynamic Ambient Aura Lighting */}
      {glowAura && mode === 'fullbody' && (
        <div
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none -z-10 opacity-35 transition-all duration-700 animate-pulse"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${auraColor}, transparent 70%)`,
          }}
        />
      )}

      {/* The Authentic Visual Novel Anime Character Sprite */}
      <img
        src={spriteUrl}
        alt={customConfig?.name || 'Eve'}
        className={imageStyles}
        loading="eager"
      />

      {/* Expression Reactive FX (Subtle anime blush & emotive flair) */}
      {expression === 'blush' && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-30 rounded-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 28%, #f43f5e 0%, transparent 45%)',
          }}
        />
      )}

      {expression === 'laugh' && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-25 rounded-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 25%, #fef08a 0%, transparent 40%)',
          }}
        />
      )}

      {expression === 'fierce' && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 rounded-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 30%, #a855f7 0%, transparent 50%)',
          }}
        />
      )}
    </div>
  );
};
