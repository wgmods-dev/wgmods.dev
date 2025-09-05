import { useRef, useState, useEffect, useCallback } from 'react';
import { useLocalStorage, useIsMounted } from 'usehooks-ts';

interface UseVideoControlOptions {
  storageKey?: string;
  defaultPlaying?: boolean;
}

export function useVideoControl({
  storageKey = 'video-playing',
  defaultPlaying = true,
}: UseVideoControlOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useIsMounted();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPlayingState, setSavedPlayingState] = useLocalStorage(storageKey, defaultPlaying);

  // Charger l'état sauvegardé quand le composant est monté
  useEffect(() => {
    const mounted = isMounted();
    if (!mounted) return;
    
    setIsPlaying(savedPlayingState);
    setIsLoading(false);
  }, [isMounted, savedPlayingState]);

  // Gérer la vidéo et les event listeners
  useEffect(() => {
    const mounted = isMounted();
    if (!mounted || isLoading) return;
    
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
    
    // Si la vidéo est déjà chargée, déclencher la lecture immédiatement
    if (video.readyState >= 2 && isPlaying && video.paused) {
      video.play().catch(() => {
        setIsPlaying(false);
        setSavedPlayingState(false);
      });
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isMounted, isLoading, isPlaying, setSavedPlayingState]);

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

  const mounted = isMounted();
  
  return {
    videoRef,
    isPlaying: mounted ? isPlaying : false,
    isLoading: !mounted || isLoading,
    play,
    pause,
    toggle,
  };
}