import React from 'react';

export function RetroBadge({
  children,
  variant = 'pink',
  blinking = false,
  className = '',
}) {
  const variantStyles = {
    pink: 'bg-[#ff6b9d]/20 text-[#ff8eb4] border-[#ff6b9d]/40',
    purple: 'bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]/40',
    yellow: 'bg-[#facc15]/20 text-[#fde047] border-[#facc15]/40',
    green: 'bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/40',
    cyan: 'bg-[#06b6d4]/20 text-[#22d3ee] border-[#06b6d4]/40',
    retro: 'bg-[#d1d5db] text-[#111827] border-[#9ca3af] font-mono shadow-[1px_1px_0_0_#374151]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-semibold border rounded-sm select-none tracking-wide ${
        variantStyles[variant] || variantStyles.pink
      } ${blinking ? 'animate-pulse' : ''} ${className}`}
    >
      {children}
    </span>
  );
}
