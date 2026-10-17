import React, { useState } from 'react';
import { ArrowUp, Heart, Moon, Sparkles } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function Footer() {
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const { playClick, playChime } = useSound();

  const handleBackToTop = () => {
    playClick(720);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSurpriseClick = () => {
    playChime();
    setSurpriseRevealed((prev) => !prev);
  };

  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Pip', href: '#about' },
    { label: 'Dream Diary', href: '#dreams' },
    { label: 'Invention Workshop', href: '#inventions' },
    { label: 'Guestbook', href: '#guestbook' },
    { label: 'Secret Portal', href: '#portal' },
  ];

  return (
    <footer className="pt-12 pb-16 px-4 bg-[#070814] border-t-2 border-[#2b1f44] font-mono z-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-start">
          {/* Column 1: Pip's Signoff Message */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌙</span>
              <h4 className="text-base font-bold text-white tracking-wide">
                Pip's Dream Lab
              </h4>
              <span className="text-xs text-purple-400">· haX.baby Track 1</span>
            </div>

            <p className="text-xs text-slate-300 sm:text-sm leading-relaxed italic">
              "Keep your pillow fluffy, your curiosity alive, and your dream antennas calibrated.
              The internet is as magical as the things we choose to imagine inside it."
            </p>

            <p className="gap-1.5 text-xs text-pink-300 font-semibold flex items-center">
              <span>— Pip, Junior Dream Engineer</span>
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Navigation
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick(500);
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#ff86b6] transition-colors"
                  >
                    ✦ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Back-to-Top & Surprise Easter Egg */}
          <div className="flex-col justify-between md:col-span-3 flex items-start md:items-end space-y-4">
            <button
              type="button"
              onClick={handleBackToTop}
              className="px-3 py-2 gap-1.5 bg-[#1b152d] border-2 border-purple-500/40 rounded text-xs text-white font-bold shadow-[2px_2px_0_0_#000] hover:bg-purple-900/60 active:bg-[#120a22] flex items-center transition-transform active:translate-y-0.5"
            >
              <ArrowUp className="w-3.5 h-3.5 text-pink-400" />
              <span>Back to Top 🚀</span>
            </button>

            {/* Final Tiny Surprise Easter Egg */}
            <div className="text-left md:text-right">
              <button
                type="button"
                onClick={handleSurpriseClick}
                title="A tiny mystery awaits..."
                className="gap-1 text-[11px] text-slate-500 group inline-flex items-center hover:text-amber-300 transition-colors"
              >
                <Moon className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300" />
                <span>Tiny Secret?</span>
              </button>

              {surpriseRevealed && (
                <div className="mt-2 p-2 bg-[#1c1a3b] border border-amber-400/50 rounded text-[10px] text-amber-200 animate-in fade-in zoom-in-95 duration-150">
                  ✨ <strong>Night Owl Achievement:</strong> You explored all the way to the end!
                  Sweet dreams, traveler.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vintage Badges Banner */}
        <div className="flex-wrap pt-6 gap-3 border-t border-purple-400/20 justify-between text-xs text-slate-400 flex items-center">
          <div className="flex-wrap gap-2 flex items-center">
            <span className="px-2.5 py-1 bg-[#121327] border border-pink-400/30 rounded text-[11px] text-[#ff86b6] font-bold">
              ★ Designed &amp; Developed by Tabish Firoz
            </span>
            <span className="px-2 py-0.5 bg-[#121327] border border-white/10 rounded text-[10px] text-pink-300">
              ★ NO COOKIES · ONLY STARS
            </span>
            <span className="px-2 py-0.5 bg-[#121327] border border-white/10 rounded text-[10px] text-emerald-300">
              ★ ACCESSIBLE &amp; RESPONSIVE
            </span>
          </div>

          <div className="text-[11px] text-[#c4b5fd]">
            © 2026 Pip's Dream Lab · haX.baby Track 1 · Crafted with <Heart className="inline w-3 h-3 text-pink-400 fill-pink-400" /> by <strong>Tabish Firoz</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
