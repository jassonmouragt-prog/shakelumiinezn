'use client';

import React, { useEffect, useRef, useState } from 'react';
import CanvasVideoKey from '@/components/CanvasVideoKey';

type LazyHeroVideoProps = {
  webmSrc: string;
  fallbackMp4: string;
  className?: string;
};

function supportsWebM() {
  if (typeof window === 'undefined') return false;
  const v = document.createElement('video');
  return v.canPlayType('video/webm; codecs="vp9"') !== '';
}

export default function LazyHeroVideo({
  webmSrc,
  fallbackMp4,
  className,
}: LazyHeroVideoProps) {
  const [webm, setWebm] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detecta suporte a WebM apenas no cliente, após a hidratação,
  // para garantir que SSR e hidratação renderizem o mesmo HTML.
  useEffect(() => {
    setWebm(supportsWebM());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Durante a hidratação (webm === null) renderiza o mesmo conteúdo
  // estático, evitando mismatch de HTML.
  const useWebm = webm === true;

  return (
    <div ref={containerRef} className={className}>
      {useWebm ? (
        inView && (
          <video
            src={webmSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-contain rounded-3xl"
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }}
          />
        )
      ) : (
        <CanvasVideoKey
          src={fallbackMp4}
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}
