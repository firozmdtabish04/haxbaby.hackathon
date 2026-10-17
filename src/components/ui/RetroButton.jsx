import React from 'react';
import { useSound } from '../../hooks/useSound';

export function RetroButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  soundFreq,
  disabled = false,
  type = 'button',
  ...props
}) {
  const { playClick } = useSound();

  const handleClick = (e) => {
    if (disabled) return;
    playClick(soundFreq);
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-bold select-none cursor-pointer transition-all duration-75 active:translate-y-0.5 active:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b0d1e] focus:ring-[#ff86b6] disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 border-2 shadow-[2px_2px_0_0_#000]',
    md: 'text-sm px-4 py-2 gap-2 border-2 shadow-[3px_3px_0_0_#000]',
    lg: 'text-base px-6 py-3 gap-2.5 border-2 shadow-[4px_4px_0_0_#000]',
  };

  const variantStyles = {
    primary:
      'bg-[#8b5cf6] hover:bg-[#9d71f7] text-white border-[#c4b5fd] shadow-[3px_3px_0_0_#2e1065] active:bg-[#7c3aed]',
    accent:
      'bg-[#ff6b9d] hover:bg-[#ff85b0] text-[#1e0725] border-[#fbcfe8] shadow-[3px_3px_0_0_#701a35] active:bg-[#f43f5e]',
    yellow:
      'bg-[#fde047] hover:bg-[#fef08a] text-[#2e1d05] border-[#fef9c3] shadow-[3px_3px_0_0_#713f12] active:bg-[#eab308]',
    retro95:
      'bg-[#c3c7cb] hover:bg-[#d4d8dc] text-black border-t-white border-l-white border-r-[#424242] border-b-[#424242] shadow-[2px_2px_0_0_#000000] active:border-t-[#424242] active:border-l-[#424242] active:border-r-white active:border-b-white',
    ghost:
      'bg-transparent hover:bg-white/10 text-slate-200 border border-white/20 shadow-none active:bg-white/15',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
