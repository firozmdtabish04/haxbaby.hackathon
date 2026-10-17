import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { dreamEntries } from '../data/dreams';
import { DreamCard } from './DreamCard';
import { RetroWindow } from './RetroWindow';
import { RetroButton } from './ui/RetroButton';
import { RetroBadge } from './ui/RetroBadge';
import { useSound } from '../hooks/useSound';
import { Music } from 'lucide-react';

export function DreamDiary() {
  const [selectedDream, setSelectedDream] = useState(null);
  const { playClick, playLullaby, stopLullaby } = useSound();
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);

  // Take the primary 4 canonical dreams matching the mockup
  const displayDreams = dreamEntries.slice(0, 4);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedDream) {
        setSelectedDream(null);
        stopLullaby();
        setIsPlayingLullaby(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDream, stopLullaby]);

  // Lock body scroll when modal is open so background never scrolls or hides popup
  useEffect(() => {
    if (selectedDream) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDream]);

  const handleOpenModal = (dream) => {
    setSelectedDream(dream);
  };

  const handleCloseModal = () => {
    setSelectedDream(null);
    stopLullaby();
    setIsPlayingLullaby(false);
  };

  const handleToggleStoryAudio = () => {
    if (isPlayingLullaby) {
      stopLullaby();
      setIsPlayingLullaby(false);
    } else {
      setIsPlayingLullaby(true);
      playLullaby(() => setIsPlayingLullaby(false));
    }
  };

  return (
    <section id="dreams" className="py-10 sm:py-14 px-4 max-w-6xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          Dream Diary
        </h2>
        <p className="text-sm sm:text-base text-[#cfc4f4] font-medium">
          Little dreams, big adventures. Click a dream to read more!
        </p>
      </div>

      {/* 4 Cards Grid - Fully responsive: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayDreams.map((dream) => (
          <DreamCard key={dream.id} dream={dream} onOpen={handleOpenModal} />
        ))}
      </div>

      {/* Full Dream Entry Modal */}
      {selectedDream && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dream-modal-title"
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex min-h-screen items-center justify-center animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-xl my-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <RetroWindow
              title={`DREAM_VIEWER // ${selectedDream.id.toUpperCase()}`}
              icon={selectedDream.pixelArt}
              onClose={handleCloseModal}
              statusBarText={`COORDINATES: ${selectedDream.coordinates} · BEDTIME: ${selectedDream.bedtimeRating}`}
              className="flex flex-col max-h-[85vh] sm:max-h-[90vh]"
            >
              <div className="space-y-4 font-mono">
                {/* Modal Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl select-none" aria-hidden="true">
                      {selectedDream.pixelArt}
                    </span>
                    <div>
                      <h3
                        id="dream-modal-title"
                        className="text-lg sm:text-xl font-bold text-white leading-tight font-sans"
                      >
                        {selectedDream.title}
                      </h3>
                      <p className="text-xs text-purple-300">
                        {selectedDream.date} · {selectedDream.category}
                      </p>
                    </div>
                  </div>

                  <RetroBadge variant="yellow">
                    {selectedDream.bedtimeRating}
                  </RetroBadge>
                </div>

                {/* Full Story Content */}
                <div className="bg-[#0b0c1b] p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-3">
                  {selectedDream.fullStory}
                </div>

                {/* Lore / Artifact Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#171a38] p-3 rounded-lg border border-purple-500/20">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                      Starlight Coordinates:
                    </span>
                    <span className="text-[#38bdf8] font-bold">
                      {selectedDream.coordinates}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                      Discovered Artifact:
                    </span>
                    <span className="text-[#fde047] font-bold">
                      ★ {selectedDream.discoveredArtifact}
                    </span>
                  </div>
                </div>

                {/* Modal Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <RetroButton
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleStoryAudio}
                    className="text-xs"
                  >
                    <Music className="w-3.5 h-3.5 text-pink-400" />
                    {isPlayingLullaby ? 'Stop Story Melody' : 'Play Story Lullaby ♫'}
                  </RetroButton>

                  <RetroButton
                    variant="primary"
                    size="sm"
                    onClick={handleCloseModal}
                  >
                    Close Log
                  </RetroButton>
                </div>
              </div>
            </RetroWindow>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default DreamDiary;
