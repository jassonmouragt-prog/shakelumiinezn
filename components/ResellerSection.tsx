'use client';

import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';

export default function ResellerSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      'Olá, quero ser um revendedor LUMIINE!',
      '',
      `Nome completo: ${fullName}`,
      `CPF: ${cpf}`,
      `E-mail: ${email}`,
      `Endereço completo: ${address}`,
      `CEP: ${cep}`,
      `Data de nascimento: ${birthDate}`
    ].join('\n');
    window.open(
      `https://wa.me/5584999125143?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    setFullName('');
    setCpf('');
    setEmail('');
    setAddress('');
    setCep('');
    setBirthDate('');
    setModalOpen(false);
  };

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

        {/* BOTTOM CALLOUT WITH FORM CTA */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#FAFAF8] via-[#FDFBF7] to-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-[#1A1A1A]">Pronto para expandir seus negócios com a LUMIINE?</h4>
              <p className="text-xs text-[#8E8E8A]">Envie seus dados pelo WhatsApp e fale com nossa equipe de parceiros.</p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] text-xs font-bold tracking-wider transition-all shadow-sm flex-shrink-0"
            >
              <span>QUERO SER REVENDEDOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* MODAL: FORMULÁRIO DE PARCEIRO → WHATSAPP */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E8E8E4] p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scale max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#F0F0EC] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] leading-snug">
                  Quero ser um{' '}
                  <span className="font-serif italic font-normal text-[#C9A227]">revendedor</span>
                </h3>
                <p className="text-xs text-[#8E8E8A] mt-0.5">
                  Preencha seus dados abaixo — enviaremos pelo WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#8E8E8A] hover:text-[#1A1A1A] p-1 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3A3A38] mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Duarte"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-sm text-[#1A1A1A] placeholder-[#A8A8A4] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3A3A38] mb-1">CPF *</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-sm text-[#1A1A1A] placeholder-[#A8A8A4] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#3A3A38] mb-1">Data de Nascimento *</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/AAAA"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-sm text-[#1A1A1A] placeholder-[#A8A8A4] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3A3A38] mb-1">E-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-sm text-[#1A1A1A] placeholder-[#A8A8A4] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3A3A38] mb-1">Endereço Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Rua, número, bairro, cidade, UF"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-sm text-[#1A1A1A] placeholder-[#A8A8A4] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3A3A38] mb-1">CEP *</label>
                <input
                  type="text"
                  required
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-sm text-[#1A1A1A] placeholder-[#A8A8A4] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(201,162,39,0.3)]"
              >
                <CheckCircle className="w-4 h-4" />
                ENVIAR PELO WHATSAPP
              </button>

              <p className="text-[10px] text-[#A8A8A4] text-center">
                Ao enviar, você será direcionado ao WhatsApp +55 84 99912-5143 com seus dados.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}