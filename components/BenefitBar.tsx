'use client';

import React from 'react';
import { Leaf, Sparkles, Zap, Heart } from 'lucide-react';

export default function BenefitBar() {
  const benefits = [
    {
      icon: Leaf,
      title: 'INGREDIENTES SELECIONADOS',
      description: 'Qualidade que você sente em cada detalhe.'
    },
    {
      icon: Sparkles,
      title: 'SABOR QUE SURPREENDE',
      description: 'Combinações deliciosas que viram rotina.'
    },
    {
      icon: Zap,
      title: 'PRATICIDADE NO DIA A DIA',
      description: 'Rápido de preparar e fácil de levar.'
    },
    {
      icon: Heart,
      title: 'FEITO PARA FAZER BEM',
      description: 'Pensado para acompanhar sua rotina.'
    }
  ];

  return (
    <section id="beneficios" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-20">
      <div className="bg-white/95 rounded-[28px] border border-[#E8E8E4] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#E8E8E4]">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 px-2 lg:px-6 group first:pl-0 last:pr-0"
              >
                {/* Minimalist Gold Icon Container */}
                <div className="w-11 h-11 rounded-2xl bg-[#FAFAF8] border border-[#D4AF37]/35 flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] group-hover:bg-[#FDFBF7] transition-all shadow-xs">
                  <Icon className="w-5 h-5 text-[#C9A227] group-hover:scale-110 transition-transform" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h4 className="text-[12px] font-bold tracking-wider text-[#1A1A1A] font-sans">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#5A5A58] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
