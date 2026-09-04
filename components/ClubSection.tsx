'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Award, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ClubSection() {
  const { loyalty } = useApp();

  const tiers = [
    {
      name: 'BRONZE',
      points: '0 - 499 pts',
      highlight: 'Acesso a lançamentos antecipados e pontos a cada pedido.',
      isGold: false
    },
    {
      name: 'SILVER',
      points: '500 - 1.499 pts',
      highlight: '5% de cashback em pontos e benefícios exclusivos mensais.',
      isGold: false
    },
    {
      name: 'GOLD',
      points: '1.500 - 2.999 pts',
      highlight: '10% de cashback em pontos, presentes sazonais e atendimento VIP.',
      isGold: true // Maior destaque conforme instrução da seção 24
    },
    {
      name: 'PLATINUM',
      points: '3.000+ pts',
      highlight: 'Consultoria com nutricionista LUMIINE, convite para eventos e novidades em primeira mão.',
      isGold: false
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="relative rounded-[36px] bg-gradient-to-b from-[#FFFFFF] via-[#FAFAF8] to-[#F5F5F3] border border-[#E8E8E4] p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Glow backlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5E7B2]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/35 text-[10px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#C9A227]" />
            PROGRAMA DE FIDELIDADE
          </div>

          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#1A1A1A]">
            FAÇA PARTE DO{' '}
            <span className="font-serif italic font-normal text-[#C9A227]">
              clube.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#5A5A58]">
            Compre, acumule pontos e desbloqueie benefícios exclusivos para você e sua rotina.
          </p>
        </div>

        {/* TIERS CARDS (Bronze, Silver, Gold, Platinum) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                tier.isGold
                  ? 'bg-gradient-to-b from-[#FFFDF7] to-[#FBF8EF] border-2 border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.18)] scale-105 z-10'
                  : 'bg-white border border-[#E8E8E4] shadow-xs hover:border-[#D9D9D9]'
              }`}
            >
              {tier.isGold && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white text-[9.5px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full shadow-xs">
                  NÍVEL MAIS POPULAR
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold tracking-wider font-sans ${
                      tier.isGold ? 'text-[#B8943D]' : 'text-[#8E8E8A]'
                    }`}
                  >
                    {tier.name}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      tier.isGold ? 'bg-[#D4AF37]/15 text-[#C9A227]' : 'bg-[#F5F5F3] text-[#8E8E8A]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#1A1A1A]">
                  {tier.points}
                </div>

                <p className="text-xs text-[#5A5A58] leading-relaxed">
                  {tier.highlight}
                </p>
              </div>

              {/* Progress bar simulation */}
              <div className="mt-6 pt-4 border-t border-[#F0F0EC]">
                <div className="w-full bg-[#F0F0EC] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tier.isGold
                        ? 'bg-gradient-to-r from-[#C9A227] to-[#D4AF37] w-3/4'
                        : 'bg-[#D9D9D9] w-1/3'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BOTTOM BAR */}
        <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto shadow-xs">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#D4AF37]/35 flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A]">Cadastre-se e ganhe 100 pontos de boas-vindas</h4>
              <p className="text-[11px] text-[#8E8E8A]">Resgate benefícios já no seu primeiro pedido.</p>
            </div>
          </div>

          <Link
            href="/clube"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(201,162,39,0.25)] flex-shrink-0"
          >
            <span>ENTRAR NO CLUBE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
