'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { extractYouTubeId, isYouTubeUrl } from '@/lib/utils';

interface VideoEmbedProps {
  src: string;
  title?: string;
}

export function VideoEmbed({ src, title = 'Video' }: VideoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  const youtubeId = isYouTubeUrl(src) ? extractYouTubeId(src) : null;
  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
    : src;

  return (
    <div className="overflow-hidden brutal-border brutal-shadow mb-6 bg-black">
      <div className="relative aspect-video w-full bg-[#fde047]">
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="h-full w-full rounded-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 bg-white brutal-border brutal-shadow flex items-center justify-center">
                  <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold uppercase tracking-wider text-black bg-white px-2 py-1 brutal-border">Memuat Video</p>
              </div>
            </div>
          </div>
        )}
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full relative z-20"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
