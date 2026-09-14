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
}

export const soundEngine = new SoundEngine();
