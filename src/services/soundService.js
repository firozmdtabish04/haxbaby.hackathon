// Web Audio API Retro Sound Service & Advanced Procedural Sound Engine
// Generates whimsical retro 8-bit, chime sounds, and procedural ambient sleep soundscapes.
// Pure Web Audio API: Zero external audio files required.

class SoundService {
  constructor() {
    this.ctx = null;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('pip_sound_muted') : null;
    this.isMuted = saved !== null ? saved === 'true' : true;
    this.listeners = new Set();
    this.lullabyTimer = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.currentAmbientType = null;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  getMuted() {
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pip_sound_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.initContext();
      this.playChime();
    } else {
      this.stopLullaby();
      this.stopAmbientNoise();
    }
    this.notify();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.isMuted));
  }

  playClick(freq = 580) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore autoplay constraints
    }
  }

  playTone(freq = 440, duration = 0.5, type = 'sine') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Bell-like harmonic envelope
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignored
    }
  }

  playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.07, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Ignored
    }
  }

  playStarTone(index = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const pentatonic = [523.25, 659.25, 783.99, 1046.5, 1174.66];
    const freq = pentatonic[index % pentatonic.length];

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.55);
    } catch {
      // Ignored
    }
  }

  playPortalUnlock() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.6);
      });
    } catch {
      // Ignored
    }
  }

  playInventionHum() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.25);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch {
      // Ignored
    }
  }

  playGiggle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const pitches = [740, 880, 987, 1174, 987, 1174];
      pitches.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.045;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.06, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.05);
      });
    } catch {
      // Ignored
    }
  }

  playLullaby(onComplete) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    this.stopLullaby();

    const notes = [523.25, 523.25, 783.99, 783.99, 880, 880, 783.99, 659.25, 659.25, 587.33, 587.33, 523.25];
    let step = 0;
    const interval = 420;

    const playStep = () => {
      if (this.isMuted || step >= notes.length) {
        if (onComplete) onComplete();
        return;
      }
      const freq = notes[step];
      if (this.ctx) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.55);
      }
      step++;
      this.lullabyTimer = window.setTimeout(playStep, interval);
    };

    playStep();
  }

  stopLullaby() {
    if (this.lullabyTimer) {
      clearTimeout(this.lullabyTimer);
      this.lullabyTimer = null;
    }
  }

  // --- Procedural Ambient Sleep Sound Generator ---
  startAmbientNoise(type = 'rain') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    this.stopAmbientNoise();

    try {
      this.currentAmbientType = type;
      if (type === 'rain') {
        // Synthesize soft pink noise rain
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.11;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);
        whiteNoise.start();
        this.ambientSource = whiteNoise;
      } else if (type === 'drone') {
        // 432Hz deep space harmonic drone
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, this.ctx.currentTime);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(216, this.ctx.currentTime);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

        osc1.connect(this.ambientGain);
        osc2.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);
        osc1.start();
        osc2.start();
        this.ambientSource = {
          stop: () => {
            osc1.stop();
            osc2.stop();
          },
        };
      }
    } catch {
      // Ignored
    }
  }

  stopAmbientNoise() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch {}
      this.ambientSource = null;
    }
    this.currentAmbientType = null;
  }

  getCurrentAmbientType() {
    return this.currentAmbientType;
  }
}

export const soundService = new SoundService();
