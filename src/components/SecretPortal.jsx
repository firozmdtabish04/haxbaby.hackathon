import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Key, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const CONSTELLATION_STARS = [
  { id: 1, label: '1', x: 22, y: 55, name: 'Starlight' },
  { id: 2, label: '2', x: 65, y: 30, name: 'Lullaby' },
  { id: 3, label: '3', x: 55, y: 80, name: 'Moonfluff' },
];

export function SecretPortal() {
  const [clickedSequence, setClickedSequence] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { playStarTone, playPortalUnlock, playClick } = useSound();

  const handleStarClick = (starId) => {
    const nextExpected = clickedSequence.length + 1;

    if (starId === nextExpected) {
      const newSeq = [...clickedSequence, starId];
      playStarTone(newSeq.length - 1);
      setClickedSequence(newSeq);

      if (newSeq.length === CONSTELLATION_STARS.length) {
        setIsUnlocked(true);
        playPortalUnlock();

        try {
          confetti({
            particleCount: 50,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff86b6', '#38bdf8', '#facc15', '#a855f7'],
          });
        } catch {
          // Ignored
        }
      }
    } else {
      playClick(240);
      setClickedSequence([]);
    }
  };

  const handleReset = () => {
    playClick(440);
    setClickedSequence([]);
    setIsUnlocked(false);
  };

  const remainingStars = CONSTELLATION_STARS.length - clickedSequence.length;

  return (
    <section id="portal" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          Secret Dream Portal
        </h2>
        <p className="text-sm sm:text-base text-[#cfc4f4] font-medium">
          Find the right constellation and click the stars in the correct order...
        </p>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="text-xs text-purple-300 hover:text-pink-300 underline underline-offset-4"
          >
            {showHint ? 'Hide hint' : 'Need a hint? Click here'}
          </button>
        </div>

        {showHint && (
          <p className="text-xs text-amber-200 bg-[#1e153b] p-2.5 rounded-lg border border-purple-400/30 animate-in fade-in duration-150">
            Click Star 1, then Star 2, then Star 3 to trace the constellation triangle!
          </p>
        )}
      </div>

      {/* Constellation Canvas Window */}
      <div className="relative w-full h-80 sm:h-96 bg-[#181136] border-2 sm:border-3 border-[#523d79] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(10,5,25,0.6)] select-none">
        {/* Sky Background Elements */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#c4b5fd 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Constellation SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {clickedSequence.map((step, idx) => {
            if (idx === 0) return null;
            const prevStar = CONSTELLATION_STARS.find((s) => s.id === clickedSequence[idx - 1]);
            const currStar = CONSTELLATION_STARS.find((s) => s.id === step);
            if (!prevStar || !currStar) return null;
            return (
              <line
                key={idx}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke="#fef08a"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Clickable Constellation Star Nodes (Numbered 1, 2, 3 as in mockup) */}
        {CONSTELLATION_STARS.map((star) => {
          const isLit = clickedSequence.includes(star.id);
          const isNext = star.id === clickedSequence.length + 1;

          return (
            <button
              key={star.id}
              type="button"
              onClick={() => handleStarClick(star.id)}
              style={{ top: `${star.y}%`, left: `${star.x}%` }}
              aria-label={`Star ${star.label}: ${star.name}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-full p-2 transition-transform duration-200 ${
                isLit ? 'scale-125' : isNext ? 'hover:scale-125 animate-pulse' : 'hover:scale-110'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm sm:text-base font-sans shadow-md transition-all ${
                  isLit
                    ? 'bg-[#fef08a] text-[#331c03] border-white shadow-[0_0_20px_#fde047]'
                    : isNext
                    ? 'bg-[#fef08a]/80 text-[#331c03] border-[#fde047]'
                    : 'bg-[#2a1d4a] text-[#ddd2f8] border-purple-400/40'
                }`}
              >
                {star.label}
              </div>
            </button>
          );
        })}

        {/* Bottom Pill: e.g. "3 stars to unlock..." (matching mockup) */}
        <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none">
          <div className="px-5 py-2 rounded-full bg-[#100b24]/90 border border-purple-400/40 text-xs font-mono font-bold text-[#fef08a] shadow-md backdrop-blur-xs">
            {isUnlocked ? (
              <span className="text-emerald-300">★ Portal Unlocked!</span>
            ) : (
              <span>{remainingStars} star{remainingStars > 1 ? 's' : ''} to unlock...</span>
            )}
          </div>
        </div>
      </div>

      {/* Unlocked Secret Message Modal */}
      {isUnlocked && (
        <div className="mt-6 p-6 bg-gradient-to-b from-[#2a1f4d] via-[#1d1538] to-[#140e2b] border-2 border-amber-300/80 rounded-2xl text-left shadow-[0_10px_30px_rgba(250,204,21,0.25)] animate-in fade-in duration-200 font-mono text-xs sm:text-sm text-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-300/30">
            <h3 className="text-base sm:text-lg font-bold text-amber-300 font-sans flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-300" />
              Secret Sanctuary Unlocked!
            </h3>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1 bg-amber-300/20 hover:bg-amber-300/30 text-amber-200 border border-amber-300/40 rounded-lg text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Re-Lock
            </button>
          </div>

          <p className="leading-relaxed">
            "You aligned the stars of the Midnight Nursery! Here is a secret message from Pip:
            Thank you for exploring with genuine curiosity. The early web was handcrafted with warmth,
            creativity, and small dreams that grew into giant adventures."
          </p>

          <div className="p-3 bg-black/50 rounded-xl border border-white/10 text-xs text-purple-300">
            <div>★ SECRET HACKATHON PASSCODE: <strong className="text-yellow-300 font-mono">BABY-DREAM-2026</strong></div>
            <div>★ TRACK 1 CERTIFIED: 100% Starlight Alignment</div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SecretPortal;
