'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function InstitutionalSection() {
  const pillars = [
    'Origem Botânica Rastreada de Alta Pureza',
    'Biodisponibilidade com Absorção Otimizada',
    'Sem Espessantes Artificiais ou Conservantes',
    'Embalagem Sustentável com Fechamento Hermético'
  ];

  return (
    <section id="sobre-nos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-gradient-to-br from-[#FFFFFF] via-[#FAFAF8] to-[#F5F5F3] rounded-[36px] border border-[#E8E8E4] p-8 sm:p-12 lg:p-16 shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: IMAGEM LUXO */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[2/3] rounded-[28px] overflow-hidden border border-[#E2E2DF] shadow-md bg-white">
              <Image
                src="/images/sobre-nos.jpg"
                alt="LUMIINE - Sobre Nós"
                fill
                className="object-contain"
              />
              
              </div>

            {/* Ambient gold glow */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#F5E7B2]/30 rounded-full blur-2xl pointer-events-none -z-0" />
          </div>

          {/* LADO DIREITO: TEXTOS SOBRE NÓS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D4AF37]/35 text-[10px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase">
              SOBRE NÓS
            </div>

            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#1A1A1A] leading-tight">
              FEITO PARA FAZER PARTE DA SUA{' '}
              <span className="font-serif italic font-normal text-[#C9A227]">
                rotina.
              </span>
            </h2>

            <div className="space-y-4 text-sm text-[#5A5A58] leading-relaxed">
              <p>
                A LUMIINE nasceu da convicção de que nutrir o corpo não deve ser uma obrigação amarga ou um suplemento impessoal. Deve ser um momento de pausa, sofisticação e profundo respeito pelo seu bem-estar diário.
              </p>
              <p>
                Com sede de inovação limpa, combinamos ciência nutricional de ponta com matérias-primas nobres colhidas no ápice de sua potência — fava de baunilha pura de Madagascar, cacau selvagem 100% brasileiro e blends proteicos hipoalergênicos de absorção suave.
              </p>
            </div>

            {/* Pillars check list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {pillars.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#1A1A1A] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold tracking-wider hover:bg-[#2A2A2A] transition-all shadow-md"
              >
                EXPERIMENTAR A DIFERENÇA
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
