import React, { useState, useEffect, useRef } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Music, Play, Square, Sparkles, Volume2, Mic, RefreshCw, Sliders, Disc } from 'lucide-react';

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

// Instrument Sound Themes (Timbres)
const INSTRUMENT_THEMES = [
  { id: 'piano', name: '🎹 Celestial Piano', type: 'triangle', duration: 0.55, badge: 'Harmonic' },
  { id: 'musicbox', name: '🔔 8-Bit Music Box', type: 'square', duration: 0.35, badge: 'Chime' },
  { id: 'vibraphone', name: '🌌 Cosmic Vibraphone', type: 'sine', duration: 0.70, badge: 'Resonant' },
  { id: 'harpsichord', name: '🧚 Starlight Harpsichord', type: 'sawtooth', duration: 0.28, badge: 'Plucked' },
];

// Pre-loaded Song Themes & Melodies
const PRELOADED_SONGS = [
  {
    id: 'twinkle',
    name: '🌟 Twinkle Twinkle',
    desc: 'Classic Starlight Bedtime Lullaby',
    notes: ['C5', 'C5', 'G5', 'G5', 'A5', 'A5', 'G5', 'F5', 'F5', 'E5', 'E5', 'D5', 'D5', 'C5'],
  },
  {
    id: 'clair-de-lune',
    name: '🌙 Clair de Lune',
    desc: 'Debussy Midnight Nocturne',
    notes: ['E5', 'G5', 'C6', 'B5', 'G5', 'E5', 'D5', 'E5', 'G5', 'C6', 'E5', 'D5', 'C5'],
  },
  {
    id: 'cosmic-odyssey',
    name: '🚀 Cosmic Odyssey',
    desc: '8-Bit Space Explorer Arpeggio',
    notes: ['C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'D5', 'F5', 'A5', 'C6', 'A5', 'F5', 'C5'],
  },
  {
    id: 'pachelbel',
    name: '🧸 Bedtime Canon',
    desc: 'Pachelbel Harmonic Chimes',
    notes: ['C6', 'B5', 'A5', 'G5', 'F5', 'E5', 'F5', 'G5', 'E5', 'F5', 'G5', 'A5', 'G5'],
  },
  {
    id: 'victory-fanfare',
    name: '🏆 Winner Fanfare',
    desc: 'haX.baby Gold Champion Jingle',
    notes: ['C5', 'E5', 'G5', 'C6', 'G5', 'C6'],
  },
  {
    id: 'rain-chimes',
    name: '🌧️ Midnight Rain',
    desc: 'Gentle Droplet Pentatonic Theme',
    notes: ['E5', 'A5', 'G5', 'E5', 'D5', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6'],
  },
  {
    id: 'birthday',
    name: '🎂 Pip’s Birthday',
    desc: 'Celebration of Dreams',
    notes: ['C5', 'C5', 'D5', 'C5', 'F5', 'E5', 'C5', 'C5', 'D5', 'C5', 'G5', 'F5'],
  },
];

export function CelestialSynth() {
  const { playTone, playClick, isMuted } = useSound();
  const [activeKey, setActiveKey] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(INSTRUMENT_THEMES[0]);
  const [currentSong, setCurrentSong] = useState(PRELOADED_SONGS[0]);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.75, 1.0, 1.25
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentPlayingNoteIndex, setCurrentPlayingNoteIndex] = useState(-1);
  const playbackTimeoutRef = useRef([]);

  const stopAllPlayback = () => {
    playbackTimeoutRef.current.forEach((t) => clearTimeout(t));
    playbackTimeoutRef.current = [];
    setIsPlayingSong(false);
    setCurrentPlayingNoteIndex(-1);
    setActiveKey(null);
  };

  const handlePlayNote = (noteObj) => {
    setActiveKey(noteObj.note);
    playTone(noteObj.freq, selectedInstrument.duration, selectedInstrument.type);
    setTimeout(() => {
      setActiveKey((prev) => (prev === noteObj.note ? null : prev));
    }, 250);

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
  }, [isRecording, selectedInstrument, playTone]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => stopAllPlayback();
  }, []);

  const handlePlaySong = (song) => {
    stopAllPlayback();
    setCurrentSong(song);
    setIsPlayingSong(true);

    const baseDelay = Math.round(360 / playbackSpeed);

    song.notes.forEach((noteName, idx) => {
      const timeout = setTimeout(() => {
        setCurrentPlayingNoteIndex(idx);
        const found = SYNTH_KEYS.find((k) => k.note === noteName);
        if (found) {
          handlePlayNote(found);
        }
        if (idx === song.notes.length - 1) {
          setTimeout(() => {
            setIsPlayingSong(false);
            setCurrentPlayingNoteIndex(-1);
          }, baseDelay);
        }
      }, idx * baseDelay);

      playbackTimeoutRef.current.push(timeout);
    });
  };

  const handlePlayRecording = () => {
    if (recordedNotes.length === 0) return;
    const customSong = {
      id: 'custom',
      name: 'Custom Recording',
      notes: recordedNotes,
    };
    handlePlaySong(customSong);
  };

  return (
    <section id="synth" className="py-10 sm:py-14 px-4 max-w-5xl mx-auto z-10 relative">
      <RetroWindow
        title="CELESTIAL_SYNTH.EXE — Pip's Grand Bedtime Piano & Sound Themes"
        icon="🎹"
        statusBarText={`INSTRUMENT: ${selectedInstrument.name.toUpperCase()} · SPEED: ${playbackSpeed}x · LATENCY: 0ms`}
      >
        <div className="space-y-6 font-mono text-center">
          {/* Header Title */}
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
              Pip's Celestial Piano &amp; Themes
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc4f4]">
              Play bedtime tunes directly on your keyboard (<kbd className="px-1.5 py-0.5 bg-purple-950 rounded border border-purple-400/30 text-yellow-300">A</kbd> to <kbd className="px-1.5 py-0.5 bg-purple-950 rounded border border-purple-400/30 text-yellow-300">K</kbd>) or explore pre-loaded songs and instruments below.
              {isMuted && (
                <span className="text-amber-300 block mt-1 font-bold">
                  ⚠️ Note: Sound is currently muted! Click Audio in the top navigation to unmute.
                </span>
              )}
            </p>
          </div>

          {/* Instrument Sound Themes (Timbres) Selector */}
          <div className="bg-[#171033] p-3 rounded-2xl border border-purple-400/30 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5 mr-2">
              <Sliders className="w-3.5 h-3.5" />
              Piano Themes:
            </span>
            {INSTRUMENT_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  playClick(500);
                  setSelectedInstrument(theme);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  selectedInstrument.id === theme.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-300 shadow-md scale-105'
                    : 'bg-[#221749] text-purple-200 border-purple-400/20 hover:bg-purple-900/40'
                }`}
              >
                <span>{theme.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-pink-200 font-mono">
                  {theme.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Keyboard Keys with Illuminated Feedback */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 max-w-3xl mx-auto overflow-x-auto p-3 bg-[#110b24] rounded-2xl border-2 border-purple-400/40 shadow-inner">
            {SYNTH_KEYS.map((item) => {
              const isActive = activeKey === item.note;
              return (
                <button
                  key={item.note}
                  type="button"
                  onClick={() => handlePlayNote(item)}
                  className={`flex flex-col items-center justify-between w-11 sm:w-16 h-36 sm:h-44 rounded-xl sm:rounded-2xl p-2.5 transition-all transform select-none cursor-pointer border-2 shadow-md ${
                    isActive
                      ? 'bg-gradient-to-b from-[#fef08a] to-[#facc15] text-[#2e1502] border-white -translate-y-2 shadow-[0_0_25px_#fde047]'
                      : 'bg-gradient-to-b from-[#2e2154] to-[#1e153b] hover:from-[#3d2c6e] hover:to-[#2a1c52] text-white border-purple-400/40'
                  }`}
                >
                  <span className="text-xs font-bold text-pink-300 bg-black/40 px-1.5 py-0.5 rounded">
                    {item.key}
                  </span>
                  <div className="text-center">
                    <span className="block text-sm sm:text-base font-black font-sans">{item.note}</span>
                    <span className="text-[10px] font-mono text-purple-200/80">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Playing Note Ticker (when song is playing) */}
          {isPlayingSong && currentSong && (
            <div className="bg-[#181136] border border-pink-400/40 rounded-xl p-2.5 max-w-xl mx-auto flex items-center justify-center gap-2 text-xs">
              <Disc className="w-4 h-4 text-pink-400 animate-spin" />
              <span className="text-purple-300">Playing:</span>
              <span className="text-yellow-300 font-bold">{currentSong.name}</span>
              <span className="text-slate-400 text-[11px]">
                ({currentPlayingNoteIndex + 1} / {currentSong.notes.length})
              </span>
            </div>
          )}

          {/* Pre-loaded Songs Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 max-w-3xl mx-auto px-1">
              <span className="text-xs text-yellow-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                Pre-Loaded Bedtime Songs:
              </span>

              {/* Playback speed toggle */}
              <div className="flex items-center gap-1.5 bg-[#171033] px-2 py-1 rounded-lg border border-purple-400/30 text-xs">
                <span className="text-purple-300 text-[11px]">Tempo:</span>
                {[0.75, 1.0, 1.25].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      playbackSpeed === speed
                        ? 'bg-yellow-400 text-black'
                        : 'text-purple-200 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-w-3xl mx-auto">
              {PRELOADED_SONGS.map((song) => {
                const isThisPlaying = isPlayingSong && currentSong?.id === song.id;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => {
                      if (isThisPlaying) {
                        stopAllPlayback();
                      } else {
                        handlePlaySong(song);
                      }
                    }}
                    className={`p-2.5 text-left rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                      isThisPlaying
                        ? 'bg-gradient-to-r from-purple-800 to-pink-900 border-pink-400 shadow-md ring-2 ring-pink-400/50'
                        : 'bg-[#191138] hover:bg-[#271a54] text-purple-200 border-purple-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-sans">{song.name}</span>
                      {isThisPlaying ? (
                        <Square className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-purple-300/70 font-mono truncate">
                      {song.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recording & Stop Control Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-purple-400/20 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => {
                if (isRecording) {
                  setIsRecording(false);
                } else {
                  setRecordedNotes([]);
                  setIsRecording(true);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isRecording
                  ? 'bg-red-600 text-white border-red-400 animate-pulse'
                  : 'bg-[#1a1238] hover:bg-purple-900/50 text-purple-200 border-purple-400/30'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-red-400" />
              <span>{isRecording ? 'Stop Recording' : 'Record My Tune'}</span>
            </button>

            {recordedNotes.length > 0 && (
              <button
                type="button"
                onClick={handlePlayRecording}
                disabled={isPlayingSong}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a1238] hover:bg-emerald-900/50 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Replay Recorded ({recordedNotes.length} notes)</span>
              </button>
            )}

            {isPlayingSong && (
              <button
                type="button"
                onClick={stopAllPlayback}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-400/40 flex items-center gap-1.5 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 text-pink-300" />
                <span>Stop Playing</span>
              </button>
            )}
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default CelestialSynth;
