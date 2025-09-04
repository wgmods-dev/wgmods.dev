'use client';

import { useLocalStorage, useIsMounted } from 'usehooks-ts';
import { useEffect, useRef, useState } from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause, Loader2 } from 'lucide-react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useIsMounted();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPlayingState, setSavedPlayingState] = useLocalStorage('hero-video-playing', false);

  useEffect(() => {
    if (!isMounted()) return;
    setIsPlaying(savedPlayingState);
    setIsLoading(false);
  }, [isMounted(), savedPlayingState]);

  useEffect(() => {
    if (!isMounted()) return;
    
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
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    if (isPlaying && video.paused) {
      video.play().catch(() => {
        setIsPlaying(false);
        setSavedPlayingState(false);
      });
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isMounted(), isPlaying, setSavedPlayingState]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="absolute inset-0" style={{backgroundImage: "url('//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/promo-mobile.jpg')"}}>
      <video 
        ref={videoRef}
        loop 
        muted 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isMounted() ? 'opacity-100' : 'opacity-0'
        }`}
        poster="//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/poster.jpg"
      >
        <source src="//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/video-bg.mp4" type="video/mp4" />
        <source src="//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/video-bg.webm" type="video/webm" />
      </video>
      
      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className={cn(
          buttonVariants({ size: "icon-xs" }),
          "absolute bottom-4 right-4 z-20 backdrop-blur-sm border border-white/20 cursor-pointer"
        )}
        aria-label="Play/Pause video"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4 text-white" fill="currentColor" />
        ) : (
          <Play className="w-4 h-4 text-white" fill="currentColor" />
        )}
      </button>
    </div>
  );
}