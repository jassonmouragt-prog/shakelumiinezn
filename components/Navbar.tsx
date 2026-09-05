'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E8E8E4] shadow-[0_4px_25px_rgba(0,0,0,0.03)] py-3.5'
            : 'bg-white/70 backdrop-blur-sm border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="LUMIINE Logo"
                width={140}
                height={44}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>

            {/* NAV LINKS (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium tracking-wide text-[#3A3A38]">
              <Link
                href="/produtos"
                className="hover:text-[#C9A227] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C9A227] hover:after:w-full after:transition-all"
              >
                Produtos
              </Link>
              <Link
                href="/#sobre-nos"
                className="hover:text-[#C9A227] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C9A227] hover:after:w-full after:transition-all"
              >
                Sobre nós
              </Link>
              <Link
                href="/#contato"
                className="hover:text-[#C9A227] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C9A227] hover:after:w-full after:transition-all"
              >
                Contato
              </Link>
            </nav>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">
              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full border border-[#E2E2DF] hover:border-[#D4AF37] bg-white text-[#1A1A1A] transition-all shadow-xs hover:shadow-sm"
                aria-label="Ver sacola de compras"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A227] text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-scale">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* PEDIR AGORA (Gold CTA) */}
              <Link
                href="/produtos"
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-semibold tracking-wider hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(201,162,39,0.25)] border border-[#E8C868]/40"
              >
                PEDIR AGORA
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl border border-[#E2E2DF] text-[#1A1A1A]"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 md:hidden animate-fade-in">
          <div className="space-y-4 text-lg font-medium text-[#1A1A1A]">
            <Link
              href="/produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-[#F0F0EC]"
            >
              <span>Produtos</span>
              <ChevronRight className="w-4 h-4 text-[#C9A227]" />
            </Link>
            <Link
              href="/#sobre-nos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-[#F0F0EC]"
            >
              <span>Sobre nós</span>
              <ChevronRight className="w-4 h-4 text-[#C9A227]" />
            </Link>
            <Link
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-[#F0F0EC]"
            >
              <span>Contato</span>
              <ChevronRight className="w-4 h-4 text-[#C9A227]" />
            </Link>
          </div>

          <div className="space-y-3 pt-6">
            <Link
              href="/produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-sm font-semibold tracking-wider shadow-[0_4px_20px_rgba(201,162,39,0.3)]"
            >
              PEDIR AGORA
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
