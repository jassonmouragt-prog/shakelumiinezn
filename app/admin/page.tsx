'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductImage from '@/components/ProductImage';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Briefcase,
  Layers,
  BarChart3,
  Plus,
  Trash2,
  Pencil,
  X,
  ImageIcon,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ArrowDownLeft,
  ArrowUpRight as ArrowOut,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OrderStatus, ExpenseCategory, StockMovementType, StockMovementReason, Product, ProductAddon } from '@/types';
import ProductImageUpload from '@/components/ProductImageUpload';

export default function AdminPanelPage() {
  const {
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductShowcase,
    orders,
    updateOrderStatus,
    resellers,
    commissions,
    updateResellerStatus,
    registerReseller,
    expenses,
    addExpense,
    deleteExpense,
    stockMovements,
    addStockMovement
  } = useApp();

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('admin@lumiine.com');
  const [loginPass, setLoginPass] = useState('admin123');

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pedidos' | 'produtos' | 'estoque' | 'financeiro' | 'revendedores'>('dashboard');

  // Search in Orders
  const [orderSearch, setOrderSearch] = useState('');

  // Modal: Novo Produto Simples & Prático
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'shakes' | 'combos' | 'kits'>('shakes');
  const [newProdPrice, setNewProdPrice] = useState('69.90');
  const [newProdResellerPrice, setNewProdResellerPrice] = useState('39.90');
  const [newProdStock, setNewProdStock] = useState('60');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdShowcase, setNewProdShowcase] = useState(true);

  // Modal: Editar Produto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('shakes');
  const [editPrice, setEditPrice] = useState('0.00');
  const [editPromoPrice, setEditPromoPrice] = useState('');
  const [editResellerPrice, setEditResellerPrice] = useState('0.00');
  const [editStock, setEditStock] = useState('0');
  const [editImage, setEditImage] = useState('');
  const [editShowcase, setEditShowcase] = useState(true);
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAddons, setEditAddons] = useState<ProductAddon[]>([]);

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setEditName(prod.name);
    setEditCategory(prod.category);
    setEditPrice(String(prod.price));
    setEditPromoPrice(prod.promoPrice != null ? String(prod.promoPrice) : '');
    setEditResellerPrice(String(prod.resellerPrice));
    setEditStock(String(prod.stock));
    setEditImage(prod.image || '');
    setEditShowcase(prod.showInShowcase !== false);
    setEditSubtitle(prod.subtitle || '');
    setEditDescription(prod.description || '');
    setEditAddons(prod.addons ?? []);
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editName,
      category: editCategory as any,
      price: parseFloat(editPrice) || 0,
      promoPrice: editPromoPrice ? parseFloat(editPromoPrice) : undefined,
      resellerPrice: parseFloat(editResellerPrice) || 0,
      stock: parseInt(editStock, 10) || 0,
      image: editImage,
      showInShowcase: editShowcase,
      subtitle: editSubtitle,
      description: editDescription,
      addons: editAddons
        .map((a) => ({ id: a.id, label: a.label.trim(), price: a.price }))
        .filter((a) => Boolean(a.label) || a.price > 0)
    });
    setEditingProduct(null);
  };

  // Modal: Registrar Despesa
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>('Insumos & Matérias-Primas');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseStatus, setExpenseStatus] = useState<'pago' | 'pendente'>('pago');

  // Modal: Registrar Movimentação de Estoque (Entrada / Saída)
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockMovType, setStockMovType] = useState<StockMovementType>('entrada');
  const [stockMovProductId, setStockMovProductId] = useState(products[0]?.id || '');
  const [stockMovQty, setStockMovQty] = useState('20');
  const [stockMovReason, setStockMovReason] = useState<StockMovementReason>('Lote de Fábrica');
  const [stockMovResponsible, setStockMovResponsible] = useState('Controle de Operações');

  // Modal: Cadastrar Acesso de Revendedor
  const [showAddResellerModal, setShowAddResellerModal] = useState(false);
  const [resellerFormName, setResellerFormName] = useState('');
  const [resellerFormEmail, setResellerFormEmail] = useState('');
  const [resellerFormPhone, setResellerFormPhone] = useState('');
  const [resellerFormCity, setResellerFormCity] = useState('');
  const [resellerFormState, setResellerFormState] = useState('');
  const [resellerFormPass, setResellerFormPass] = useState('');
  const [resellerSubmitting, setResellerSubmitting] = useState(false);
  const [resellerFormError, setResellerFormError] = useState('');

  const handleRegisterReseller = async (e: React.FormEvent) => {
    e.preventDefault();
    setResellerFormError('');
    setResellerSubmitting(true);
    const result = await registerReseller({
      name: resellerFormName,
      email: resellerFormEmail,
      phone: resellerFormPhone,
      city: resellerFormCity,
      state: resellerFormState,
      password: resellerFormPass
    });
    setResellerSubmitting(false);
    if (!result.ok) {
      setResellerFormError(result.error || 'Erro ao cadastrar revendedor.');
      return;
    }
    setShowAddResellerModal(false);
    setResellerFormName('');
    setResellerFormEmail('');
    setResellerFormPhone('');
    setResellerFormCity('');
    setResellerFormState('');
    setResellerFormPass('');
  };

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(loginEmail, loginPass);
  };

  // Handle Product Creation
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName,
      subtitle: 'Nutrição de precisão com ingredientes selecionados.',
      description: 'Blend limpo de alto padrão com proteínas vegetais puras e micronutrientes biodisponíveis.',
      price: parseFloat(newProdPrice) || 69.90,
      resellerPrice: parseFloat(newProdResellerPrice) || 39.90,
      category: newProdCategory,
      badge: 'NOVO',
      image: newProdImage,
      gallery: [newProdImage],
      rating: 5.0,
      reviewsCount: 1,
      weight: '600g',
      servings: 20,
      flavors: ['Original Premium'],
      ingredients: ['Proteína Isolada Pura', 'Extratos Botânicos Naturais'],
      nutritionalInfo: {
        calories: '135 kcal',
        protein: '22g',
        carbs: '3.9g',
        fat: '2.6g',
        fiber: '5.4g',
        sodium: '65mg'
      },
      benefits: ['Rápida digestão e saciedade prolongada'],
      stock: parseInt(newProdStock, 10) || 50,
      showInShowcase: newProdShowcase
    });

    setShowAddProductModal(false);
    setNewProdName('');
  };

  // Handle Expense Creation
  const handleCreateExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseDesc.trim() || !expenseAmount) return;

    addExpense({
      description: expenseDesc,
      category: expenseCategory,
      amount: parseFloat(expenseAmount) || 0,
      date: new Date().toLocaleDateString('pt-BR'),
      status: expenseStatus
    });

    setShowAddExpenseModal(false);
    setExpenseDesc('');
    setExpenseAmount('');
  };

  // Handle Stock Movement Creation
  const handleCreateStockMovementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProd = products.find((p) => p.id === stockMovProductId) || products[0];
    const qty = parseInt(stockMovQty, 10) || 1;

    addStockMovement({
      productId: targetProd.id,
      productName: targetProd.name,
      type: stockMovType,
      quantity: qty,
      reason: stockMovReason,
      responsible: stockMovResponsible
    });

    setShowStockModal(false);
  };

  // Financial calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const totalCommissions = commissions.reduce((acc, c) => acc + c.commissionValue, 0);
  const netProfit = totalRevenue - totalExpenses - totalCommissions;
  const netMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0.0';

  // Filtered orders
  const filteredOrders = orders.filter((o) =>
    o.code.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // 1. TELA DE LOGIN (PROTEÇÃO POR SENHA)
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F4F1] pt-8 flex flex-col justify-between">
        <div className="max-w-md mx-auto px-4 w-full pb-20">
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 sm:p-10 shadow-sm space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#FAFAF8] mx-auto text-[#C9A227] shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#D4AF37]/30 text-[9.5px] font-bold tracking-widest text-[#B8943D] uppercase">
                ACESSO ADMINISTRATIVO RESTRITO
              </div>
              <h1 className="text-2xl font-sans font-bold text-[#1A1A1A]">
                Gestão Executiva
              </h1>
              <p className="text-xs text-[#8E8E8A]">
                Área protegida para controle financeiro, estoque, catálogo e pedidos.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Email do Administrador</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A5A58] mb-1">Senha de Segurança</label>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Credenciais reais do administrador */}
              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#D4AF37]/35 text-[11px] text-[#B8943D]">
                <strong>Credenciais de Acesso do Administrador:</strong>
                <div className="mt-0.5 font-mono text-[10px]">
                  admin@lumiine.com / admin123
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold tracking-wider hover:brightness-105 shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>ENTRAR NO PAINEL ADMINISTRATIVO</span>
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-[#8E8E8A]">
              <Link href="/" className="hover:text-[#C9A227] transition-colors">
                ← Retornar à Loja Pública
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. PAINEL ADMINISTRATIVO AUTENTICADO
  return (
    <div className="min-h-screen bg-[#F5F4F1] pt-8 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* TOP BAR EXECUTIVA */}
        <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] font-bold text-[#8E8E8A] uppercase">
                PAINEL DE CONTROLE EXECUTIVO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-[#1A1A1A] mt-1">
              Gestão Global LUMIINE
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-[#D9D9D9] text-xs font-semibold text-[#5A5A58]">
              Administrador: {loginEmail}
            </span>
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* ADMIN NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-[#E8E8E4] mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Faturamento & Visão Geral', icon: BarChart3 },
            { id: 'pedidos', label: 'Gestão de Pedidos', icon: Package },
            { id: 'produtos', label: 'Produtos & Amostras Vitrine', icon: Layers },
            { id: 'estoque', label: 'Entrada & Saída de Estoque', icon: TrendingUp },
            { id: 'financeiro', label: 'Despesas & Margens', icon: DollarSign },
            { id: 'revendedores', label: 'Revendedores & Comissões', icon: Briefcase }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-white text-[#5A5A58] border border-[#E2E2DF] hover:border-[#D4AF37]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD & FATURAMENTO */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* 4 Cards Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white rounded-3xl p-6 border border-[#E8E8E4] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Faturamento Total</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
                  R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {orders.length} pedidos registrados
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E8E8E4] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Despesas Lançadas</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-red-500">
                  - R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-[#8E8E8A]">{expenses.length} lançamentos cadastrados</span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E8E8E4] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Comissões de Revenda</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A227]">
                  - R$ {totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-[#8E8E8A]">{commissions.length} comissões lançadas</span>
              </div>

              <div className="bg-gradient-to-b from-[#FFFDF7] to-white rounded-3xl p-6 border-2 border-[#D4AF37] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#B8943D]">Lucro Líquido Real</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700">
                  R$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-emerald-700 font-bold">Margem Líquida: {netMargin}%</span>
              </div>

            </div>

            {/* Faturamento detalhado & Pedidos Recentes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Fluxo de Pedidos em Tempo Real</h3>
                    <p className="text-xs text-[#8E8E8A]">Histórico de transações diretas da loja e indicações de revenda</p>
                  </div>
                  <button onClick={() => setActiveTab('pedidos')} className="text-xs font-bold text-[#C9A227] hover:underline">
                    Ver todos ({orders.length}) →
                  </button>
                </div>

                <div className="divide-y divide-[#F0F0EC]">
                  {orders.slice(0, 4).map((o) => (
                    <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1A1A1A] mr-2">{o.code}</span>
                        <span className="text-[#5A5A58]">{o.customerName}</span>
                        <span className="text-[10px] text-[#8E8E8A] ml-2">• {o.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FAFAF8] border border-[#D9D9D9]">
                          {o.status}
                        </span>
                        <strong className="text-[#1A1A1A]">R$ {o.total.toFixed(2).replace('.', ',')}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atividade de Estoque Recente */}
              <div className="lg:col-span-4 bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">Últimas Movimentações</h3>
                  <button onClick={() => setActiveTab('estoque')} className="text-xs font-bold text-[#C9A227] hover:underline">
                    Ver estoque →
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  {stockMovements.slice(0, 3).map((mov) => (
                    <div key={mov.id} className="p-3 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md uppercase ${
                          mov.type === 'entrada' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {mov.type === 'entrada' ? '+ ENTRADA' : '- SAÍDA'}
                        </span>
                        <span className="text-[10px] text-[#8E8E8A]">{mov.date}</span>
                      </div>
                      <strong className="text-[#1A1A1A] block truncate">{mov.productName}</strong>
                      <span className="text-[11px] text-[#5A5A58]">{mov.quantity} un • {mov.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GESTÃO DE PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A]">Gerenciamento e Rastreio de Pedidos</h3>
                <p className="text-xs text-[#8E8E8A]">Acompanhe o status e atualize o estágio dos pedidos dos clientes</p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8A]" />
                <input
                  type="text"
                  placeholder="Buscar por cliente ou código..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Código</th>
                    <th className="py-3 px-2">Cliente / Contato</th>
                    <th className="py-3 px-2">Itens</th>
                    <th className="py-3 px-2">Valor</th>
                    <th className="py-3 px-2">Status do Pedido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAFAF8]">
                      <td className="py-3.5 px-2 font-mono font-bold text-[#1A1A1A]">{order.code}</td>
                      <td className="py-3.5 px-2">
                        <strong className="text-[#1A1A1A] block">{order.customerName}</strong>
                        <span className="text-[11px] text-[#8E8E8A]">{order.customerEmail}</span>
                      </td>
                      <td className="py-3.5 px-2 text-[#5A5A58]">
                        {order.items.map((it) => `${it.quantity}x ${it.product.name.split(' ')[1] || 'Shake'}`).join(', ')}
                      </td>
                      <td className="py-3.5 px-2 font-bold text-[#1A1A1A]">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                      <td className="py-3.5 px-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="px-3 py-1 rounded-xl bg-white border border-[#D9D9D9] text-xs font-bold focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="pago">Pago</option>
                          <option value="preparando">Preparando</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregue">Entregue</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUTOS & CONTROLE DE AMOSTRAS NA VITRINE */}
        {activeTab === 'produtos' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A]">Catálogo & Controle de Amostras</h3>
                <p className="text-xs text-[#8E8E8A]">
                  Gerencie preços, estoque e defina com 1 clique quais produtos aparecem como amostra/destaque na vitrine pública.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold hover:brightness-105 transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>CADASTRAR NOVO PRODUTO</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Produto</th>
                    <th className="py-3 px-2">Categoria</th>
                    <th className="py-3 px-2">Preço Final</th>
                    <th className="py-3 px-2">Preço Revenda</th>
                    <th className="py-3 px-2">Estoque</th>
                    <th className="py-3 px-2 text-center">Amostra na Vitrine</th>
                    <th className="py-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {products.map((prod) => {
                    const isShown = prod.showInShowcase !== false;
                    return (
                      <tr key={prod.id} className="hover:bg-[#FAFAF8]">
                        <td className="py-3.5 px-2 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] relative overflow-hidden flex-shrink-0">
                            <ProductImage src={prod.image} alt={prod.name} />
                          </div>
                          <div>
                            <strong className="text-[#1A1A1A] block">{prod.name}</strong>
                            <span className="text-[10px] text-[#8E8E8A]">{prod.weight}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 uppercase font-semibold text-[#8E8E8A]">{prod.category}</td>
                        <td className="py-3.5 px-2 font-bold text-[#1A1A1A]">R$ {prod.price.toFixed(2)}</td>
                        <td className="py-3.5 px-2 font-bold text-[#C9A227]">R$ {prod.resellerPrice.toFixed(2)}</td>
                        <td className="py-3.5 px-2 font-medium text-[#1A1A1A]">{prod.stock} un</td>
                        
                        {/* TOGGLE CONTROLE DE AMOSTRA NA VITRINE */}
                        <td className="py-3.5 px-2 text-center">
                          <button
                            onClick={() => toggleProductShowcase(prod.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                              isShown
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs'
                                : 'bg-[#FAFAF8] text-[#8E8E8A] border border-[#D9D9D9]'
                            }`}
                          >
                            {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{isShown ? 'Visível na Vitrine' : 'Oculto'}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={() => openEditProduct(prod)}
                            className="p-1.5 text-[#8E8E8A] hover:text-[#C9A227] transition-colors"
                            title="Editar produto"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-[#8E8E8A] hover:text-red-500 transition-colors"
                            title="Remover produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ENTRADA E SAÍDA DE ESTOQUE */}
        {activeTab === 'estoque' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A]">Registro de Entrada e Saída de Estoque</h3>
                <p className="text-xs text-[#8E8E8A]">
                  Lance recebimento de lotes de fábrica, retiradas de amostras para profissionais e ajustes de inventário.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setStockMovType('entrada');
                    setStockMovReason('Lote de Fábrica');
                    setShowStockModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>REGISTRAR ENTRADA (+)</span>
                </button>
                <button
                  onClick={() => {
                    setStockMovType('saida');
                    setStockMovReason('Amostra Cortesia (Médicos/Nutris)');
                    setShowStockModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAFAF8] border border-[#D9D9D9] text-[#1A1A1A] text-xs font-bold hover:bg-[#F5F5F3] transition-all"
                >
                  <ArrowOut className="w-4 h-4 text-amber-700" />
                  <span>REGISTRAR SAÍDA (-)</span>
                </button>
              </div>
            </div>

            {/* Saldo de Estoque Atual por Produto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4]">
              {products.map((p) => (
                <div key={p.id} className="p-3 bg-white rounded-xl border border-[#E2E2DF] space-y-1">
                  <span className="text-[10px] text-[#8E8E8A] uppercase font-semibold block truncate">{p.name}</span>
                  <div className="text-lg font-bold text-[#1A1A1A]">
                    {p.stock} <span className="text-xs font-normal text-[#8E8E8A]">unidades</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela de Histórico de Movimentações */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                Histórico Auditável de Movimentações
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-2">Data / Hora</th>
                      <th className="py-3 px-2">Produto</th>
                      <th className="py-3 px-2">Tipo</th>
                      <th className="py-3 px-2">Quantidade</th>
                      <th className="py-3 px-2">Motivo</th>
                      <th className="py-3 px-2">Responsável</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0EC]">
                    {stockMovements.map((mov) => (
                      <tr key={mov.id} className="hover:bg-[#FAFAF8]">
                        <td className="py-3 px-2 text-[#8E8E8A]">{mov.date}</td>
                        <td className="py-3 px-2 font-semibold text-[#1A1A1A]">{mov.productName}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              mov.type === 'entrada'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                : 'bg-amber-50 text-amber-700 border border-amber-300'
                            }`}
                          >
                            {mov.type === 'entrada' ? '+ Entrada' : '- Saída'}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-bold text-[#1A1A1A]">{mov.quantity} un</td>
                        <td className="py-3 px-2 text-[#5A5A58]">{mov.reason}</td>
                        <td className="py-3 px-2 text-[#8E8E8A]">{mov.responsible}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DESPESAS & DEMONSTRATIVO FINANCEIRO */}
        {activeTab === 'financeiro' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A]">Registro de Despesas & Demonstrativo</h3>
                <p className="text-xs text-[#8E8E8A]">
                  Lance custos operacionais e acompanhe o demonstrativo de resultado em tempo real.
                </p>
              </div>

              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-[#2A2A2A] transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>LANÇAR NOVA DESPESA</span>
              </button>
            </div>

            {/* Cards de Resumo Financeiro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Faturamento Bruto</span>
                <div className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Despesas Operacionais</span>
                <div className="text-2xl font-serif font-bold text-red-500">
                  - R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#E8E8E4] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8E8E8A]">Comissões Parceiros</span>
                <div className="text-2xl font-serif font-bold text-[#C9A227]">
                  - R$ {totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF7] to-white border-2 border-[#D4AF37] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#B8943D]">Lucro Líquido Real</span>
                <div className="text-2xl font-serif font-bold text-emerald-700">
                  R$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Tabela de Despesas Lançadas */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                Extrato de Despesas Lançadas
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-2">Data</th>
                      <th className="py-3 px-2">Descrição</th>
                      <th className="py-3 px-2">Categoria</th>
                      <th className="py-3 px-2">Valor</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0EC]">
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-[#FAFAF8]">
                        <td className="py-3 px-2 text-[#8E8E8A]">{exp.date}</td>
                        <td className="py-3 px-2 font-medium text-[#1A1A1A]">{exp.description}</td>
                        <td className="py-3 px-2 text-[#5A5A58]">{exp.category}</td>
                        <td className="py-3 px-2 font-bold text-red-600">- R$ {exp.amount.toFixed(2).replace('.', ',')}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              exp.status === 'pago'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                : 'bg-amber-50 text-amber-700 border border-amber-300'
                            }`}
                          >
                            {exp.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => deleteExpense(exp.id)}
                            className="p-1 text-[#8E8E8A] hover:text-red-500"
                            title="Excluir lançamento"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: REVENDEDORES & COMISSÕES */}
        {activeTab === 'revendedores' && (
          <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A]">Parceiros Revendedores e Comissões</h3>
                <p className="text-xs text-[#8E8E8A]">Cadastre acessos, aprove novas candidaturas de revendedores e audite volumes de repasse.</p>
              </div>
              <button
                onClick={() => setShowAddResellerModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold hover:brightness-105 shadow-[0_4px_20px_rgba(201,162,39,0.25)] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Revendedor</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E4] text-[#8E8E8A] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Revendedor</th>
                    <th className="py-3 px-2">Cidade/UF</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Total Vendido</th>
                    <th className="py-3 px-2">Comissões</th>
                    <th className="py-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {resellers.map((res) => (
                    <tr key={res.id} className="hover:bg-[#FAFAF8]">
                      <td className="py-3.5 px-2">
                        <strong className="text-[#1A1A1A] block">{res.name}</strong>
                        <span className="text-[11px] text-[#8E8E8A]">{res.email}</span>
                      </td>
                      <td className="py-3.5 px-2 text-[#5A5A58]">{res.city}/{res.state}</td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            res.status === 'aprovado'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : res.status === 'pendente'
                              ? 'bg-amber-50 text-amber-700 border border-amber-300'
                              : 'bg-red-50 text-red-700 border border-red-300'
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 font-bold text-[#1A1A1A]">R$ {res.totalSales.toFixed(2)}</td>
                      <td className="py-3.5 px-2 font-bold text-[#C9A227]">R$ {res.totalCommission.toFixed(2)}</td>
                      <td className="py-3.5 px-2 text-right space-x-1.5">
                        <button
                          onClick={() => updateResellerStatus(res.id, 'aprovado')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => updateResellerStatus(res.id, 'bloqueado')}
                          className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold hover:bg-red-700"
                        >
                          Bloquear
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: CADASTRO DE REVENDEDOR (ACESSO EXCLUSIVO) */}
        {showAddResellerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale">
              <div className="border-b border-[#F0F0EC] pb-3">
                <h3 className="text-base font-bold text-[#1A1A1A]">Cadastrar Revendedor</h3>
                <p className="text-xs text-[#8E8E8A]">Cria o registro do parceiro e a conta de acesso exclusiva da Área do Revendedor.</p>
              </div>

              <form onSubmit={handleRegisterReseller} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mariana Duarte"
                    value={resellerFormName}
                    onChange={(e) => setResellerFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Email (Login) *</label>
                  <input
                    type="email"
                    required
                    placeholder="revendedor@email.com"
                    value={resellerFormEmail}
                    onChange={(e) => setResellerFormEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Senha de Acesso *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    value={resellerFormPass}
                    onChange={(e) => setResellerFormPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">WhatsApp</label>
                    <input
                      type="text"
                      placeholder="(11) 99999-9999"
                      value={resellerFormPhone}
                      onChange={(e) => setResellerFormPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Cidade</label>
                    <input
                      type="text"
                      placeholder="São Paulo"
                      value={resellerFormCity}
                      onChange={(e) => setResellerFormCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">UF</label>
                  <input
                    type="text"
                    placeholder="SP"
                    maxLength={2}
                    value={resellerFormState}
                    onChange={(e) => setResellerFormState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                  />
                </div>

                {resellerFormError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-600">
                    {resellerFormError}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddResellerModal(false)}
                    className="flex-1 py-2.5 rounded-full border border-[#E2E2DF] text-[#5A5A58] text-xs font-bold hover:bg-[#FAFAF8] transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={resellerSubmitting}
                    className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-white text-xs font-bold hover:brightness-105 shadow-[0_4px_20px_rgba(201,162,39,0.25)] transition-all disabled:opacity-50"
                  >
                    {resellerSubmitting ? 'Cadastrando...' : 'Cadastrar Acesso'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 1: CADASTRO DE PRODUTO SIMPLES E PRÁTICO */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale">
              <div className="border-b border-[#F0F0EC] pb-3">
                <h3 className="text-base font-bold text-[#1A1A1A]">Cadastrar Produto de Forma Prática</h3>
                <p className="text-xs text-[#8E8E8A]">Adicione um shake, combo ou kit ao catálogo em segundos.</p>
              </div>

              <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Nome do Shake / Produto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Shake Matcha & Vanilla Bourbon"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Preço Final (R$)</label>
                    <input
                      type="text"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Preço Revendedor (R$)</label>
                    <input
                      type="text"
                      required
                      value={newProdResellerPrice}
                      onChange={(e) => setNewProdResellerPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Categoria</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    >
                      <option value="shakes">Shakes</option>
                      <option value="combos">Combos</option>
                      <option value="kits">Kits</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Estoque Inicial</label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Upload da Foto do Produto */}
                <ProductImageUpload
                  label="Foto do Produto"
                  value={newProdImage}
                  onChange={setNewProdImage}
                />

                {/* Toggle: Disponível na Vitrine / Amostra */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF]">
                    <input
                      type="checkbox"
                      checked={newProdShowcase}
                      onChange={(e) => setNewProdShowcase(e.target.checked)}
                      className="rounded text-[#C9A227] focus:ring-0 w-4 h-4"
                    />
                    <span className="font-semibold text-[#1A1A1A]">
                      Exibir como amostra/destaque na vitrine pública do site
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F0F0EC]">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-5 py-2.5 rounded-full border border-[#D9D9D9] text-[#5A5A58] font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-bold hover:brightness-105"
                  >
                    Salvar Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL EDITAR PRODUTO */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scale max-h-[90vh] overflow-y-auto">
              <div className="border-b border-[#F0F0EC] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A]">Editar Produto</h3>
                  <p className="text-xs text-[#8E8E8A]">Atualize preço, foto, categoria e outras informações.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 text-[#8E8E8A] hover:text-[#1A1A1A] transition-colors"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E4]">
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E2E2DF] relative overflow-hidden flex-shrink-0">
                    {editImage ? (
                      <Image src={editImage} alt={editName} fill unoptimized className="object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#C9A227]">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-[#5A5A58] space-y-0.5">
                    <strong className="text-[#1A1A1A] block">{editName || 'Nome do produto'}</strong>
                    <span>Categoria: {editCategory}</span>
                    <span className="block">ID: {editingProduct.id}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Categoria</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="shakes">Shakes</option>
                    <option value="combos">Combos</option>
                    <option value="kits">Kits</option>
                    <option value="salgados">Salgados</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="novidades">Novidades</option>
                    <option value="mais-vendidos">Mais Vendidos</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Preço Final (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Preço Promocional (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Opcional"
                      value={editPromoPrice}
                      onChange={(e) => setEditPromoPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Preço Revendedor (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editResellerPrice}
                      onChange={(e) => setEditResellerPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Estoque</label>
                    <input
                      type="number"
                      required
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <ProductImageUpload
                  label="Foto do Produto"
                  value={editImage}
                  onChange={setEditImage}
                />

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="block font-semibold text-[#5A5A58] mb-1">Adicionais do Produto (Opcional)</label>
                  <p className="text-[11px] text-[#8E8E8A] -mt-1">
                    Cadastre itens opcionais que acompanham este produto. Eles aparecem como opções na página pública do produto para o cliente escolher.
                  </p>
                  {editAddons.map((addon, i) => (
                    <div key={addon.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nome (ex: Shot de Colágeno)"
                        value={addon.label}
                        onChange={(e) => setEditAddons((prev) => prev.map((a, idx) => (idx === i ? { ...a, label: e.target.value } : a)))}
                        className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="R$"
                        value={addon.price}
                        onChange={(e) => setEditAddons((prev) => prev.map((a, idx) => (idx === i ? { ...a, price: parseFloat(e.target.value) || 0 } : a)))}
                        className="w-24 px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={() => setEditAddons((prev) => prev.filter((_, idx) => idx !== i))}
                        className="p-2 text-[#8E8E8A] hover:text-red-500 transition-colors"
                        title="Remover adicional"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditAddons((prev) => [...prev, { id: `add-${Date.now()}`, label: '', price: 0 }])}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#D4AF37] text-[#B8943D] text-[11px] font-semibold hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Adicionar adicional
                  </button>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF]">
                    <input
                      type="checkbox"
                      checked={editShowcase}
                      onChange={(e) => setEditShowcase(e.target.checked)}
                      className="rounded text-[#C9A227] focus:ring-0 w-4 h-4"
                    />
                    <span className="font-semibold text-[#1A1A1A]">
                      Exibir como amostra/destaque na vitrine pública do site
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F0F0EC]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-full border border-[#D9D9D9] text-[#5A5A58] font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-white font-bold hover:brightness-105"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: REGISTRAR DESPESA */}
        {showAddExpenseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale">
              <div className="border-b border-[#F0F0EC] pb-3">
                <h3 className="text-base font-bold text-[#1A1A1A]">Lançar Nova Despesa Operacional</h3>
                <p className="text-xs text-[#8E8E8A]">Registre custos para manter a conciliação do lucro líquido.</p>
              </div>

              <form onSubmit={handleCreateExpenseSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Descrição do Custo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Embalagens Premium para Shakes"
                    value={expenseDesc}
                    onChange={(e) => setExpenseDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Categoria de Despesa</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                  >
                    <option value="Insumos & Matérias-Primas">Insumos & Matérias-Primas</option>
                    <option value="Embalagens & Frascos">Embalagens & Frascos</option>
                    <option value="Marketing & Campanhas">Marketing & Campanhas</option>
                    <option value="Logística & Frete">Logística & Frete</option>
                    <option value="Impostos & Taxas">Impostos & Taxas</option>
                    <option value="Operacional">Operacional</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Valor (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Status de Pagamento</label>
                    <select
                      value={expenseStatus}
                      onChange={(e) => setExpenseStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    >
                      <option value="pago">Pago</option>
                      <option value="pendente">Pendente</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F0F0EC]">
                  <button
                    type="button"
                    onClick={() => setShowAddExpenseModal(false)}
                    className="px-5 py-2.5 rounded-full border border-[#D9D9D9] text-[#5A5A58] font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white font-bold hover:bg-[#2A2A2A]"
                  >
                    Lançar Despesa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: REGISTRAR ENTRADA OU SAÍDA DE ESTOQUE */}
        {showStockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-[32px] border border-[#E8E8E4] p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale">
              <div className="border-b border-[#F0F0EC] pb-3">
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {stockMovType === 'entrada' ? 'Registrar Entrada de Estoque' : 'Registrar Saída de Estoque'}
                </h3>
                <p className="text-xs text-[#8E8E8A]">
                  {stockMovType === 'entrada'
                    ? 'Adicione unidades ao estoque ao receber lotes de produção.'
                    : 'Registre saídas para amostras cortesia, avarias ou testes.'}
                </p>
              </div>

              <form onSubmit={handleCreateStockMovementSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Produto</label>
                  <select
                    value={stockMovProductId}
                    onChange={(e) => setStockMovProductId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (Atual: {p.stock} un)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Quantidade</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={stockMovQty}
                      onChange={(e) => setStockMovQty(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#5A5A58] mb-1">Motivo</label>
                    <select
                      value={stockMovReason}
                      onChange={(e) => setStockMovReason(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                    >
                      {stockMovType === 'entrada' ? (
                        <>
                          <option value="Lote de Fábrica">Lote de Fábrica</option>
                          <option value="Ajuste de Balanço">Ajuste de Balanço</option>
                        </>
                      ) : (
                        <>
                          <option value="Amostra Cortesia (Médicos/Nutris)">Amostra Cortesia (Médicos/Nutris)</option>
                          <option value="Avaria / Teste de Qualidade">Avaria / Teste de Qualidade</option>
                          <option value="Ajuste de Balanço">Ajuste de Balanço</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#5A5A58] mb-1">Responsável pelo Lançamento</label>
                  <input
                    type="text"
                    required
                    value={stockMovResponsible}
                    onChange={(e) => setStockMovResponsible(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E2E2DF] text-xs text-[#1A1A1A]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#F0F0EC]">
                  <button
                    type="button"
                    onClick={() => setShowStockModal(false)}
                    className="px-5 py-2.5 rounded-full border border-[#D9D9D9] text-[#5A5A58] font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-full text-white font-bold ${
                      stockMovType === 'entrada' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-[#1A1A1A] hover:bg-[#2A2A2A]'
                    }`}
                  >
                    Confirmar Movimentação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
