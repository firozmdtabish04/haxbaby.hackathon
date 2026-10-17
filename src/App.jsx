import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPip } from './components/AboutPip';
import { DreamDiary } from './components/DreamDiary';
import { InventionWorkshop } from './components/InventionWorkshop';
import { Guestbook } from './components/Guestbook';
import { SecretPortal } from './components/SecretPortal';
import { Footer } from './components/Footer';
import { StarField } from './components/StarField';
import { SparkleTrail } from './components/SparkleTrail';

export function App() {
  const [chaosMode, setChaosMode] = useState(false);

  // Sync chaos mode class on document body
  useEffect(() => {
    if (chaosMode) {
      document.body.classList.add('chaos-mode-active');
    } else {
      document.body.classList.remove('chaos-mode-active');
    }
  }, [chaosMode]);

  const handleToggleChaos = () => {
    setChaosMode((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
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
      <Navbar chaosMode={chaosMode} onToggleChaos={handleToggleChaos} />

      {/* Main Single Page Experience */}
      <main className="flex-1 space-y-4">
        <Hero />
        <AboutPip />
        <DreamDiary />
        <InventionWorkshop />
        <Guestbook />
        <SecretPortal />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
