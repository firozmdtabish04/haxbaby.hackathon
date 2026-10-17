import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Code, Copy, Check, ChevronLeft, ChevronRight, Shuffle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

const WEBRING_MEMBERS = [
  { id: 1, name: "Pip's Dream Lab", url: '#home', tagline: 'The Little Internet of Big Dreams' },
  { id: 2, name: 'Cloudberry Observatory', url: '#about', tagline: 'Mapping distant nebulae' },
  { id: 3, name: 'The Marshmallow Foundry', url: '#dreams', tagline: 'Toasting nocturnal ideas' },
  { id: 4, name: 'Clockwork Lullaby Archive', url: '#inventions', tagline: 'Mechanical bedtime chimes' },
];

const BUTTONS_88x31 = [
  { id: 'btn-1', label: "PIP'S DREAM LAB", sub: '2026', bg: 'bg-gradient-to-r from-purple-700 to-pink-600', border: 'border-purple-300' },
  { id: 'btn-2', label: 'NETSCAPE NOW', sub: '4.0', bg: 'bg-gradient-to-r from-cyan-800 to-blue-900', border: 'border-cyan-300' },
  { id: 'btn-3', label: 'NO COOKIES', sub: 'STARS', bg: 'bg-gradient-to-r from-emerald-800 to-teal-900', border: 'border-emerald-300' },
  { id: 'btn-4', label: '800 x 600', sub: 'PIXELS', bg: 'bg-gradient-to-r from-amber-700 to-yellow-800', border: 'border-yellow-300' },
  { id: 'btn-5', label: 'TABISH FIROZ', sub: 'DEV', bg: 'bg-gradient-to-r from-rose-700 to-pink-800', border: 'border-pink-300' },
  { id: 'btn-6', label: 'HAX.BABY', sub: 'TRACK 1', bg: 'bg-gradient-to-r from-indigo-800 to-purple-900', border: 'border-indigo-300' },
  { id: 'btn-7', label: 'MADE WITH LOVE', sub: 'REACT', bg: 'bg-gradient-to-r from-sky-800 to-indigo-800', border: 'border-sky-300' },
  { id: 'btn-8', label: 'EARLY WEB', sub: 'FOREVER', bg: 'bg-gradient-to-r from-purple-900 to-fuchsia-900', border: 'border-fuchsia-300' },
];

export function WebringWall() {
  const { playClick, playChime } = useSound();
  const [currentMemberIdx, setCurrentMemberIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const embedCode = `<a href="https://pipsdreamlab.vercel.app/" target="_blank" title="Pip's Dream Lab - The Little Internet of Big Dreams">\n  <img src="https://pipsdreamlab.vercel.app/assets/pip_avatar_cloud.png" width="88" height="31" alt="Pip's Dream Lab" border="0" />\n</a>`;

  const handleCopyCode = () => {
    playClick(640);
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrev = () => {
    playClick(500);
    setCurrentMemberIdx((prev) => (prev > 0 ? prev - 1 : WEBRING_MEMBERS.length - 1));
  };

  const handleNext = () => {
    playClick(500);
    setCurrentMemberIdx((prev) => (prev + 1) % WEBRING_MEMBERS.length);
  };

  const handleRandom = () => {
    playChime();
    setCurrentMemberIdx(Math.floor(Math.random() * WEBRING_MEMBERS.length));
    try {
      confetti({ particleCount: 15, spread: 45, origin: { y: 0.8 } });
    } catch {}
  };

  const currentMember = WEBRING_MEMBERS[currentMemberIdx];

  return (
    <section id="webring" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="NEIGHBORHOOD_WEBRING.HTM — 88x31 Button Wall & Rings"
        icon="🌐"
        statusBarText="WEBRING PROTOCOL: ACTIVE · MEMBER #042 OF STARLIGHT NET"
      >
        <div className="space-y-6 font-mono text-center">
          {/* Header */}
          <div className="max-w-xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              Pip's Neighborhood Webring &amp; 88x31 Wall
            </h3>
            <p className="text-xs text-[#cfc4f4]">
              Before algorithms and social feeds, the web was connected by friendly hand-made banners and webrings.
            </p>
          </div>

          {/* Authentic 88x31 Pixel Buttons Grid */}
          <div className="bg-[#140e2d] border-2 border-purple-400/30 rounded-2xl p-4 sm:p-5">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block mb-3">
              ★ The 88x31 Button Wall ★
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {BUTTONS_88x31.map((b) => (
                <div
                  key={b.id}
                  title={`${b.label} ${b.sub}`}
                  className={`w-[88px] h-[31px] ${b.bg} border ${b.border} rounded-xs flex items-center justify-between px-1.5 shadow-[1px_1px_0_0_#000] select-none transform hover:scale-105 transition-transform cursor-pointer`}
                >
                  <span className="text-[8px] font-bold text-white tracking-tighter truncate leading-none">
                    {b.label}
                  </span>
                  <span className="text-[7px] font-black bg-black/60 text-yellow-300 px-0.5 rounded-xs leading-none shrink-0 ml-0.5">
                    {b.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Copy Embed Code Button */}
            <div className="mt-4 pt-3 border-t border-purple-400/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-[11px]">
                Want to link Pip on your own personal website?
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-lg border border-purple-300 flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Code Copied!' : 'Copy 88x31 Button Code'}</span>
              </button>
            </div>
          </div>

          {/* The Starlight Webring Hub */}
          <div className="bg-[#1e153b] border-2 border-purple-400/40 rounded-2xl p-4 max-w-xl mx-auto space-y-3">
            <div className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
              <span>★</span>
              <span>The Starlight Webring Hub</span>
              <span>★</span>
            </div>

            <div className="bg-[#110d24] p-3 rounded-xl border border-white/10 text-xs text-left">
              <span className="text-white font-bold block">{currentMember.name}</span>
              <span className="text-slate-400 text-[11px] block">{currentMember.tagline}</span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={handlePrev}
                className="px-3 py-1 bg-[#2b1f4e] hover:bg-[#3b2d6a] text-purple-200 rounded-lg border border-purple-400/30 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Site</span>
              </button>

              <button
                type="button"
                onClick={handleRandom}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg border border-yellow-200 flex items-center gap-1"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-3 py-1 bg-[#2b1f4e] hover:bg-[#3b2d6a] text-purple-200 rounded-lg border border-purple-400/30 flex items-center gap-1"
              >
                <span>Next Site</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default WebringWall;
