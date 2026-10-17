import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Sparkles, Copy, Check, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const SETTINGS = ['Marshmallow Sea', 'Nebula Garden', 'Clockwork Moon', 'Starlight Aquarium'];
const COMPANIONS = ['Pocket Robot', 'Star Kitten', 'Flying Teacup', 'Midnight Owl'];
const EMOTIONS = ['Ultra Cozy 🧸', 'Deep Wonder ✨', 'Curious Adventure 🚀', 'Sweet Peace 🌙'];
const WISHES = [
  'May tomorrow be gentle and bright.',
  'May your imagination always have wings.',
  'May bad thoughts turn into harmless confetti.',
  'May you wake up feeling well rested.',
];

export function DreamWeaver() {
  const { playClick, playChime } = useSound();
  const [setting, setSetting] = useState(SETTINGS[0]);
  const [companion, setCompanion] = useState(COMPANIONS[0]);
  const [emotion, setEmotion] = useState(EMOTIONS[0]);
  const [wish, setWish] = useState(WISHES[0]);
  const [copied, setCopied] = useState(false);

  const handleWeaveNew = () => {
    playChime();
    setSetting(SETTINGS[Math.floor(Math.random() * SETTINGS.length)]);
    setCompanion(COMPANIONS[Math.floor(Math.random() * COMPANIONS.length)]);
    setEmotion(EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]);
    setWish(WISHES[Math.floor(Math.random() * WISHES.length)]);

    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#ff86b6', '#c084fc', '#fde047'],
      });
    } catch {}
  };

  const postcardText = `💌 Pip's Dream Postcard 🌙\nSetting: ${setting}\nCompanion: ${companion}\nVibe: ${emotion}\nWish: "${wish}"\nCoordinates: Sector Cloud-9 · Certified Cozy by Pip`;

  const handleCopy = () => {
    playClick(600);
    navigator.clipboard.writeText(postcardText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="weaver" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="DREAM_WEAVER.STUDIO — Craft Your Own Bedtime Postcard"
        icon="✨"
        statusBarText="POSTCARD STUDIO · UNLIMITED REPLICAS · ZERO POSTAGE REQUIRED"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch font-mono">
          {/* Left: Ingredient Selectors */}
          <div className="md:col-span-6 space-y-3">
            <div>
              <h3 className="text-xl font-bold text-white font-sans">
                Dream Weaver Studio
              </h3>
              <p className="text-xs text-[#cfc4f4] mt-0.5">
                Pick your dream ingredients to synthesize an original bedtime postcard.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Celestial Setting:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SETTINGS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { playClick(550); setSetting(s); }}
                      className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] truncate transition-colors ${
                        setting === s
                          ? 'bg-purple-600 text-white border-purple-300'
                          : 'bg-[#140e2d] text-slate-300 border-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Companion:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {COMPANIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { playClick(600); setCompanion(c); }}
                      className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] truncate transition-colors ${
                        companion === c
                          ? 'bg-pink-600 text-white border-pink-300'
                          : 'bg-[#140e2d] text-slate-300 border-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleWeaveNew}
                  className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Randomize Recipe 🎲</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Rendered Digital Postcard */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#25184a] to-[#160d33] border-2 border-dashed border-purple-400/50 rounded-2xl p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex justify-between items-center pb-2 mb-3 border-b border-purple-400/20 text-xs">
                <span className="font-bold text-amber-300">★ CERTIFIED DREAM POSTCARD</span>
                <span className="text-[10px] text-pink-300">AIR-MAIL 1999</span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Destination:</span>
                  <span className="text-white font-bold text-sm">{setting}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Travel Companion:</span>
                  <span className="text-pink-300 font-semibold">{companion}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Bedtime Resonance:</span>
                  <span className="text-emerald-300 font-semibold">{emotion}</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-slate-200 italic">
                  "{wish}"
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-400/20 flex justify-between items-center text-xs">
              <span className="text-[10px] text-purple-300">— Signed by Pip 🧸</span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-[#3d276e] hover:bg-[#523594] text-white font-bold border border-purple-400/30 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Postcard'}</span>
              </button>
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default DreamWeaver;
