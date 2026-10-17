import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSound } from '../hooks/useSound';

export function VisitorCounter({ className = '' }) {
  // Base seed matching mockup (00427) + local browser visits
  const [localVisits, setLocalVisits] = useLocalStorage('pip_terminal_visits', 0);
  const [hasIncrementedThisSession, setHasIncrementedThisSession] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    if (!hasIncrementedThisSession) {
      setLocalVisits((prev) => (Number(prev) || 0) + 1);
      setHasIncrementedThisSession(true);
    }
  }, [hasIncrementedThisSession, setLocalVisits]);

  const displayCount = 426 + (Number(localVisits) || 1);
  const formattedCount = String(displayCount).padStart(5, '0');

  const handleManualIncrement = () => {
    playClick(720);
    setLocalVisits((prev) => (Number(prev) || 0) + 1);
  };

  return (
    <div
      onClick={handleManualIncrement}
      title="Click to stamp your local visitor number!"
      className={`inline-flex flex-col items-start bg-[#181236]/90 px-3 py-2 rounded-xl border border-purple-400/30 shadow-xs select-none cursor-pointer hover:border-purple-400/60 transition-colors ${className}`}
    >
      <span className="text-[11px] font-sans font-bold text-[#c4b5fd] mb-1">
        Visitors
      </span>

      {/* 5 Digit Slots matching mockup `[0][0][4][2][7]` */}
      <div className="flex items-center gap-1">
        {formattedCount.split('').map((digit, idx) => (
          <div
            key={idx}
            className="w-6 h-7 bg-[#0b081e] border border-purple-400/40 rounded flex items-center justify-center font-mono text-sm font-bold text-[#fef08a] shadow-inner"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitorCounter;
