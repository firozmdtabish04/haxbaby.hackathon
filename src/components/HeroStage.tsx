import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Heart, Music, Stars, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEngine';

interface HeroStageProps {
  mood: 'midnight' | 'sunset' | 'dawn';
}

export const HeroStage: React.FC<HeroStageProps> = ({ mood }) => {
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [pipMood, setPipMood] = useState<'sleepy' | 'awake' | 'giggling' | 'dreaming'>('sleepy');
  const [dialogue, setDialogue] = useState<string>("Shh... Pip is weaving starlight dreams into clouds...");
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Character gaze & head tilt tracking cursor / touch
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized delta between -1 and 1
      const deltaX = Math.max(-1, Math.min(1, (clientX - centerX) / (rect.width / 1.5)));
      const deltaY = Math.max(-1, Math.min(1, (clientY - centerY) / (rect.height / 1.5)));

      setHeadTilt({
        x: deltaX * 14, // degrees
        y: deltaY * 12
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const handleWakePip = () => {
    sound.playChime();
    setPipMood('awake');
    setDialogue("Giggle! You found my secret room! Welcome to Midnight Nursery. ✨");
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#c4b5fd', '#fef08a']
    });
  };

  const handleTicklePip = () => {
    sound.playGiggle();
    setPipMood('giggling');
    setDialogue("Tee-hee-hee! That tickles my cheekbones! *wiggles rattle*");
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#f472b6', '#38bdf8', '#facc15', '#a7f3d0']
    });
  };

  const handleToggleLullaby = () => {
    if (isPlayingLullaby) {
      sound.stopLullaby();
      setIsPlayingLullaby(false);
      setDialogue("Lullaby paused. The clouds rest quietly.");
    } else {
      setIsPlayingLullaby(true);
      setPipMood('dreaming');
      setDialogue("♪ Playing: 'Twinkle for Baby Ghosts' — synthesized dream chimes... ♫");
      sound.playLullabyMelody(() => {
        setIsPlayingLullaby(false);
        setDialogue("The lullaby concluded. Sweet dreams, traveler!");
      });
    }
  };

  return (
    <section id="hero" className={`hero-stage mood-${mood}`} ref={containerRef}>
      {/* Background Starfield Decor */}
      <div className="starfield-backdrop" aria-hidden="true">
        <span className="twinkle-star star-1">✦</span>
        <span className="twinkle-star star-2">★</span>
        <span className="twinkle-star star-3">✧</span>
        <span className="twinkle-star star-4">⋆</span>
        <span className="twinkle-star star-5">✦</span>
        <span className="floating-cloud cloud-a">☁️</span>
        <span className="floating-cloud cloud-b">☁️</span>
      </div>

      <div className="hero-content-wrap">
        {/* Retro Window Shell */}
        <div className="retro-window">
          {/* Window Header */}
          <div className="retro-window-header">
            <div className="window-dots">
              <span className="dot dot-close" onClick={handleTicklePip} title="Tickle Pip!"></span>
              <span className="dot dot-minimize" onClick={handleWakePip} title="Wake Pip!"></span>
              <span className="dot dot-maximize" onClick={handleToggleLullaby} title="Play Lullaby!"></span>
            </div>
            <span className="window-title">
              ★ pip_dream_station.exe [Midnight Nursery v1.0]
            </span>
            <div className="window-status-pill">
              <span className="status-ping"></span>
              {pipMood.toUpperCase()}
            </div>
          </div>

          {/* Window Body */}
          <div className="retro-window-body">
            {/* Left Column: Pip Character Stage */}
            <div className="pip-character-stage">
              <div
                className="pip-avatar-frame"
                style={{
                  transform: `perspective(600px) rotateY(${headTilt.x}deg) rotateX(${-headTilt.y}deg)`
                }}
              >
                <div className="pip-halo-glow"></div>
                <img
                  src="/assets/pip_avatar_cloud.png"
                  alt="Pip the Skull Baby floating on a cloud wearing a star nightcap"
                  className={`pip-main-img ${pipMood}`}
                  onClick={handleTicklePip}
                />
                {/* Floating interactive thought bubble */}
                <div className="dialogue-bubble animate-bounce-subtle">
                  <p className="bubble-text">{dialogue}</p>
                  <span className="bubble-tail"></span>
                </div>
              </div>

              {/* Character quick stats badge */}
              <div className="character-id-card">
                <div className="id-field">
                  <span className="id-label">NAME:</span>
                  <span className="id-val">Pip</span>
                </div>
                <div className="id-field">
                  <span className="id-label">SPECIES:</span>
                  <span className="id-val">Skull Baby (Harmless &amp; Cozy)</span>
                </div>
                <div className="id-field">
                  <span className="id-label">ROLE:</span>
                  <span className="id-val">Junior Dream Engineer</span>
                </div>
                <div className="id-field">
                  <span className="id-label">WEAPON:</span>
                  <span className="id-val">Star Music Box &amp; Warm Lantern</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Action Hub */}
            <div className="pip-narrative-stage">
              <div className="hero-badge-ribbon">
                <span className="badge-canon">★ CANON TRACK 1</span>
                <span className="badge-motto">“small ideas. brighter beginnings.”</span>
              </div>

              <h2 className="hero-headline">
                I build the dreams you <span className="highlight-text">fall asleep inside.</span>
              </h2>

              <p className="hero-intro-story">
                Hello! I’m <strong>Pip</strong>, a curious baby with a smooth skull face, soft glowing
                star-eyes, and a bedtime nightcap. By midnight, I work at the <strong>Midnight Nursery</strong>,
                concocting gentle lullabies, bedside lantern glows, and sweet dream routes so the
                neighborhood's little ghosts and creatures can sleep soundly without fears.
              </p>

              {/* Interactive Character Actions */}
              <div className="hero-action-buttons">
                <button className="primary-magic-btn" onClick={handleWakePip}>
                  <Sparkles size={18} />
                  <span>Say Hello to Pip</span>
                </button>

                <button className="secondary-magic-btn" onClick={handleTicklePip}>
                  <Heart size={18} />
                  <span>Tickle Pip</span>
                </button>

                <button
                  className={`lullaby-toggle-btn ${isPlayingLullaby ? 'playing' : ''}`}
                  onClick={handleToggleLullaby}
                >
                  <Music size={18} />
                  <span>{isPlayingLullaby ? 'Stop Dream Lullaby' : 'Play Music Box Lullaby'}</span>
                </button>
              </div>

              {/* Quick Pillars Overview */}
              <div className="three-pillars-strip">
                <div className="pillar-tile">
                  <div className="pillar-icon">
                    <Stars size={18} />
                  </div>
                  <div>
                    <h4>1. What I Am</h4>
                    <p>Friendly skull baby who giggles and loves bedtime stories.</p>
                  </div>
                </div>

                <div className="pillar-tile">
                  <div className="pillar-icon">
                    <Moon size={18} />
                  </div>
                  <div>
                    <h4>2. What I Do</h4>
                    <p>Engineer lullabies, nightlights, and starry delivery routes.</p>
                  </div>
                </div>

                <div className="pillar-tile">
                  <div className="pillar-icon">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h4>3. My Story</h4>
                    <p>Born beneath a falling shooting star onto a cloud in Room 404.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Window Footer Statusbar */}
          <div className="retro-window-footer">
            <div className="status-item">
              <span className="status-icon">☁️</span>
              <span>Cloud Altitude: 1,400 ft</span>
            </div>
            <div className="status-item">
              <span className="status-icon">🔋</span>
              <span>Dream Battery: 99.8% (Warm Starlight)</span>
            </div>
            <div className="status-item">
              <span className="status-icon">✨</span>
              <span>Cursor Gaze: [{Math.round(headTilt.x)}°, {Math.round(headTilt.y)}°]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
