'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProductImage from '@/components/ProductImage';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Plus, Minus, Check, Sparkles, ShieldCheck, Heart, ArrowLeft, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Footer from '@/components/Footer';

export default function SingleProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { products, addToCart } = useApp();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedImage, setSelectedImage] = useState(product?.image ?? '');
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0] || 'Original');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'descricao' | 'ingredientes' | 'nutricional' | 'beneficios' | 'avaliacoes'>('descricao');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-28 flex items-center justify-center">
        <div className="text-center max-w-md px-6 space-y-4">
          <h1 className="text-xl sm:text-2xl font-sans font-bold text-[#1A1A1A]">
            Produto não encontrado
          </h1>
          <p className="text-xs text-[#8E8E8A]">
            O produto ainda não está disponível ou o catálogo está carregando.
          </p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white text-xs font-bold tracking-wider"
          >
            Voltar para o catálogo
          </Link>
        </div>
      </div>
    );
  }

  const productAddons = product.addons ?? [];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((acc, curr) => {
    const found = productAddons.find((a) => a.id === curr);
    return acc + (found ? found.price : 0);
  }, 0);

  const basePrice = product.promoPrice || product.price;
  const totalPrice = (basePrice + addonsTotal) * quantity;

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* BREADCRUMB & BACK */}
        <div className="mb-8">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E8E8A] hover:text-[#C9A227] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para o catálogo</span>
          </Link>
        </div>

        {/* MAIN PRODUCT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
          
          {/* ESQUERDA: GALERIA DE IMAGENS (Col 1-6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Display */}
            <div className="relative aspect-square w-full rounded-[24px] bg-[#FAFAF8] border border-[#E8E8E4] overflow-hidden p-8 flex items-center justify-center">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white shadow-xs">
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="relative w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.06)]">
                <ProductImage src={selectedImage} alt={product.name} priority />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.gallery.filter((img) => img).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl bg-[#FAFAF8] border p-2 relative overflow-hidden transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20'
                      : 'border-[#E2E2DF] hover:border-[#C7C7C7]'
                  }`}
                >
                  <Image src={img} alt="Miniatura" fill unoptimized className="object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* DIREITA: DETALHES, VARIAÇÕES & COMPRA (Col 7-12) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Avaliações */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1A1A1A]">{product.rating}</span>
                <span className="text-xs text-[#8E8E8A]">({product.reviewsCount} avaliações verificadas)</span>
              </div>

              {/* Título & Subtítulo */}
              <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[#1A1A1A]">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#5A5A58] leading-relaxed">
                {product.description}
              </p>

              {/* Preços */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
                  R$ {basePrice.toFixed(2).replace('.', ',')}
                </span>
                {product.promoPrice && (
                  <span className="text-sm text-[#8E8E8A] line-through">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-xs text-[#B8943D] font-semibold bg-[#FAFAF8] px-2.5 py-1 rounded-full border border-[#D4AF37]/35">
                  Rende {product.servings} doses ({product.weight})
                </span>
              </div>

              {/* Seleção de Sabor */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Selecione o Sabor:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedFlavor === flavor
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'bg-[#FAFAF8] text-[#3A3A38] border border-[#E2E2DF] hover:border-[#D4AF37]'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adicionais Opcionais */}
              {productAddons.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Adicionais:
                  </label>
                  <div className="space-y-2">
                    {productAddons.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                            isChecked
                              ? 'bg-[#FFFDF7] border-[#D4AF37]'
                              : 'bg-[#FAFAF8] border-[#E8E8E4] hover:border-[#D9D9D9]'
                          }`}
                        >
                          <span className="text-[#3A3A38]">
                            {addon.label} (+ R$ {addon.price.toFixed(2).replace('.', ',')})
                          </span>
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                              isChecked
                                ? 'bg-[#C9A227] border-[#C9A227] text-white'
                                : 'border-[#C7C7C7] bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Ações de Compra */}
            <div className="space-y-4 pt-6 border-t border-[#F0F0EC]">
              <div className="flex items-center gap-4">
                {/* Seletor de Quantidade */}
                <div className="flex items-center border border-[#D9D9D9] rounded-full bg-[#FAFAF8] p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5A5A58] hover:bg-[#F5F5F3]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5A5A58] hover:bg-[#F5F5F3]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Botão Principal ADICIONAR AO PEDIDO */}
                <button
                  onClick={() => addToCart(product, quantity, selectedFlavor, selectedAddons)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(201,162,39,0.3)] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ADICIONAR AO PEDIDO • R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </button>
              </div>

              {/* Selos de Confiança */}
              <div className="flex items-center gap-2 text-[11px] text-[#8E8E8A]">
                <ShieldCheck className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                <span>Embalagem Hermética 100% Reciclável</span>
              </div>
            </div>

          </div>

        </div>

        {/* SEÇÕES DETALHADAS (Ingredientes, Nutricional, Benefícios, Avaliações) */}
        <div className="mt-14 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 shadow-xs">
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-[#F0F0EC] overflow-x-auto pb-3">
            {[
              { key: 'descricao', label: 'Descrição Completa' },
              { key: 'ingredientes', label: 'Ingredientes Puros' },
              { key: 'nutricional', label: 'Tabela Nutricional' },
              { key: 'beneficios', label: 'Benefícios Clínicos' },
              { key: 'avaliacoes', label: `Avaliações (${product.reviewsCount})` }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-[#C9A227] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C9A227]'
                    : 'text-[#8E8E8A] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-8">
            {activeTab === 'descricao' && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-[#5A5A58] leading-relaxed">
                <p>{product.description}</p>
                <p>
                  Elaborado com tecnologia de micronização a frio para preservar a integridade estrutural das proteínas e dos fitoquímicos naturais. Dissolução instantânea tanto em água quanto em leites vegetais, sem necessidade de liquidificador.
                </p>
              </div>
            )}

            {activeTab === 'ingredientes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAFAF8] border border-[#EBEBEA] text-xs text-[#1A1A1A] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'nutricional' && (
              <div className="max-w-xl bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Informação Nutricional (Porção de 30g)
                </h4>
                <div className="divide-y divide-[#EBEBEA] text-xs text-[#3A3A38]">
                  <div className="py-2 flex justify-between">
                    <span>Valor Energético</span>
                    <strong className="text-[#1A1A1A]">{product.nutritionalInfo.calories}</strong>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Proteínas</span>
                    <strong className="text-[#1A1A1A]">{product.nutritionalInfo.protein}</strong>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Carboidratos</span>
                    <strong className="text-[#1A1A1A]">{product.nutritionalInfo.carbs}</strong>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Gorduras Totais</span>
                    <strong className="text-[#1A1A1A]">{product.nutritionalInfo.fat}</strong>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Fibras Alimentares</span>
                    <strong className="text-[#1A1A1A]">{product.nutritionalInfo.fiber}</strong>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Sódio</span>
                    <strong className="text-[#1A1A1A]">{product.nutritionalInfo.sodium}</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'beneficios' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {product.benefits.map((ben, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                    <span className="text-[10px] font-bold text-[#B8943D] uppercase tracking-wider">BENEFÍCIO #{i + 1}</span>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{ben}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'avaliacoes' && (
              <div className="space-y-4 max-w-3xl">
                {[
                  {
                    name: 'Mariana Duarte',
                    rating: 5,
                    date: 'Há 3 dias',
                    comment: 'Surpreendente! Não tem aquele gosto de areia comum de proteínas vegetais. O aroma de fava de baunilha é muito sofisticado e dá uma saciedade ótima pela manhã.'
                  },
                  {
                    name: 'Dra. Gabriela Vasconcelos',
                    rating: 5,
                    date: 'Há 1 semana',
                    comment: 'Prescrevo para meus pacientes em busca de alimentação limpa. O perfil de aminoácidos é excelente e a digestibilidade é nota 10.'
                  }
                ].map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1A1A1A]">{rev.name}</span>
                      <span className="text-[11px] text-[#8E8E8A]">{rev.date}</span>
                    </div>
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#5A5A58]">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
