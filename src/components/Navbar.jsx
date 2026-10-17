import React, { useState } from 'react';
import { Menu, X, Star, Volume2, VolumeX, Sparkles, Wand2 } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function Navbar({ chaosMode, onToggleChaos }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, playClick, playChime } = useSound();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Diary', href: '#dreams' },
    { label: 'Inventions', href: '#inventions' },
    { label: 'Guestbook', href: '#guestbook' },
    { label: 'About', href: '#about' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    playClick(620);
    setMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChaosClick = () => {
    playChime();
    if (onToggleChaos) onToggleChaos();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#dcd4f5]/95 dark:bg-[#181433]/95 backdrop-blur-md border-b-2 border-[#b5a5e3] dark:border-[#3d2b63] select-none transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Retro Mac/Early-Web Window Dots + Logo */}
        <div className="flex items-center gap-3">
          {/* Pastel window dots */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#fca5a5] border border-[#f87171]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#fef08a] border border-[#facc15]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#86efac] border border-[#4ade80]/50 shadow-xs inline-block" />
          </div>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#f472b6] rounded px-1.5 py-1"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-purple-900/60 border-2 border-purple-400/50 flex items-center justify-center shadow-xs shrink-0">
              <img
                src="/assets/pip_avatar_cloud.png"
                alt="Pip"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-base select-none">💀</span>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-sans font-black text-sm sm:text-base text-[#241242] dark:text-[#f3eefe] tracking-tight group-hover:text-[#db2777] transition-colors leading-none">
                Pip's Dream Lab
              </span>
              <span className="text-[10px] font-mono text-[#6b4e9b] dark:text-[#c4b5fd] mt-0.5 leading-none hidden xs:inline">
                haX.baby · Junior Dream Engineer
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-2.5 py-1 text-xs sm:text-sm font-sans font-bold text-[#4c3274] dark:text-[#ddd2f8] hover:text-[#9333ea] dark:hover:text-[#ff86b6] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right HUD Controls: Online pill, Sound Toggle, Star/Chaos Mode, Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Online Status Pill */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-[#d1fae5] dark:bg-emerald-950/60 border border-[#6ee7b7] dark:border-emerald-500/40 rounded-full text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 shadow-xs"
            title="Pip is connected and dreaming"
          >
            <span className="text-emerald-600 dark:text-emerald-400 text-xs">⭐</span>
            <span className="hidden xs:inline">Online</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Turn sound effects on' : 'Turn sound effects off'}
            title={isMuted ? 'Sound: OFF (Click to turn ON)' : 'Sound: ON (Click to MUTE)'}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-md border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              isMuted
                ? 'bg-[#ede8fb] dark:bg-[#20193d] text-slate-600 dark:text-slate-300 border-[#c4b5fd] dark:border-purple-500/30 hover:border-pink-400'
                : 'bg-[#fce7f3] dark:bg-[#3d1833] text-pink-700 dark:text-pink-300 border-pink-400 shadow-xs'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio ♫'}</span>
          </button>

          {/* Chaos / Star Mode Button */}
          <button
            type="button"
            onClick={handleChaosClick}
            aria-pressed={chaosMode}
            title={chaosMode ? 'Turn off Chaos Mode' : 'Toggle 90s Cyber Dream Chaos Mode!'}
            className={`p-1.5 sm:p-2 rounded-md border transition-all flex items-center justify-center ${
              chaosMode
                ? 'bg-amber-300 text-black border-amber-400 animate-bounce'
                : 'bg-[#ede8fb] dark:bg-[#20193d] text-amber-500 border-[#c4b5fd] dark:border-purple-500/30 hover:border-amber-400'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${chaosMode ? 'fill-black' : 'fill-amber-400'}`} />
          </button>

          {/* Mobile Hamburger Drawer Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 text-[#4c3274] dark:text-slate-200 bg-[#ede8fb] dark:bg-[#221b44] border border-[#b5a5e3] dark:border-purple-500/30 rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ede8fb] dark:bg-[#130f29] border-b-2 border-purple-300 dark:border-purple-800/60 px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-center p-2.5 text-xs font-sans font-bold text-[#2e1550] dark:text-slate-200 bg-white/70 dark:bg-[#201a42] border border-purple-300/60 dark:border-purple-500/30 rounded-md hover:bg-purple-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#portal"
              onClick={(e) => handleLinkClick(e, '#portal')}
              className="col-span-2 flex items-center justify-center p-2.5 text-xs font-sans font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/40 border border-amber-300 rounded-md"
            >
              ✨ Secret Portal
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
