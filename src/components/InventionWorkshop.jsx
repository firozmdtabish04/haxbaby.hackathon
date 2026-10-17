import React, { useState } from 'react';
import { standardInventions, generatorTables } from '../data/inventions';
import { RetroWindow } from './RetroWindow';
import { RetroButton } from './ui/RetroButton';
import { useSound } from '../hooks/useSound';
import { Zap, RefreshCw, X, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function InventionWorkshop() {
  const { playClick, playInventionHum, playChime, playGiggle } = useSound();
  const [selectedInvention, setSelectedInvention] = useState(null);
  const [interactiveActive, setInteractiveActive] = useState({});
  const [generatedGizmo, setGeneratedGizmo] = useState(null);

  const handleOpenDetails = (inv) => {
    playClick(580);
    setSelectedInvention(inv);
  };

  const handleToggleMechanism = (inv) => {
    if (inv.soundType === 'hum') {
      playInventionHum();
    } else if (inv.soundType === 'chime') {
      playChime();
    } else {
      playClick(720);
    }
    setInteractiveActive((prev) => ({
      ...prev,
      [inv.id]: !prev[inv.id],
    }));
  };

  const handleGenerateRandom = () => {
    playGiggle();
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const newGizmo = {
      name: `${pick(generatorTables.prefixes)} ${pick(generatorTables.cores)}`,
      power: pick(generatorTables.powerSources),
      effect: pick(generatorTables.effects),
      caution: pick(generatorTables.warnings),
      serial: `PIP-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setGeneratedGizmo(newGizmo);

    try {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ff86b6', '#c084fc', '#fde047'],
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <section id="inventions" className="py-10 sm:py-14 px-4 max-w-6xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          Invention Workshop
        </h2>
        <p className="text-sm sm:text-base text-[#cfc4f4] font-medium">
          Imaginary machines for a brighter tomorrow.
        </p>
      </div>

      {/* 3 Invention Cards (Responsive: 1 col on mobile, 3 cols on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {standardInventions.map((inv) => {
          const statusLabels = {
            'dream-catcher-3000': { label: '⭐ Working!', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' },
            'pocket-moon-generator': { label: '⭐ In Progress', color: 'bg-amber-950/60 text-amber-300 border-amber-500/40' },
            'star-polisher': { label: '⭐ Testing', color: 'bg-purple-950/60 text-purple-300 border-purple-500/40' },
          };
          const status = statusLabels[inv.id] || { label: '⭐ Online', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' };

          return (
            <div
              key={inv.id}
              className="bg-[#201844] border-2 border-[#523d79] rounded-2xl p-5 shadow-[0_6px_20px_rgba(10,5,25,0.4)] flex flex-col justify-between"
            >
              <div>
                {/* Illustration Frame */}
                <div className="w-full aspect-[4/3] bg-[#140e2d] border-2 border-purple-400/30 rounded-xl p-3 flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src={inv.image}
                    alt={inv.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-5xl select-none" style={{ display: 'none' }}>
                    {inv.fallbackEmoji}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-white font-sans text-center mb-1">
                  {inv.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#cfc4f4] text-center leading-relaxed mb-4">
                  {inv.shortDesc}
                </p>
              </div>

              {/* Status pill & View Details button */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenDetails(inv)}
                  className="w-full py-2.5 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm bg-[#ff86b6] hover:bg-[#ff9ec3] active:bg-[#f472b6] text-[#2e0517] border border-pink-300 shadow-sm transition-all text-center cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Big Bottom Action Button (matching mockup) */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleGenerateRandom}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-sans font-bold text-sm sm:text-base bg-[#ff86b6] hover:bg-[#ff9ec3] active:bg-[#f472b6] text-[#2e0517] border-2 border-pink-300 shadow-[0_6px_20px_rgba(255,134,182,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="text-lg">🎲</span>
          <span>Generate a Random Invention</span>
        </button>
      </div>

      {/* Generated Random Contraption Card Banner */}
      {generatedGizmo && (
        <div className="mt-6 max-w-xl mx-auto bg-[#1a1438] border-2 border-amber-400/50 rounded-2xl p-5 font-mono text-xs text-slate-200 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-amber-300 font-bold">
            <span className="text-sm">★ {generatedGizmo.name}</span>
            <span className="text-[10px] text-slate-400">{generatedGizmo.serial}</span>
          </div>
          <div><strong className="text-slate-400">Power Source:</strong> <span className="text-pink-300">{generatedGizmo.power}</span></div>
          <div><strong className="text-slate-400">Effect:</strong> <span className="text-emerald-300">{generatedGizmo.effect}</span></div>
          <div className="text-[11px] text-amber-200/90 pt-1 border-t border-white/5 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{generatedGizmo.caution}</span>
          </div>
        </div>
      )}

      {/* Invention Details Modal */}
      {selectedInvention && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSelectedInvention(null)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <RetroWindow
              title={`BLUEPRINT // ${selectedInvention.id.toUpperCase()}`}
              icon="⚙️"
              onClose={() => setSelectedInvention(null)}
              statusBarText={`SERIAL: ${selectedInvention.codename} · CALIBRATION: OK`}
            >
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#120e29] border border-purple-400/30 rounded-xl p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={selectedInvention.image}
                      alt={selectedInvention.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">
                      {selectedInvention.name}
                    </h3>
                    <p className="text-purple-300 text-[11px]">
                      {selectedInvention.codename}
                    </p>
                    <p className="text-slate-300 mt-1">
                      {selectedInvention.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="bg-[#121429] p-3 rounded-lg border border-white/10 space-y-1.5">
                  <div className="text-[11px] font-bold text-yellow-300 uppercase">
                    Specifications
                  </div>
                  <div><span className="text-slate-400">Power Cell:</span> {selectedInvention.specs.powerSource}</div>
                  <div><span className="text-slate-400">Noise Profile:</span> {selectedInvention.specs.noiseLevel || selectedInvention.specs.weight || selectedInvention.specs.cleaningAgent}</div>
                  <div><span className="text-slate-400">Notes:</span> {selectedInvention.blueprintNotes}</div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggleMechanism(selectedInvention)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {interactiveActive[selectedInvention.id] ? 'Active (Tap to Stop)' : 'Engage Mechanism'}
                  </button>

                  <RetroButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedInvention(null)}
                  >
                    Close
                  </RetroButton>
                </div>
              </div>
            </RetroWindow>
          </div>
        </div>
      )}
    </section>
  );
}

export default InventionWorkshop;
