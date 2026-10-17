import { useState, useEffect, useCallback } from 'react';
import { soundService } from '../services/soundService';

export function useSound() {
  const [isMuted, setIsMuted] = useState(() => soundService.getMuted());

  useEffect(() => {
    const unsubscribe = soundService.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const toggleMute = useCallback(() => {
    return soundService.toggleMute();
  }, []);

  const playClick = useCallback((freq) => soundService.playClick(freq), []);
  const playChime = useCallback(() => soundService.playChime(), []);
  const playStarTone = useCallback((idx) => soundService.playStarTone(idx), []);
  const playPortalUnlock = useCallback(() => soundService.playPortalUnlock(), []);
  const playInventionHum = useCallback(() => soundService.playInventionHum(), []);
  const playGiggle = useCallback(() => soundService.playGiggle(), []);
  const playLullaby = useCallback((onComplete) => soundService.playLullaby(onComplete), []);
  const stopLullaby = useCallback(() => soundService.stopLullaby(), []);

  return {
    isMuted,
    toggleMute,
    playClick,
    playChime,
    playStarTone,
    playPortalUnlock,
    playInventionHum,
    playGiggle,
    playLullaby,
    stopLullaby,
  };
}
