import React, { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";

export function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(
    "Connecting to Midnight Nursery...",
  );
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statusMessages = [
      "Connecting to Midnight Nursery...",
      "Calibrating Starlight Antennas...",
      "Warming Vanilla Marshmallows...",
      "Tuning 432Hz Bedtime Resonance...",
      "Designed & Developed by Tabish Firoz...",
      "Welcome to Pip's Dream Lab! ✨",
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 10;
        const msgIdx = Math.min(
          Math.floor((next / 100) * statusMessages.length),
          statusMessages.length - 1,
        );
        setStatusText(statusMessages[msgIdx]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600);
          }, 350);
          return 100;
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [onFinish]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 300);
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Pip's Dream Lab"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0922] text-[#f4effe] select-none px-4 transition-opacity duration-500 font-mono ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Starlight Glow */}
      <div className="w-96 h-96 bg-purple-600/20 rounded-full absolute blur-[120px] pointer-events-none" />
      <div className="w-80 h-80 bg-pink-500/15 rounded-full absolute blur-[100px] pointer-events-none" />

      {/* CRT Scanline Overlay */}
      <div
        className="z-10 crt-scanlines pointer-events-none fixed inset-0"
        aria-hidden="true"
      />

      {/* Center Loader Window Card */}
      <div className="p-6 z-20 w-full max-w-md bg-[#1b143a]/95 border-2 border-[#c4b5fd]/50 rounded-3xl text-center shadow-[0_16px_48px_rgba(5,2,18,0.8)] relative sm:border-3 sm:p-8 backdrop-blur-md">
        {/* Top Window Dots */}
        <div className="pb-4 mb-4 justify-between border-b border-purple-500/20 text-xs flex items-center">
          <div className="gap-1.5 flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#fca5a5] border border-[#f87171]/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#fef08a] border border-[#facc15]/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#86efac] border border-[#4ade80]/50 inline-block" />
          </div>
          <span className="text-[10px] text-purple-300 tracking-wider">
            BOOT_SEQUENCE // v1.0
          </span>
        </div>

        {/* Pip Spinning / Bouncing Avatar */}
        <div className="mb-4 mx-auto w-24 h-24 relative sm:w-28 sm:h-28">
          <div className="bg-purple-500/30 rounded-full absolute inset-0 blur-md animate-pulse" />
          <div className="p-2 w-full h-full rounded-2xl bg-[#120e2b] border-2 border-purple-400/40 justify-center overflow-hidden shadow-inner relative flex items-center">
            <img
              src="/assets/pip_avatar_cloud.png"
              alt="Pip loading icon"
              className="w-full h-full object-contain animate-bounce"
              style={{ animationDuration: "1.8s" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-3xl select-none" style={{ display: "none" }}>
              🧸
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-1 text-xl font-black text-white font-sans sm:text-2xl tracking-tight">
          Pip's Dream Lab
        </h2>

        {/* Prominent Designer / Developer Credit */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-400/40 rounded-full text-xs font-semibold text-[#fbcfe8] mb-5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            Designed &amp; Developed by <strong>Tabish Firoz</strong>
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-[#0a071a] border-2 border-purple-400/40 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#ff86b6] via-[#c084fc] to-[#fde047] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-purple-300 font-bold">
            <span className="truncate pr-2">{statusText}</span>
            <span className="text-amber-300 shrink-0 font-mono">
              {progress}%
            </span>
          </div>
        </div>

        {/* Skip button for instant access */}
        <button
          type="button"
          onClick={handleSkip}
          className="text-[11px] text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
        >
          [Press to enter dream lab]
        </button>
      </div>
    </div>
  );
}

export default Loader;
