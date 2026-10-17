import { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroStage } from './components/HeroStage';
import { SparkleTrail } from './components/SparkleTrail';
import { sound } from './utils/soundEngine';
import './App.css';

export function App() {
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [mood, setMood] = useState<'midnight' | 'sunset' | 'dawn'>('midnight');
  const [chaosMode, setChaosMode] = useState<boolean>(false);

  // Sync mood to data attribute on root element
  useEffect(() => {
    document.documentElement.setAttribute('data-mood', mood);
  }, [mood]);

  // Sync chaos mode class on document body
  useEffect(() => {
    if (chaosMode) {
      document.body.classList.add('chaos-mode-active');
    } else {
      document.body.classList.remove('chaos-mode-active');
    }
  }, [chaosMode]);

  const handleToggleMute = () => {
    const nextMute = sound.toggleMute();
    setIsMuted(nextMute);
  };

  const handleToggleChaos = () => {
    setChaosMode((prev) => !prev);
  };

  return (
    <div className="app-container">
      {/* Side Quest: Glittering Cursor Sparkles */}
      <SparkleTrail />

      {/* Early-Web CRT Scanlines Overlay */}
      <div className="scanlines-overlay" aria-hidden="true" />

      {/* Global Navigation HUD */}
      <HeaderNav
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        mood={mood}
        onChangeMood={setMood}
        chaosMode={chaosMode}
        onToggleChaos={handleToggleChaos}
      />

      {/* Main Content Stage */}
      <main className="main-content">
        <HeroStage mood={mood} />
      </main>

      {/* Footer & Attributions */}
      <footer className="pip-footer">
        <div className="footer-inner">
          <div className="footer-credits">
            <p>
              <strong>Pip’s Midnight Nursery</strong> · Junior Dream Engineer Portfolio
            </p>
            <p>
              Canon Track 1 Entry for{' '}
              <a href="https://hax.baby/baby-problem" target="_blank" rel="noopener noreferrer">
                haX.baby: Baby’s First Website
              </a>
              . Built with React &amp; Web Audio API.
            </p>
          </div>

          <div className="footer-badges">
            <span className="retro-web-badge">★ BEST VIEWED ON EARTH</span>
            <span className="retro-web-badge">★ NO COOKIES · ONLY STARS</span>
            <span className="retro-web-badge">★ 100% COZY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
