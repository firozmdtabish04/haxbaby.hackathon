import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { useSound } from '../hooks/useSound';
import { Download, Award, Image, Sparkles, Check } from 'lucide-react';

export function GoodiesVault() {
  const { playClick, playChime } = useSound();
  const [visitorName, setVisitorName] = useState('');
  const [certDownloaded, setCertDownloaded] = useState(false);

  const handleDownloadCertificate = () => {
    playChime();
    const name = visitorName.trim() || 'Dream Explorer';
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="550" viewBox="0 0 800 550">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#160d33"/>
          <stop offset="100%" stop-color="#2a164d"/>
        </linearGradient>
      </defs>
      <rect width="800" height="550" fill="url(#bg)" rx="24"/>
      <rect x="20" y="20" width="760" height="510" fill="none" stroke="#fde047" stroke-width="4" stroke-dasharray="10 5" rx="16"/>
      <text x="400" y="90" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="28" fill="#fde047">★ THE OFFICIAL ORDER OF THE MIDNIGHT STAR ★</text>
      <text x="400" y="130" text-anchor="middle" font-family="monospace" font-size="14" fill="#ddd2f8">haX.baby Track 1 · Junior Dream Engineering Division</text>
      <text x="400" y="210" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#ffffff">THIS OFFICIAL DIPLOMA CERTIFIES THAT</text>
      <text x="400" y="275" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="36" fill="#ff86b6">${name}</text>
      <text x="400" y="335" text-anchor="middle" font-family="monospace" font-size="15" fill="#cfc4f4">has demonstrated infinite curiosity, sweet dreams, and gentle wonder.</text>
      <text x="400" y="365" text-anchor="middle" font-family="monospace" font-size="15" fill="#cfc4f4">Officially awarded the rank of Honorary Junior Dream Engineer.</text>
      <text x="220" y="460" text-anchor="middle" font-family="monospace" font-size="13" fill="#a78bfa">Pip the Skull Baby</text>
      <text x="220" y="480" text-anchor="middle" font-family="monospace" font-size="11" fill="#8872b8">Junior Dream Engineer</text>
      <text x="580" y="460" text-anchor="middle" font-family="monospace" font-size="13" fill="#a78bfa">Tabish Firoz</text>
      <text x="580" y="480" text-anchor="middle" font-family="monospace" font-size="11" fill="#8872b8">Lead Architect &amp; Developer</text>
    </svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pip_Dream_Engineer_Certificate_${name.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCertDownloaded(true);
    setTimeout(() => setCertDownloaded(false), 3000);
  };

  return (
    <section id="goodies" className="py-10 sm:py-14 px-4 max-w-4xl mx-auto z-10 relative">
      <RetroWindow
        title="GOODIES_VAULT.DIR — Free Digital Downloads & Stickers"
        icon="🎁"
        statusBarText="GOODIES STORAGE: 100% FREE · NO LOGINS · TAKE HOME A DREAM"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch font-mono">
          {/* Card 1: Certificate Generator */}
          <div className="bg-[#140e2d] border-2 border-purple-400/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Honorary Certificate</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                Dream Engineer Diploma
              </h4>
              <p className="text-xs text-[#cfc4f4] leading-relaxed">
                Generate and download your official customized SVG Certificate signed by Pip and Tabish Firoz!
              </p>

              <div className="pt-2">
                <label className="block text-[11px] text-slate-300 mb-1">Enter Your Name:</label>
                <input
                  type="text"
                  maxLength={30}
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="e.g. Captain Starlight"
                  className="w-full px-3 py-2 bg-[#1b1238] border border-purple-400/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-300"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-bold text-xs flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              {certDownloaded ? <Check className="w-4 h-4 text-emerald-900" /> : <Download className="w-4 h-4" />}
              <span>{certDownloaded ? 'Downloaded!' : 'Download Certificate (.SVG)'}</span>
            </button>
          </div>

          {/* Card 2: Official Assets & Wallpapers */}
          <div className="bg-[#140e2d] border-2 border-purple-400/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-pink-300 font-bold text-xs uppercase">
                <Image className="w-4 h-4 text-pink-400" />
                <span>Starlight Wallpapers</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                Pip's Studio Avatar Pack
              </h4>
              <p className="text-xs text-[#cfc4f4] leading-relaxed">
                Download the official high-resolution, watermark-free renders of Pip on the cloud and character portrait.
              </p>

              <div className="flex gap-2 pt-2">
                <div className="w-16 h-16 rounded-xl bg-[#1b1238] border border-purple-400/30 p-1 flex items-center justify-center">
                  <img src="/assets/pip_avatar_cloud.png" alt="Cloud" className="w-full h-full object-contain" />
                </div>
                <div className="w-16 h-16 rounded-xl bg-[#1b1238] border border-purple-400/30 p-1 flex items-center justify-center">
                  <img src="/assets/pip_portrait.png" alt="Portrait" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <a
              href="/assets/pip_avatar_cloud.png"
              download="Pip_Avatar_Cloud_Official.png"
              onClick={() => playClick(600)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#ff86b6] hover:bg-[#ff9ec3] active:bg-[#f472b6] text-[#240413] font-bold text-xs flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Render</span>
            </a>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}

export default GoodiesVault;
