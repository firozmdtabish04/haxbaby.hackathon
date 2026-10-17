import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function SoundToggle({ className = '' }) {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-pressed={!isMuted}
      aria-label={isMuted ? 'Turn retro sound effects ON' : 'Turn retro sound effects OFF'}
      title={isMuted ? 'Sound: OFF (Click to enable synth audio)' : 'Sound: ON (Click to mute)'}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded border transition-colors select-none ${
        isMuted
          ? 'bg-[#181a33] text-slate-400 border-white/20 hover:border-pink-400/50 hover:text-pink-300'
          : 'bg-[#ff6b9d]/20 text-[#ff8eb4] border-[#ff6b9d]/60 shadow-[0_0_12px_rgba(255,107,157,0.3)] animate-pulse'
      } ${className}`}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-300 transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[#ff8eb4]" />
      )}
      <span className="hidden sm:inline">
        {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON ♫'}
      </span>
      <span className="sm:hidden">
        {isMuted ? 'OFF' : 'ON ♫'}
      </span>
    </button>
  );
}

export default SoundToggle;
