'use client';

import React from 'react';
import Image from 'next/image';

export default function InstitutionalSection() {
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

            <h2 className="font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl text-[#C9A227] leading-snug">
              Um sonho que começou aos 18 anos
            </h2>

            <div className="space-y-4 text-sm text-[#5A5A58] leading-relaxed">
              <p>
                O <strong className="text-[#1A1A1A] font-semibold">Shake Lumiine ZN</strong> nasceu de um sonho. Aos 18 anos, eu decidi acreditar que era possível ter o meu próprio negócio. Com a ajuda do Weverton, transformamos esse sonho em realidade. Mesmo começando com poucos recursos, colocamos muito amor, dedicação e fé em cada detalhe.
              </p>
              <p>
                No dia <strong className="text-[#1A1A1A] font-semibold">6 de dezembro de 2025</strong>, abrimos as portas do nosso espaço e começamos a construir uma história que, graças a Deus, vem dando certo.
              </p>
              <p>
                Mas o que mais me faz feliz não é apenas ver o nosso negócio crescendo. É ver as pessoas melhorando junto com a gente. É poder acompanhar pessoas que começam a fazer escolhas mais saudáveis no dia a dia, que passam a cuidar mais de si mesmas e que, com isso, recuperam sua autoestima e se sentem melhor.
              </p>
              <p>
                E foi assim que percebi que o <strong className="text-[#1A1A1A] font-semibold">Shake Lumiine ZN</strong> se tornou muito mais do que um negócio. Aqui, somos uma família. Tenho clientes que chegaram apenas como clientes e, com o tempo, se tornaram pessoas muito especiais para mim. São pessoas incríveis que entram pela porta do nosso espaço e acabam ficando para sempre nos nossos corações.
              </p>
              <p>
                Cada conversa, cada sorriso, cada conquista e cada pessoa que passa por aqui faz parte da nossa história.
              </p>
              <p>
                Tenho muito orgulho de tudo que construímos até aqui e sou muito grata a Deus por cada pessoa que Ele colocou no nosso caminho. O <strong className="text-[#1A1A1A] font-semibold">Shake Lumiine ZN</strong> é nosso sonho, nosso trabalho e nossa família.
              </p>
              <p>
                E agora queremos que você também faça parte dessa história.
              </p>
            </div>

            <div className="pt-2 border-t border-[#E8E8E4]">
              <p className="font-serif italic text-base sm:text-lg text-[#C9A227] leading-snug">
                Venha nos conhecer. Venha conhecer nosso espaço. Venha se deliciar com nossos shakes. Venha fazer parte da nossa família. 🤍
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
