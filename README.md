# 🌸 Eve: Blossoming Horizon — Trans Romance & Self-Discovery Dating Sim

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-729B1B?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> *"Transition is not merely about changing how the world perceives you; it is about learning to gaze into your own reflection and fall in love with who is smiling back."*

**Eve: Blossoming Horizon** is an expansive, highly visual, branching dating sim and interactive narrative experience centered around **Eve**, a transgender woman embarking on her journey from the earliest fragile moments of egg-cracking to radiant, self-actualized authenticity.

---

## ✨ Core Narrative & Eras

Experience Eve's evolution across **4 distinct transition eras**, where choices, emotional resonance, voice pitch training, and personal style directly influence how society, suitors, and friends perceive and treat her:

1. **Era 1: Fragile Awakening (0–3 Months HRT)**  
   *Oversized pastel hoodies, quiet vulnerability, and the terror of stepping outside for the first time.*  
   * First coffee date at Sunbeam Café with Liam the gentle florist.
   * "Velvet Vintage" thrift shopping with wingwoman Tara to claim her first true wardrobe pieces.
   * Coping with initial social anxiety, voice tremors, and finding self-worth.

2. **Era 2: Finding Voice & Style (4–9 Months HRT)**  
   *Voice resonance training, experimentation with makeup, and expanding horizons.*  
   * Under-the-stars park strolls and botanical greenhouse tours.
   * Late-night underground rock gigs at *Neon Riot* with Chloe, learning bass guitar vibrations.
   * Navigating early dating tropes, microaggressions, and the distinction between genuine attraction and exoticization.

3. **Era 3: Confident Horizons (10–18 Months HRT)**  
   *Flourishing confidence, self-advocacy, and emotional maturity.*  
   * Rooftop skyline lounges and indie retro arcade hackathons with Julian.
   * Museum planetarium observation deck walks beneath starlit dome projections.
   * Confronting cautionary red-flag dates (Marcus the chaser) and asserting boundary-setting strength.

4. **Era 4: Authentic Radiance (18+ Months HRT)**  
   *Radiant self-assurance, blooming romance, and complete self-celebration.*  
   * Multi-stage climaxes and deep epilogues tailored to your chosen suitor—or the empowering **Solo Horizon** ending celebrating self-love and community leadership.

---

## 📱 HerSpace OS — Interactive Smartphone

Access Eve's custom smartphone at any moment during gameplay:

- **💖 Spark (Dating App)**: Browse detailed suitor profiles, swipe, read chat histories, and unlock dates.
- **🛡️ The Nest (#the-nest-sanctuary)**: An authentic, warm, and supportive online trans community chatroom. Seek guidance, share dysphoria struggles, celebrate HRT milestones, and receive tailored validation and advice from community sisters (Riley, Sasha, Tara, and Chloe).
- **📸 Snaps (Polaroid Memories Album)**: Collect in-game polaroids and memory CGs of milestone dates, thrift outings, and quiet reflections.
- **🎙️ Voice Coach (Resonance Tuner)**: An interactive frequency/pitch resonance coach with live synthetic Web Audio pitch tone generation, target frequency indicators (180 Hz–220 Hz feminine target resonance), and confidence boost rewards.
- **👗 Wardrobe & Mirror**: Customize Eve's hairstyles, outfits, and cosmetics, with live reflection rendering in the room mirror and dialogue sprites.

---

## 🎵 Procedural Lo-Fi Ambient Audio Engine

Engineered with zero external asset dependencies using the native **Web Audio API**:
- **Procedural Lo-Fi Ambient BGM**: Generates soothing, warm, lowpass-filtered chord progressions with soft vinyl-style warmth.
- **Interactive Pitch Tone Synthesizer**: Generates exact sinusoidal pitch reference tones for voice practice.
- **Retro Spatial UI FX**: Haptic clicks, camera shutters, level chimes, and page rustles.

---

## 👥 Suitors & Characters

| Character | Role | Description |
| :--- | :--- | :--- |
| **Liam** | *The Gentle Florist* | Warm, respectful, and attentive. Cultivates rare orchids and offers unconditional safety and gentle pacing. |
| **Chloe** | *The Rebel Bassist* | Electric, outspoken, and fiercely proud T4T punk musician who shows Eve the beauty of fearless trans joy. |
| **Julian** | *The Indie Game Dev* | Thoughtful, nerdy, and creative. Connects over pixel art, synth music, and shared late-night vulnerability. |
| **Marcus** | *The Cautionary Chaser* | High-pressure, performative charmer whose backhanded compliments test Eve's boundary-setting resolve. |
| **Tara** | *The Ride-or-Die Bestie* | Eve's fiercely loyal cis wingwoman who drives the thrift trips, fights off transphobes, and delivers hype. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite 6](https://vitejs.dev/) with SWC
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Special Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio Engine**: Custom Web Audio API synthesizer (`SoundEngine`)
- **State Management**: Reactive state store with multi-slot local storage persistence & auto-save
- **Testing**: [Vitest](https://vitest.dev/) automated story graph and state integrity suites

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Zykoraa/eve-dating-sim.git

# Navigate into project directory
cd eve-dating-sim

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

```bash
npm run dev      # Start Vite development server with HMR
npm run build    # Type-check and create optimized production build
npm test         # Run story graph integrity and state unit tests
npm run preview  # Preview production build locally
```

---

## 🖼️ Gallery & Endings

- **Liam Route: The Greenhouse Sanctuary**
- **Chloe Route: The T4T Punk Revolution**
- **Julian Route: Dreamscape Collaboration**
- **Solo Route: The Radiant Self-Love Horizon**

Track unlocked memory polaroids, ending titles, and milestone achievements in the **Title Screen Gallery**.

---

## 💜 Heartfelt Note

This project was built with deep empathy, authenticity, and celebration of the transgender journey—honoring the fears, the sisterhood, the dysphoria hurdles, and above all, the transcendent joy of becoming oneself.

