'use client';

import React, { useState } from 'react';
import ProductImage from '@/components/ProductImage';
import Link from 'next/link';
import { Search, SlidersHorizontal, Star, Plus, Heart, ArrowUpDown, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProductCategory, Product } from '@/types';
import Footer from '@/components/Footer';

export default function MarketplacePage() {
  const { products, addToCart, isLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'todos', label: 'Todos os Produtos' },
    { key: 'shakes', label: 'Shakes Puros' },
    { key: 'bebidas', label: 'Bebidas Funcionais' },
    { key: 'salgados', label: 'Salgados & Refeições' },
    { key: 'mais-vendidos', label: 'Mais Vendidos' },
    { key: 'novidades', label: 'Novidades' }
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      (selectedCategory === 'novidades' && (p.badge === 'NOVO' || (p as any).isFeatured)) ||
      (selectedCategory === 'mais-vendidos' && (p.badge === 'MAIS VENDIDO' || p.rating >= 4.9)) ||
      p.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      (p.name || '').toLowerCase().includes(query) ||
      (p.subtitle || '').toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query) ||
      (p.flavors || []).some((f) => f.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.promoPrice || a.price;
    const priceB = b.promoPrice || b.price;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.reviewsCount || 0) - (a.reviewsCount || 0);
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/35 text-[10px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            LOJA ONLINE & ASSINATURAS
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1A1A1A]">
            CATÁLOGO{' '}
            <span className="font-serif italic font-normal text-[#C9A227]">
              exclusivo.
            </span>
          </h1>
          <p className="text-sm text-[#5A5A58]">
            Explore formulações limpas, ingredientes raros e rituais criados para transformar seu dia a dia.
          </p>
        </div>

        {/* SEARCH AND FILTERS BAR */}
        <div className="bg-white rounded-[24px] border border-[#E8E8E4] p-4 sm:p-5 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8A]" />
            <input
              type="text"
              placeholder="Buscar por sabor, ingrediente ou benefício..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] placeholder-[#8E8E8A] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-[#5A5A58]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8E8E8A]" />
              <span className="hidden sm:inline">Ordenar:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-full bg-[#FAFAF8] border border-[#E2E2DF] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="featured">Mais Vendidos</option>
              <option value="rating">Mais Bem Avaliados</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>

        </div>

        {/* CATEGORIES PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-white text-[#5A5A58] border border-[#E2E2DF] hover:border-[#D4AF37] hover:text-[#1A1A1A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* PRODUCTS GRID */}
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[24px] border border-[#E8E8E4] overflow-hidden p-6 space-y-4 animate-pulse"
              >
                <div className="w-full aspect-square bg-[#F0F0EC] rounded-xl" />
                <div className="h-4 bg-[#F0F0EC] rounded-md w-3/4" />
                <div className="h-3 bg-[#F0F0EC] rounded-md w-1/2" />
                <div className="h-8 bg-[#F0F0EC] rounded-full w-full mt-4" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E8E4] p-16 text-center space-y-3">
            <p className="text-base font-semibold text-[#1A1A1A]">Nenhum produto encontrado</p>
            <p className="text-xs text-[#8E8E8A]">Tente buscar por outros termos ou limpe o filtro de busca.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="px-5 py-2 rounded-full border border-[#D4AF37] text-[#B8943D] text-xs font-bold hover:bg-[#FAFAF8]"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {sortedProducts.map((product) => {
              const isFav = !!favorites[product.id];
              const hasPromo = !!product.promoPrice && product.promoPrice < product.price;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-[24px] border border-[#E8E8E4] overflow-hidden flex flex-col justify-between card-hover-elevation group relative"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-square bg-[#FAFAF8] p-6 flex items-center justify-center">
                    {/* Badge */}
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

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#E8E8E4] flex items-center justify-center text-[#8E8E8A] hover:text-[#C9A227] transition-colors shadow-xs"
                      aria-label="Favoritar"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-[#C9A227] text-[#C9A227]' : ''
                        }`}
                      />
                    </button>

                    <Link
                      href={`/produto/${product.slug}`}
                      className="relative w-full h-full block group-hover:scale-105 transition-transform duration-500 ease-out"
                    >
                      <ProductImage src={product.image} alt={product.name} />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
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

                      <Link href={`/produto/${product.slug}`}>
                        <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#C9A227] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#5A5A58] line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>
                    </div>

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

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAFAF8] border border-[#D9D9D9] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all text-xs font-semibold"
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
        )}

      </div>

      <Footer />
    </div>
  );
}
