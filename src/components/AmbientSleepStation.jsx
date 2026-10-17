import React, { useState, useEffect } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { CloudRain, Radio, Square, Clock, Sparkles } from 'lucide-react';

export function AmbientSleepStation() {
  const { startAmbientNoise, stopAmbientNoise, activeAmbient, isMuted, playClick } = useSound();
  const [timerMinutes, setTimerMinutes] = useState(null);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timerMinutes && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            stopAmbientNoise();
            setTimerMinutes(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerMinutes, timeLeftSeconds, stopAmbientNoise]);

  const handleStartSoundscape = (type) => {
    playClick(600);
    startAmbientNoise(type);
  };

  const handleStop = () => {
    playClick(440);
    stopAmbientNoise();
    setTimerMinutes(null);
    setTimeLeftSeconds(0);
  };

  const handleSetTimer = (mins) => {
    playClick(700);
    setTimerMinutes(mins);
    setTimeLeftSeconds(mins * 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="sleep-aid" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="SLEEP_AID.DAEMON — Ambient Dream Soundscape"
        icon="🌙"
        statusBarText={`SOUNDSCAPE: ${activeAmbient ? activeAmbient.toUpperCase() : 'OFF'} · TIMER: ${
          timeLeftSeconds > 0 ? formatTime(timeLeftSeconds) : 'NO TIMER'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center font-mono">
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
              Nocturnal Sleep Aid Station
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc4f4] leading-relaxed">
              Drift away with soothing procedural noise generated in real time. Choose a soundscape
              and set an auto-shutoff timer for your bedtime.
            </p>

            {/* Soundscape Options */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleStartSoundscape('rain')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                  activeAmbient === 'rain'
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] animate-pulse'
                    : 'bg-[#140e2d] text-slate-300 border-purple-400/30 hover:border-cyan-400/50'
                }`}
              >
                <CloudRain className="w-4 h-4 text-cyan-400" />
                <span>Cosmic Rain</span>
              </button>

              <button
                type="button"
                onClick={() => handleStartSoundscape('drone')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                  activeAmbient === 'drone'
                    ? 'bg-purple-500/20 text-purple-200 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] animate-pulse'
                    : 'bg-[#140e2d] text-slate-300 border-purple-400/30 hover:border-purple-400/50'
                }`}
              >
                <Radio className="w-4 h-4 text-purple-400" />
                <span>432Hz Deep Space</span>
              </button>

              {activeAmbient && (
                <button
                  type="button"
                  onClick={handleStop}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-400/40 hover:bg-rose-500/30 flex items-center gap-1.5 transition-colors"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Sleep Timer Controls */}
          <div className="md:col-span-5 bg-[#140e2d] border border-purple-400/30 p-4 rounded-2xl text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold uppercase">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Sleep Timer</span>
            </div>

            <div className="text-2xl font-bold font-sans text-white">
              {timeLeftSeconds > 0 ? formatTime(timeLeftSeconds) : 'Off'}
            </div>

            <div className="flex justify-center gap-2">
              {[5, 15, 30].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleSetTimer(mins)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                    timerMinutes === mins
                      ? 'bg-amber-400 text-black border-yellow-200 font-bold'
                      : 'bg-[#221748] text-slate-300 border-white/10 hover:border-amber-400/50'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default AmbientSleepStation;
