import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Star,
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  ChevronDown,
  Home,
  User,
  BookOpen,
  Wrench,
  Key,
  Heart,
  Music,
  Wand2,
  Moon,
  Gift,
  Globe,
  MessageSquare,
  Gamepad2,
  Compass,
} from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function Navbar({ chaosMode, onToggleChaos, onOpenCommandPalette }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'lab' | 'play' | 'community' | null
  const navRef = useRef(null);
  const { isMuted, toggleMute, playClick, playChime } = useSound();

  // Navigation Groups with Lucide Icons
  const navGroups = [
    {
      id: 'lab',
      label: 'Dream Lab',
      icon: Compass,
      items: [
        { label: 'About Pip', desc: 'Lore, bio & terminal', href: '#about', icon: User, color: 'text-purple-400' },
        { label: 'Dream Diary', desc: 'Nocturnal fantasy logs', href: '#dreams', icon: BookOpen, color: 'text-pink-400' },
        { label: 'Invention Workshop', desc: 'Blueprints & gizmo maker', href: '#inventions', icon: Wrench, color: 'text-amber-400' },
        { label: 'Secret Star Portal', desc: 'Constellation puzzle', href: '#portal', icon: Key, color: 'text-yellow-400' },
      ],
    },
    {
      id: 'play',
      label: 'Play & Sound',
      icon: Gamepad2,
      items: [
        { label: 'Pet Pip (Tamagotchi)', desc: 'Feed, tuck in & cuddle', href: '#tamagotchi', icon: Heart, color: 'text-rose-400' },
        { label: 'Celestial Synth', desc: '8-bit lullaby keyboard', href: '#synth', icon: Music, color: 'text-cyan-400' },
        { label: 'Dream Weaver', desc: 'Bedtime postcard studio', href: '#weaver', icon: Wand2, color: 'text-fuchsia-400' },
        { label: 'Sleep Aid Station', desc: '432Hz cosmic pink noise', href: '#sleep-aid', icon: Moon, color: 'text-indigo-400' },
      ],
    },
    {
      id: 'community',
      label: 'Community & Vault',
      icon: Sparkles,
      items: [
        { label: 'Midnight Oracle', desc: 'Crystal ball fortunes', href: '#oracle', icon: Sparkles, color: 'text-amber-300' },
        { label: 'Goodies Vault', desc: 'Official diplomas & icons', href: '#goodies', icon: Gift, color: 'text-emerald-400' },
        { label: '88x31 Webring Wall', desc: 'Retro pixel banners', href: '#webring', icon: Globe, color: 'text-blue-400' },
        { label: 'Public Guestbook', desc: 'Sign Pip’s visitor book', href: '#guestbook', icon: MessageSquare, color: 'text-violet-400' },
      ],
    },
  ];

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    playClick(620);
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDropdown = (id) => {
    playClick(560);
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleChaosClick = () => {
    playChime();
    if (onToggleChaos) onToggleChaos();
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-[#dcd4f5]/95 dark:bg-[#181433]/95 backdrop-blur-md border-b-2 border-[#b5a5e3] dark:border-[#3d2b63] select-none transition-colors shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Window Dots + Logo */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#fca5a5] border border-[#f87171]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#fef08a] border border-[#facc15]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#86efac] border border-[#4ade80]/50 shadow-xs inline-block" />
          </div>

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

        {/* Center: Desktop Navigation with Lucide Icons and Dropdowns */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Direct Home Button */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans font-bold text-[#4c3274] dark:text-[#ddd2f8] hover:text-[#9333ea] dark:hover:text-[#ff86b6] hover:bg-purple-200/50 dark:hover:bg-purple-900/40 rounded-lg transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-purple-400" />
            <span>Home</span>
          </a>

          {/* Categorized Dropdowns */}
          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            const isOpen = activeDropdown === group.id;

            return (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(group.id)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans font-bold rounded-lg transition-all cursor-pointer ${
                    isOpen
                      ? 'bg-[#c4b5fd]/60 dark:bg-purple-900/60 text-[#1f0e38] dark:text-[#fef08a] shadow-xs'
                      : 'text-[#4c3274] dark:text-[#ddd2f8] hover:text-[#9333ea] dark:hover:text-[#ff86b6] hover:bg-purple-200/50 dark:hover:bg-purple-900/40'
                  }`}
                >
                  <GroupIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-pink-400' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Menu Window */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e153d] border-2 border-purple-400/50 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                    {/* Retro mini title header */}
                    <div className="px-2.5 py-1 mb-1 border-b border-purple-400/20 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>{group.label}</span>
                      <span className="text-[9px] text-pink-300">★ PIP.LAB</span>
                    </div>

                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-purple-900/50 transition-colors group cursor-pointer text-left"
                          >
                            <div className="p-1.5 rounded-md bg-[#130d29] border border-purple-400/20 group-hover:border-purple-300/50 shrink-0 mt-0.5">
                              <ItemIcon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div>
                              <div className="text-xs font-sans font-bold text-white group-hover:text-pink-300 transition-colors">
                                {item.label}
                              </div>
                              <div className="text-[10px] font-mono text-purple-200/70">
                                {item.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right HUD Controls: Command search, Online pill, Sound Toggle, Star/Chaos Mode, Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Command HUD button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            title="Press Ctrl+K or click to open Command HUD"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#ede8fb] dark:bg-[#20193d] border border-[#c4b5fd] dark:border-purple-500/30 text-xs text-purple-700 dark:text-purple-300 font-mono hover:border-pink-400 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[10px] bg-purple-900/40 text-purple-200 px-1 rounded border border-purple-400/30">⌘K</kbd>
          </button>

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
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-md border text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
            className={`p-1.5 sm:p-2 rounded-md border transition-all flex items-center justify-center cursor-pointer ${
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
            className="md:hidden p-1.5 text-[#4c3274] dark:text-slate-200 bg-[#ede8fb] dark:bg-[#221b44] border border-[#b5a5e3] dark:border-purple-500/30 rounded-md focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu organized into categorized dropdown/accordion sections */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181233] border-b-2 border-purple-400/50 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Quick Home link */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 p-2.5 bg-[#251d4d] border border-purple-400/30 rounded-xl text-xs font-sans font-bold text-white hover:bg-purple-900/60"
          >
            <Home className="w-4 h-4 text-purple-400" />
            <span>Home / Lab HQ</span>
          </a>

          {/* Categorized Groups */}
          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-yellow-300 uppercase tracking-wider px-1">
                  <GroupIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>{group.label}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="flex items-center gap-2.5 p-2 bg-[#201844] border border-purple-400/20 rounded-lg text-xs font-sans font-bold text-slate-200 hover:bg-purple-900/50 active:scale-[0.98] transition-all"
                      >
                        <ItemIcon className={`w-4 h-4 ${item.color} shrink-0`} />
                        <div className="truncate">
                          <div>{item.label}</div>
                          <div className="text-[10px] font-mono text-purple-300/70 font-normal truncate">{item.desc}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-mono font-bold text-purple-200 bg-purple-950/70 border border-purple-400/40 rounded-xl cursor-pointer hover:bg-purple-900/80"
          >
            <Search className="w-4 h-4 text-pink-400" />
            <span>Open Command HUD (⌘K)</span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
