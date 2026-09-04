import React from 'react';
import Hero from '@/components/Hero';
import BenefitBar from '@/components/BenefitBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import TextTickerSection from '@/components/TextTickerSection';
import InstitutionalSection from '@/components/InstitutionalSection';
import ResellerSection from '@/components/ResellerSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO COM PRODUTO CENTRAL PROTAGONISTA 3D */}
      <Hero />

      {/* 2. BARRA DE BENEFÍCIOS ARREDONDADA */}
      <BenefitBar />

      {/* 3. VITRINE DE PRODUTOS & KITS */}
      <FeaturedProducts />

      {/* 4. CARROSSEL DE PALAVRAS-CHAVE FITNESS/EMAGRECIMENTO */}
      <TextTickerSection />

      {/* 5. SEÇÃO SOBRE NÓS */}
      <InstitutionalSection />

      {/* 6. PROGRAMA DE REVENDA E PARCERIAS B2B */}
      <ResellerSection />

      {/* 6. FOOTER PREMIUM */}
      <Footer />
    </div>
  );
}
