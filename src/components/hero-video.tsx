'use client';

import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause, Loader2 } from 'lucide-react';
import { useVideoControl } from '@/hooks/use-video-control';

export function HeroVideo() {
  const { videoRef, isPlaying, isLoading, toggle } = useVideoControl({
    storageKey: 'hero-video-playing',
    defaultPlaying: true
  });

  return (
    <div className="absolute inset-0" style={{backgroundImage: "url('//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/promo-mobile.jpg')"}}>
      <video 
        ref={videoRef}
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
        poster="//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/poster.jpg"
      >
        <source src="//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/video-bg.mp4" type="video/mp4" />
        <source src="//eu-wotp.wgcdn.co/static/6.10.0_4edfb4/wotp_static/img/core/frontend/scss/common/blocks/video-bg/img/video-bg.webm" type="video/webm" />
      </video>
      
      {/* Video Control Button */}
      <button
        onClick={toggle}
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