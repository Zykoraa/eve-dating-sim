import React from 'react';
import type { CustomEveConfig, CharacterExpression } from '../../types/character';
import type { EquippedOutfit } from '../../types/outfits';
import type { TransitionEra } from '../../types/game';
import { DEFAULT_CUSTOM_EVE } from '../../data/characterCreationPresets';

export interface EveCompositeSpriteProps {
  customConfig?: CustomEveConfig;
  equipped?: EquippedOutfit;
  era?: TransitionEra;
  expression?: CharacterExpression;
  mode?: 'fullbody' | 'portrait' | 'avatar';
  className?: string;
  glowAura?: boolean;
}

export const EveCompositeSprite: React.FC<EveCompositeSpriteProps> = ({
  customConfig = DEFAULT_CUSTOM_EVE,
  equipped,
  era = 0,
  expression = 'smile',
  mode = 'fullbody',
  className = '',
  glowAura = true,
}) => {
  const skin = customConfig.skinTone || '#fae0d4';
  const hair = customConfig.hairColor || '#382419';
  const eyes = customConfig.eyeColor || '#854d0e';
  const lips = customConfig.lipColor || '#f43f5e';
  const blush = customConfig.blushColor || '#fb7185';
  const silhouette = customConfig.bodySilhouette || 'soft_curves';

  // Equipped overrides or custom hair/makeup
  const activeHair = equipped?.hair || customConfig.hairStyle || 'era0_messy_mop';
  const activeMakeup = equipped?.makeup || customConfig.makeupStyle || 'era0_bare_face';
  const activeTop = equipped?.top || (era === 0 ? 'era0_navy_hoodie' : 'era1_thrift_cardigan');
  const activeFullbody = equipped?.fullbody || '';
  const activeBottom = equipped?.bottom || (era === 0 ? 'era0_loose_jeans' : 'era1_pleated_skirt');
  const activeShoes = equipped?.shoes || (era === 0 ? 'era0_worn_skaters' : 'era1_worn_sneakers');
  const activeAccessory = equipped?.accessory || (era === 0 ? 'era0_headphones' : '');

  // Body width adjustments based on silhouette
  const hipWidthDelta = silhouette === 'curvy' ? 8 : silhouette === 'slender' ? -5 : 0;
  const waistWidthDelta = silhouette === 'curvy' ? -4 : silhouette === 'athletic' ? 2 : silhouette === 'slender' ? -3 : 0;
  const shoulderWidthDelta = silhouette === 'athletic' ? 6 : silhouette === 'slender' ? -4 : 0;

  // ViewBox depending on mode
  // Fullbody: 0 0 360 620
  // Portrait: 60 40 240 320
  // Avatar: 110 50 140 160
  const viewBox = mode === 'avatar' 
    ? '110 50 140 160' 
    : mode === 'portrait' 
      ? '70 40 220 300' 
      : '30 30 300 580';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox={viewBox}
        className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin Gradients */}
          <linearGradient id="skinBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={skin} stopOpacity="1" />
            <stop offset="100%" stopColor={skin} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="skinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="skinHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Hair Gradients */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hair} />
            <stop offset="70%" stopColor={hair} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Eye Iris Gradient */}
          <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={eyes} stopOpacity="1" />
            <stop offset="75%" stopColor={eyes} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#111827" stopOpacity="1" />
          </radialGradient>

          {/* Lip Gradient */}
          <linearGradient id="lipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lips} />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Soft Blush Filter */}
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          {/* Shimmer Gold for Pearl/Jewelry */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Velvet Green Gradient for Dress */}
          <linearGradient id="emeraldVelvet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          {/* Red Tartan Mini Pattern */}
          <pattern id="tartanPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#991b1b" />
            <line x1="0" y1="5" x2="20" y2="5" stroke="#18181b" strokeWidth="2" />
            <line x1="0" y1="15" x2="20" y2="15" stroke="#18181b" strokeWidth="2" />
            <line x1="5" y1="0" x2="5" y2="20" stroke="#18181b" strokeWidth="2" />
            <line x1="15" y1="0" x2="15" y2="20" stroke="#18181b" strokeWidth="2" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#facc15" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Ambient Aura */}
        {glowAura && (
          <ellipse cx="180" cy="220" rx="90" ry="160" fill="#ec4899" opacity="0.08" filter="url(#softBlur)" />
        )}

        {/* --- LAYER 1: BACK HAIR (For long or bob styles) --- */}
        {(activeHair === 'era3_long_layers' || activeHair === 'era4_signature_waves') && (
          <path
            d="M 115 130 C 85 180, 80 280, 95 380 C 110 390, 140 370, 130 300 C 125 240, 140 180, 140 140 Z
               M 245 130 C 275 180, 280 280, 265 380 C 250 390, 220 370, 230 300 C 235 240, 220 180, 220 140 Z"
            fill="url(#hairGrad)"
            opacity="0.95"
          />
        )}
        {activeHair === 'era2_wavy_bob' && (
          <path
            d="M 120 130 C 95 160, 90 220, 105 260 C 120 270, 140 240, 135 200 Z
               M 240 130 C 265 160, 270 220, 255 260 C 240 270, 220 240, 225 200 Z"
            fill="url(#hairGrad)"
          />
        )}
        {activeHair === 'high_ponytail' && (
          <path
            d="M 230 90 C 280 110, 290 200, 270 290 C 255 300, 245 270, 255 210 C 260 160, 240 110, 225 95 Z"
            fill="url(#hairGrad)"
          />
        )}

        {/* --- LAYER 2: BASE BODY & LEGS --- */}
        {mode === 'fullbody' && (
          <g id="bodyLegs">
            {/* Left Leg */}
            <path
              d="M 152 350 C 150 410, 148 480, 150 540 C 150 550, 166 550, 168 540 C 172 480, 174 410, 172 350 Z"
              fill="url(#skinBase)"
            />
            {/* Right Leg */}
            <path
              d="M 188 350 C 186 410, 188 480, 192 540 C 192 550, 208 550, 210 540 C 212 480, 210 410, 208 350 Z"
              fill="url(#skinBase)"
            />
          </g>
        )}

        {/* --- LAYER 3: SHOES / FOOTWEAR --- */}
        {mode === 'fullbody' && (
          <g id="shoes">
            {activeShoes === 'era0_worn_skaters' && (
              <g id="skateShoes">
                <path d="M 144 535 C 138 545, 135 558, 168 558 C 175 558, 176 545, 170 535 Z" fill="#334155" />
                <path d="M 135 554 L 170 554 C 172 558, 165 560, 140 560 Z" fill="#cbd5e1" />
                <path d="M 190 535 C 184 545, 181 558, 214 558 C 221 558, 222 545, 216 535 Z" fill="#334155" />
                <path d="M 181 554 L 216 554 C 218 558, 211 560, 186 560 Z" fill="#cbd5e1" />
              </g>
            )}
            {activeShoes === 'era1_worn_sneakers' && (
              <g id="canvasSneakers">
                <path d="M 144 532 C 136 544, 134 558, 168 558 C 176 558, 176 544, 170 532 Z" fill="#09090b" />
                <path d="M 134 550 C 134 554, 145 558, 168 558 C 176 558, 174 552, 170 550 Z" fill="#ffffff" />
                {/* Cute drawn red heart on rubber rim */}
                <circle cx="152" cy="554" r="1.5" fill="#ef4444" />
                <path d="M 190 532 C 182 544, 180 558, 214 558 C 222 558, 222 544, 216 532 Z" fill="#09090b" />
                <path d="M 180 550 C 180 554, 191 558, 214 558 C 222 558, 220 552, 216 550 Z" fill="#ffffff" />
              </g>
            )}
            {activeShoes === 'era2_combat_boots' && (
              <g id="combatBoots">
                <path d="M 143 510 L 142 556 C 142 563, 178 563, 178 556 L 176 510 Z" fill="#09090b" />
                {/* Thick platform sole */}
                <rect x="139" y="555" width="40" height="7" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
                <line x1="145" y1="520" x2="165" y2="520" stroke="#a1a1aa" strokeWidth="1" />
                <line x1="145" y1="530" x2="165" y2="530" stroke="#a1a1aa" strokeWidth="1" />
                <line x1="145" y1="540" x2="165" y2="540" stroke="#a1a1aa" strokeWidth="1" />

                <path d="M 185 510 L 184 556 C 184 563, 220 563, 220 556 L 218 510 Z" fill="#09090b" />
                <rect x="181" y="555" width="40" height="7" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
                <line x1="187" y1="520" x2="207" y2="520" stroke="#a1a1aa" strokeWidth="1" />
                <line x1="187" y1="530" x2="207" y2="530" stroke="#a1a1aa" strokeWidth="1" />
                <line x1="187" y1="540" x2="207" y2="540" stroke="#a1a1aa" strokeWidth="1" />
              </g>
            )}
            {activeShoes === 'era3_ankle_booties' && (
              <g id="booties">
                <path d="M 144 515 L 138 556 C 138 561, 174 561, 174 556 L 172 515 Z" fill="#171717" />
                {/* Pointed toe and block heel */}
                <path d="M 166 557 L 173 557 L 173 564 L 166 564 Z" fill="#262626" />
                <path d="M 188 515 L 182 556 C 182 561, 218 561, 218 556 L 216 515 Z" fill="#171717" />
                <path d="M 210 557 L 217 557 L 217 564 L 210 564 Z" fill="#262626" />
              </g>
            )}
            {activeShoes === 'era4_strappy_heels' && (
              <g id="strappyHeels">
                <path d="M 148 535 L 152 556 C 150 560, 168 560, 168 556 L 166 535 Z" fill="url(#skinBase)" />
                <line x1="147" y1="542" x2="167" y2="546" stroke="#fbbf24" strokeWidth="1.5" />
                <line x1="148" y1="550" x2="166" y2="553" stroke="#fbbf24" strokeWidth="1.5" />
                <line x1="164" y1="552" x2="164" y2="564" stroke="#d97706" strokeWidth="1.8" />

                <path d="M 192 535 L 196 556 C 194 560, 212 560, 212 556 L 210 535 Z" fill="url(#skinBase)" />
                <line x1="191" y1="542" x2="211" y2="546" stroke="#fbbf24" strokeWidth="1.5" />
                <line x1="192" y1="550" x2="210" y2="553" stroke="#fbbf24" strokeWidth="1.5" />
                <line x1="208" y1="552" x2="208" y2="564" stroke="#d97706" strokeWidth="1.8" />
              </g>
            )}
          </g>
        )}

        {/* --- LAYER 4: BOTTOM WEAR (If no fullbody dress) --- */}
        {!activeFullbody && mode === 'fullbody' && (
          <g id="bottomWear">
            {activeBottom === 'era0_loose_jeans' && (
              <g id="baggyJeans">
                {/* Baggy straight-leg jeans with stiff boxy drape */}
                <path
                  d={`M ${150 - hipWidthDelta} 265 
                     L ${210 + hipWidthDelta} 265 
                     C ${220 + hipWidthDelta} 320, ${225 + hipWidthDelta} 420, 218 535 
                     L 185 535 
                     L 180 340 
                     L 175 535 
                     L 142 535 
                     C ${135 - hipWidthDelta} 420, ${140 - hipWidthDelta} 320, ${150 - hipWidthDelta} 265 Z`}
                  fill="#2563eb"
                  stroke="#1d4ed8"
                  strokeWidth="1.5"
                />
                {/* Jean seams and pocket lines */}
                <path d="M 180 265 L 180 340" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2,2" />
                <path d="M 158 275 C 165 290, 172 290, 178 275" stroke="#f59e0b" strokeWidth="0.8" />
              </g>
            )}
            {activeBottom === 'era1_pleated_skirt' && (
              <g id="pleatedSkirt">
                <path
                  d={`M ${155 - waistWidthDelta} 255 
                     L ${205 + waistWidthDelta} 255 
                     L ${240 + hipWidthDelta} 360 
                     L ${120 - hipWidthDelta} 360 Z`}
                  fill="#18181b"
                  stroke="#27272a"
                  strokeWidth="1"
                />
                {/* Crisp pleat shadow lines */}
                <line x1="140" y1="260" x2="135" y2="360" stroke="#09090b" strokeWidth="2" />
                <line x1="155" y1="258" x2="155" y2="360" stroke="#09090b" strokeWidth="2" />
                <line x1="170" y1="255" x2="175" y2="360" stroke="#09090b" strokeWidth="2" />
                <line x1="190" y1="255" x2="195" y2="360" stroke="#09090b" strokeWidth="2" />
                <line x1="205" y1="258" x2="215" y2="360" stroke="#09090b" strokeWidth="2" />
                <line x1="220" y1="260" x2="235" y2="360" stroke="#09090b" strokeWidth="2" />
              </g>
            )}
            {activeBottom === 'era1_mom_jeans' && (
              <g id="momJeans">
                <path
                  d={`M ${154 - waistWidthDelta} 250 
                     L ${206 + waistWidthDelta} 250 
                     C ${218 + hipWidthDelta} 290, ${216 + hipWidthDelta} 400, 210 525 
                     L 188 525 
                     L 180 340 
                     L 172 525 
                     L 150 525 
                     C ${144 - hipWidthDelta} 400, ${142 - hipWidthDelta} 290, ${154 - waistWidthDelta} 250 Z`}
                  fill="#60a5fa"
                  stroke="#3b82f6"
                  strokeWidth="1.2"
                />
                {/* Vintage high-rise waist accent */}
                <line x1="154" y1="260" x2="206" y2="260" stroke="#fbbf24" strokeWidth="0.8" />
              </g>
            )}
            {activeBottom === 'era2_plaid_mini' && (
              <g id="tartanMini">
                <path
                  d={`M ${156 - waistWidthDelta} 255 
                     L ${204 + waistWidthDelta} 255 
                     L ${230 + hipWidthDelta} 340 
                     L ${130 - hipWidthDelta} 340 Z`}
                  fill="url(#tartanPattern)"
                  stroke="#450a0a"
                  strokeWidth="1.5"
                />
                {/* Silver punk safety-pin detail */}
                <line x1="210" y1="300" x2="215" y2="325" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                <circle cx="210" cy="300" r="2.5" fill="#94a3b8" />
              </g>
            )}
            {activeBottom === 'era3_tailored_slacks' && (
              <g id="tailoredSlacks">
                <path
                  d={`M ${156 - waistWidthDelta} 245 
                     L ${204 + waistWidthDelta} 245 
                     C ${218 + hipWidthDelta} 300, 225 430, 222 540 
                     L 187 540 
                     L 180 340 
                     L 173 540 
                     L 138 540 
                     C 135, 430, ${142 - hipWidthDelta} 300, ${156 - waistWidthDelta} 245 Z`}
                  fill="#334155"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />
                {/* Sharp vertical crease */}
                <line x1="155" y1="260" x2="155" y2="538" stroke="#475569" strokeWidth="1" />
                <line x1="205" y1="260" x2="205" y2="538" stroke="#475569" strokeWidth="1" />
              </g>
            )}
          </g>
        )}

        {/* --- LAYER 5: UPPER TORSO & TOP / FULLBODY DRESS --- */}
        <g id="upperTorsoAndTops">
          {/* Base Torso / Neck */}
          <path
            d={`M 166 125 L 166 160 L ${130 - shoulderWidthDelta} 185 
               L ${148 - waistWidthDelta} 265 L ${212 + waistWidthDelta} 265 
               L ${230 + shoulderWidthDelta} 185 L 194 160 L 194 125 Z`}
            fill="url(#skinBase)"
          />

          {/* Fullbody Dresses */}
          {activeFullbody === 'era2_floral_sundress' && (
            <g id="floralSundress">
              <path
                d={`M 152 180 C 160 200, 200 200, 208 180 
                   L ${216 + waistWidthDelta} 255 
                   L ${245 + hipWidthDelta} 420 
                   L ${115 - hipWidthDelta} 420 
                   L ${144 - waistWidthDelta} 255 Z`}
                fill="#fde047"
                stroke="#eab308"
                strokeWidth="1.5"
              />
              {/* Flutter Ruffled Hem */}
              <path
                d={`M ${115 - hipWidthDelta} 420 Q 140 430, 180 420 Q 220 430, ${245 + hipWidthDelta} 420`}
                stroke="#ca8a04"
                strokeWidth="3"
                fill="none"
              />
              {/* Cute Daisy floral dots */}
              <circle cx="160" cy="270" r="3" fill="#ffffff" />
              <circle cx="160" cy="270" r="1.2" fill="#f59e0b" />
              <circle cx="200" cy="300" r="3" fill="#ffffff" />
              <circle cx="200" cy="300" r="1.2" fill="#f59e0b" />
              <circle cx="140" cy="350" r="3.5" fill="#ffffff" />
              <circle cx="140" cy="350" r="1.5" fill="#f59e0b" />
              <circle cx="220" cy="370" r="3.5" fill="#ffffff" />
              <circle cx="220" cy="370" r="1.5" fill="#f59e0b" />
              <circle cx="180" cy="340" r="4" fill="#ffffff" />
              <circle cx="180" cy="340" r="1.6" fill="#f59e0b" />
            </g>
          )}

          {activeFullbody === 'era3_velvet_slip_dress' && (
            <g id="velvetSlipDress">
              {/* Delicate spaghetti straps */}
              <line x1="160" y1="170" x2="162" y2="195" stroke="#047857" strokeWidth="1.5" />
              <line x1="200" y1="170" x2="198" y2="195" stroke="#047857" strokeWidth="1.5" />
              <path
                d={`M 158 195 C 170 205, 190 205, 202 195 
                   L ${212 + waistWidthDelta} 255 
                   C ${228 + hipWidthDelta} 300, 222 410, 218 470 
                   L 142 470 
                   C 138, 410, ${132 - hipWidthDelta} 300, ${148 - waistWidthDelta} 255 Z`}
                fill="url(#emeraldVelvet)"
                stroke="#064e3b"
                strokeWidth="1.5"
              />
              {/* Velvet fabric shimmer highlight */}
              <path
                d="M 160 210 C 165 260, 168 340, 162 430"
                stroke="#34d399"
                strokeWidth="2"
                opacity="0.3"
                strokeLinecap="round"
              />
            </g>
          )}

          {activeFullbody === 'era4_little_black_dress' && (
            <g id="lbdDress">
              <path
                d={`M 154 175 C 180 185, 204 175, 214 185 
                   L ${210 + waistWidthDelta} 250 
                   C ${226 + hipWidthDelta} 295, 218 390, 215 450 
                   L 175 450 L 175 390 L 145 450 
                   C 142, 390, ${134 - hipWidthDelta} 295, ${150 - waistWidthDelta} 250 Z`}
                fill="#09090b"
                stroke="#27272a"
                strokeWidth="1.5"
              />
              {/* Gold accessory belt accent */}
              <line
                x1={150 - waistWidthDelta}
                y1="250"
                x2={210 + waistWidthDelta}
                y2="250"
                stroke="url(#goldGrad)"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Regular Tops (When fullbody is not active) */}
          {!activeFullbody && (
            <g id="topGarments">
              {activeTop === 'era0_navy_hoodie' && (
                <g id="navyHoodie">
                  {/* Baggy, shapeless XL hoodie swallowing upper silhouette */}
                  <path
                    d={`M 152 165 C 165 178, 195 178, 208 165 
                       L 248 185 
                       L 236 295 
                       L 124 295 
                       L 112 185 Z`}
                    fill="#1e293b"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                  {/* Kangaroo pocket */}
                  <path d="M 145 235 L 215 235 L 222 285 L 138 285 Z" fill="#0f172a" opacity="0.6" />
                  {/* Drooping hood folds around neck */}
                  <path d="M 148 162 C 160 178, 200 178, 212 162 C 220 180, 140 180, 148 162 Z" fill="#0f172a" />
                </g>
              )}

              {activeTop === 'era1_oversized_hoodie' && (
                <g id="dysphoriaHoodie">
                  <path
                    d={`M 152 165 C 165 176, 195 176, 208 165 
                       L 245 185 L 232 290 L 128 290 L 115 185 Z`}
                    fill="#475569"
                    stroke="#334155"
                    strokeWidth="1.8"
                  />
                  <path d="M 145 235 L 215 235 L 220 280 L 140 280 Z" fill="#334155" opacity="0.7" />
                  {/* White hoodie strings */}
                  <line x1="172" y1="174" x2="170" y2="215" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="188" y1="174" x2="190" y2="215" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {activeTop === 'era1_thrift_cardigan' && (
                <g id="thriftCardigan">
                  {/* White ribbed camisole underneath */}
                  <path d="M 162 180 L 198 180 L 195 255 L 165 255 Z" fill="#f8fafc" />
                  <line x1="180" y1="182" x2="180" y2="255" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                  {/* Lavender knit cardigan open in the front */}
                  <path
                    d={`M 148 165 L 164 175 L 162 265 L 128 265 L 118 185 Z`}
                    fill="#c084fc"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M 212 165 L 196 175 L 198 265 L 232 265 L 242 185 Z`}
                    fill="#c084fc"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                  />
                  {/* Cute pearlescent buttons */}
                  <circle cx="166" cy="205" r="2" fill="#ffffff" />
                  <circle cx="166" cy="225" r="2" fill="#ffffff" />
                  <circle cx="166" cy="245" r="2" fill="#ffffff" />
                </g>
              )}

              {activeTop === 'era2_band_tee_leather' && (
                <g id="punkLeatherJacket">
                  {/* Band tee */}
                  <path d="M 160 178 L 200 178 L 196 260 L 164 260 Z" fill="#18181b" />
                  {/* Graphic lightning on tee */}
                  <path d="M 178 195 L 174 210 L 184 210 L 180 225" stroke="#ef4444" strokeWidth="2" fill="none" />
                  {/* Heavy biker leather jacket */}
                  <path
                    d={`M 148 162 L 172 180 L 166 265 L 122 265 L 115 180 Z`}
                    fill="#09090b"
                    stroke="#27272a"
                    strokeWidth="2"
                  />
                  <path
                    d={`M 212 162 L 188 180 L 194 265 L 238 265 L 245 180 Z`}
                    fill="#09090b"
                    stroke="#27272a"
                    strokeWidth="2"
                  />
                  {/* Silver biker zippers & notched lapel snaps */}
                  <line x1="172" y1="182" x2="166" y2="265" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3,1" />
                  <circle cx="150" cy="182" r="2" fill="#e2e8f0" />
                  <circle cx="210" cy="182" r="2" fill="#e2e8f0" />
                </g>
              )}

              {activeTop === 'era3_turtleneck_trench' && (
                <g id="turtleneckTrench">
                  {/* Black ribbed mockneck */}
                  <path d="M 166 142 L 194 142 L 196 250 L 164 250 Z" fill="#18181b" />
                  <line x1="168" y1="145" x2="192" y2="145" stroke="#27272a" strokeWidth="1" />
                  {/* Tailored camel wool trench coat */}
                  <path
                    d={`M 148 155 L 172 185 L 166 320 L 118 320 L 112 175 Z`}
                    fill="#d97706"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  <path
                    d={`M 212 155 L 188 185 L 194 320 L 242 320 L 248 175 Z`}
                    fill="#d97706"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  {/* Structured trench lapels */}
                  <path d="M 148 155 L 178 185 L 165 210 Z" fill="#b45309" />
                  <path d="M 212 155 L 182 185 L 195 210 Z" fill="#b45309" />
                </g>
              )}
            </g>
          )}
        </g>

        {/* --- LAYER 6: NECK ACCESSORIES --- */}
        <g id="neckAccessories">
          {activeAccessory === 'era0_headphones' && (
            <g id="headphones">
              {/* Padded over-ear headphones resting around the neck */}
              <path
                d="M 150 148 C 145 170, 215 170, 210 148"
                fill="none"
                stroke="#1e293b"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Left ear cup */}
              <rect x="142" y="142" width="12" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
              {/* Right ear cup */}
              <rect x="206" y="142" width="12" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
            </g>
          )}
          {activeAccessory === 'era1_choker' && (
            <g id="velvetChoker">
              {/* Black velvet ribbon choker */}
              <rect x="166" y="146" width="28" height="6" rx="1.5" fill="#09090b" />
              {/* Silver crescent moon charm */}
              <path
                d="M 180 152 A 3 3 0 1 0 180 157 A 2 2 0 1 1 180 152 Z"
                fill="#f1f5f9"
                stroke="#94a3b8"
                strokeWidth="0.5"
              />
            </g>
          )}
          {activeAccessory === 'era3_pearl_drop_necklace' && (
            <g id="pearlNecklace">
              {/* Delicate gold chain */}
              <path d="M 166 148 Q 180 168 194 148" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />
              {/* Iridescent baroque pearl drop */}
              <ellipse cx="180" cy="167" rx="3.5" ry="4.5" fill="#fefce8" stroke="#fef08a" strokeWidth="0.8" />
              <circle cx="179" cy="165" r="1" fill="#ffffff" />
            </g>
          )}
        </g>

        {/* --- LAYER 7: HEAD, FACE & EARS --- */}
        <g id="headFace">
          {/* Head & Neck Base */}
          <path
            d="M 148 95 C 148 55, 212 55, 212 95 C 212 135, 195 152, 180 152 C 165 152, 148 135, 148 95 Z"
            fill="url(#skinBase)"
            stroke={skin}
            strokeWidth="1"
          />

          {/* Ears */}
          <ellipse cx="147" cy="98" rx="4" ry="8" fill={skin} />
          <ellipse cx="213" cy="98" rx="4" ry="8" fill={skin} />

          {/* Dangling Punk Safety-Pin Earrings (if equipped) */}
          {activeAccessory === 'era2_safety_pin_earrings' && (
            <g id="safetyPinEarrings">
              <line x1="146" y1="104" x2="145" y2="120" stroke="#e2e8f0" strokeWidth="1.8" />
              <circle cx="145.5" cy="120" r="1.8" fill="#94a3b8" />
              <line x1="214" y1="104" x2="215" y2="120" stroke="#e2e8f0" strokeWidth="1.8" />
              <circle cx="214.5" cy="120" r="1.8" fill="#94a3b8" />
            </g>
          )}

          {/* Subtle 5 O'Clock Stubble Shadow (Optional boy-mode realism in era 0) */}
          {(customConfig.showStubbleShadow || (era === 0 && activeMakeup === 'era0_bare_face')) && (
            <path
              d="M 158 120 C 165 142, 195 142, 202 120 C 195 130, 165 130, 158 120 Z"
              fill="#475569"
              opacity="0.22"
              filter="url(#softBlur)"
            />
          )}

          {/* Cheeks & Blush */}
          <ellipse
            cx="160"
            cy="110"
            rx={expression === 'blush' ? '9' : '6'}
            ry="4"
            fill={blush}
            opacity={expression === 'blush' ? '0.6' : '0.28'}
            filter="url(#softBlur)"
          />
          <ellipse
            cx="200"
            cy="110"
            rx={expression === 'blush' ? '9' : '6'}
            ry="4"
            fill={blush}
            opacity={expression === 'blush' ? '0.6' : '0.28'}
            filter="url(#softBlur)"
          />

          {/* Eyes (Left & Right) */}
          <g id="eyes">
            {/* Sclera (White) */}
            <path d="M 156 94 Q 166 87, 174 94 Q 166 101, 156 94 Z" fill="#ffffff" />
            <path d="M 186 94 Q 194 87, 204 94 Q 194 101, 186 94 Z" fill="#ffffff" />

            {/* Iris */}
            <circle cx="165" cy="94" r="3.8" fill="url(#irisGrad)" />
            <circle cx="195" cy="94" r="3.8" fill="url(#irisGrad)" />

            {/* Pupil */}
            <circle cx="165" cy="94" r="1.8" fill="#09090b" />
            <circle cx="195" cy="94" r="1.8" fill="#09090b" />

            {/* Eye Catchlight Sparkles */}
            <circle cx="163.8" cy="92.8" r="1" fill="#ffffff" />
            <circle cx="193.8" cy="92.8" r="1" fill="#ffffff" />
            <circle cx="166" cy="95.5" r="0.5" fill="#ffffff" />
            <circle cx="196" cy="95.5" r="0.5" fill="#ffffff" />

            {/* Eyeliner & Wings */}
            {activeMakeup === 'era1_first_eyeliner' && (
              <g id="firstEyeliner">
                <path d="M 155 93 Q 166 86, 174 93 L 177 91" stroke="#09090b" strokeWidth="1.2" fill="none" />
                <path d="M 205 93 Q 194 86, 186 93 L 183 91" stroke="#09090b" strokeWidth="1.2" fill="none" />
              </g>
            )}
            {activeMakeup === 'era2_bold_winged' && (
              <g id="boldGraphicWings">
                {/* Sharp extended alt flick */}
                <path d="M 153 93 Q 165 85, 175 92 L 180 88" stroke="#09090b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 207 93 Q 195 85, 185 92 L 180 88" stroke="#09090b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
            {(activeMakeup === 'era3_soft_glam' || activeMakeup === 'era4_editorial_chic') && (
              <g id="editorialEyeliner">
                <path d="M 154 93 Q 166 85, 175 92 L 179 89" stroke="#09090b" strokeWidth="1.8" fill="none" />
                <path d="M 206 93 Q 194 85, 185 92 L 181 89" stroke="#09090b" strokeWidth="1.8" fill="none" />
                {/* Lifted lashes */}
                <line x1="174" y1="91" x2="177" y2="88" stroke="#09090b" strokeWidth="1" />
                <line x1="186" y1="91" x2="183" y2="88" stroke="#09090b" strokeWidth="1" />
              </g>
            )}

            {/* Eyebrows */}
            <path
              d={
                expression === 'fierce'
                  ? 'M 155 86 Q 165 83, 174 86'
                  : expression === 'nervous'
                    ? 'M 155 84 Q 165 87, 174 85'
                    : 'M 155 86 Q 165 83, 174 85'
              }
              stroke={hair}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={
                expression === 'fierce'
                  ? 'M 186 86 Q 195 83, 205 86'
                  : expression === 'smirk'
                    ? 'M 186 82 Q 195 80, 205 83'
                    : 'M 186 85 Q 195 83, 205 86'
              }
              stroke={hair}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Dainty Feminine Nose */}
          <path d="M 180 94 L 181 106 Q 183 108, 179 109" stroke="#d4a373" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Beauty Mark / Signature Mole */}
          {customConfig.beautyMark && (
            <circle cx="171" cy="106" r="0.8" fill="#451a03" />
          )}

          {/* Lips & Mouth (Expression reactive) */}
          <g id="mouth">
            {expression === 'smile' && (
              <path d="M 172 121 Q 180 128, 188 121" stroke="url(#lipGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
            {expression === 'laugh' && (
              <path d="M 170 120 Q 180 131, 190 120 Z" fill="url(#lipGrad)" stroke="#be123c" strokeWidth="1" />
            )}
            {expression === 'nervous' && (
              <path d="M 173 123 Q 177 121, 180 124 Q 184 121, 187 123" stroke="url(#lipGrad)" strokeWidth="2.5" fill="none" />
            )}
            {expression === 'fierce' && (
              <path d="M 173 122 L 187 122" stroke="url(#lipGrad)" strokeWidth="3" strokeLinecap="round" />
            )}
            {expression === 'smirk' && (
              <path d="M 173 124 Q 180 124, 188 120" stroke="url(#lipGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
            {expression === 'sad' && (
              <path d="M 172 124 Q 180 119, 188 124" stroke="url(#lipGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
            {expression === 'neutral' && (
              <path d="M 173 122 Q 180 124, 187 122" stroke="url(#lipGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            )}
            {/* Lip Gloss Shimmer */}
            <ellipse cx="180" cy="123" rx="2.5" ry="0.8" fill="#ffffff" opacity="0.6" />
          </g>
        </g>

        {/* --- LAYER 8: FRONT HAIR & BANGS --- */}
        <g id="frontHair">
          {activeHair === 'era0_messy_mop' && (
            <path
              d="M 144 95 C 142 55, 218 55, 216 95 
                 C 205 85, 195 80, 180 82 
                 C 165 80, 155 85, 144 95 Z
                 M 146 80 L 155 105 L 165 92 L 175 108 L 185 90 L 195 106 L 205 85 L 214 96"
              fill="url(#hairGrad)"
              stroke={hair}
              strokeWidth="1"
            />
          )}

          {activeHair === 'era1_messy_bangs' && (
            <g id="curtainBangs">
              {/* Crown and curtain fringe */}
              <path
                d="M 144 95 C 142 50, 218 50, 216 95 
                   C 210 75, 190 70, 180 72 
                   C 170 70, 150 75, 144 95 Z"
                fill="url(#hairGrad)"
              />
              {/* Soft bangs curving away from center forehead */}
              <path
                d="M 160 72 Q 170 85, 162 98 Q 175 80, 180 72"
                fill="url(#hairGrad)"
              />
              <path
                d="M 200 72 Q 190 85, 198 98 Q 185 80, 180 72"
                fill="url(#hairGrad)"
              />
              {/* Side wisps framing cheekbones */}
              <path d="M 146 90 Q 142 120, 148 135" stroke={hair} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 214 90 Q 218 120, 212 135" stroke={hair} strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}

          {activeHair === 'era2_wavy_bob' && (
            <g id="wavyBob">
              <path
                d="M 142 95 C 140 45, 220 45, 218 95 
                   C 225 140, 215 180, 205 195 
                   C 195 180, 205 130, 195 90 
                   C 185 70, 165 70, 155 90 
                   C 145 130, 155 180, 145 195 
                   C 135 180, 135 140, 142 95 Z"
                fill="url(#hairGrad)"
              />
              {/* Cute butterfly clip on right side */}
              <path d="M 205 82 L 210 78 L 208 86 Z M 205 82 L 210 86 L 208 78 Z" fill="#ec4899" />
            </g>
          )}

          {activeHair === 'era3_long_layers' && (
            <g id="longLayers">
              <path
                d="M 140 95 C 138 40, 222 40, 220 95 
                   C 230 160, 225 240, 215 280 
                   C 205 260, 212 180, 202 100 
                   C 190 68, 170 68, 158 100 
                   C 148 180, 155 260, 145 280 
                   C 135 240, 130 160, 140 95 Z"
                fill="url(#hairGrad)"
              />
              {/* Strand highlights */}
              <path d="M 165 52 Q 160 90, 150 140" stroke="url(#hairHighlight)" strokeWidth="2.5" fill="none" opacity="0.4" />
              <path d="M 195 52 Q 200 90, 210 140" stroke="url(#hairHighlight)" strokeWidth="2.5" fill="none" opacity="0.4" />
            </g>
          )}

          {activeHair === 'era4_signature_waves' && (
            <g id="sirenWaves">
              {/* Voluminous red-carpet waves swept dramatically to one side */}
              <path
                d="M 138 95 C 136 35, 224 35, 222 95 
                   C 235 170, 240 280, 225 340 
                   C 210 320, 215 200, 202 100 
                   C 190 65, 170 65, 158 100 
                   C 148 180, 140 250, 135 310 
                   C 125 240, 128 150, 138 95 Z"
                fill="url(#hairGrad)"
              />
              {/* Deep glamorous sweep over forehead */}
              <path
                d="M 150 65 Q 185 55, 210 88 Q 185 75, 150 65 Z"
                fill="url(#hairGrad)"
              />
              <path d="M 175 60 Q 195 80, 215 130" stroke="url(#hairHighlight)" strokeWidth="3" fill="none" opacity="0.5" />
            </g>
          )}

          {activeHair === 'pixie_sidepart' && (
            <g id="pixieCut">
              <path
                d="M 144 95 C 142 48, 218 48, 216 95 
                   C 212 90, 195 72, 178 75 
                   C 160 72, 148 88, 144 95 Z"
                fill="url(#hairGrad)"
              />
              {/* Sharp sleek fringe across forehead */}
              <path d="M 152 75 Q 175 75, 195 90 Q 170 82, 152 75 Z" fill="url(#hairGrad)" />
            </g>
          )}

          {activeHair === 'high_ponytail' && (
            <g id="ponytailFront">
              <path
                d="M 145 95 C 143 50, 217 50, 215 95 
                   C 210 82, 195 72, 180 72 
                   C 165 72, 150 82, 145 95 Z"
                fill="url(#hairGrad)"
              />
              {/* High base scrunchie */}
              <ellipse cx="215" cy="70" rx="6" ry="4" fill="#ec4899" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
