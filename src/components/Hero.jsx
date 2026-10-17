import React, { useState } from 'react';
import { VisitorCounter } from './VisitorCounter';
import { useSound } from '../hooks/useSound';
import { Heart, Sparkles, ArrowRight, Moon, Star } from 'lucide-react';

export function Hero({ onExploreDreams, onOpenPortal }) {
  const { playGiggle, playClick } = useSound();
  const [petCount, setPetCount] = useState(0);

  const handlePetPip = () => {
    setPetCount((prev) => prev + 1);
    playGiggle();
  };

  const handleExplore = () => {
    playClick(600);
    if (onExploreDreams) {
      onExploreDreams();
    } else {
      document.querySelector('#dreams')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePortal = () => {
    playClick(650);
    if (onOpenPortal) {
      onOpenPortal();
    } else {
      document.querySelector('#portal')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 max-w-6xl mx-auto z-10"
    >
      {/* Hero Outer Retro Window Card */}
      <div className="relative w-full bg-gradient-to-b from-[#2a2253]/95 via-[#1a153a]/95 to-[#120e2b] border-2 sm:border-3 border-[#c4b5fd]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(15,10,35,0.6)] overflow-hidden">
        {/* Soft Dreamy Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-pink-500/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Floating Background Stars */}
        <span className="absolute top-8 left-1/3 text-yellow-200/50 text-xl animate-pulse pointer-events-none select-none">✦</span>
        <span className="absolute top-20 right-12 text-yellow-200/60 text-2xl animate-pulse pointer-events-none select-none">★</span>
        <span className="absolute bottom-16 right-1/3 text-pink-300/40 text-lg pointer-events-none select-none">✦</span>

        {/* Hanging Lantern (matching mockup) */}
        <div className="absolute top-0 right-1/3 hidden lg:flex flex-col items-center pointer-events-none select-none">
          <div className="w-0.5 h-12 bg-amber-200/40" />
          <div className="w-7 h-9 rounded-md bg-amber-300/80 border border-amber-200 shadow-[0_0_15px_#fde047] flex items-center justify-center text-xs">
            🕯️
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-4 sm:space-y-5">
            {/* "Welcome to" small tag */}
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-[#dcd4f5] uppercase">
                Welcome to
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Pip's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffa4cb] via-[#e2c7ff] to-[#a5f3fc]">
                Dream Lab!
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#ddd3f8] font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              A tiny corner of the internet where little dreams become big adventures.
            </p>

            {/* "★ Pip is dreaming..." Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#201844]/90 border border-purple-400/40 rounded-full text-xs font-mono text-[#f3eefe] shadow-inner">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-semibold tracking-wide">Pip is dreaming...</span>
            </div>

            {/* Primary Action Buttons (matching mockup styling) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              {/* Cream/Yellow Button */}
              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-sm sm:text-base bg-[#fef3c7] hover:bg-[#fffbeb] active:bg-[#fde68a] text-[#3d2603] border-2 border-[#fef08a] shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Explore My Dreams</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Soft Lavender Button */}
              <button
                type="button"
                onClick={handlePortal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-sm sm:text-base bg-[#433878] hover:bg-[#4f438c] active:bg-[#372d66] text-white border-2 border-[#7e6bb5] shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Moon className="w-4 h-4 text-purple-200 fill-purple-200" />
                <span>Open the Secret Portal</span>
              </button>
            </div>

            {/* Bottom Row: Visitor Counter & Sticker Badge (matching mockup) */}
            <div className="pt-4 border-t border-purple-400/20 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <VisitorCounter />

              {/* "Best viewed with curiosity! ✨" Sticker */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fce7f3]/10 border border-pink-300/40 rounded-lg text-xs font-mono text-[#fbcfe8] shadow-xs select-none">
                <span>Best viewed with curiosity!</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>
            </div>
          </div>

          {/* Right Column: Pip on Cozy Cloud with Moon & Vintage Bedside Monitor */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div
              onClick={handlePetPip}
              title="Click to gently pat Pip! 🧸"
              className="relative cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02] active:scale-95 max-w-sm sm:max-w-md w-full"
            >
              {/* Crescent Moon backdrop */}
              <div className="absolute -top-6 -right-4 w-40 h-40 rounded-full border-r-[18px] border-t-[18px] border-amber-200/40 rotate-[25deg] blur-xs pointer-events-none" />

              {/* Pip floating on dream cloud (Official Asset) */}
              <div className="relative z-10 w-full aspect-square max-h-[380px] sm:max-h-[420px] flex items-center justify-center">
                <img
                  src="/assets/pip_avatar_cloud.png"
                  alt="Pip the Junior Dream Engineer resting on a cloud with a star"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] animate-in fade-in duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/pip_portrait.png';
                  }}
                />

                {/* Petting counter heart pill */}
                {petCount > 0 && (
                  <div className="absolute top-4 right-4 bg-pink-500/90 text-white text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md animate-bounce">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>+{petCount} pats!</span>
                  </div>
                )}
              </div>

              {/* Cozy Little Elements */}
              <div className="absolute -bottom-3 inset-x-4 bg-[#140e2d]/85 backdrop-blur-xs py-1.5 px-3 rounded-full border border-purple-400/30 flex items-center justify-between text-[11px] font-mono text-[#ddd3f8] shadow-md">
                <span className="flex items-center gap-1 text-amber-300">
                  <span>★</span> Pip · Junior Dream Engineer
                </span>
                <span className="text-slate-400 hidden xs:inline">
                  Tap Pip for giggles ♫
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
