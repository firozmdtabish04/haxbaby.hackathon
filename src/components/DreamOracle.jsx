import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const ORACLE_PREDICTIONS = [
  '🌕 The crescent moon whispers: A pleasant daydream will come true before sunset.',
  '✨ All constellation signals point to: Definitely yes, especially with snacks.',
  '🧸 The blanket fort sensors predict: You will find comfortable sleep tonight.',
  '🤖 A clockwork robot advises: Do not worry about small glitches; stars still shine.',
  '☁️ Cloud forecast: 100% chance of marshmallow fluff and creative thoughts.',
  '🚀 The hyperdrive says: Bold dreams bring magical journeys. Go for it!',
  '☕ Midnight tea leaves say: Take a deep breath, drink warm milk, and rest easy.',
  '⭐ Starlight frequency says: The answer you seek is already in your pocket.',
];

export function DreamOracle() {
  const { playChime, playClick } = useSound();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Ask a question and peer into the moon crystal...');
  const [isConsulting, setIsConsulting] = useState(false);

  const handleConsult = (e) => {
    e.preventDefault();
    if (isConsulting) return;

    playChime();
    setIsConsulting(true);
    setAnswer('Tuning starlight vibrations...');

    setTimeout(() => {
      const pick = ORACLE_PREDICTIONS[Math.floor(Math.random() * ORACLE_PREDICTIONS.length)];
      setAnswer(pick);
      setIsConsulting(false);

      try {
        confetti({
          particleCount: 20,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#c084fc', '#fde047', '#ff86b6'],
        });
      } catch {}
    }, 1000);
  };

  return (
    <section id="oracle" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="DREAM_ORACLE.SYS — Midnight Constellation Fortunes"
        icon="🔮"
        statusBarText="ORACLE ALGORITHM: 432Hz HARMONIC · CONFIDENCE: 100% COZY"
      >
        <div className="max-w-xl mx-auto text-center space-y-4 font-mono">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              Pip's Dream Crystal Ball
            </h3>
            <p className="text-xs text-[#cfc4f4] mt-0.5">
              Ask a question about your bedtime dreams, your inventions, or tomorrow!
            </p>
          </div>

          {/* Interactive Crystal Ball Sphere */}
          <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center select-none">
            {/* Glowing Aura */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-300 blur-lg transition-all duration-500 ${
              isConsulting ? 'scale-125 opacity-90 animate-spin' : 'opacity-40 hover:opacity-75'
            }`} />

            {/* Glass Sphere */}
            <div className="relative z-10 w-full h-full rounded-full bg-[#160d33] border-4 border-[#c4b5fd] flex items-center justify-center p-4 shadow-[inset_0_4px_16px_rgba(255,255,255,0.2)]">
              <span className="text-4xl sm:text-5xl animate-pulse">🔮</span>
            </div>
          </div>

          {/* Answer Box */}
          <div className="bg-[#120e2b] border-2 border-purple-400/40 rounded-2xl p-4 text-xs sm:text-sm text-[#fef08a] font-semibold leading-relaxed min-h-[64px] flex items-center justify-center shadow-inner">
            <span>{answer}</span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleConsult} className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Will I dream about flying over stars?"
              className="flex-1 px-3.5 py-2.5 bg-[#140e2d] border-2 border-purple-400/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-400"
            />
            <button
              type="submit"
              disabled={isConsulting}
              className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl border border-pink-300 shadow-sm transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              Consult 🔮
            </button>
          </form>
        </div>
      </RetroWindow>
    </section>
  );
}

export default DreamOracle;
