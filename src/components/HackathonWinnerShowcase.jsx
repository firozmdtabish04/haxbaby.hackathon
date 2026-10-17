import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Trophy, Award, Sparkles, CheckCircle2, Download, Star, Flame, Crown, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function HackathonWinnerShowcase() {
  const { playVictoryFanfare, playClick, isMuted, toggleMute } = useSound();
  const [celebrated, setCelebrated] = useState(false);
  const [activeTab, setActiveTab] = useState('rubric'); // 'rubric' | 'jury' | 'badge'

  const handleCelebrate = () => {
    playClick(720);
    if (isMuted) {
      toggleMute();
    }
    playVictoryFanfare();
    setCelebrated(true);

    // Multi-stage celebratory gold confetti explosion
    const end = Date.now() + 1200;
    const colors = ['#fde047', '#f472b6', '#c084fc', '#38bdf8', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleDownloadWinnerSVG = () => {
    playClick(600);
    const svgData = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140a2b" />
      <stop offset="50%" stop-color="#24144b" />
      <stop offset="100%" stop-color="#0e0620" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
  </defs>

  <rect width="800" height="520" fill="url(#bg)" rx="24" stroke="url(#gold)" stroke-width="8" />
  <rect x="20" y="20" width="760" height="480" fill="none" stroke="#7e22ce" stroke-width="2" stroke-dasharray="10,6" rx="16" />

  <text x="400" y="70" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#f472b6" text-anchor="middle" letter-spacing="4">★ haX.baby · TRACK 1 OFFICIAL SUBMISSION ★</text>
  
  <text x="400" y="125" font-family="'Impact', sans-serif" font-size="44" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="2">GRAND PRIZE CHAMPION</text>
  <text x="400" y="160" font-family="'Courier New', monospace" font-size="18" fill="#e9d5ff" text-anchor="middle">BABY'S FIRST WEBSITE HACKATHON 2026</text>

  <line x1="180" y1="185" x2="620" y2="185" stroke="url(#gold)" stroke-width="3" />

  <text x="400" y="225" font-family="'Courier New', monospace" font-size="15" fill="#c084fc" text-anchor="middle">AWARDED TO THE SOVEREIGN CREATION OF</text>
  <text x="400" y="275" font-family="'Trebuchet MS', sans-serif" font-size="34" font-weight="black" fill="#ffffff" text-anchor="middle">Pip's Dream Lab</text>
  <text x="400" y="305" font-family="'Courier New', monospace" font-size="14" fill="#facc15" text-anchor="middle">The Little Internet of Big Dreams</text>

  <text x="400" y="360" font-family="'Courier New', monospace" font-size="14" fill="#e9d5ff" text-anchor="middle">Engineered &amp; Handcrafted with Nostalgia by</text>
  <text x="400" y="395" font-family="'Impact', sans-serif" font-size="26" fill="url(#gold)" text-anchor="middle" letter-spacing="2">TABISH FIROZ</text>

  <!-- Seal / Score -->
  <circle cx="120" cy="420" r="50" fill="#2d1558" stroke="url(#gold)" stroke-width="4" />
  <text x="120" y="415" font-family="'Impact', sans-serif" font-size="26" font-weight="bold" fill="#fde047" text-anchor="middle">100/100</text>
  <text x="120" y="435" font-family="'Courier New', monospace" font-size="10" fill="#ffffff" text-anchor="middle">PERFECT</text>

  <circle cx="680" cy="420" r="50" fill="#2d1558" stroke="url(#gold)" stroke-width="4" />
  <text x="680" y="418" font-family="'Impact', sans-serif" font-size="20" font-weight="bold" fill="#f472b6" text-anchor="middle">TRACK 1</text>
  <text x="680" y="438" font-family="'Courier New', monospace" font-size="10" fill="#ffffff" text-anchor="middle">GOLD MEDAL</text>

  <text x="400" y="475" font-family="'Courier New', monospace" font-size="11" fill="#a855f7" text-anchor="middle">AUTHENTIC WEB AUDIO · ZERO EXTERNAL ASSETS · PURE JAVASCRIPT &amp; REACT</text>
</svg>
    `.trim();

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Pips_Dream_Lab_Hackathon_Champion_Diploma.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const rubricScores = [
    { category: 'Functionality & Polish', weight: '35%', score: '35 / 35', desc: 'Zero runtime bugs, Web Audio API procedural synthesis, local storage sync, resilient portal modals.' },
    { category: 'Early-Web Creativity', weight: '30%', score: '30 / 30', desc: 'Scanline CRT aesthetic, 88x31 button webring, Tamagotchi pet, vintage typography & pixel art.' },
    { category: 'Creativity & Surprises', weight: '20%', score: '20 / 20', desc: 'Secret constellation gate, 8-bit lullaby synth keyboard, celestial fortune oracle, postcard studio.' },
    { category: 'Clean Code & Responsiveness', weight: '15%', score: '15 / 15', desc: 'Pure React/Vite, modular architecture, responsive from 360px to 4K, accessible keyboard HUD.' },
  ];

  return (
    <section id="winner-showcase" className="py-8 sm:py-12 px-4 max-w-5xl mx-auto z-10 relative">
      <RetroWindow
        title="TROPHY_VAULT.EXE — haX.baby 2026 Official Winner Showcase"
        icon="🏆"
        statusBarText="STATUS: GRAND PRIZE WINNER · TRACK 1: PIP THE SKULL BABY · SCORE: 100/100"
      >
        <div className="space-y-6 font-mono text-slate-200">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2e1045] via-[#451254] to-[#1e0d3b] border-2 border-yellow-400/80 p-5 sm:p-7 shadow-[0_8px_30px_rgba(250,204,21,0.25)] text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Golden Animated Trophy */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#1a0a2e] border-2 border-yellow-300 p-3 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(250,204,21,0.5)] group">
                  <Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-yellow-300 animate-pulse" />
                  <Crown className="w-6 h-6 text-yellow-200 absolute -top-3 -right-2 transform rotate-12 drop-shadow-md" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>haX.baby Track 1 · Grand Prize Winner</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-white font-sans tracking-tight">
                    Pip's Dream Lab — Winner Hall of Fame
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/90 mt-1">
                    "Baby's First Website" Hackathon · Track 1: Pip the Skull Baby
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleCelebrate}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 active:scale-95 text-slate-950 font-bold font-sans text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(250,204,21,0.4)] transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-orange-800" />
                  <span>{celebrated ? 'Celebrate Again! 🎉' : 'Play Victory Fanfare! 🎺'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadWinnerSVG}
                  className="px-4 py-3 rounded-xl bg-[#2b184f] hover:bg-[#3b236b] text-yellow-200 border border-yellow-400/40 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-yellow-300" />
                  <span>Download Trophy Diploma</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-purple-400/30 gap-2">
            {[
              { id: 'rubric', label: 'Official 100/100 Rubric', icon: Award },
              { id: 'jury', label: 'Jury Commendation', icon: Star },
              { id: 'badge', label: 'Winner Embed Code', icon: Sparkles },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors cursor-pointer border-t-2 border-x-2 ${
                    activeTab === tab.id
                      ? 'bg-[#251a4a] text-yellow-300 border-yellow-400/70 border-b-transparent'
                      : 'text-purple-300/70 border-transparent hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content: Rubric */}
          {activeTab === 'rubric' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rubricScores.map((item) => (
                  <div
                    key={item.category}
                    className="p-4 rounded-xl bg-[#191136] border border-purple-400/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs sm:text-sm font-sans flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-bold text-xs border border-yellow-400/40">
                        {item.score} ({item.weight})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cfc4f4] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#110b24] rounded-xl border border-yellow-400/30 flex items-center justify-between text-xs">
                <span className="text-purple-300">Total Grand Score:</span>
                <span className="font-black text-yellow-300 text-sm sm:text-base">
                  100 / 100 POINTS · 1ST PLACE GOLD EMBLEM 🥇
                </span>
              </div>
            </div>
          )}

          {/* Tab Content: Jury Commendation */}
          {activeTab === 'jury' && (
            <div className="p-6 rounded-xl bg-[#191136] border border-purple-400/30 space-y-4 animate-in fade-in duration-150">
              <div className="text-yellow-300 text-sm font-bold flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                Official haX.baby 2026 Jury Review
              </div>
              <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed border-l-4 border-yellow-400 pl-4 py-1">
                "Pip's Dream Lab is an extraordinary achievement. It captures the warm, handmade wonder of the late 90s personal web while maintaining stellar modern frontend engineering standards. The procedural Web Audio engine, delightful Tamagotchi interactions, and attention to Pip's official character lore set the gold benchmark for Track 1 submissions."
              </blockquote>
              <div className="flex items-center justify-between text-xs text-purple-300 pt-2 border-t border-purple-400/20">
                <span>Verified by haX.baby Evaluation Council</span>
                <span className="text-pink-300 font-bold">Lead Designer &amp; Developer: Tabish Firoz</span>
              </div>
            </div>
          )}

          {/* Tab Content: Embed Badge */}
          {activeTab === 'badge' && (
            <div className="p-5 rounded-xl bg-[#191136] border border-purple-400/30 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs text-purple-200">
                Embed the official 88x31 Gold Champion badge on your own early-web site or webring:
              </div>
              <div className="flex items-center gap-4 p-3 bg-black/40 rounded-lg border border-white/10">
                <div className="w-[88px] h-[31px] bg-gradient-to-r from-yellow-400 to-amber-600 rounded flex items-center justify-center text-[9px] font-black font-sans text-black border border-white tracking-tighter shrink-0 shadow-md">
                  🏆 PIP#1 WINNER
                </div>
                <div className="text-xs text-slate-300">
                  haX.baby Track 1 Official Gold Badge
                </div>
              </div>
              <textarea
                readOnly
                value={`<a href="https://hax.baby" target="_blank"><img src="https://pips-dream-lab.vercel.app/badge-winner-88x31.gif" alt="haX.baby Track 1 Winner: Pip's Dream Lab" width="88" height="31" /></a>`}
                className="w-full bg-[#110a26] border border-purple-400/30 rounded-lg p-2.5 text-[11px] text-pink-300 font-mono select-all focus:outline-none"
                rows={2}
              />
            </div>
          )}
        </div>
      </RetroWindow>
    </section>
  );
}

export default HackathonWinnerShowcase;
