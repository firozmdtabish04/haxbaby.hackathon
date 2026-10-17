import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSound } from '../hooks/useSound';
import { validateGuestbookEntry } from '../utils/validation';
import { CheckCircle2, AlertCircle, Trash2, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_GUESTBOOK_ENTRIES = [
  {
    id: 'entry-1',
    nickname: 'MoonMuffin',
    message: 'This website is so cute! Keep dreaming, Pip! 💌',
    timestamp: '2 days ago',
    avatar: '🧸',
    stamp: '💌',
  },
  {
    id: 'entry-2',
    nickname: 'CloudCoder',
    message: 'I love your inventions! The moon generator is amazing! 🌙',
    timestamp: '3 days ago',
    avatar: '🤖',
    stamp: '🌙',
  },
  {
    id: 'entry-3',
    nickname: 'StarWanderer',
    message: 'Such a magical place on the internet! Stay curious! ⭐',
    timestamp: '4 days ago',
    avatar: '✨',
    stamp: '⭐',
  },
];

export function Guestbook() {
  const [entries, setEntries] = useLocalStorage('pip_guestbook_entries', INITIAL_GUESTBOOK_ENTRIES);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [successToast, setSuccessToast] = useState('');
  const { playClick, playChime, playGiggle } = useSound();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors, sanitized } = validateGuestbookEntry(nickname, message);

    if (!isValid) {
      setErrors(validationErrors);
      playClick(320);
      return;
    }

    setErrors({});
    playChime();
    playGiggle();

    const newEntry = {
      id: `entry-${Date.now()}`,
      nickname: sanitized.nickname,
      message: sanitized.message,
      timestamp: 'Just now',
      avatar: '⭐',
      stamp: '💌',
    };

    setEntries((prev) => [newEntry, ...(Array.isArray(prev) ? prev : [])]);
    setNickname('');
    setMessage('');
    setSuccessToast(`Thank you, ${sanitized.nickname}! Your note was pinned to Pip's board!`);

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff86b6', '#38bdf8', '#facc15'],
      });
    } catch {
      // Ignored
    }

    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  return (
    <section id="guestbook" className="py-10 sm:py-14 px-4 max-w-6xl mx-auto z-10 relative">
      {/* Section Header & LocalStorage Notice Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Guestbook
          </h2>
          <p className="text-sm sm:text-base text-[#cfc4f4] font-medium">
            Leave a little message for Pip! (Saved in your browser!)
          </p>
        </div>

        {/* Sticker Notice (matching mockup) */}
        <div className="bg-[#fef9c3]/15 border border-amber-300/40 rounded-xl p-3 max-w-sm text-xs font-mono text-amber-200/90 leading-snug shadow-xs self-center md:self-auto">
          These messages are stored in your browser using LocalStorage. They're not shared worldwide!
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 bg-[#201844] border-2 border-[#523d79] p-5 sm:p-6 rounded-2xl space-y-4 shadow-[0_6px_20px_rgba(10,5,25,0.4)]">
          {successToast && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-400 rounded-xl text-xs font-mono text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label htmlFor="guest-nickname" className="block text-slate-200 font-bold mb-1.5">
                Your Nickname <span className="text-slate-400 text-[11px]">&gt;</span>
              </label>
              <input
                id="guest-nickname"
                type="text"
                maxLength={24}
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (errors.nickname) setErrors((prev) => ({ ...prev, nickname: null }));
                }}
                placeholder="e.g. StarFriend"
                className={`w-full px-3.5 py-2.5 bg-[#140e2d] border-2 ${
                  errors.nickname ? 'border-rose-500' : 'border-[#433166]'
                } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff86b6] transition-colors`}
              />
              {errors.nickname && (
                <p className="text-rose-400 text-[10px] mt-1">{errors.nickname}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="guest-message" className="block text-slate-200 font-bold">
                  Your Message <span className="text-slate-400 text-[11px]">&gt;</span>
                </label>
                <span className="text-[10px] text-slate-400">{message.length}/200</span>
              </div>
              <textarea
                id="guest-message"
                rows={4}
                maxLength={200}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: null }));
                }}
                placeholder="Write a kind message for Pip..."
                className={`w-full px-3.5 py-2.5 bg-[#140e2d] border-2 ${
                  errors.message ? 'border-rose-500' : 'border-[#433166]'
                } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff86b6] transition-colors resize-none`}
              />
              {errors.message && (
                <p className="text-rose-400 text-[10px] mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-sans font-bold text-sm bg-[#ff86b6] hover:bg-[#ff9ec3] active:bg-[#f472b6] text-[#2e0517] border border-pink-300 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Leave Message</span>
            </button>
          </form>
        </div>

        {/* Right Column: Message Cards */}
        <div className="lg:col-span-7 space-y-3 font-mono">
          <div className="flex items-center justify-between pb-1 text-xs text-slate-400">
            <span>Messages ({entries.length})</span>
            <button
              type="button"
              onClick={() => {
                playClick(440);
                if (window.confirm('Reset guestbook back to default messages?')) {
                  setEntries(INITIAL_GUESTBOOK_ENTRIES);
                }
              }}
              className="hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Reset Notes</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="relative bg-[#201844] border-2 border-[#523d79] rounded-2xl p-4 shadow-[0_4px_12px_rgba(10,5,25,0.3)] flex items-start gap-3"
              >
                {/* Avatar Icon */}
                <div className="w-9 h-9 rounded-full bg-[#35275e] border border-purple-400/30 flex items-center justify-center text-base shrink-0 select-none">
                  {entry.avatar || '⭐'}
                </div>

                <div className="flex-1 pr-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-[#ff86b6]">
                      {entry.nickname}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {entry.timestamp}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {entry.message}
                  </p>
                </div>

                {/* Stamp Icon */}
                <span className="text-base shrink-0 select-none opacity-80">
                  {entry.stamp || '💌'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guestbook;
