import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Heart, Sparkles, Moon, Cookie, BookOpen, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PipPet() {
  const { playClick, playGiggle, playChime } = useSound();
  const [hunger, setHunger] = useState(80);
  const [coziness, setCoziness] = useState(75);
  const [sleepiness, setSleepiness] = useState(85);
  const [speech, setSpeech] = useState("Hi! I'm ready for bedtime. Did you bring snacks?");
  const [reactionMood, setReactionMood] = useState('happy');

  const handleFeed = () => {
    playGiggle();
    setHunger((prev) => Math.min(100, prev + 15));
    setSpeech('Yum! Warm vanilla marshmallow! Best bedtime snack ever! 🍬');
    setReactionMood('eating');

    try {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#fbcfe8', '#fde047'],
      });
    } catch {}

    setTimeout(() => setReactionMood('happy'), 2000);
  };

  const handleTuckIn = () => {
    playChime();
    setCoziness((prev) => Math.min(100, prev + 20));
    setSpeech('Ahh, wrapped in 3 layers of cloud blankets. So warm and soft! 🧸');
    setReactionMood('cozy');
    setTimeout(() => setReactionMood('happy'), 2000);
  };

  const handleReadStory = () => {
    playClick(600);
    setSleepiness((prev) => Math.min(100, prev + 10));
    setSpeech('Once upon a time, a little star yawned... zzz... 📖');
    setReactionMood('sleepy');
    setTimeout(() => setReactionMood('happy'), 2000);
  };

  return (
    <section id="tamagotchi" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="PIP_VIRTUAL_PET.EXE — Bedtime Companion Care"
        icon="🐣"
        statusBarText="STATUS: TAMAGOTCHI ENGINE v1.2 · MOOD: COZY · HAPPINESS: 100%"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center font-mono">
          {/* Left Column: Pip Mascot & Speech Bubble */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            {/* Retro Speech Bubble */}
            <div className="relative mb-3 bg-[#fdf2f8] text-[#4a044e] p-3 rounded-2xl border-2 border-pink-400 text-xs shadow-md max-w-xs leading-snug">
              <span>{speech}</span>
              {/* Bubble Tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fdf2f8] border-b-2 border-r-2 border-pink-400 rotate-45" />
            </div>

            {/* Mascot Avatar Card */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 bg-[#140e2d] border-3 border-purple-400/40 rounded-3xl p-3 flex items-center justify-center shadow-inner overflow-hidden">
              <img
                src="/assets/pip_avatar_cloud.png"
                alt="Pip virtual pet"
                className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
                  reactionMood === 'eating'
                    ? 'scale-110 rotate-6'
                    : reactionMood === 'cozy'
                    ? 'scale-105'
                    : reactionMood === 'sleepy'
                    ? 'rotate-[-4deg] opacity-90'
                    : 'hover:scale-105'
                }`}
              />

              {/* Status Heart Badge */}
              <div className="absolute bottom-2 right-2 bg-pink-500 text-white p-1 rounded-full text-xs shadow">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
            </div>

            <span className="text-[11px] text-purple-300 mt-2 font-bold">
              Pip · Junior Dream Engineer (Level 1)
            </span>
          </div>

          {/* Right Column: Tamagotchi Stats & Interactive Actions */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Pip's Bedtime Care Station
              </h3>
              <p className="text-xs text-[#cfc4f4] mt-0.5 leading-relaxed">
                Take care of Pip before he drifts into sleep! Feed him snacks, wrap him in cozy blankets,
                and read bedtime tales.
              </p>
            </div>

            {/* Stat Bars */}
            <div className="space-y-2.5 bg-[#140e2d] p-3.5 rounded-2xl border border-purple-400/30 text-xs">
              {/* Hunger Bar */}
              <div>
                <div className="flex justify-between items-center mb-1 text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1">
                    <span>🍬</span> Marshmallow Level
                  </span>
                  <span className="text-pink-300 font-bold">{hunger}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0718] rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-300" style={{ width: `${hunger}%` }} />
                </div>
              </div>

              {/* Coziness Bar */}
              <div>
                <div className="flex justify-between items-center mb-1 text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1">
                    <span>🧸</span> Blanket Coziness
                  </span>
                  <span className="text-purple-300 font-bold">{coziness}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0718] rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-300" style={{ width: `${coziness}%` }} />
                </div>
              </div>

              {/* Sleepiness Bar */}
              <div>
                <div className="flex justify-between items-center mb-1 text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1">
                    <span>🌙</span> Sleep Readiness
                  </span>
                  <span className="text-amber-300 font-bold">{sleepiness}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0718] rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-300" style={{ width: `${sleepiness}%` }} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs font-bold">
              <button
                type="button"
                onClick={handleFeed}
                className="py-2.5 px-3 rounded-xl bg-[#f472b6] hover:bg-[#fb7185] active:bg-[#e11d48] text-[#240413] border border-pink-300 shadow-sm flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>🍬</span>
                <span>Feed Snack</span>
              </button>

              <button
                type="button"
                onClick={handleTuckIn}
                className="py-2.5 px-3 rounded-xl bg-[#c084fc] hover:bg-[#d8b4fe] active:bg-[#a855f7] text-[#1f0535] border border-purple-300 shadow-sm flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>🧸</span>
                <span>Tuck Blanket</span>
              </button>

              <button
                type="button"
                onClick={handleReadStory}
                className="py-2.5 px-3 rounded-xl bg-[#fde047] hover:bg-[#fef08a] active:bg-[#eab308] text-[#2b1c03] border border-yellow-200 shadow-sm flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>📖</span>
                <span>Read Story</span>
              </button>
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default PipPet;
