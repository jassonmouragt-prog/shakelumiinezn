'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Award,
  Layers,
  Headset,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Footer from '@/components/Footer';

export default function ResellerProgramPage() {
  const { submitResellerApplication } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    city: '',
    state: 'SP',
    instagram: '',
    activityType: 'Espaço Wellness / Clínica',
    salesExperience: 'Mais de 2 anos',
    discoverySource: 'Instagram Oficial',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitResellerApplication(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* HERO REVENDA (Section 32) */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/35 text-[10px] tracking-[0.2em] font-semibold text-[#B8943D] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            PROGRAMA DE PARCEIROS
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1A1A1A] leading-tight">
            TRANSFORME SAÚDE EM{' '}
            <span className="font-serif italic font-normal text-[#C9A227]">
              oportunidade.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#5A5A58] max-w-xl mx-auto">
            Leve uma marca que as pessoas querem consumir para pessoas que querem vender.
          </p>
          <div className="pt-2">
            <a
              href="#formulario-cadastro"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 shadow-[0_6px_25px_rgba(201,162,39,0.25)]"
            >
              <span>QUERO SER REVENDEDOR</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 BENEFÍCIOS DA REVENDA (Section 33) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: TrendingUp,
              title: 'MARGEM ATRATIVA',
              desc: 'Condições especiais com margens de até 45% sobre o preço consumidor final e descontos progressivos por volume.'
            },
            {
              icon: Award,
              title: 'MARCA FORTE',
              desc: 'Embalagens premiadas, identidade clean de alto padrão e alta retenção com recompra constante dos clientes.'
            },
            {
              icon: Layers,
              title: 'MATERIAL DE VENDAS',
              desc: 'Acesso a criativos prontos, fotos de campanha em estúdio publicitário, fichas nutricionais e argumentos de venda.'
            },
            {
              icon: Headset,
              title: 'SUPORTE DEDICADO',
              desc: 'Canal direto com nosso time de expansão para ajudar na logística, pedidos em lote e ativações locais.'
            }
          ].map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-[28px] p-7 border border-[#E8E8E4] shadow-xs space-y-3 hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#D4AF37]/35 flex items-center justify-center text-[#C9A227] shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold tracking-wider text-[#1A1A1A] font-sans">
                  {b.title}
                </h3>
                <p className="text-xs text-[#5A5A58] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* COMO FUNCIONA A REVENDA — 4 ETAPAS (Section 34) */}
        <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 sm:p-12 shadow-xs mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C9A227] uppercase">PROCESSO TRANSPARENTE</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Como Funciona o Credenciamento</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Etapa 01',
                title: 'CADASTRE-SE',
                desc: 'Preencha seus dados cadastrais e de atuação comercial no formulário abaixo.'
              },
              {
                step: 'Etapa 02',
                title: 'AGUARDE APROVAÇÃO',
                desc: 'A equipe LUMIINE analisa seu perfil para garantir a exclusividade na sua região.'
              },
              {
                step: 'Etapa 03',
                title: 'ACESSE SUA ÁREA',
                desc: 'Após aprovação, você recebe seu acesso instantâneo ao portal e catálogo B2B.'
              },
              {
                step: 'Etapa 04',
                title: 'COMECE A VENDER',
                desc: 'Faça pedidos com preço de fábrica e compartilhe seu link exclusivo com comissões.'
              }
            ].map((et, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-2 relative">
                <span className="text-[11px] font-bold text-[#C9A227] uppercase">{et.step}</span>
                <h4 className="text-sm font-bold text-[#1A1A1A]">{et.title}</h4>
                <p className="text-xs text-[#5A5A58] leading-relaxed">{et.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO DE CADASTRO DO REVENDEDOR (Section 35) */}
        <div id="formulario-cadastro" className="max-w-3xl mx-auto bg-white rounded-[32px] border border-[#E8E8E4] p-8 sm:p-12 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#FFFDF7] border border-[#D4AF37] flex items-center justify-center text-[#C9A227] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A]">Inscrição Realizada com Sucesso!</h3>
              <p className="text-xs sm:text-sm text-[#5A5A58] max-w-md mx-auto leading-relaxed">
                Recebemos sua solicitação de credenciamento com status <strong>PENDENTE</strong>. Nossa equipe entrará em contato via WhatsApp/Email nas próximas horas.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/revendedor"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-[#2A2A2A]"
                >
                  Ver Simulação do Portal do Revendedor →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1 text-center sm:text-left pb-4 border-b border-[#F0F0EC]">
                <h3 className="text-xl font-bold text-[#1A1A1A]">Cadastro de Revendedor Parceiro</h3>
                <p className="text-xs text-[#8E8E8A]">
                  Preencha as informações abaixo para solicitar sua homologação.
                </p>
              </div>

              {/* Campos (Section 35: Nome, CPF/CNPJ, Telefone, Email, Cidade, Estado, Instagram, Tipo de atuacao, Experiencia, Como conheceu, Observacoes) */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Nome Completo / Razão Social</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Beatriz Fontes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">CPF ou CNPJ</label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={formData.document}
                      onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Email Profissional</label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@dominio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Telefone / WhatsApp</label>
                    <input
                      type="text"
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Cidade</label>
                    <input
                      type="text"
                      required
                      placeholder="São Paulo"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Estado</label>
                    <input
                      type="text"
                      required
                      placeholder="SP"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Instagram (@usuario)</label>
                    <input
                      type="text"
                      placeholder="@seu.perfil"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Tipo de Atuação</label>
                    <select
                      value={formData.activityType}
                      onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Espaço Wellness / Clínica">Espaço Wellness / Clínica</option>
                      <option value="Nutricionista / Profissional de Saúde">Nutricionista / Profissional de Saúde</option>
                      <option value="Studio de Pilates / Fitness">Studio de Pilates / Treinamento</option>
                      <option value="Loja de Produtos Naturais">Loja de Produtos Naturais</option>
                      <option value="Consultor Independente">Consultor Independente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Experiência prévia com vendas / representação</label>
                  <input
                    type="text"
                    placeholder="Conte brevemente sobre sua experiência comercial..."
                    value={formData.salesExperience}
                    onChange={(e) => setFormData({ ...formData, salesExperience: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Observações adicionais</label>
                  <textarea
                    rows={3}
                    placeholder="Informações relevantes sobre seu público ou espaço..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0F0EC]">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 shadow-[0_4px_20px_rgba(201,162,39,0.25)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR SOLICITAÇÃO DE CADASTRO</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
