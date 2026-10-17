import React, { useEffect, useState } from 'react';
import { sound } from '../utils/soundEngine';

interface OdometerProps {
  label?: string;
  initialCount?: number;
}

export const Odometer: React.FC<OdometerProps> = ({
  label = 'Dreams Delivered',
  initialCount = 1420
}) => {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('pip_dream_odometer');
    if (saved) {
      const parsed = parseInt(saved, 10);
      return isNaN(parsed) ? initialCount : parsed;
    }
    return initialCount;
  });

  useEffect(() => {
    // Increment visit count once per session
    const hasVisited = sessionStorage.getItem('pip_session_visited');
    if (!hasVisited) {
      const nextCount = count + 1;
      setCount(nextCount);
      localStorage.setItem('pip_dream_odometer', String(nextCount));
      sessionStorage.setItem('pip_session_visited', 'true');
    }
  }, []);

  const handleManualBump = () => {
    sound.playClick(850);
    const next = count + 1;
    setCount(next);
    localStorage.setItem('pip_dream_odometer', String(next));
  };

  // Format with leading zeroes to 6 digits
  const formatted = count.toString().padStart(6, '0');

  return (
    <div
      className="retro-odometer-container"
      onClick={handleManualBump}
      title="Click to deliver one more dream!"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleManualBump();
        }
      }}
    >
      <div className="odometer-label">
        <span className="blinking-led"></span>
        {label}
      </div>
      <div className="odometer-wheels">
        {formatted.split('').map((digit, idx) => (
          <div key={idx} className="odometer-wheel">
            <span className="wheel-digit">{digit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
