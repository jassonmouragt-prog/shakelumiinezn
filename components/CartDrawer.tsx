'use client';

import React, { useState } from 'react';
import ProductImage from './ProductImage';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { Order } from '@/types';

function buildWhatsAppMessage(order: Order): string {
  const lines: string[] = [];
  lines.push('*NOVO PEDIDO — LUMIINE*');
  lines.push(`*Nome:* ${order.customerName}`);
  lines.push(`*Pedido:* ${order.code}`);
  lines.push('');
  lines.push('*Itens do Pedido:*');
  order.items.forEach((item, i) => {
    const base = item.product.promoPrice || item.product.price;
    const addons = (item.selectedAddons ?? [])
      .map((id) => item.product.addons?.find((a) => a.id === id))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    const addonsText = addons.map((a) => `+ ${a.label}`).join(', ');
    lines.push(
      `${i + 1}. ${item.product.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ''}${addonsText ? ` — ${addonsText}` : ''} x${item.quantity} — R$ ${((base + addonsTotal) * item.quantity).toFixed(2).replace('.', ',')}`
    );
  });
  lines.push('');
  lines.push(`*Total:* R$ ${order.total.toFixed(2).replace('.', ',')}`);
  return lines.join('\n');
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    createOrder
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleFinalize = async () => {
    if (!customerName.trim()) {
      setNameError('Informe seu nome para enviar o pedido.');
      return;
    }
    setNameError('');
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newOrder = await createOrder({
      customerName: customerName.trim(),
      customerEmail: '',
      customerPhone: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      },
      shippingMethod: 'retirada',
      shippingCost: 0,
      paymentMethod: 'pix',
      items: cart,
      subtotal: cartSubtotal,
      discount: 0,
      total: cartSubtotal
    });

    setIsSubmitting(false);

    if (!newOrder) return;

    setCustomerName('');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(newOrder))}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with blur */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EBEBEA] animate-slide-left">
          {/* Header */}
          <div className="p-6 border-b border-[#F0F0EC] flex items-center justify-between bg-[#FAFAF8]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#C9A227]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1A1A1A]">Seu Pedido</h3>
                <p className="text-xs text-[#8E8E8A]">
                  {cart.length} {cart.length === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white text-[#8E8E8A] hover:text-[#1A1A1A] transition-colors border border-transparent hover:border-[#E2E2DF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#F8F8F6] border border-[#E2E2DF] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7 text-[#C7C7C7]" />
                </div>
                <h4 className="text-base font-medium text-[#1A1A1A] mb-1">Sua sacola está vazia</h4>
                <p className="text-xs text-[#8E8E8A] max-w-xs mb-6">
                  Descubra os blends nutritivos e rituais da LUMIINE para elevar seu dia.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#D4AF37] text-[#B8943D] text-xs font-semibold hover:bg-[#D4AF37]/5 transition-colors"
                >
                  Explorar Sabores
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemBase = item.product.promoPrice || item.product.price;
                const addonsTotal = (item.selectedAddons ?? []).reduce(
                  (sum, id) => sum + (item.product.addons?.find((a) => a.id === id)?.price ?? 0),
                  0
                );
                const customTotal = Object.entries(item.customSelections ?? {}).reduce((sum, [stepId, optionIds]) => {
                  const step = item.product.customizationSteps?.find((s) => s.id === stepId);
                  return sum + (step ? optionIds.reduce((s, optId) => s + (step.options.find((o) => o.id === optId)?.price ?? 0), 0) : 0);
                }, 0);
                const itemPrice = itemBase + addonsTotal + customTotal;
                const isBuilder = (item.product.customizationSteps?.length ?? 0) > 0;
                const customizationSummary = isBuilder
                  ? Object.entries(item.customSelections ?? {})
                      .map(([stepId, optionIds]) => {
                        const step = item.product.customizationSteps?.find((s) => s.id === stepId);
                        if (!step) return '';
                        const labels = optionIds
                          .map((optId) => step.options.find((o) => o.id === optId)?.label)
                          .filter(Boolean)
                          .join(' + ');
                        return labels ? `${step.title}: ${labels}` : '';
                      })
                      .filter(Boolean)
                      .join(' • ')
                  : '';
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#EBEBEA] relative group hover:border-[#D4AF37]/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#E2E2DF] flex-shrink-0 relative">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-[#1A1A1A] line-clamp-1">
                          {item.product.name}
                        </h4>
                        {isBuilder ? (
                          customizationSummary ? (
                            <p className="text-[11px] text-[#8E8E8A] mt-0.5 leading-snug line-clamp-3">
                              {customizationSummary}
                            </p>
                          ) : null
                        ) : (
                          <p className="text-[11px] text-[#8E8E8A] mt-0.5">
                            Sabor: <span className="text-[#3A3A38]">{item.selectedFlavor}</span>
                          </p>
                        )}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <p className="text-[11px] text-[#8E8E8A] mt-0.5 line-clamp-1">
                            {item.selectedAddons
                              .map((id) => item.product.addons?.find((a) => a.id === id)?.label)
                              .filter(Boolean)
                              .join(' • ')}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#D9D9D9] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#F5F5F3] text-[#5A5A58]"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-[#1A1A1A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#F5F5F3] text-[#5A5A58]"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#1A1A1A]">
                            R$ {(itemPrice * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-[#8E8E8A]">
                              R$ {itemPrice.toFixed(2).replace('.', ',')} un
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-[#C7C7C7] hover:text-[#B8943D] p-1 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F0F0EC] bg-[#FAFAF8] space-y-4">
              <div className="pt-2 border-t border-[#E8E8E4] flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#1A1A1A]">Total</span>
                <span className="text-lg font-serif font-bold text-[#1A1A1A]">
                  R$ {cartSubtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Customer name */}
              <div>
                <label className="block text-xs font-semibold text-[#5A5A58] mb-1">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Digite seu nome para finalizar"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className={`w-full px-4 py-3 rounded-2xl bg-white border text-xs text-[#1A1A1A] focus:outline-none transition-colors ${
                    nameError ? 'border-red-300 focus:border-red-400' : 'border-[#E2E2DF] focus:border-[#D4AF37]'
                  }`}
                />
                {nameError && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-red-600 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {nameError}
                  </p>
                )}
              </div>

              <button
                onClick={handleFinalize}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(201,162,39,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span>ENVIANDO PEDIDO...</span>
                ) : (
                  <>
                    <span>FINALIZAR PEDIDO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8E8E8A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Compra protegida</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}