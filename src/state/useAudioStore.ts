// Web Audio API procedural sound effects synthesizer
// Ensures instant, zero-latency, zero-dependency audio for the game

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.initCtx();
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  // Soft UI click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  // Incoming text message chime
  public playPhonePing() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.setValueAtTime(1174.66, now + 0.08); // D6
      
      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.36);
    } catch {}
  }

  // Romance / confidence sparkle chime
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(this.volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
      });
    } catch {}
  }

  // Deep heartbeat pulse for high anxiety / intimate suspense
  public playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Double thud: lub-dub
      [0, 0.14].forEach((delay) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(75, now + delay);
        osc.frequency.exponentialRampToValueAtTime(35, now + delay + 0.12);
        gain.gain.setValueAtTime(this.volume * 0.5, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.13);
      });
    } catch {}
  }

  // Boundary clash victory / confidence surge
  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(this.volume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
      });
    } catch {}
  }

  // Pure sine pitch tone for vocal training
  public playPitchTone(hz: number, durationSec: number = 0.5) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz, now);
      gain.gain.setValueAtTime(this.volume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + durationSec + 0.05);
    } catch {}
  }

  // Tension chord for rude/invasive remarks
  public playTension() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Dissonant low clash
      [180, 191].forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(this.volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.62);
      });
    } catch {}
  }

  // Procedural Lo-Fi Ambient Soundtrack Generator
  private bgmInterval: number | null = null;
  private isBgmActive: boolean = false;

  public startBgm() {
    if (this.bgmInterval || this.isMuted) return;
    this.isBgmActive = true;
    const chords = [
      [349.23, 440, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
      [392.00, 493.88, 587.33, 659.25], // G6 (G4, B4, D5, E5)
      [329.63, 392.00, 493.88, 587.33], // Em7 (E4, G4, B4, D5)
      [440.00, 523.25, 659.25, 783.99], // Am7 (A4, C5, E5, G5)
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isBgmActive || this.isMuted) return;
      try {
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = chords[chordIdx % chords.length];
        chordIdx++;

        notes.forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(850, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(this.volume * 0.05, now + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + i * 0.08);
          osc.stop(now + 3.4);
        });
      } catch {}
    };

    playChord();
    this.bgmInterval = window.setInterval(playChord, 3800);
  }

  public stopBgm() {
    this.isBgmActive = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // Shutter click for photo snaps
  public playCameraSnap() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // High click + noise click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.06);
      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Melodic affirmation / wellness routine chime
  public playSuccessChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(this.volume * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      });
    } catch {}
  }

  // Character emotional vocal cue synthesized via formants
  public playVocalAccent(type: 'giggle' | 'gasp' | 'sigh' | 'affirmation') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === 'giggle') {
        // High playful double blip
        [0, 0.09].forEach((delay, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33 + i * 110, now + delay);
          gain.gain.setValueAtTime(this.volume * 0.2, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
      } else if (type === 'gasp') {
        // Quick rising breathy sine
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
        gain.gain.setValueAtTime(this.volume * 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'sigh') {
        // Soft descending warm tone
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.3);
        gain.gain.setValueAtTime(this.volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'affirmation') {
        // Warm two-note bell
        [440, 554.37].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(this.volume * 0.22, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.29);
        });
      }
    } catch {}
  }

  public isBgmRunning(): boolean {
    return this.isBgmActive;
  }

  public toggleBgm(): boolean {
    if (this.isBgmActive) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  // ==========================================
  // Procedural Ambient Soundscapes (Rain, Fireplace, Vinyl, City)
  // ==========================================
  private ambientType: 'rain' | 'fireplace' | 'vinyl' | 'city' | 'none' = 'none';
  private ambientGain: GainNode | null = null;
  private ambientNodes: (AudioNode | number)[] = [];
  private ambientVolume: number = 0.5;

  public setAmbientVolume(vol: number) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.ambientVolume * 0.4, this.ctx.currentTime);
    }
  }

  public getAmbientVolume(): number {
    return this.ambientVolume;
  }

  public getCurrentAmbient(): 'rain' | 'fireplace' | 'vinyl' | 'city' | 'none' {
    return this.ambientType;
  }

  public stopAmbient() {
    this.ambientType = 'none';
    this.ambientNodes.forEach((node) => {
      if (typeof node === 'number') {
        clearInterval(node);
      } else {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {}
      }
    });
    this.ambientNodes = [];
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {}
      this.ambientGain = null;
    }
  }

  public playAmbient(type: 'rain' | 'fireplace' | 'vinyl' | 'city' | 'none') {
    if (type === 'none') {
      this.stopAmbient();
      return;
    }
    if (this.ambientType === type) return;

    this.stopAmbient();
    this.ambientType = type;

    if (this.isMuted) return;

    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.ambientVolume * 0.35, now);
      this.ambientGain.connect(this.ctx.destination);

      const sampleRate = this.ctx.sampleRate || 44100;

      if (type === 'rain') {
        // Continuous rainfall: Brownian/pink filtered noise buffer with sporadic droplet pings
        const bufferSize = sampleRate * 3;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.1;
          b2 = 0.85 * b2 + white * 0.2;
          output[i] = (b0 + b1 + b2) * 0.25;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const rainFilter = this.ctx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(750, now);

        const highPass = this.ctx.createBiquadFilter();
        highPass.type = 'highpass';
        highPass.frequency.setValueAtTime(160, now);

        whiteNoise.connect(rainFilter);
        rainFilter.connect(highPass);
        highPass.connect(this.ambientGain);
        whiteNoise.start(now);
        this.ambientNodes.push(whiteNoise);

        // Random delicate raindrop patters on window glass
        const dropInterval = window.setInterval(() => {
          if (!this.ctx || !this.ambientGain || this.ambientType !== 'rain') return;
          try {
            const dropTime = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const freq = 1200 + Math.random() * 800;
            osc.frequency.setValueAtTime(freq, dropTime);
            osc.frequency.exponentialRampToValueAtTime(300, dropTime + 0.04);
            gain.gain.setValueAtTime(this.ambientVolume * 0.04 * Math.random(), dropTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, dropTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ambientGain);
            osc.start(dropTime);
            osc.stop(dropTime + 0.05);
          } catch {}
        }, 320);
        this.ambientNodes.push(dropInterval);

      } else if (type === 'fireplace') {
        // Hearthside embers: warm rumble + sporadic crackle snaps
        const bufferSize = sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 2.5;
        }

        const rumbleSource = this.ctx.createBufferSource();
        rumbleSource.buffer = noiseBuffer;
        rumbleSource.loop = true;

        const rumbleFilter = this.ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.setValueAtTime(300, now);

        rumbleSource.connect(rumbleFilter);
        rumbleFilter.connect(this.ambientGain);
        rumbleSource.start(now);
        this.ambientNodes.push(rumbleSource);

        // Fire ember crackle pops
        const crackleInterval = window.setInterval(() => {
          if (!this.ctx || !this.ambientGain || this.ambientType !== 'fireplace') return;
          if (Math.random() > 0.4) return;
          try {
            const cTime = this.ctx.currentTime;
            const popOsc = this.ctx.createOscillator();
            const popGain = this.ctx.createGain();
            popOsc.type = 'sawtooth';
            popOsc.frequency.setValueAtTime(800 + Math.random() * 1200, cTime);
            popGain.gain.setValueAtTime(this.ambientVolume * (0.05 + Math.random() * 0.08), cTime);
            popGain.gain.exponentialRampToValueAtTime(0.0001, cTime + 0.02);
            popOsc.connect(popGain);
            popGain.connect(this.ambientGain);
            popOsc.start(cTime);
            popOsc.stop(cTime + 0.03);
          } catch {}
        }, 180);
        this.ambientNodes.push(crackleInterval);

      } else if (type === 'vinyl') {
        // Vintage record vinyl: subtle low motor hum + dust surface noise + periodic groove ticks
        const humOsc = this.ctx.createOscillator();
        const humGain = this.ctx.createGain();
        humOsc.type = 'sine';
        humOsc.frequency.setValueAtTime(60, now);
        humGain.gain.setValueAtTime(this.ambientVolume * 0.03, now);
        humOsc.connect(humGain);
        humGain.connect(this.ambientGain);
        humOsc.start(now);
        this.ambientNodes.push(humOsc);

        // Periodic vinyl rotation tick (approx 33 RPM = 1.8s per rev)
        const tickInterval = window.setInterval(() => {
          if (!this.ctx || !this.ambientGain || this.ambientType !== 'vinyl') return;
          try {
            const tTime = this.ctx.currentTime;
            const tickOsc = this.ctx.createOscillator();
            const tickGain = this.ctx.createGain();
            tickOsc.type = 'triangle';
            tickOsc.frequency.setValueAtTime(1400, tTime);
            tickGain.gain.setValueAtTime(this.ambientVolume * 0.06, tTime);
            tickGain.gain.exponentialRampToValueAtTime(0.0001, tTime + 0.015);
            tickOsc.connect(tickGain);
            tickGain.connect(this.ambientGain);
            tickOsc.start(tTime);
            tickOsc.stop(tTime + 0.02);
          } catch {}
        }, 1818);
        this.ambientNodes.push(tickInterval);

        // Random dust surface ticks
        const dustInterval = window.setInterval(() => {
          if (!this.ctx || !this.ambientGain || this.ambientType !== 'vinyl') return;
          if (Math.random() > 0.5) return;
          try {
            const dTime = this.ctx.currentTime;
            const dustOsc = this.ctx.createOscillator();
            const dustGain = this.ctx.createGain();
            dustOsc.type = 'triangle';
            dustOsc.frequency.setValueAtTime(2000 + Math.random() * 1500, dTime);
            dustGain.gain.setValueAtTime(this.ambientVolume * (0.02 + Math.random() * 0.04), dTime);
            dustGain.gain.exponentialRampToValueAtTime(0.0001, dTime + 0.01);
            dustOsc.connect(dustGain);
            dustGain.connect(this.ambientGain);
            dustOsc.start(dTime);
            dustOsc.stop(dTime + 0.015);
          } catch {}
        }, 220);
        this.ambientNodes.push(dustInterval);

      } else if (type === 'city') {
        // Muffled neon city street hum: low traffic drone + gentle resonant wind
        const trafficOsc1 = this.ctx.createOscillator();
        const trafficGain1 = this.ctx.createGain();
        trafficOsc1.type = 'sawtooth';
        trafficOsc1.frequency.setValueAtTime(85, now);

        const filter1 = this.ctx.createBiquadFilter();
        filter1.type = 'lowpass';
        filter1.frequency.setValueAtTime(140, now);

        trafficGain1.gain.setValueAtTime(this.ambientVolume * 0.08, now);
        trafficOsc1.connect(filter1);
        filter1.connect(trafficGain1);
        trafficGain1.connect(this.ambientGain);
        trafficOsc1.start(now);
        this.ambientNodes.push(trafficOsc1);

        // Gentle city neon drone
        const neonOsc = this.ctx.createOscillator();
        const neonGain = this.ctx.createGain();
        neonOsc.type = 'sine';
        neonOsc.frequency.setValueAtTime(220, now);
        neonGain.gain.setValueAtTime(this.ambientVolume * 0.02, now);
        neonOsc.connect(neonGain);
        neonGain.connect(this.ambientGain);
        neonOsc.start(now);
        this.ambientNodes.push(neonOsc);
      }
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
