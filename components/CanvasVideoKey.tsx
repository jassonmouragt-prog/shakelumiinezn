'use client';

import React, { useEffect, useRef } from 'react';

type CanvasVideoKeyProps = {
  src: string;
  className?: string;
  // Limiar de saturação: pixels com saturação abaixo deste valor
  // (normalizado para 0-1) são tratados como fundo cinza (dessaturado)
  // e ficam transparentes.
  saturationThreshold?: number; // default 0.16
  // Suaviza o alpha nas bordas em torno do limiar para evitar artefatos.
  blend?: number; // default 0.04
};

export default function CanvasVideoKey({
  src,
  className,
  saturationThreshold = 0.16,
  blend = 0.04,
}: CanvasVideoKeyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!container || !video || !canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let started = false;
    const key = saturationThreshold * 255;
    const blendRange = blend * 255;

    const drawAndKey = () => {
      if (!video || !canvas || !ctx) return;
      if (video.videoWidth === 0 || video.videoHeight === 0) return;

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (canvas.width !== vw || canvas.height !== vh) {
        canvas.width = vw;
        canvas.height = vh;
      }

      ctx.drawImage(video, 0, 0, vw, vh);

      const imageData = ctx.getImageData(0, 0, vw, vh);
      const data = imageData.data;
      const n = data.length;

      for (let i = 0; i < n; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : ((max - min) / max) * 255;

        if (sat < key) {
          data[i + 3] = 0;
        } else if (sat < key + blendRange) {
          data[i + 3] = Math.round(((sat - key) / blendRange) * 255);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const frame = () => {
      rafRef.current = requestAnimationFrame(frame);
      if (!video) return;
      if (video.currentTime !== lastTimeRef.current && video.readyState >= 2) {
        lastTimeRef.current = video.currentTime;
        drawAndKey();
      }
    };

    const start = () => {
      if (started) return;
      started = true;
      lastTimeRef.current = -1;
      video.play().catch(() => {});
      // Primeiro frame imediato (caso o readyState já garanta frame).
      rafRef.current = requestAnimationFrame(frame);
    };

    if (typeof IntersectionObserver === 'undefined') {
      start();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              start();
              observer.disconnect();
            }
          });
        },
        { rootMargin: '300px' }
      );
      observer.observe(container);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      video.pause();
    };
  }, [saturationThreshold, blend]);

  return (
    <div ref={containerRef} className={className}>
      {/* Vídeo oculto usado apenas como fonte de frames. */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden"
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          e.currentTarget.play().catch(() => {});
        }}
      />
      {/* Canvas com object-contain para simular o comportamento de <video>. */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        aria-hidden="true"
      />
    </div>
  );
}
