'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProductCategory, Product } from '@/types';

export default function FeaturedProducts() {
  const { products, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'shakes', label: 'Shakes' },
    { key: 'combos', label: 'Combos' },
    { key: 'kits', label: 'Kits' },
    { key: 'novidades', label: 'Novidades' },
    { key: 'mais-vendidos', label: 'Mais vendidos' }
  ];

  const filteredProducts = products.filter((prod) => {
    // Check if showcase is enabled
    if (prod.showInShowcase === false) return false;

    if (activeCategory === 'todos') return true;
    if (activeCategory === 'novidades') return prod.badge === 'NOVO';
    if (activeCategory === 'mais-vendidos') return prod.badge === 'MAIS VENDIDO';
    return prod.category === activeCategory;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/35 text-[10px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          LINHA DE NUTRIÇÃO
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#1A1A1A]">
          ESCOLHA O SEU{' '}
          <span className="font-serif italic font-normal text-[#C9A227]">
            favorito.
          </span>
        </h2>
        <p className="text-sm text-[#5A5A58]">
          Sabores pensados para fazer parte da sua rotina com equilíbrio e prazer.
        </p>

        {/* CATEGORY TABS */}
        <div className="pt-6 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-md'
                    : 'bg-white text-[#5A5A58] border border-[#E2E2DF] hover:border-[#D4AF37] hover:text-[#1A1A1A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {filteredProducts.map((product) => {
          const isFav = !!favorites[product.id];
          const hasPromo = !!product.promoPrice && product.promoPrice < product.price;

          return (
            <div
              key={product.id}
              className="bg-white rounded-[24px] border border-[#E8E8E4] overflow-hidden flex flex-col justify-between card-hover-elevation group relative"
            >
              {/* Card Image Container */}
              <div className="relative w-full aspect-square bg-[#FAFAF8] overflow-hidden p-6 flex items-center justify-center">
                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-xs ${
                        product.badge === 'MAIS VENDIDO'
                          ? 'bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white'
                          : product.badge === 'NOVO'
                          ? 'bg-white border border-[#D4AF37] text-[#B8943D]'
                          : 'bg-[#1A1A1A] text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => toggleFavorite(product.id, e)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#E8E8E4] flex items-center justify-center text-[#8E8E8A] hover:text-[#C9A227] transition-colors shadow-xs"
                  aria-label="Adicionar aos favoritos"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? 'fill-[#C9A227] text-[#C9A227]' : ''
                    }`}
                  />
                </button>

                {/* Image */}
                <Link
                  href={`/produto/${product.slug}`}
                  className="relative w-full h-full block group-hover:scale-105 transition-transform duration-500 ease-out"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#1A1A1A]">
                      {product.rating}
                    </span>
                    <span className="text-[11px] text-[#8E8E8A]">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/produto/${product.slug}`}>
                    <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#C9A227] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-xs text-[#5A5A58] line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price & Add Button */}
                <div className="pt-2 border-t border-[#F0F0EC] flex items-center justify-between">
                  <div>
                    {hasPromo ? (
                      <div className="flex flex-col">
                        <span className="text-[11px] text-[#8E8E8A] line-through">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-base font-bold text-[#1A1A1A]">
                          R$ {product.promoPrice?.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base font-bold text-[#1A1A1A]">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAFAF8] border border-[#D9D9D9] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all text-xs font-semibold shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADICIONAR</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marketplace Link CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#D4AF37] text-[#B8943D] hover:bg-[#FAFAF8] text-xs font-bold tracking-wider transition-all shadow-xs group"
        >
          <span>VER TODOS OS PRODUTOS & KITS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
