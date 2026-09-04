'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Award, Layers, Headset, ArrowRight, CheckCircle } from 'lucide-react';

export default function ResellerSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'MARGEM ATRATIVA',
      description: 'Condições comerciais diferenciadas com até 45% de margem no atacado e bônus por volume.'
    },
    {
      icon: Award,
      title: 'MARCA FORTE',
      description: 'Produtos com design premium e alto apelo de recompra no segmento de lifestyle wellness.'
    },
    {
      icon: Layers,
      title: 'MATERIAL DE VENDAS',
      description: 'Acesso a catálogo digital, artes de alto padrão para redes sociais e fichas técnicas.'
    },
    {
      icon: Headset,
      title: 'SUPORTE DEDICADO',
      description: 'Consultoria direta para estruturar seus pedidos, treinar equipe e maximizar resultados.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-white rounded-[36px] border border-[#E8E8E4] p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
        
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-[#D4AF37]/35 text-[10px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase">
            PROGRAMA DE PARCEIROS & REVENDA
          </div>

          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#1A1A1A] leading-tight">
            TRANSFORME SAÚDE EM{' '}
            <span className="font-serif italic font-normal text-[#C9A227]">
              oportunidade.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#5A5A58]">
            Leve uma marca que as pessoas querem consumir para pessoas que querem vender.
          </p>
        </div>

        {/* 4 GRANDES CARDS (Seção 33) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAF8] rounded-3xl p-7 border border-[#EBEBEA] hover:border-[#D4AF37]/45 hover:bg-white transition-all space-y-4 shadow-2xs group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D4AF37]/35 flex items-center justify-center text-[#C9A227] group-hover:scale-105 transition-transform shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xs font-bold tracking-wider text-[#1A1A1A] font-sans">
                  {b.title}
                </h3>

                <p className="text-xs text-[#5A5A58] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALLOUT WITH FORM CTA */}
        <div className="bg-gradient-to-r from-[#FAFAF8] via-[#FDFBF7] to-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#1A1A1A]">Pronto para expandir seus negócios com a LUMIINE?</h4>
            <p className="text-xs text-[#8E8E8A]">Cadastre-se e receba a tabela completa de atacado e condições de margem.</p>
          </div>

          <Link
            href="/revenda"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] text-xs font-bold tracking-wider transition-all shadow-sm flex-shrink-0"
          >
            <span>QUERO SER REVENDEDOR</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
