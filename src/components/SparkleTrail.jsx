import React, { useEffect, useState } from 'react';

export function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Respect user's reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let idCounter = 0;
    let lastTime = 0;
    const colors = ['#ff86b6', '#c084fc', '#fde047', '#38bdf8', '#ffffff'];

    const spawnSparkle = (x, y) => {
      const now = performance.now();
      if (now - lastTime < 35) return; // Throttle to prevent DOM flooding
      lastTime = now;

      const newSparkle = {
        id: ++idCounter,
        x,
        y,
        color: colors[idCounter % colors.length],
        symbol: idCounter % 3 === 0 ? '✦' : idCounter % 2 === 0 ? '★' : '•',
        size: 10 + (idCounter % 8),
      };

      setSparkles((prev) => [...prev.slice(-15), newSparkle]);

      // Remove after 650ms animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 650);
    };

    const handleMouseMove = (e) => {
      spawnSparkle(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-mono leading-none animate-sparkle-fade"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            fontSize: `${s.size}px`,
            textShadow: `0 0 6px ${s.color}`,
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
}

export default SparkleTrail;
