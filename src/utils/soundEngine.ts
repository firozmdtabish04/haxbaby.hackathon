// Web Audio API Sound Engine for Pip's Midnight Nursery
// Zero external assets needed, pure synthesized dream chimes, rattles, and lullabies!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentLullabyTimer: number | null = null;

  constructor() {
    // Read mute preference from localStorage
    const saved = localStorage.getItem('pip_sound_muted');
    this.isMuted = saved === 'true';
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('pip_sound_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.playChime();
    } else {
      this.stopLullaby();
    }
    return this.isMuted;
  }

  public playClick(freq = 600) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy catch
    }
  }

  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (cozy star chime)
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.06, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.5);
      });
    } catch {
      // Ignored
    }
  }

  public playGiggle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Friendly high-pitched baby giggle synth
      const pitches = [700, 880, 960, 1100, 880, 960];
      pitches.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.07, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.06);
      });
    } catch {
      // Ignored
    }
  }

  public playRattle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Maraca / baby rattle noise burst
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + i * 0.035;

        osc.type = 'square';
        osc.frequency.setValueAtTime(2400 + Math.random() * 800, start);

        gain.gain.setValueAtTime(0.03, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.04);
      }
    } catch {
      // Ignored
    }
  }

  public playLullabyMelody(onEnd?: () => void) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    this.stopLullaby();

    // Twinkle lullaby sequence: [freq, duration in beats]
    const lullabyNotes = [
      523.25, 523.25, 783.99, 783.99, 880.00, 880.00, 783.99, // C C G G A A G
      698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25  // F F E E D D C
    ];

    let step = 0;
    const interval = 450; // ms

    const playNext = () => {
      if (this.isMuted || step >= lullabyNotes.length) {
        if (onEnd) onEnd();
        return;
      }
      const freq = lullabyNotes[step];
      if (this.ctx) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.6);
      }
      step++;
      this.currentLullabyTimer = window.setTimeout(playNext, interval);
    };

    playNext();
  }

  public stopLullaby() {
    if (this.currentLullabyTimer) {
      clearTimeout(this.currentLullabyTimer);
      this.currentLullabyTimer = null;
    }
  }
}

export const sound = new SoundEngine();
