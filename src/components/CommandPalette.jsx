import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSound } from '../hooks/useSound';
import { Search, Compass, Music, Sparkles, Moon, Wrench, MessageSquare, Key, Wand2, X } from 'lucide-react';

export function CommandPalette({ isOpen, onClose, onToggleChaos, chaosMode }) {
  const [query, setQuery] = useState('');
  const { toggleMute, isMuted, playClick } = useSound();

  const commands = [
    { id: 'home', label: 'Go to Home / Hero', icon: Compass, action: () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'about', label: 'View About Pip', icon: Moon, action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'dreams', label: 'Open Dream Diary', icon: Sparkles, action: () => document.querySelector('#dreams')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'inventions', label: 'Explore Invention Workshop', icon: Wrench, action: () => document.querySelector('#inventions')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'tamagotchi', label: 'Pet & Care for Pip (Tamagotchi)', icon: Sparkles, action: () => document.querySelector('#tamagotchi')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'synth', label: 'Play Celestial Music Box (Synth)', icon: Music, action: () => document.querySelector('#synth')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'weaver', label: 'Craft Bedtime Postcard (Dream Weaver)', icon: Wand2, action: () => document.querySelector('#weaver')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'sleep-aid', label: 'Open Sleep Aid Soundscape', icon: Moon, action: () => document.querySelector('#sleep-aid')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'oracle', label: 'Consult Dream Crystal Ball (Oracle)', icon: Sparkles, action: () => document.querySelector('#oracle')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'goodies', label: 'Download Certificates & Wallpapers', icon: Sparkles, action: () => document.querySelector('#goodies')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'webring', label: 'View 88x31 Button Wall & Webring', icon: Compass, action: () => document.querySelector('#webring')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'guestbook', label: 'Sign Guestbook', icon: MessageSquare, action: () => document.querySelector('#guestbook')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'portal', label: 'Secret Constellation Portal', icon: Key, action: () => document.querySelector('#portal')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'sound', label: isMuted ? 'Turn Sound ON' : 'Mute Sound', icon: Music, action: () => toggleMute() },
    { id: 'chaos', label: chaosMode ? 'Turn Chaos Mode OFF' : 'Engage 90s Chaos Mode', icon: Sparkles, action: () => onToggleChaos() },
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when command palette is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[9999] overflow-y-auto flex items-start justify-center pt-16 sm:pt-20 px-4 pb-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#1a1438] border-2 border-purple-400/50 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-[#130d29] border-b border-purple-400/30">
          <Search className="w-4 h-4 text-purple-300" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section (e.g. synth, dreams, guestbook)..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto overscroll-contain p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => {
                    playClick(620);
                    cmd.action();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-600/30 active:bg-purple-600/50 text-slate-200 hover:text-white text-left transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-[#ff86b6] shrink-0" />
                  <span className="truncate">{cmd.label}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Hint */}
        <div className="px-4 py-2 bg-[#0e0921] border-t border-purple-400/20 text-[10px] text-slate-400 flex justify-between items-center select-none">
          <span>ProTip: Press <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-white/10">Esc</kbd> to close</span>
          <span className="text-[#f472b6]">PIP COMMAND HUD</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CommandPalette;
