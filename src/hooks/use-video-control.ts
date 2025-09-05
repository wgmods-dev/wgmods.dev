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
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [savedPlayingState, setSavedPlayingState] = useLocalStorage(storageKey, defaultPlaying);
  useEffect(() => {
    const mounted = isMounted();
    if (!mounted) return;
    
    setIsPlaying(savedPlayingState);
    setIsLoading(false);
  }, [isMounted, savedPlayingState]);
  useEffect(() => {
    const mounted = isMounted();
    if (!mounted || isLoading) return;
    
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsVideoVisible(true);
      if (!document.hidden) {
        setSavedPlayingState(true);
      }
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      if (!document.hidden) {
        setSavedPlayingState(false);
      }
    };

    const tryAutoplay = async () => {
      if (isPlaying && video.paused) {
        try {
          await video.play();
        } catch (error) {
          console.warn('Autoplay prevented by browser:', error);
          setIsPlaying(false);
          if (!document.hidden) {
            setSavedPlayingState(false);
          }
        }
      }
    };

    const handleCanPlayThrough = () => {
      setTimeout(() => {
        tryAutoplay();
      }, 100);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const actuallyPlaying = !video.paused;
        setIsPlaying(actuallyPlaying);
        setSavedPlayingState(actuallyPlaying);
      }
    };
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    if (video.readyState >= 4) {
      setTimeout(() => {
        tryAutoplay();
      }, 100);
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
    isVideoVisible: mounted ? isVideoVisible : false,
    play,
    pause,
    toggle,
  };
}