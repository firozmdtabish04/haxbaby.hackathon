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
  headerBg = 'bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#4338ca]',
  borderColor = 'border-[#4c1d95]',
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
      className={`relative bg-[#111328]/95 backdrop-blur-sm border-2 ${borderColor} rounded-sm shadow-[5px_5px_0_0_#060814] text-slate-100 font-mono overflow-hidden transition-all duration-150 ${className}`}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-3 py-1.5 border-b-2 ${borderColor} select-none ${headerBg}`}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-sm select-none" aria-hidden="true">
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
              className="w-5 h-5 flex items-center justify-center bg-[#252849] hover:bg-[#343864] active:bg-[#1a1c35] border border-white/30 text-xs text-white shadow-[1px_1px_0_0_#000] focus:outline-none"
            >
              <Minus className="w-3 h-3" />
            </button>
          )}

          <button
            type="button"
            aria-label="Maximize window"
            className="w-5 h-5 flex items-center justify-center bg-[#252849] hover:bg-[#343864] active:bg-[#1a1c35] border border-white/30 text-xs text-white shadow-[1px_1px_0_0_#000] focus:outline-none"
          >
            <Square className="w-2.5 h-2.5" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close window"
              className="w-5 h-5 flex items-center justify-center bg-[#e11d48] hover:bg-[#f43f5e] active:bg-[#9f1239] border border-white/30 text-xs text-white shadow-[1px_1px_0_0_#000] focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 text-sm">{children}</div>

      {/* Bottom Status Bar */}
      {statusBarText && (
        <div className="px-3 py-1 bg-[#0a0c1a] border-t border-white/10 text-[10px] sm:text-xs text-slate-400 flex items-center justify-between select-none">
          <span className="truncate">{statusBarText}</span>
          <span className="text-purple-400 shrink-0 ml-2">PIP-OS v1.0</span>
        </div>
      )}
    </div>
  );
}
export default RetroWindow;
