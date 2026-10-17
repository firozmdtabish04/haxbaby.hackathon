import React from 'react';
import { RetroWindow } from './RetroWindow';
import { Star, Heart, Terminal, Sparkles, Moon, Wrench } from 'lucide-react';

export function AboutPip() {
  return (
    <section id="about" className="py-10 sm:py-14 px-4 max-w-6xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          About Pip
        </h2>
        <p className="text-sm sm:text-base text-[#cfc4f4] font-medium">
          A little dreamer. A junior dream engineer. A friend on the internet.
        </p>
      </div>

      {/* Main Window Frame */}
      <RetroWindow
        title="ABOUT_PIP.SYS — Character Dossier"
        icon="🧸"
        statusBarText="ID: PIP-001 · LOCATION: SOMEWHERE IN THE CLOUDS · STATUS: DREAMING"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Polaroid / Character Card (Left Column) */}
          <div className="md:col-span-4 lg:col-span-3 bg-[#1e173e] border-2 border-purple-400/30 rounded-xl p-4 text-center flex flex-col items-center justify-between shadow-sm">
            <div className="relative w-full aspect-square max-w-[200px] bg-[#120e29] border-2 border-purple-300/30 rounded-lg p-2 flex items-center justify-center overflow-hidden shadow-inner">
              <img
                src="/assets/pip_portrait.png"
                alt="Pip character portrait with star eyes"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  e.currentTarget.src = '/assets/pip_avatar_cloud.png';
                }}
              />
            </div>

            <div className="mt-3 space-y-0.5">
              <h3 className="text-base font-bold text-white font-sans flex items-center justify-center gap-1.5">
                <span className="text-pink-400 text-sm">🌸</span>
                Pip
              </h3>
              <p className="text-xs text-[#c4b5fd] font-mono">
                Junior Dream Engineer
              </p>
            </div>
          </div>

          {/* Card 2: Bio & Character Stats (Middle Column) */}
          <div className="md:col-span-8 lg:col-span-5 bg-[#1a1438] border-2 border-purple-400/30 rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white font-sans">
                Hello! I'm Pip!
              </h4>
              <p className="text-xs sm:text-sm text-[#ddd2f8] leading-relaxed">
                I'm a Junior Dream Engineer who collects dreams, builds imaginary machines and
                explores strange little corners of the internet.
              </p>
            </div>

            {/* Bulleted List with Star Icons */}
            <div className="space-y-2 text-xs sm:text-sm font-mono text-[#e9e3fa] bg-[#130f2b] p-3.5 rounded-lg border border-purple-500/20">
              <div className="flex items-start gap-2">
                <span className="text-amber-300 shrink-0 mt-0.5">⭐</span>
                <div>
                  <span className="text-slate-400">Favourite things: </span>
                  <span className="text-white font-semibold">Stars, moon, cute robots</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-amber-300 shrink-0 mt-0.5">⭐</span>
                <div>
                  <span className="text-slate-400">Current mood: </span>
                  <span className="text-[#f472b6] font-semibold">Dreaming ✨</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-amber-300 shrink-0 mt-0.5">⭐</span>
                <div>
                  <span className="text-slate-400">Current project: </span>
                  <span className="text-[#38bdf8] font-semibold">Pocket-Sized Moon Generator</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-amber-300 shrink-0 mt-0.5">⭐</span>
                <div>
                  <span className="text-slate-400">Location: </span>
                  <span className="text-[#fef08a] font-semibold">Somewhere in the clouds ☁️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Retro Terminal + Sleeping Pip (Right Column) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-3">
            {/* Terminal Window */}
            <div className="bg-[#0b0c1b] border-2 border-[#3b2d56] rounded-xl overflow-hidden shadow-md flex-1">
              <div className="bg-[#1b1535] px-3 py-1.5 border-b border-purple-500/30 flex items-center justify-between text-xs font-mono text-purple-200">
                <span className="font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  dream@pip:~
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                </div>
              </div>

              <div className="p-3 text-[11px] sm:text-xs font-mono space-y-1.5 text-emerald-400 leading-normal">
                <div>&gt; Hello, friend!</div>
                <div>&gt; Stars: online</div>
                <div>&gt; Collecting dreams...</div>
                <div>&gt; Building happy machines...</div>
                <div>&gt; The internet is magic!</div>
                <div className="text-amber-300">&gt; Stay curious! ✨</div>
              </div>
            </div>

            {/* Sleeping Pip Graphic on Cloud */}
            <div className="bg-[#1e173e] border border-purple-400/30 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="w-14 h-14 shrink-0 rounded-full bg-[#120e29] border border-purple-300/30 p-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/pip_avatar_cloud.png"
                  alt="Pip sleeping on a cloud"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left font-mono text-xs">
                <span className="text-[#f472b6] font-bold block">zzz...</span>
                <span className="text-slate-300 text-[11px]">Charging starlight batteries</span>
              </div>
              <span className="text-xl">🌙</span>
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default AboutPip;
