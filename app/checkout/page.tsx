'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CreditCard,
  QrCode,
  Truck,
  MapPin,
  ShieldCheck,
  Sparkles,
  Copy,
  Clock,
  Check
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { Order } from '@/types';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const { cart, cartSubtotal, createOrder } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shippingMethod: 'entrega' as 'entrega' | 'retirada',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: 'pix' as 'pix' | 'cartao',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    resellerCode: ''
  });

  const [formError, setFormError] = useState('');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  const shippingCost = formData.shippingMethod === 'retirada' ? 0 : 22.00;
  const discount = formData.resellerCode.toUpperCase() === 'PARCEIRO10' ? cartSubtotal * 0.10 : 0;
  const finalTotal = cartSubtotal + shippingCost - discount;

  const buildWhatsAppMessage = (order: Order) => {
    const lines: string[] = [];
    lines.push('*NOVO PEDIDO — LUMIINE*');
    lines.push(`*Nome:* ${order.customerName}`);
    lines.push(`*Telefone:* ${order.customerPhone}`);
    lines.push(`*Pedido:* ${order.code}`);
    lines.push('');
    lines.push('*Itens do Pedido:*');
    order.items.forEach((item, i) => {
      const price = item.product.promoPrice || item.product.price;
      lines.push(
        `${i + 1}. ${item.product.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ''} x${item.quantity} — R$ ${(price * item.quantity).toFixed(2).replace('.', ',')}`
      );
    });
    lines.push('');
    lines.push(`*Subtotal:* R$ ${order.subtotal.toFixed(2).replace('.', ',')}`);
    if (order.shippingMethod === 'retirada') {
      lines.push('*Frete:* Grátis (Retirada em Lounge)');
    } else {
      lines.push(`*Frete:* R$ ${order.shippingCost.toFixed(2).replace('.', ',')}`);
    }
    if (order.discount > 0) {
      lines.push(`*Desconto:* - R$ ${order.discount.toFixed(2).replace('.', ',')}`);
    }
    lines.push(`*Total:* R$ ${order.total.toFixed(2).replace('.', ',')}`);
    lines.push('');
    lines.push(`*Pagamento:* ${order.paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'}`);
    if (order.shippingMethod === 'entrega') {
      const a = order.address;
      lines.push('');
      lines.push('*Endereço de Entrega:*');
      lines.push(`${a.street}, ${a.number}${a.complement ? ` - ${a.complement}` : ''}`);
      lines.push(`${a.neighborhood}, ${a.city} - ${a.state}`);
      lines.push(`CEP: ${a.zipCode}`);
    }
    return lines.join('\n');
  };

  const handleNext = () => {
    setFormError('');
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        setFormError('Preencha seu nome completo, email e telefone para continuar.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (formData.shippingMethod === 'entrega') {
        const required = [
          formData.zipCode,
          formData.street,
          formData.number,
          formData.neighborhood,
          formData.city,
          formData.state
        ];
        if (required.some((v) => !v.trim())) {
          setFormError('Preencha o endereço completo para entrega.');
          return;
        }
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.name.trim()) {
        setFormError('Informe seu nome completo antes de enviar o pedido.');
        return;
      }
      if (!formData.phone.trim()) {
        setFormError('Informe seu telefone/WhatsApp para contato.');
        return;
      }
      const newOrder = createOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        shippingMethod: formData.shippingMethod,
        shippingCost,
        paymentMethod: formData.paymentMethod,
        items: cart,
        subtotal: cartSubtotal,
        discount,
        total: finalTotal,
        resellerCode: formData.resellerCode || undefined
      });
      setCreatedOrder(newOrder);
      setStep(4);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(newOrder))}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136lumiine-shakes-natural-f918237465204000053039865802BR5925LUMIINE WELLNESS SHAKES6009SAO PAULO62070503***6304E8A2');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* STEPPER HEADER (01 DADOS • 02 ENTREGA • 03 PAGAMENTO • 04 CONFIRMAÇÃO) */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#E8E8E4] -translate-y-1/2 -z-0" />
            {[
              { num: 1, label: '01 DADOS' },
              { num: 2, label: '02 ENTREGA' },
              { num: 3, label: '03 PAGAMENTO' },
              { num: 4, label: '04 CONFIRMAÇÃO' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1.5 relative z-10 bg-[#FAFAF8] px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.num
                      ? 'bg-[#C9A227] text-white shadow-xs'
                      : 'bg-white border border-[#D9D9D9] text-[#8E8E8A]'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <span
                  className={`text-[10px] font-bold tracking-wider ${
                    step >= s.num ? 'text-[#1A1A1A]' : 'text-[#8E8E8A]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 04: PEDIDO CONFIRMADO (SECTION 22) */}
        {step === 4 && createdOrder ? (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-md space-y-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFFDF7] to-[#F5E7B2]/40 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#C9A227] shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C9A227] uppercase">
                COMPRA CONCLUÍDA
              </span>
              <h1 className="text-3xl font-sans font-bold tracking-tight text-[#1A1A1A]">
                PEDIDO CONFIRMADO.
              </h1>
              <p className="text-xs sm:text-sm text-[#5A5A58]">
                Obrigado por escolher a nossa marca. Enviamos os detalhes para {createdOrder.customerEmail}.
              </p>
              <div className="pt-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAFAF8] border border-[#E8E8E4] font-mono text-xs font-bold text-[#1A1A1A]">
                  Pedido: {createdOrder.code}
                </span>
              </div>
            </div>

            {/* TIMELINE CONFORME SEÇÃO 22 */}
            <div className="bg-[#FAFAF8] rounded-2xl border border-[#E8E8E4] p-6 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-4">
                Status do Envio em Tempo Real
              </h4>
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C9A227] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-[#1A1A1A]">Pedido recebido</strong>
                    <span className="text-[#8E8E8A] ml-2">• Registrado no sistema</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C9A227] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-[#1A1A1A]">Pagamento confirmado</strong>
                    <span className="text-[#8E8E8A] ml-2">• Aprovado instantaneamente</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white border border-[#D4AF37] text-[#C9A227] flex items-center justify-center text-[10px] font-bold animate-pulse">
                    ○
                  </div>
                  <div>
                    <strong className="text-[#C9A227]">Preparando com cuidado</strong>
                    <span className="text-[#8E8E8A] ml-2">• Separação no centro de distribuição</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white border border-[#D9D9D9] text-[#8E8E8A] flex items-center justify-center text-[10px]">
                    ○
                  </div>
                  <div>
                    <span>A caminho</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white border border-[#D9D9D9] text-[#8E8E8A] flex items-center justify-center text-[10px]">
                    ○
                  </div>
                  <div>
                    <span>Entregue no endereço</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmação e Segurança */}
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FFFDF7] border border-[#D4AF37]/35 text-xs text-[#B8943D] font-medium">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span>Recebemos seu pedido com sucesso! Atualizações serão enviadas ao seu email.</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/produtos"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider shadow-sm hover:brightness-105"
              >
                CONTINUAR COMPRANDO
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAFAF8] border border-[#E2E2DF] text-[#1A1A1A] text-xs font-semibold hover:bg-white"
              >
                Voltar para o Início
              </Link>
            </div>
          </div>
        ) : (
          /* STEPS 1, 2, 3 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* FORM CONTAINER (Col 1-7) */}
            <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 shadow-xs space-y-6">
              
              {/* STEP 1: DADOS */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1A1A1A]">01. Seus Dados Pessoais</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Nome Completo</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Telefone / WhatsApp</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ENTREGA / RETIRADA */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1A1A1A]">02. Modalidade e Endereço</h3>
                  
                  {/* Entrega vs Retirada */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, shippingMethod: 'entrega' })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        formData.shippingMethod === 'entrega'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#FAFAF8] text-[#5A5A58] border-[#E2E2DF]'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Entrega no Endereço</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, shippingMethod: 'retirada' })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        formData.shippingMethod === 'retirada'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#FAFAF8] text-[#5A5A58] border-[#E2E2DF]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Retirada em Lounge</span>
                    </button>
                  </div>

                  {/* Endereço fields */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">CEP</label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Logradouro</label>
                        <input
                          type="text"
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Número</label>
                        <input
                          type="text"
                          value={formData.number}
                          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Complemento</label>
                        <input
                          type="text"
                          value={formData.complement}
                          onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Bairro</label>
                        <input
                          type="text"
                          value={formData.neighborhood}
                          onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Cidade</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Estado</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PAGAMENTO (PIX / CARTÃO) */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1A1A1A]">03. Forma de Pagamento</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                      className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        formData.paymentMethod === 'pix'
                          ? 'bg-[#FFFDF7] border-[#D4AF37] text-[#B8943D] shadow-xs'
                          : 'bg-[#FAFAF8] text-[#5A5A58] border-[#E2E2DF]'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-[#C9A227]" />
                      <span>PIX Instantâneo (Aprovação Imediata)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cartao' })}
                      className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        formData.paymentMethod === 'cartao'
                          ? 'bg-[#FFFDF7] border-[#D4AF37] text-[#B8943D] shadow-xs'
                          : 'bg-[#FAFAF8] text-[#5A5A58] border-[#E2E2DF]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#C9A227]" />
                      <span>Cartão de Crédito (até 6x sem juros)</span>
                    </button>
                  </div>

                  {formData.paymentMethod === 'pix' ? (
                    <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] text-center space-y-4">
                      <div className="w-36 h-36 mx-auto bg-white rounded-xl border border-[#D9D9D9] p-2 flex items-center justify-center shadow-xs">
                        <QrCode className="w-28 h-28 text-[#1A1A1A]" />
                      </div>
                      <p className="text-xs text-[#5A5A58]">
                        Escaneie com o app do seu banco ou copie a chave Pix abaixo:
                      </p>
                      <button
                        type="button"
                        onClick={copyPixCode}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D4AF37] text-xs font-bold text-[#B8943D] hover:bg-[#FFFDF7]"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Código Pix Copiado!' : 'Copiar Código Pix Copia-e-Cola'}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4]">
                      <div>
                        <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Número do Cartão</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Validade</label>
                          <input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#5A5A58] mb-1">CVV</label>
                          <input
                            type="text"
                            value={formData.cardCvv}
                            onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cupom / Código de Revendedor Parceiro */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#5A5A58] mb-1">
                      Código de Revendedor ou Cupom (Opcional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ex: JUWELLNESS ou PARCEIRO10"
                        value={formData.resellerCode}
                        onChange={(e) => setFormData({ ...formData, resellerCode: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] uppercase"
                      />
                    </div>
                    {formData.resellerCode.toUpperCase() === 'PARCEIRO10' && (
                      <span className="text-[11px] text-[#C9A227] font-semibold mt-1 block">
                        ✓ 10% de desconto aplicado!
                      </span>
                    )}
                  </div>
                </div>
              )}

              {formError && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between pt-6 border-t border-[#F0F0EC]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as any)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A5A58] hover:text-[#1A1A1A]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <Link
                    href="/produtos"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E8E8A]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continuar comprando</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 shadow-[0_4px_20px_rgba(201,162,39,0.25)] flex items-center gap-2"
                >
                  <span>{step === 3 ? 'FINALIZAR E PAGAR' : 'AVANÇAR'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* ORDER SUMMARY (Col 8-12) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs space-y-5">
                <h4 className="text-sm font-bold text-[#1A1A1A] pb-3 border-b border-[#F0F0EC]">
                  Resumo do Pedido ({cart.length} {cart.length === 1 ? 'item' : 'itens'})
                </h4>

                {/* Items preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const price = item.product.promoPrice || item.product.price;
                    return (
                      <div key={item.id} className="flex items-center gap-3 text-xs">
                        <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E8E8E4] relative overflow-hidden flex-shrink-0">
                          <ProductImage src={item.product.image} alt={item.product.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-[#1A1A1A] truncate">{item.product.name}</h5>
                          <span className="text-[11px] text-[#8E8E8A]">{item.quantity}x {item.selectedFlavor}</span>
                        </div>
                        <span className="font-bold text-[#1A1A1A]">
                          R$ {(price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-[#F0F0EC] space-y-2 text-xs text-[#5A5A58]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1A1A1A]">
                      R$ {cartSubtotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="font-medium text-[#1A1A1A]">
                      {shippingCost === 0 ? <strong className="text-[#B8943D]">Grátis</strong> : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#C9A227]">
                      <span>Desconto Parceiro</span>
                      <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-[#E8E8E4] flex justify-between items-baseline text-sm font-bold text-[#1A1A1A]">
                    <span>Total a Pagar</span>
                    <span className="text-xl font-serif text-[#1A1A1A]">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] text-[11px] text-[#8E8E8A]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                  <span>Transação criptografada de 256 bits com confirmação imediata.</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
