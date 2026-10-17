import React, { useMemo } from 'react';

export function StarField({ count = 35 }) {
  // Pre-generate deterministic star coordinates to avoid hydration mismatches & recalculations
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        top: `${(i * 19.3) % 96}%`,
        left: `${(i * 31.7) % 98}%`,
        size: (i % 3 === 0) ? 'w-2 h-2 text-yellow-200' : (i % 2 === 0) ? 'w-1.5 h-1.5 text-pink-200' : 'w-1 h-1 text-purple-200',
        animationDelay: `${(i * 0.4) % 4}s`,
        animationDuration: `${3 + (i % 4)}s`,
        isPixelStar: i % 4 === 0,
      });
    }
    return arr;
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Soft gradient nebulae clouds */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-[90px]" />

      {/* Floating Star Elements */}
      {stars.map((star) => (
        <span
          key={star.id}
          className={`absolute rounded-full opacity-60 animate-star-twinkle ${star.size}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        >
          {star.isPixelStar ? (
            <span className="block text-[10px] leading-none opacity-80">✦</span>
          ) : (
            <span className="block w-full h-full bg-current rounded-full" />
          )}
        </span>
      ))}
    </div>
  );
}

export default StarField;
