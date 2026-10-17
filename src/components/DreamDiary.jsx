import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { dreamEntries } from '../data/dreams';
import { DreamCard } from './DreamCard';
import { RetroWindow } from './RetroWindow';
import { RetroButton } from './ui/RetroButton';
import { RetroBadge } from './ui/RetroBadge';
import { useSound } from '../hooks/useSound';
import { Music, Sparkles, Dices, BookOpen, Filter } from 'lucide-react';

export function DreamDiary() {
  const [selectedDream, setSelectedDream] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { playClick, playChime, playLullaby, stopLullaby } = useSound();
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);

  // Distinct categories
  const categories = ['All', ...new Set(dreamEntries.map((d) => d.category))];

  const filteredDreams = activeCategory === 'All'
    ? dreamEntries
    : dreamEntries.filter((d) => d.category === activeCategory);

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
    playClick(640);
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

  const handleRandomDream = () => {
    playChime();
    const randomIndex = Math.floor(Math.random() * dreamEntries.length);
    setSelectedDream(dreamEntries[randomIndex]);
  };

  return (
    <section id="dreams" className="py-10 sm:py-14 px-4 max-w-6xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-400/20 text-pink-300 border border-pink-400/30 text-xs font-mono font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{dreamEntries.length} Pre-Loaded Stories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          Pip's Dream Diary
        </h2>
        <p className="text-sm sm:text-base text-[#cfc4f4] font-medium">
          Little dreams, big adventures. Click any dream card to read the full nocturnal story!
        </p>
      </div>

      {/* Filter Tabs & Random Story Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#181136] p-2.5 sm:p-3 rounded-2xl border border-purple-400/30 shadow-md">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => {
            const count = cat === 'All' ? dreamEntries.length : dreamEntries.filter((d) => d.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playClick(580);
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-[#241a4a] text-purple-200 hover:bg-purple-900/50 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleRandomDream}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-sans font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-xs ml-auto"
        >
          <Dices className="w-4 h-4 text-purple-950" />
          <span>🎲 Random Bedtime Story</span>
        </button>
      </div>

      {/* Cards Grid - Fully responsive: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredDreams.map((dream) => (
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
              title={`LOG // ${selectedDream.id.toUpperCase()}`}
              icon={selectedDream.pixelArt}
              onClose={handleCloseModal}
              statusBarText={`COORDINATES: ${selectedDream.coordinates} · BEDTIME: ${selectedDream.bedtimeRating}`}
              className="flex flex-col max-h-[85vh] sm:max-h-[90vh]"
            >
              <div className="space-y-4 font-mono">
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-purple-500/30">
                  <div>
                    <span className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                      {selectedDream.category} · {selectedDream.date}
                    </span>
                    <h3
                      id="dream-modal-title"
                      className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5"
                    >
                      {selectedDream.title}
                    </h3>
                  </div>
                  <span className="text-3xl shrink-0 p-2 bg-[#2d1b4e] rounded-xl border border-purple-400/40">
                    {selectedDream.pixelArt}
                  </span>
                </div>

                {/* Full Story Content */}
                <div className="bg-[#120e29] p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {selectedDream.fullStory}
                </div>

                {/* Artifact Discovered */}
                {selectedDream.discoveredArtifact && (
                  <div className="p-3 bg-[#1d143d] rounded-xl border border-yellow-400/30 flex items-center justify-between text-xs">
                    <span className="text-purple-300">Artifact Brought to Wakefulness:</span>
                    <span className="font-bold text-yellow-300 font-sans">
                      ✨ {selectedDream.discoveredArtifact}
                    </span>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleToggleStoryAudio}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-400/40"
                  >
                    <Music className="w-3.5 h-3.5 text-pink-400" />
                    <span>{isPlayingLullaby ? 'Stop Story Lullaby' : 'Play Story Lullaby ♫'}</span>
                  </button>

                  <RetroButton variant="primary" size="sm" onClick={handleCloseModal}>
                    Close Entry
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
