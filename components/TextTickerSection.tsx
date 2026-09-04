'use client';

import React from 'react';
import { Sparkles, Zap, Flame, ShieldCheck, Heart, Award, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function TextTickerSection() {
  // Row 1: Fitness, Emagrecimento e Performance
  const fitnessKeywords = [
    { text: 'EMAGRECIMENTO SAUDÁVEL', icon: '✦', highlight: true },
    { text: 'SACIEDADE PROLONGADA', icon: '•' },
    { text: 'DEFINIÇÃO & TONICIDADE', icon: '✦', highlight: true },
    { text: 'METABOLISMO ACELERADO', icon: '•' },
    { text: 'ALTA PERFORMANCE DIÁRIA', icon: '✦', highlight: true },
    { text: 'DIGESTÃO ULTRALEVE', icon: '•' },
    { text: 'DISPOSIÇÃO & FOCO', icon: '✦', highlight: true },
    { text: 'CONTROLE DE APETITE', icon: '•' },
    { text: 'ZERO RETENÇÃO LÍQUIDA', icon: '✦', highlight: true },
    { text: 'NUTRIÇÃO DE PRECISÃO', icon: '•' },
  ];

  // Row 2: Adjetivos, Textura e Atributos Sensoriais dos Produtos
  const productAdjectives = [
    { text: 'CREMOSIDADE INCOMPARÁVEL', icon: '✦', gold: true },
    { text: '100% BOTÂNICO & PURO', icon: '•' },
    { text: 'TEXTURA AVELUDADA DE MOUSSE', icon: '✦', gold: true },
    { text: 'ZERO AÇÚCAR ADICIONADO', icon: '•' },
    { text: 'FAVA DE BAUNILHA BOURBON', icon: '✦', gold: true },
    { text: 'CACAU NOBRE MONOVARIETAL', icon: '•' },
    { text: 'ZERO GLÚTEN & ZERO LACTOSE', icon: '✦', gold: true },
    { text: 'BLEND PROTEICO ISOLADO', icon: '•' },
    { text: 'PADRÃO FARMACOPEICO', icon: '✦', gold: true },
    { text: 'SABOR AUTÊNTICO & SOFISTICADO', icon: '•' },
  ];

  // Duplicate arrays for continuous infinite loop (needs at least 2x to seamlessly wrap)
  const row1List = [...fitnessKeywords, ...fitnessKeywords, ...fitnessKeywords];
  const row2List = [...productAdjectives, ...productAdjectives, ...productAdjectives];

  return (
    <section className="relative py-16 sm:py-20 bg-[#FAFAF8] overflow-hidden border-y border-[#E8E8E4]">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C7C7C7]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4AF37]/35 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span className="text-[10px] tracking-[0.25em] font-bold text-[#B8943D] uppercase">
            WELLNESS • FITNESS • PERFORMANCE
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#1A1A1A]">
          O que define o padrão <span className="italic text-[#C9A227]">LUMIINE</span>
        </h2>
        <p className="text-xs text-[#8E8E8A] max-w-md mx-auto">
          Equilíbrio metabólico, pureza botânica e prazer autêntico em cada dose do seu ritual diário.
        </p>
      </div>

      {/* Ticker Container with side fading masks */}
      <div className="relative w-full space-y-4">
        {/* Left & Right gradient fade masks for seamless infinite stream look */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Moves to the LEFT (Fitness & Emagrecimento) */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee-left flex items-center gap-3 py-1">
            {row1List.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full border text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all select-none ${
                  item.highlight
                    ? 'bg-white border-[#D4AF37]/50 text-[#1A1A1A] font-bold shadow-xs hover:border-[#C9A227]'
                    : 'bg-white/80 border-[#E2E2DF] text-[#5A5A58] font-medium'
                }`}
              >
                <span className={item.highlight ? 'text-[#C9A227] font-bold' : 'text-[#8E8E8A]'}>
                  {item.text}
                </span>
                <span className="text-[#C9A227] text-xs opacity-70">
                  {item.icon}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves to the RIGHT (Adjetivos & Textura Premium) */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee-right flex items-center gap-3 py-1">
            {row2List.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full border text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all select-none ${
                  item.gold
                    ? 'bg-gradient-to-r from-white via-[#FFFDF7] to-white border-[#D4AF37]/60 text-[#B8943D] font-bold shadow-xs'
                    : 'bg-white/90 border-[#E2E2DF] text-[#1A1A1A] font-semibold'
                }`}
              >
                <span className={item.gold ? 'text-[#B8943D] font-bold font-serif italic' : 'text-[#3A3A38]'}>
                  {item.text}
                </span>
                <span className="text-[#D9D9D9] text-xs">
                  {item.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Micro-CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A227] hover:text-[#B8943D] hover:underline transition-all"
        >
          <span>Explore a tabela nutricional e os laudos de pureza</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
