import React, { useState, useEffect } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Music, Play, Square, Sparkles, Volume2 } from 'lucide-react';

const SYNTH_KEYS = [
  { note: 'C5', key: 'A', freq: 523.25, label: 'Do' },
  { note: 'D5', key: 'S', freq: 587.33, label: 'Re' },
  { note: 'E5', key: 'D', freq: 659.25, label: 'Mi' },
  { note: 'F5', key: 'F', freq: 698.46, label: 'Fa' },
  { note: 'G5', key: 'G', freq: 783.99, label: 'Sol' },
  { note: 'A5', key: 'H', freq: 880.00, label: 'La' },
  { note: 'B5', key: 'J', freq: 987.77, label: 'Ti' },
  { note: 'C6', key: 'K', freq: 1046.50, label: 'Do+' },
];

const PRESETS = [
  {
    name: 'Twinkle Starlight',
    notes: ['C5', 'C5', 'G5', 'G5', 'A5', 'A5', 'G5', 'F5', 'F5', 'E5', 'E5', 'D5', 'D5', 'C5'],
  },
  {
    name: 'Brahms Lullaby',
    notes: ['E5', 'E5', 'G5', 'E5', 'E5', 'G5', 'E5', 'G5', 'C6', 'B5', 'A5', 'A5', 'G5'],
  },
  {
    name: 'Cosmic Chime',
    notes: ['C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'C5'],
  },
];

export function CelestialSynth() {
  const { playTone, playClick, isMuted } = useSound();
  const [activeKey, setActiveKey] = useState(null);
  const [isPlayingPreset, setIsPlayingPreset] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const handlePlayNote = (noteObj) => {
    setActiveKey(noteObj.note);
    playTone(noteObj.freq, 0.45, 'sine');
    setTimeout(() => setActiveKey(null), 250);

    if (isRecording) {
      setRecordedNotes((prev) => [...prev, noteObj.note]);
    }
  };

  // Keyboard shortcut listener (A, S, D, F, G, H, J, K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const target = SYNTH_KEYS.find((k) => k.key.toLowerCase() === e.key.toLowerCase());
      if (target) {
        handlePlayNote(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, playTone]);

  const handlePlayPreset = (preset) => {
    if (isPlayingPreset) return;
    setIsPlayingPreset(true);

    preset.notes.forEach((noteName, idx) => {
      setTimeout(() => {
        const found = SYNTH_KEYS.find((k) => k.note === noteName);
        if (found) {
          handlePlayNote(found);
        }
        if (idx === preset.notes.length - 1) {
          setIsPlayingPreset(false);
        }
      }, idx * 360);
    });
  };

  return (
    <section id="synth" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="CELESTIAL_SYNTH.EXE — Pip's 8-Bit Bedtime Music Box"
        icon="🎹"
        statusBarText="AUDIO ENGINE: WEB AUDIO API · SAMPLING: 44.1kHz · LATENCY: 0ms"
      >
        <div className="space-y-6 font-mono text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
              Pip's Celestial Music Box
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc4f4]">
              Play bedtime tunes directly on your keyboard (keys A–K) or click the chime keys below.
              {isMuted && <span className="text-amber-300 block mt-1">⚠️ Note: Audio is currently muted! Click Audio in the top bar to unmute.</span>}
            </p>
          </div>

          {/* Interactive Keyboard Keys */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 max-w-2xl mx-auto overflow-x-auto p-2 pb-4">
            {SYNTH_KEYS.map((item) => {
              const isActive = activeKey === item.note;
              return (
                <button
                  key={item.note}
                  type="button"
                  onClick={() => handlePlayNote(item)}
                  className={`flex flex-col items-center justify-between w-10 sm:w-14 h-32 sm:h-40 rounded-xl sm:rounded-2xl p-2 transition-all transform select-none cursor-pointer border-2 shadow-md ${
                    isActive
                      ? 'bg-[#fef08a] text-[#331c03] border-white -translate-y-1 shadow-[0_0_15px_#fde047]'
                      : 'bg-[#2a1e4e] hover:bg-[#382b68] text-white border-purple-400/40'
                  }`}
                >
                  <span className="text-[10px] font-bold text-pink-300">{item.key}</span>
                  <div className="text-center">
                    <span className="block text-xs font-bold">{item.note}</span>
                    <span className="text-[10px] text-purple-300/80">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preset Songs & Recording Station */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="text-xs text-purple-300 font-bold uppercase tracking-wider mr-1">
              Preset Lullabies:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                disabled={isPlayingPreset}
                onClick={() => handlePlayPreset(preset)}
                className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#140e2d] hover:bg-purple-900/50 active:bg-[#0c081e] text-purple-200 border border-purple-400/30 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default CelestialSynth;
