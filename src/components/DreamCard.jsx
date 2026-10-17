import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function DreamCard({ dream, onOpen }) {
  const { playClick } = useSound();

  const handleCardClick = () => {
    playClick(540);
    onOpen(dream);
  };

  // Map dream tags to match mockup hashtags
  const tagMap = {
    'Celestial Treats': '#adventure',
    'Star Engineering': '#invention',
    'Botanical Dreams': '#nature',
    'Mecha Companion': '#friendship',
    'Archival Magic': '#magic',
  };

  const tag = tagMap[dream.category] || `#${dream.category.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-[#201844] hover:bg-[#281f54] border-2 border-[#523d79] hover:border-[#a855f7] rounded-2xl p-4 sm:p-5 shadow-[0_6px_20px_rgba(10,5,25,0.4)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Decorative Pixel / Visual Icon Container */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto my-2 bg-[#140e2d] border-2 border-purple-400/40 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 group-hover:rotate-2 transition-transform duration-200 select-none">
          {dream.pixelArt}
        </div>

        {/* Dream Title */}
        <h4 className="text-sm sm:text-base font-bold text-white font-sans text-center group-hover:text-[#ff86b6] transition-colors leading-snug mt-3 mb-4">
          {dream.title}
        </h4>
      </div>

      {/* Card Footer: Tag & Arrow Button */}
      <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#ff86b6]/20 text-[#ffb3d1] border border-[#ff86b6]/40">
          {tag}
        </span>

        <button
          type="button"
          aria-label={`Read ${dream.title}`}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="w-8 h-8 rounded-full bg-[#35275e] hover:bg-[#4d3a84] text-white flex items-center justify-center border border-purple-400/40 shadow-xs group-hover:translate-x-0.5 transition-transform"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

export default DreamCard;
