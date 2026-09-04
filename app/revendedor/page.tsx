'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Copy,
  ExternalLink,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { INITIAL_RESELLER_CLIENTS } from '@/lib/mock-data';
import Footer from '@/components/Footer';

export default function ResellerPortalPage() {
  const { currentReseller, commissions, products, addToCart } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'loja' | 'comissoes' | 'clientes'>('dashboard');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedBatchQty, setSelectedBatchQty] = useState<Record<string, number>>({
    'menu-shake-pave-trufado': 10,
    'menu-shake-churros': 10
  });

  const resellerLink = `https://lumiine.com/r/${currentReseller.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(resellerLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const monthlySalesData = [
    { month: 'Abr', sales: 1240 },
    { month: 'Mai', sales: 2480 },
    { month: 'Jun', sales: 3950 },
    { month: 'Jul', sales: 5800 },
    { month: 'Ago', sales: 9820 },
    { month: 'Set', sales: 14850 }
  ];

  const maxSale = Math.max(...monthlySalesData.map((d) => d.sales));

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* HEADER DO PORTAL (Section 36) */}
        <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-sans font-bold text-[#1A1A1A]">
                Olá, {currentReseller.name}
              </h1>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-300 text-emerald-700">
                Parceiro {currentReseller.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-[#8E8E8A]">
              Portal exclusivo de pedidos no atacado, acompanhamento de margens e comissões.
            </p>
          </div>

          {/* Link Exclusivo do Revendedor (Section 38) */}
          <div className="w-full md:w-auto p-3 rounded-2xl bg-[#FAFAF8] border border-[#D4AF37]/50 flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#8E8E8A] block">Seu Link de Afiliado</span>
              <span className="font-mono font-bold text-[#B8943D]">{resellerLink}</span>
            </div>
            <button
              onClick={copyLink}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D9D9D9] text-[#1A1A1A] font-semibold hover:border-[#D4AF37] flex items-center gap-1.5 text-xs shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* 4 CARDS RESUMO (Section 36: Vendas do mês, Comissões, Pedidos, Clientes indicados) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8E8E4] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#8E8E8A]">
              <span className="text-xs font-bold uppercase tracking-wider">Vendas do Mês</span>
              <TrendingUp className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              R$ {currentReseller.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">+34% vs mês anterior</span>
          </div>

          <div className="bg-gradient-to-b from-[#FFFDF7] to-white rounded-3xl p-6 border-2 border-[#D4AF37] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#B8943D]">
              <span className="text-xs font-bold uppercase tracking-wider">Comissões Totais</span>
              <DollarSign className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#B8943D]">
              R$ {currentReseller.totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[#5A5A58]">R$ {currentReseller.pendingCommission.toFixed(2)} a liberar</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E8E4] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#8E8E8A]">
              <span className="text-xs font-bold uppercase tracking-wider">Pedidos B2B & Link</span>
              <Package className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              {currentReseller.totalOrders}
            </div>
            <span className="text-[11px] text-[#8E8E8A]">Ticket médio R$ 353,50</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E8E4] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#8E8E8A]">
              <span className="text-xs font-bold uppercase tracking-wider">Clientes Indicados</span>
              <Users className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              34
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">82% taxa de recompra</span>
          </div>

        </div>

        {/* TABS DE NAVEGAÇÃO DO REVENDEDOR */}
        <div className="flex items-center gap-2 border-b border-[#E8E8E4] mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Visão Geral & Gráficos' },
            { id: 'loja', label: 'Loja no Atacado (B2B)' },
            { id: 'comissoes', label: 'Comissões & Repasses' },
            { id: 'clientes', label: 'Clientes Indicados' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#5A5A58] border border-[#E2E2DF] hover:border-[#D4AF37]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DASHBOARD & GRÁFICO (Section 36) */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Gráfico de Vendas nos Últimos 6 Meses */}
            <div className="lg:col-span-8 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A]">Desempenho de Vendas nos Últimos 6 Meses</h3>
                  <p className="text-xs text-[#8E8E8A]">Crescimento contínuo de pedidos e indicações</p>
                </div>
                <span className="text-xs font-bold text-[#C9A227]">Total: R$ 38.090,00</span>
              </div>

              {/* Bar Chart Visual */}
              <div className="h-48 pt-6 flex items-end justify-between gap-3 sm:gap-6 border-b border-[#F0F0EC] pb-2">
                {monthlySalesData.map((d, i) => {
                  const heightPercent = Math.round((d.sales / maxSale) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-[#8E8E8A] opacity-0 group-hover:opacity-100 transition-opacity">
                        R${d.sales}
                      </span>
                      <div className="w-full bg-[#FAFAF8] rounded-t-xl overflow-hidden h-36 flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-[#C9A227] to-[#D4AF37] rounded-t-xl transition-all duration-700 group-hover:brightness-110"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#5A5A58]">{d.month}</span>
                    </div>
                  );
                })}
              </div>

              {/* Best Selling Products */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Produtos Mais Vendidos na Sua Rede
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFAF8] text-xs">
                    <span className="font-semibold text-[#1A1A1A]">1. Shake Vanilla Bourbon & Amêndoas Douradas</span>
                    <span className="text-[#8E8E8A]">24 unidades vendidas • Margem gerada: R$ 480,00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFAF8] text-xs">
                    <span className="font-semibold text-[#1A1A1A]">2. Shake Cacao Noir & Raw Coconut</span>
                    <span className="text-[#8E8E8A]">18 unidades vendidas • Margem gerada: R$ 360,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo de Comissões e Repasse */}
            <div className="lg:col-span-4 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-[#1A1A1A]">Status de Pagamentos</h3>
              
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/40 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#B8943D]">Aprovada para Saque</span>
                  <div className="text-xl font-bold text-[#1A1A1A]">
                    R$ {currentReseller.approvedCommission.toFixed(2).replace('.', ',')}
                  </div>
                  <span className="text-[11px] text-[#8E8E8A]">Próximo pagamento: 10/09/2026</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Pendente (Período de garantia)</span>
                  <div className="text-lg font-bold text-[#5A5A58]">
                    R$ {currentReseller.pendingCommission.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Total Já Pago</span>
                  <div className="text-lg font-bold text-emerald-700">
                    R$ {currentReseller.paidCommission.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Solicitação de transferência PIX enviada para o financeiro.')}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105"
                >
                  SOLICITAR TRANSFERÊNCIA PIX
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LOJA DO REVENDEDOR NO ATACADO (Section 37) */}
        {activeTab === 'loja' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 shadow-xs animate-fade-in space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">Catálogo Exclusivo para Revendedores</h3>
              <p className="text-xs text-[#8E8E8A] mt-1">
                Compre no atacado com margem de até 45% e descontos progressivos por volume.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.slice(0, 2).map((product) => {
                const batchQty = selectedBatchQty[product.id] || 10;
                // Desconto progressivo: 10 un (0%), 20 un (5%), 50 un (10%), 100 un (15%)
                const discountRate = batchQty >= 100 ? 0.15 : batchQty >= 50 ? 0.10 : batchQty >= 20 ? 0.05 : 0;
                const unitResellerPrice = product.resellerPrice * (1 - discountRate);
                const marginPerUnit = product.price - unitResellerPrice;
                const totalBatchCost = unitResellerPrice * batchQty;
                const totalEstimatedProfit = marginPerUnit * batchQty;

                return (
                  <div
                    key={product.id}
                    className="p-6 rounded-[28px] bg-[#FAFAF8] border border-[#E8E8E4] flex flex-col justify-between space-y-6"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl bg-white border border-[#E8E8E4] p-2 relative flex-shrink-0">
                        <ProductImage src={product.image} alt={product.name} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#B8943D] uppercase">MARGEM ATRATIVA</span>
                        <h4 className="text-sm font-bold text-[#1A1A1A]">{product.name}</h4>
                        <div className="flex items-center gap-3 text-xs pt-1">
                          <span>Consumidor: <strong>R$ {product.price.toFixed(2)}</strong></span>
                          <span className="text-[#C9A227] font-bold">Revenda: R$ {unitResellerPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Volume selection (10, 20, 50, 100 un) */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
                        Selecione o Lote (Volume):
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 50, 100].map((qty) => (
                          <button
                            key={qty}
                            onClick={() =>
                              setSelectedBatchQty((prev) => ({ ...prev, [product.id]: qty }))
                            }
                            className={`py-2 rounded-xl text-xs font-bold transition-all ${
                              batchQty === qty
                                ? 'bg-[#1A1A1A] text-white shadow-xs'
                                : 'bg-white border border-[#E2E2DF] text-[#5A5A58] hover:border-[#D4AF37]'
                            }`}
                          >
                            {qty} un {qty >= 20 && <span className="block text-[9px] text-[#C9A227]">-{qty >= 100 ? 15 : qty >= 50 ? 10 : 5}%</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Resumo da Margem */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E8E8E4] space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8E8E8A]">Custo Total do Lote:</span>
                        <strong className="text-[#1A1A1A]">R$ {totalBatchCost.toFixed(2).replace('.', ',')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8E8E8A]">Lucro Estimado na Revenda:</span>
                        <strong className="text-emerald-700 font-bold">+ R$ {totalEstimatedProfit.toFixed(2).replace('.', ',')}</strong>
                      </div>
                    </div>

                    {/* Botão Adicionar Lote */}
                    <button
                      onClick={() => addToCart(product, batchQty)}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>PEDIR LOTE DE {batchQty} UNIDADES</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: COMISSÕES (Section 39) */}
        {activeTab === 'comissoes' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 shadow-xs animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1A1A1A]">Extrato Completo de Comissões por Vendas</h3>
              <span className="text-xs text-[#8E8E8A]">Taxa padrão de comissão: <strong>20%</strong></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Pedido</th>
                    <th className="py-3 px-2">Data</th>
                    <th className="py-3 px-2">Cliente</th>
                    <th className="py-3 px-2">Valor do Pedido</th>
                    <th className="py-3 px-2">Comissão (20%)</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {commissions.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FAFAF8]">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#1A1A1A]">{c.orderCode}</td>
                      <td className="py-3.5 px-2 text-[#8E8E8A]">{c.date}</td>
                      <td className="py-3.5 px-2 font-medium text-[#1A1A1A]">{c.customerName}</td>
                      <td className="py-3.5 px-2 text-[#5A5A58]">R$ {c.orderValue.toFixed(2).replace('.', ',')}</td>
                      <td className="py-3.5 px-2 font-bold text-[#C9A227]">R$ {c.commissionValue.toFixed(2).replace('.', ',')}</td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            c.status === 'paga'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : c.status === 'aprovada'
                              ? 'bg-[#FFFDF7] text-[#B8943D] border border-[#D4AF37]'
                              : 'bg-amber-50 text-amber-700 border border-amber-300'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CLIENTES INDICADOS (Section 40) */}
        {activeTab === 'clientes' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-10 shadow-xs animate-fade-in space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#1A1A1A]">Clientes da Sua Carteira</h3>
              <p className="text-xs text-[#8E8E8A]">Acompanhe as compras geradas através do seu link exclusivo</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Cliente</th>
                    <th className="py-3 px-2">1ª Compra</th>
                    <th className="py-3 px-2">Última Compra</th>
                    <th className="py-3 px-2">Total Comprado</th>
                    <th className="py-3 px-2">Comissão Gerada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {INITIAL_RESELLER_CLIENTS.map((cli) => (
                    <tr key={cli.id} className="hover:bg-[#FAFAF8]">
                      <td className="py-3.5 px-2">
                        <strong className="text-[#1A1A1A] block">{cli.name}</strong>
                        <span className="text-[11px] text-[#8E8E8A]">{cli.email}</span>
                      </td>
                      <td className="py-3.5 px-2 text-[#8E8E8A]">{cli.firstOrderDate}</td>
                      <td className="py-3.5 px-2 text-[#8E8E8A]">{cli.lastOrderDate}</td>
                      <td className="py-3.5 px-2 font-semibold text-[#1A1A1A]">R$ {cli.totalSpent.toFixed(2).replace('.', ',')}</td>
                      <td className="py-3.5 px-2 font-bold text-[#C9A227]">+ R$ {cli.commissionGenerated.toFixed(2).replace('.', ',')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
