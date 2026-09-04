'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border border-[#D4AF37]/50 p-4 shadow-[0_15px_30px_rgba(0,0,0,0.08)] flex items-start gap-3 transition-all animate-slide-left"
        >
          <div className="w-7 h-7 rounded-full bg-[#FAFAF8] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#C9A227]">
            {t.type === 'gold' ? (
              <Sparkles className="w-3.5 h-3.5" />
            ) : t.type === 'info' ? (
              <Info className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-[#1A1A1A]">{t.title}</h5>
            <p className="text-[11px] text-[#5A5A58] mt-0.5 leading-snug">{t.message}</p>
          </div>

          <button
            onClick={() => dismissToast(t.id)}
            className="text-[#8E8E8A] hover:text-[#1A1A1A] p-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
