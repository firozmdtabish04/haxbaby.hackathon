import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles, Wand2, Compass } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import { Odometer } from './Odometer';

interface HeaderNavProps {
  isMuted: boolean;
  onToggleMute: () => void;
  mood: 'midnight' | 'sunset' | 'dawn';
  onChangeMood: (m: 'midnight' | 'sunset' | 'dawn') => void;
  chaosMode: boolean;
  onToggleChaos: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isMuted,
  onToggleMute,
  mood,
  onChangeMood,
  chaosMode,
  onToggleChaos
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash: string) => {
    sound.playClick(720);
    setMobileMenuOpen(false);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cycleMood = () => {
    sound.playChime();
    if (mood === 'midnight') onChangeMood('sunset');
    else if (mood === 'sunset') onChangeMood('dawn');
    else onChangeMood('midnight');
  };

  return (
    <header className={`pip-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Brand Lockup */}
        <div className="brand-group" onClick={() => handleNavClick('#hero')}>
          <div className="avatar-mini-badge">
            <span className="skull-icon">💀</span>
            <span className="sparkle-gem">✦</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-name">
              Pip <span className="brand-sub">★ Dream Engineer</span>
            </h1>
            <p className="brand-tagline">Midnight Nursery · Room 404</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-links" aria-label="Main Navigation">
          <button onClick={() => handleNavClick('#hero')} className="nav-pill-link">
            Meet Pip
          </button>
          <button onClick={() => handleNavClick('#inventions')} className="nav-pill-link">
            Inventions
          </button>
          <button onClick={() => handleNavClick('#story')} className="nav-pill-link">
            Dream Diary
          </button>
          <button onClick={() => handleNavClick('#guestbook')} className="nav-pill-link">
            Guestbook
          </button>
        </nav>

        {/* Action Controls */}
        <div className="header-controls">
          {/* Visitor Odometer */}
          <div className="odometer-wrapper">
            <Odometer label="Dreams" />
          </div>

          {/* Mood / Day-Night Switcher */}
          <button
            onClick={cycleMood}
            className={`control-btn mood-btn mood-${mood}`}
            title={`Current Mood: ${mood.toUpperCase()} (Click to toggle)`}
            aria-label="Toggle mood lighting"
          >
            {mood === 'midnight' && <Moon size={16} />}
            {mood === 'sunset' && <Sparkles size={16} />}
            {mood === 'dawn' && <Sun size={16} />}
            <span className="btn-label-text">{mood}</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className={`control-btn sound-btn ${isMuted ? 'muted' : 'active'}`}
            title={isMuted ? 'Sound muted (Click to unmute)' : 'Sound active (Click to mute)'}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="btn-label-text">{isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          {/* Chaos Mode Toggle */}
          <button
            onClick={() => {
              sound.playRattle();
              onToggleChaos();
            }}
            className={`control-btn chaos-btn ${chaosMode ? 'chaos-active' : ''}`}
            title="Toggle Retro Chaos Mode (+5 bonus sidequest!)"
            aria-label="Toggle Chaos Mode"
          >
            <Wand2 size={16} />
            <span className="btn-label-text">Chaos {chaosMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-trigger"
            onClick={() => {
              sound.playClick(500);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Compass size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-pop">
          <nav className="mobile-drawer-links">
            <button onClick={() => handleNavClick('#hero')}>★ Meet Pip</button>
            <button onClick={() => handleNavClick('#inventions')}>🛠 Dream Inventions</button>
            <button onClick={() => handleNavClick('#story')}>📖 Dream Diary</button>
            <button onClick={() => handleNavClick('#guestbook')}>💌 Wish Wall</button>
            <button onClick={() => handleNavClick('#easter-egg')}>🥚 Secret Toybox</button>
          </nav>
        </div>
      )}
    </header>
  );
};
