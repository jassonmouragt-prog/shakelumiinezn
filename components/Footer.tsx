'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8E8E4] pt-16 pb-12 text-[#5A5A58]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-[#F0F0EC] gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="LUMIINE Logo"
                width={200}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#8E8E8A]">
              Nutrição de precisão, pureza botânica e rituais diários de bem-estar.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-[#E2E2DF] flex items-center justify-center text-[#5A5A58] hover:text-[#C9A227] hover:border-[#D4AF37] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-[#E2E2DF] flex items-center justify-center text-[#5A5A58] hover:text-[#C9A227] hover:border-[#D4AF37] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.592 0 9 1.582 9 4.615V8z"/>
              </svg>
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-[#E2E2DF] flex items-center justify-center text-[#5A5A58] hover:text-[#C9A227] hover:border-[#D4AF37] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 5 COLUNAS ESPECIFICADAS NA SEÇÃO 59 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-[#F0F0EC] text-xs">
          
          {/* MARCA */}
          <div className="space-y-3">
            <h4 className="font-bold text-[11px] tracking-wider text-[#1A1A1A] uppercase">
              MARCA
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#sobre-nos" className="hover:text-[#C9A227] transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/#sobre-nos" className="hover:text-[#C9A227] transition-colors">
                  Nossa história
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="hover:text-[#C9A227] transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* PRODUTOS */}
          <div className="space-y-3">
            <h4 className="font-bold text-[11px] tracking-wider text-[#1A1A1A] uppercase">
              PRODUTOS
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos?cat=shakes" className="hover:text-[#C9A227] transition-colors">
                  Shakes
                </Link>
              </li>
              <li>
                <Link href="/produtos?cat=combos" className="hover:text-[#C9A227] transition-colors">
                  Combos
                </Link>
              </li>
              <li>
                <Link href="/produtos?cat=kits" className="hover:text-[#C9A227] transition-colors">
                  Kits
                </Link>
              </li>
              <li>
                <Link href="/produtos?cat=novidades" className="hover:text-[#C9A227] transition-colors">
                  Novidades
                </Link>
              </li>
            </ul>
          </div>

          {/* QUALIDADE & DIFERENCIAIS */}
          <div className="space-y-3">
            <h4 className="font-bold text-[11px] tracking-wider text-[#1A1A1A] uppercase">
              QUALIDADE
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#sobre-nos" className="hover:text-[#C9A227] transition-colors">
                  Pureza Botânica
                </Link>
              </li>
              <li>
                <Link href="/#sobre-nos" className="hover:text-[#C9A227] transition-colors">
                  Padrão Farmacopeico
                </Link>
              </li>
              <li>
                <Link href="/#sobre-nos" className="hover:text-[#C9A227] transition-colors">
                  Clean Label 100%
                </Link>
              </li>
            </ul>
          </div>

          {/* NEGÓCIOS */}
          <div className="space-y-3">
            <h4 className="font-bold text-[11px] tracking-wider text-[#1A1A1A] uppercase">
              NEGÓCIOS
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/revenda" className="hover:text-[#C9A227] transition-colors">
                  Seja um revendedor
                </Link>
              </li>
              <li>
                <Link href="/revendedor" className="hover:text-[#C9A227] transition-colors">
                  Portal do revendedor
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPORTE */}
          <div className="space-y-3">
            <h4 className="font-bold text-[11px] tracking-wider text-[#1A1A1A] uppercase">
              SUPORTE
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-[#C9A227] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#privacidade" className="hover:text-[#C9A227] transition-colors">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a href="#termos" className="hover:text-[#C9A227] transition-colors">
                  Termos de serviço
                </a>
              </li>
              <li>
                <a href="mailto:contato@lumiine.com" className="hover:text-[#C9A227] transition-colors">
                  contato@lumiine.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E8E8A] gap-4">
          <p>© 2026 Shake Lumiine ZN</p>
          <div className="flex items-center gap-1 text-[#B8943D]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ambiente 100% Seguro e Criptografado</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
