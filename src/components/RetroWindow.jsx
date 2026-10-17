import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function RetroWindow({
  title = 'Window',
  icon = '📁',
  children,
  onClose,
  onMinimize,
  statusBarText = 'STATUS: 100% COZY · READY',
  className = '',
  headerBg = 'bg-gradient-to-r from-[#2a1d4a] via-[#35255e] to-[#251842]',
  borderColor = 'border-[#584180]',
}) {
  const { playClick } = useSound();

  const handleClose = (e) => {
    e.stopPropagation();
    playClick(440);
    if (onClose) onClose();
  };

  const handleMin = (e) => {
    e.stopPropagation();
    playClick(520);
    if (onMinimize) onMinimize();
  };

  return (
    <div
      className={`relative bg-[#1c1539]/95 backdrop-blur-md border-2 ${borderColor} rounded-2xl shadow-[0_12px_32px_rgba(10,5,25,0.5)] text-slate-100 font-mono overflow-hidden transition-all duration-150 ${className}`}
    >
      {/* Title Bar with 3 cute pastel window dots */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b-2 ${borderColor} select-none ${headerBg}`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {/* Mac/Early-Web 3 colored dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#fca5a5] border border-[#f87171]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#fef08a] border border-[#facc15]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#86efac] border border-[#4ade80]/50 shadow-xs inline-block" />
          </div>

          <span className="text-sm select-none ml-1" aria-hidden="true">
            {icon}
          </span>
          <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white truncate font-mono">
            {title}
          </h3>
        </div>

        {/* Retro Window Control Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {onMinimize && (
            <button
              type="button"
              onClick={handleMin}
              aria-label="Minimize window"
              className="w-5 h-5 flex items-center justify-center bg-[#2f2250] hover:bg-[#3d2e66] active:bg-[#1f1538] border border-white/20 text-xs text-white rounded shadow-xs focus:outline-none"
            >
              <Minus className="w-3 h-3" />
            </button>
          )}

          <button
            type="button"
            aria-label="Maximize window"
            className="w-5 h-5 flex items-center justify-center bg-[#2f2250] hover:bg-[#3d2e66] active:bg-[#1f1538] border border-white/20 text-xs text-white rounded shadow-xs focus:outline-none"
          >
            <Square className="w-2.5 h-2.5" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close window"
              className="w-5 h-5 flex items-center justify-center bg-[#f43f5e] hover:bg-[#fb7185] active:bg-[#e11d48] border border-white/30 text-xs text-white rounded shadow-xs focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 text-sm">{children}</div>

      {/* Bottom Status Bar */}
      {statusBarText && (
        <div className="px-4 py-1.5 bg-[#120d29] border-t border-purple-500/20 text-[10px] sm:text-xs text-purple-300/80 flex items-center justify-between select-none">
          <span className="truncate">{statusBarText}</span>
          <span className="text-[#f472b6] shrink-0 ml-2 font-bold">PIP-OS v1.0</span>
        </div>
      )}
    </div>
  );
}

export default RetroWindow;
