import { useState, useEffect, useCallback } from 'react';
import { soundService } from '../services/soundService';

export function useSound() {
  const [isMuted, setIsMuted] = useState(() => soundService.getMuted());
  const [activeAmbient, setActiveAmbient] = useState(() => soundService.getCurrentAmbientType());

  useEffect(() => {
    const unsubscribe = soundService.subscribe((muted) => {
      setIsMuted(muted);
      setActiveAmbient(soundService.getCurrentAmbientType());
    });
    return unsubscribe;
  }, []);

  const toggleMute = useCallback(() => {
    return soundService.toggleMute();
  }, []);

  const playClick = useCallback((freq) => soundService.playClick(freq), []);
  const playTone = useCallback((freq, duration, type) => soundService.playTone(freq, duration, type), []);
  const playChime = useCallback(() => soundService.playChime(), []);
  const playStarTone = useCallback((idx) => soundService.playStarTone(idx), []);
  const playPortalUnlock = useCallback(() => soundService.playPortalUnlock(), []);
  const playVictoryFanfare = useCallback(() => soundService.playVictoryFanfare(), []);
  const playInventionHum = useCallback(() => soundService.playInventionHum(), []);
  const playGiggle = useCallback(() => soundService.playGiggle(), []);
  const playLullaby = useCallback((onComplete) => soundService.playLullaby(onComplete), []);
  const stopLullaby = useCallback(() => soundService.stopLullaby(), []);

  const startAmbientNoise = useCallback((type) => {
    soundService.startAmbientNoise(type);
    setActiveAmbient(type);
  }, []);

  const stopAmbientNoise = useCallback(() => {
    soundService.stopAmbientNoise();
    setActiveAmbient(null);
  }, []);

  return {
    isMuted,
    activeAmbient,
    toggleMute,
    playClick,
    playTone,
    playChime,
    playStarTone,
    playPortalUnlock,
    playVictoryFanfare,
    playInventionHum,
    playGiggle,
    playLullaby,
    stopLullaby,
    startAmbientNoise,
    stopAmbientNoise,
  };
}
