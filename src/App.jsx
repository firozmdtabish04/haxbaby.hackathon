import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPip } from './components/AboutPip';
import { DreamDiary } from './components/DreamDiary';
import { InventionWorkshop } from './components/InventionWorkshop';
import { PipPet } from './components/PipPet';
import { CelestialSynth } from './components/CelestialSynth';
import { DreamWeaver } from './components/DreamWeaver';
import { AmbientSleepStation } from './components/AmbientSleepStation';
import { DreamOracle } from './components/DreamOracle';
import { GoodiesVault } from './components/GoodiesVault';
import { WebringWall } from './components/WebringWall';
import { Guestbook } from './components/Guestbook';
import { SecretPortal } from './components/SecretPortal';
import { Footer } from './components/Footer';
import { StarField } from './components/StarField';
import { SparkleTrail } from './components/SparkleTrail';
import { CommandPalette } from './components/CommandPalette';
import { HackathonWinnerShowcase } from './components/HackathonWinnerShowcase';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chaosMode, setChaosMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync chaos mode class on document body
  useEffect(() => {
    if (chaosMode) {
      document.body.classList.add('chaos-mode-active');
    } else {
      document.body.classList.remove('chaos-mode-active');
    }
  }, [chaosMode]);

  // Global keyboard shortcut for Command Palette: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleToggleChaos = () => {
    setChaosMode((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      {/* Whimsical Retro Preloader with Designer/Developer Credits */}
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}

      {/* Global Command Palette HUD (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        chaosMode={chaosMode}
        onToggleChaos={handleToggleChaos}
      />

      {/* Side Quest: Stardust cursor & touch sparkle trail */}
      <SparkleTrail />

      {/* Gentle Floating Atmospheric Stars & Nebulae */}
      <StarField count={36} />

      {/* Retro CRT Scanlines Texture Overlay */}
      <div className="crt-scanlines pointer-events-none fixed inset-0 z-30" aria-hidden="true" />

      {/* Chaos Mode Alert Banner if active */}
      {chaosMode && (
        <aside
          role="status"
          aria-live="polite"
          className="sticky top-0 z-50 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 text-black py-1 px-4 text-center text-xs font-mono font-bold tracking-widest shadow-md flex items-center justify-center gap-2"
        >
          <span>👾 CHAOS MODE ENGAGED! 90S NEON RETRO OVERDRIVE ⚡</span>
          <button
            type="button"
            onClick={handleToggleChaos}
            className="underline hover:text-white ml-2 cursor-pointer"
          >
            [Turn Off]
          </button>
        </aside>
      )}

      {/* Top Retro Navigation HUD */}
      <Navbar
        chaosMode={chaosMode}
        onToggleChaos={handleToggleChaos}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Single Page Experience */}
      <main className="flex-1 space-y-4">
        {/* Core Sections */}
        <Hero />
        <HackathonWinnerShowcase />
        <AboutPip />
        <DreamDiary />
        <InventionWorkshop />

        {/* Interactive Virtual Pet Tamagotchi */}
        <PipPet />

        {/* 8-Bit Music Box Keyboard */}
        <CelestialSynth />

        {/* Procedural Postcard Generator */}
        <DreamWeaver />

        {/* Procedural Ambient Noise & Sleep Timer */}
        <AmbientSleepStation />

        {/* Midnight Dream Oracle (Crystal Ball) */}
        <DreamOracle />

        {/* Freebies & Digital Diploma Vault */}
        <GoodiesVault />

        {/* 88x31 Button Wall & Starlight Webring */}
        <WebringWall />

        {/* Persistent Guestbook & Secret Constellation Portal */}
        <Guestbook />
        <SecretPortal />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
