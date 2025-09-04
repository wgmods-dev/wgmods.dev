import { useRef, useState, useEffect, useCallback } from 'react';
import { useLocalStorage, useIsMounted } from 'usehooks-ts';

interface UseVideoControlOptions {
  storageKey?: string;
  defaultPlaying?: boolean;
}

export function useVideoControl({
  storageKey = 'video-playing',
  defaultPlaying = false,
}: UseVideoControlOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useIsMounted();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPlayingState, setSavedPlayingState] = useLocalStorage(storageKey, defaultPlaying);

  // Charger l'état sauvegardé quand le composant est monté
  useEffect(() => {
    if (!isMounted()) return;
    
    setIsPlaying(savedPlayingState);
    setIsLoading(false);
  }, [isMounted(), savedPlayingState]);

  // Gérer la vidéo et les event listeners
  useEffect(() => {
    if (!isMounted() || isLoading) return;
    
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setSavedPlayingState(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      setSavedPlayingState(false);
    };

    const handleLoadedData = () => {
      // Appliquer l'état sauvegardé quand la vidéo est prête
      if (isPlaying && video.paused) {
        video.play().catch(() => {
          setIsPlaying(false);
          setSavedPlayingState(false);
        });
      }
    };
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isMounted(), isLoading, isPlaying, setSavedPlayingState]);

  const play = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  return {
    videoRef,
    isPlaying: isMounted() ? isPlaying : false,
    isLoading: !isMounted() || isLoading,
    play,
    pause,
    toggle,
  };
}