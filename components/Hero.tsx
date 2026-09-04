'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Users, Award, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import LazyHeroVideo from '@/components/LazyHeroVideo';

export default function Hero() {
  const { products, addToCart } = useApp();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move parallax for the central 3D product (within ±4deg)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 8; // -4deg to +4deg
    const y = (clientY / innerHeight - 0.5) * 4; // -2deg to +2deg
    setMousePosition({ x, y });
  };

  const heroProduct =
    products.find((p) => p.name === 'Hype Drink') ??
    products.find((p) => p.price > 0) ??
    products[0];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAFAF8] to-[#F8F8F6]"
    >
      {/* Subtle Studio Lighting Glow & Halo in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#D4AF37]/8 via-[#F5E7B2]/12 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-white/80 rounded-full blur-2xl pointer-events-none -z-0" />

      {/* Micro-floating golden particles */}
      <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 blur-[0.5px] animate-pulse pointer-events-none" />
      <div className="absolute top-2/3 left-2/5 w-1 h-1 rounded-full bg-[#B8943D]/50 blur-[0.5px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#F3E5AB]/70 blur-[1px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-2/5 w-1.5 h-1.5 rounded-full bg-[#C9A227]/40 pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
        
        {/* DESKTOP COMPOSITION: LEFT TEXT + PROTAGONIST PRODUCT + RIGHT PANEL */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center pt-4 pb-8">
          
          {/* LADO ESQUERDO (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Label Dourada */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/35 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span className="text-[10.5px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase">
                NATURAL • PREMIUM • SEU MOMENTO
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl xl:text-5xl font-sans font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
              NATURAL PARA{' '}
              <span className="font-serif italic font-normal text-[#C9A227]">
                você.
              </span>
            </h1>

            {/* Texto de apoio */}
            <p className="text-base text-[#5A5A58] leading-relaxed max-w-sm font-normal">
              Mais sabor, praticidade e equilíbrio para acompanhar sua rotina.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* CTA Principal (Dourado) */}
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_6px_25px_rgba(201,162,39,0.28)] border border-[#F3E5AB]/40 group"
              >
                <span>PEDIR AGORA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* CTA Secundário (Branco + Borda Prata) */}
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#D9D9D9] hover:border-[#B8943D]/50 text-[#1A1A1A] text-xs font-semibold tracking-wider hover:bg-[#FAFAF8] transition-all shadow-xs"
              >
                CONHECER PRODUTOS
              </Link>
            </div>

            {/* Micro badges de garantia */}
            <div className="pt-4 flex items-center gap-4 text-[11px] text-[#8E8E8A]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
                100% Plant-Based Puro
              </span>
              <span className="text-[#D9D9D9]">•</span>
              <span>22g Proteína Isolada</span>
            </div>
          </div>

          {/* CENTRO: PRODUTO PROTAGONISTA 3D (Col 5-8) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            {/* Halo de iluminação central */}
            <div className="absolute w-96 h-96 xl:w-[440px] xl:h-[440px] rounded-full bg-radial from-[#F5E7B2]/40 via-white/30 to-transparent blur-xl pointer-events-none -z-0" />

            {/* Floating 3D Product Canister with Mouse Response */}
            <div
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) translateY(-3rem)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative w-[520px] h-[560px] xl:w-[600px] xl:h-[640px] animate-float-slow flex items-center justify-center group cursor-pointer"
              onClick={() => addToCart(heroProduct, 1)}
              title="Clique para adicionar à sacola"
            >
              {/* Product Image / Video */}
              <div className="relative w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.08)]">
                <LazyHeroVideo
                  webmSrc="/images/produto-3d.webm"
                  fallbackMp4="/images/produto-3d-fallback.mp4"
                  className="w-full h-full"
                />
              </div>

              {/* Floating micro-pill indicator on product hover */}
              <div className="absolute -bottom-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-md text-[11px] font-semibold text-[#1A1A1A] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
                <Sparkles className="w-3 h-3 text-[#C9A227]" />
                <span>{heroProduct?.name}</span>
                <span className="text-[#B8943D] font-bold ml-1">
                  {heroProduct ? `R$ ${heroProduct.price.toFixed(2).replace('.', ',')}` : ''}
                </span>
              </div>
            </div>

            {/* Sombra difusa realista no chão */}
            <div className="w-52 h-4 rounded-full bg-black/8 blur-md -mt-2 pointer-events-none" />
          </div>

          {/* LADO DIREITO: PAINEL FLUTUANTE BRANCO (Col 9-12) */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-[28px] border border-[#E5E5E2] p-7 shadow-[0_15px_35px_rgba(0,0,0,0.03)] space-y-5 hover:border-[#D4AF37]/35 transition-all">
              
              {/* Top part: Ritual & Bem-estar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C9A227] uppercase">
                    RITUAL & BEM-ESTAR
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </div>

                <h2 className="text-xl font-sans font-bold tracking-tight text-[#1A1A1A]">
                  MAIS QUE UM SHAKE.
                </h2>

                <p className="text-xs text-[#5A5A58] leading-relaxed">
                  Uma experiência pensada para transformar pequenos hábitos em uma rotina que combina com você.
                </p>

                <Link
                  href="/produtos"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#B8943D] hover:text-[#C9A227] transition-colors group"
                >
                  <span>CONHEÇA A LINHA COMPLETA</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Divisor Prateado Sutil */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent" />

              {/* Bottom part: Revenda */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-[#C9A227]">
                  <Users className="w-4 h-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E8A]">
                    PARCERIA & NEGÓCIOS
                  </span>
                </div>

                <p className="text-xs text-[#5A5A58]">
                  Quer levar a marca para mais pessoas?
                </p>

                <Link
                  href="/revenda"
                  className="inline-flex items-center justify-between w-full p-3 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] hover:border-[#D4AF37]/50 transition-all text-xs font-semibold text-[#1A1A1A] group"
                >
                  <span className="group-hover:text-[#B8943D] transition-colors">SEJA UM REVENDEDOR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A227] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* MOBILE COMPOSITION: SECTION 14 (Dedicated ergonomics) */}
        {/* Ordem: 1. label, 2. headline, 3. produto, 4. CTA, 5. Clube, 6. Revenda */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-6 pt-2 pb-6">
          
          {/* 1. Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/35 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span className="text-[9.5px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase">
              NATURAL • PREMIUM • SEU MOMENTO
            </span>
          </div>

          {/* 2. Headline */}
          <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#1A1A1A] leading-tight px-2">
            NATURAL PARA{' '}
            <span className="font-serif italic font-normal text-[#C9A227]">
              você.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#5A5A58] max-w-xs font-normal">
            Mais sabor, praticidade e equilíbrio para acompanhar sua rotina diária.
          </p>

          {/* 3. Produto Protagonista Central */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 my-1 flex items-center justify-center">
            <div className="absolute w-52 h-52 rounded-full bg-[#F5E7B2]/35 blur-xl pointer-events-none" />
            <div className="relative w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)]">
              <LazyHeroVideo
                webmSrc="/images/produto-3d.webm"
                fallbackMp4="/images/produto-3d-fallback.mp4"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* 4. CTAs */}
          <div className="w-full max-w-xs flex flex-col gap-3">
            <Link
              href="/produtos"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider shadow-[0_4px_20px_rgba(201,162,39,0.3)] flex items-center justify-center gap-2"
            >
              <span>PEDIR AGORA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/produtos"
              className="w-full py-3.5 rounded-full bg-white border border-[#D9D9D9] text-[#1A1A1A] text-xs font-semibold"
            >
              CONHECER PRODUTOS
            </Link>
          </div>

          {/* 5 & 6. Ritual & Revenda Panels (Mobile) */}
          <div className="w-full max-w-sm rounded-3xl bg-white border border-[#E8E8E4] p-5 text-left space-y-4 shadow-xs mt-4">
            <div>
              <span className="text-[10px] tracking-wider font-semibold text-[#C9A227] uppercase">RITUAL & BEM-ESTAR</span>
              <h3 className="text-sm font-bold text-[#1A1A1A]">Mais que um shake.</h3>
              <p className="text-xs text-[#5A5A58] mt-1">Uma experiência pensada para transformar pequenos hábitos em rotina.</p>
              <Link href="/produtos" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8943D] mt-2">
                Conheça a Linha Completa →
              </Link>
            </div>

            <div className="h-[1px] bg-[#F0F0EC]" />

            <div>
              <p className="text-xs text-[#5A5A58]">Quer levar a marca para mais pessoas?</p>
              <Link href="/revenda" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] mt-1">
                Seja um Revendedor Oficial →
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 13: SCROLL INDICATOR */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-2">
        <a
          href="#beneficios"
          className="flex flex-col items-center gap-1 text-[10px] tracking-[0.25em] text-[#8E8E8A] hover:text-[#C9A227] transition-colors group"
        >
          <span className="transform group-hover:translate-y-1 transition-transform">↓</span>
          <span>SCROLL</span>
        </a>
      </div>
    </section>
  );
}
