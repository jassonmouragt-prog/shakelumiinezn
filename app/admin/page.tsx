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
  Layers,
  BarChart3,
  Plus,
  Trash2,
  Pencil,
  X,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ArrowUpRight as ArrowOut,
  AlertCircle,
  Menu,
  ChevronRight,
  ExternalLink,
  Store,
  RefreshCw,
  Box,
  Wallet,
  Check
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  OrderStatus,
  ExpenseCategory,
  StockMovementType,
  StockMovementReason,
  Product,
  ProductAddon
} from '@/types';
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
    expenses,
    addExpense,
    deleteExpense,
    stockMovements,
    addStockMovement
  } = useApp();

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('admin@lumiine.com');
  const [loginPass, setLoginPass] = useState('admin123');

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'pedidos' | 'produtos' | 'estoque' | 'financeiro'
  >('dashboard');

  // Search & Filters in Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Products Category Filter
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Modal: Novo Produto
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'shakes' | 'combos' | 'kits'>('shakes');
  const [newProdPrice, setNewProdPrice] = useState('69.90');
const [newProdStock, setNewProdStock] = useState('60');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdShowcase, setNewProdShowcase] = useState(true);

  // Modal: Editar Produto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('shakes');
  const [editPrice, setEditPrice] = useState('0.00');
  const [editPromoPrice, setEditPromoPrice] = useState('');
  const [editStock, setEditStock] = useState('0');
  const [editImage, setEditImage] = useState('');
  const [editShowcase, setEditShowcase] = useState(true);
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAddons, setEditAddons] = useState<ProductAddon[]>([]);

  // Modal: Registrar Despesa
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>('Insumos & Matérias-Primas');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseStatus, setExpenseStatus] = useState<'pago' | 'pendente'>('pago');

  // Modal: Registrar Movimentação de Estoque
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockMovType, setStockMovType] = useState<StockMovementType>('entrada');
  const [stockMovProductId, setStockMovProductId] = useState(products[0]?.id || '');
  const [stockMovQty, setStockMovQty] = useState('20');
  const [stockMovReason, setStockMovReason] = useState<StockMovementReason>('Lote de Fábrica');
  const [stockMovResponsible, setStockMovResponsible] = useState('Controle de Operações');

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setEditName(prod.name);
    setEditCategory(prod.category);
    setEditPrice(String(prod.price));
    setEditPromoPrice(prod.promoPrice != null ? String(prod.promoPrice) : '');
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(loginEmail, loginPass);
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName,
      subtitle: 'Nutrição de precisão com ingredientes selecionados.',
      description: 'Blend limpo de alto padrão com proteínas vegetais puras e micronutrientes biodisponíveis.',
      price: parseFloat(newProdPrice) || 69.90,
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
    setNewProdImage('');
  };

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
  const confirmedOrders = orders.filter((o) => o.status === 'confirmado');
  const totalRevenue = confirmedOrders.reduce((acc, o) => acc + o.total, 0);
  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const netMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0.0';

  // Low stock products count
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.code.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter === 'all') return true;
    return p.category === productCategoryFilter;
  });

  // Nav items configuration
  interface NavItem {
    id: 'dashboard' | 'pedidos' | 'produtos' | 'estoque' | 'financeiro';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string | null;
    badgeColor?: string;
  }

  interface NavGroup {
    group: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      group: 'VISÃO GERAL',
      items: [
        { id: 'dashboard', label: 'Dashboard Executivo', icon: BarChart3, badge: null }
      ]
    },
    {
      group: 'OPERAÇÕES',
      items: [
        {
          id: 'pedidos',
          label: 'Gestão de Pedidos',
          icon: Package,
          badge: orders.filter((o) => o.status === 'pendente').length || null
        },
        {
          id: 'produtos',
          label: 'Catálogo de Produtos',
          icon: Layers,
          badge: products.length
        },
        {
          id: 'estoque',
          label: 'Controle de Estoque',
          icon: TrendingUp,
          badge: lowStockCount > 0 ? `${lowStockCount} baixo` : null,
          badgeColor: lowStockCount > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : undefined
        }
      ]
    },
    {
      group: 'FINANÇAS',
      items: [
        {
          id: 'financeiro',
          label: 'Despesas & Margens',
          icon: DollarSign,
          badge: null
        }
      ]
    }
  ];

  // 1. TELA DE LOGIN EXECUTIVO (REFINADA & PROTEGIDA)
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08080A] flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-[#D4AF37]/15 via-[#C9A227]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative z-10 animate-fade-in">
          <div className="bg-[#121215]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-8">
            
            {/* Header / Logo */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A227] via-[#D4AF37] to-[#8E6D1D] p-[1px] mx-auto shadow-[0_0_30px_rgba(201,162,39,0.3)]">
                <div className="w-full h-full bg-[#0E0E11] rounded-[15px] flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="SHAKELUMIINEZN"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-9 w-auto object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[9px] font-bold tracking-[0.2em] text-[#E8C868] uppercase mb-2">
                  <Lock className="w-3 h-3" />
                  ACESSO EXECUTIVO RESTRITO
                </div>
                <h1 className="text-2xl font-sans font-bold text-white tracking-tight">
                  Painel de Gestão Global
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Ambiente administrativo para controle financeiro, pedidos, catálogo e parceiros.
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-zinc-300 uppercase mb-1.5">
                  Email de Administrador
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  placeholder="admin@lumiine.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-zinc-300 uppercase mb-1.5">
                  Senha Mestra
                </label>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#18181C]/80 border border-[#D4AF37]/20 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-zinc-300 leading-relaxed">
                  <span className="text-[#E8C868] font-bold">Credenciais padrão:</span>{' '}
                  <span className="font-mono text-white">admin@lumiine.com</span> /{' '}
                  <span className="font-mono text-white">admin123</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#B8943D] text-black text-xs font-bold tracking-wider hover:brightness-110 active:scale-[0.99] shadow-[0_4px_25px_rgba(201,162,39,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>AUTENTICAR E ACESSAR PAINEL</span>
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-zinc-500">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1">
                ← Retornar à loja pública
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. PAINEL ADMINISTRATIVO AUTENTICADO (LAYOUT EXECUTIVO DE ALTO PADRÃO)
  return (
    <div className="min-h-screen bg-[#09090B] flex text-zinc-200">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0E0E12] border-r border-white/[0.08] fixed inset-y-0 left-0 z-30">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#99781B] p-[1px] flex-shrink-0 shadow-[0_0_20px_rgba(201,162,39,0.25)]">
            <div className="w-full h-full bg-[#0A0A0C] rounded-[11px] flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="SHAKELUMIINEZN"
                width={32}
                height={32}
                unoptimized
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>
          <div className="min-w-0">
            <span className="block text-sm font-bold text-white tracking-wide truncate">
              SHAKE LUMIINE
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#D4AF37]">
                PAINEL EXECUTIVO
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Grouped Items */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-none">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <span className="px-3 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                {group.group}
              </span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border-l-2 border-[#D4AF37] text-white shadow-inner'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-[#E8C868]' : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.badgeColor || (isActive ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-zinc-300')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom User Pill */}
        <div className="p-4 border-t border-white/[0.08] space-y-3 bg-[#0A0A0D]">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs text-zinc-300 hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ver Loja Pública</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="min-w-0 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#18181C] border border-[#D4AF37]/40 flex items-center justify-center text-[11px] font-bold text-[#D4AF37]">
                AD
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  Admin Master
                </span>
                <span className="block text-[10px] text-zinc-500 truncate">
                  {loginEmail}
                </span>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              title="Encerrar Sessão"
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0E0E12] border-r border-white/10 p-6 z-10">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-sm font-bold text-white">PAINEL LUMIINE</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-6 overflow-y-auto">
              {navGroups.map((group) => (
                <div key={group.group} className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                    {group.group}
                  </span>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                            isActive ? 'bg-[#D4AF37]/20 text-white' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-zinc-500'}`} />
                            <span>{item.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <button
              onClick={() => {
                setSidebarOpen(false);
                logoutAdmin();
              }}
              className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair do Painel</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* TOPBAR */}
        <header className="sticky top-0 z-20 bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] text-zinc-300 border border-white/[0.08]"
              aria-label="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span>LUMIINE OS</span>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
                <span className="text-[#D4AF37]">
                  {activeTab.toUpperCase()}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activeTab === 'dashboard' && 'Visão Geral & Métricas Executivas'}
                {activeTab === 'pedidos' && 'Gestão de Pedidos'}
                {activeTab === 'produtos' && 'Catálogo & Amostras da Vitrine'}
                {activeTab === 'estoque' && 'Movimentações & Auditoria de Estoque'}
                {activeTab === 'financeiro' && 'Demonstrativo Financeiro & Margens'}
              </h2>
            </div>
          </div>

          {/* Quick Actions in Topbar */}
          <div className="flex items-center gap-2.5">
            {activeTab === 'produtos' && (
              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-black text-xs font-bold hover:brightness-110 shadow-[0_2px_15px_rgba(201,162,39,0.3)] transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Novo Produto</span>
              </button>
            )}
            {activeTab === 'financeiro' && (
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-black text-xs font-bold hover:brightness-110 shadow-[0_2px_15px_rgba(201,162,39,0.3)] transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lançar Despesa</span>
              </button>
            )}
          </div>
        </header>

        {/* TAB CONTENT BODY */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* TAB 1: DASHBOARD EXECUTIVO */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* 4 Cards de Métricas de Alto Padrão */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* 1. Faturamento Total */}
                <div className="relative overflow-hidden rounded-2xl bg-[#121216] border border-white/[0.08] p-6 space-y-3 hover:border-[#D4AF37]/40 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                      Faturamento Bruto
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{confirmedOrders.length} pedidos faturados</span>
                  </div>
                </div>

                {/* 2. Despesas */}
                <div className="relative overflow-hidden rounded-2xl bg-[#121216] border border-white/[0.08] p-6 space-y-3 hover:border-red-500/40 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                      Despesas Operacionais
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-400 tracking-tight">
                    - R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-medium">
                    {expenses.length} lançamentos de custos
                  </div>
                </div>

                {/* 4. Lucro Líquido Real */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#18181F] to-[#121216] border-2 border-[#D4AF37]/50 p-6 space-y-3 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#E8C868]">
                      Lucro Líquido Real
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#E8C868]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    R$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold">
                    Margem Líquida: {netMargin}%
                  </div>
                </div>

              </div>

              {/* Grid 2 Colunas: Pedidos Recentes + Resumos */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                
                {/* Pedidos em Tempo Real */}
                <div className="lg:col-span-8 bg-[#121216] rounded-2xl border border-white/[0.08] p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Últimos Pedidos na Loja</h3>
                      <p className="text-xs text-zinc-400">Fluxo em tempo real de vendas e solicitações</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('pedidos')}
                      className="text-xs font-bold text-[#D4AF37] hover:underline"
                    >
                      Ver todos ({orders.length}) →
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 text-xs">
                      Nenhum pedido registrado no momento.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/[0.06]">
                      {orders.slice(0, 5).map((o) => (
                        <div key={o.id} className="py-3.5 flex items-center justify-between text-xs gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white">{o.code}</span>
                              <span className="font-semibold text-zinc-300 truncate">{o.customerName}</span>
                            </div>
                            <span className="text-[11px] text-zinc-500">{o.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                o.status === 'confirmado'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : o.status === 'pendente'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}
                            >
                              {o.status}
                            </span>
                            <span className="font-bold text-white">
                              R$ {o.total.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coluna Direita: Alertas de Estoque & Atalhos */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Status Geral de Estoque */}
                  <div className="bg-[#121216] rounded-2xl border border-white/[0.08] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Saúde do Catálogo</h3>
                      <button
                        onClick={() => setActiveTab('produtos')}
                        className="text-xs font-bold text-[#D4AF37] hover:underline"
                      >
                        Gerenciar →
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                        <span className="text-zinc-400">Total de SKUs Cadastrados:</span>
                        <strong className="text-white">{products.length} itens</strong>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                        <span className="text-zinc-400">Exibidos na Vitrine Pública:</span>
                        <strong className="text-[#D4AF37]">
                          {products.filter((p) => p.showInShowcase !== false).length} itens
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Movimentações Recentes */}
                  <div className="bg-[#121216] rounded-2xl border border-white/[0.08] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Movimentação Recente</h3>
                      <button
                        onClick={() => setActiveTab('estoque')}
                        className="text-xs font-bold text-[#D4AF37] hover:underline"
                      >
                        Auditar →
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {stockMovements.slice(0, 3).map((mov) => (
                        <div
                          key={mov.id}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                                mov.type === 'entrada'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                            >
                              {mov.type === 'entrada' ? '+ Entrada' : '- Saída'}
                            </span>
                            <span className="text-[10px] text-zinc-500">{mov.date}</span>
                          </div>
                          <strong className="text-white block truncate">{mov.productName}</strong>
                          <span className="text-[11px] text-zinc-400">
                            {mov.quantity} un • {mov.reason}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: GESTÃO DE PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="bg-[#121216] rounded-2xl border border-white/[0.08] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Central de Pedidos</h3>
                  <p className="text-xs text-zinc-400">Acompanhe a confirmação de pagamento e o andamento de cada pedido</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Buscar código ou cliente..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'pendente', label: 'Pendentes' },
                  { id: 'confirmado', label: 'Confirmados' },
                  { id: 'cancelado', label: 'Cancelados' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setOrderStatusFilter(s.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      orderStatusFilter === s.id
                        ? 'bg-[#D4AF37] text-black shadow-sm'
                        : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-500 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Código</th>
                      <th className="py-3 px-3">Cliente / Contato</th>
                      <th className="py-3 px-3">Itens</th>
                      <th className="py-3 px-3">Valor Total</th>
                      <th className="py-3 px-3">Status do Pedido</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-zinc-500">
                          Nenhum pedido localizado com os filtros atuais.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-3 font-mono font-bold text-[#E8C868]">{order.code}</td>
                          <td className="py-3.5 px-3">
                            <strong className="text-white block">{order.customerName}</strong>
                            <span className="text-[11px] text-zinc-500">{order.customerEmail}</span>
                          </td>
                          <td className="py-3.5 px-3 text-zinc-300">
                            {order.items.map((it) => `${it.quantity}x ${it.product.name.split(' ')[1] || 'Shake'}`).join(', ')}
                          </td>
                          <td className="py-3.5 px-3 font-bold text-white">
                            R$ {order.total.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                className="px-3 py-1.5 rounded-lg bg-[#18181C] border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                              >
                                <option value="pendente">Pendente</option>
                                <option value="confirmado">Confirmado</option>
                                <option value="cancelado">Cancelado</option>
                              </select>
                              {order.status === 'pendente' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'confirmado')}
                                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black text-xs font-bold whitespace-nowrap hover:bg-[#E8C868] transition-colors"
                                >
                                  Confirmar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUTOS & VITRINE */}
          {activeTab === 'produtos' && (
            <div className="bg-[#121216] rounded-2xl border border-white/[0.08] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Catálogo & Controle de Amostras</h3>
                  <p className="text-xs text-zinc-400">
                    Defina preços, gerencie imagens e alterne a visibilidade dos produtos na vitrine da loja pública.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {['all', 'shakes', 'combos', 'kits'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                        productCategoryFilter === cat
                          ? 'bg-[#D4AF37] text-black font-bold'
                          : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
                      }`}
                    >
                      {cat === 'all' ? 'Todos' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-500 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Produto</th>
                      <th className="py-3 px-3">Categoria</th>
                      <th className="py-3 px-3">Preço Consumidor</th>
                      <th className="py-3 px-3">Estoque</th>
                      <th className="py-3 px-3 text-center">Vitrine Pública</th>
                      <th className="py-3 px-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredProducts.map((prod) => {
                      const isShown = prod.showInShowcase !== false;
                      return (
                        <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-3 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#18181C] border border-white/10 relative overflow-hidden flex-shrink-0">
                              <ProductImage src={prod.image} alt={prod.name} />
                            </div>
                            <div className="min-w-0">
                              <strong className="text-white block truncate">{prod.name}</strong>
                              <span className="text-[10px] text-zinc-500">{prod.weight}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 uppercase font-semibold text-zinc-400">{prod.category}</td>
                          <td className="py-3.5 px-3 font-bold text-white">R$ {prod.price.toFixed(2)}</td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                prod.stock <= 10
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}
                            >
                              {prod.stock} un
                            </span>
                          </td>
                          
                          {/* Toggle Vitrine */}
                          <td className="py-3.5 px-3 text-center">
                            <button
                              onClick={() => toggleProductShowcase(prod.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                                isShown
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-white/[0.04] text-zinc-500 border border-white/10'
                              }`}
                            >
                              {isShown ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-zinc-600" />}
                              <span>{isShown ? 'Visível' : 'Oculto'}</span>
                            </button>
                          </td>

                          <td className="py-3.5 px-3 text-right space-x-1">
                            <button
                              onClick={() => openEditProduct(prod)}
                              className="p-1.5 text-zinc-400 hover:text-[#D4AF37] transition-colors rounded-lg hover:bg-white/[0.05]"
                              title="Editar Produto"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                              title="Excluir Produto"
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

          {/* TAB 4: ESTOQUE */}
          {activeTab === 'estoque' && (
            <div className="bg-[#121216] rounded-2xl border border-white/[0.08] p-6 sm:p-8 shadow-xs animate-fade-in space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Controle de Estoque & Movimentações</h3>
                  <p className="text-xs text-zinc-400">
                    Registre lotes recebidos de fábrica ou saídas de cortesias e amostras para auditoria.
                  </p>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      setStockMovType('entrada');
                      setStockMovReason('Lote de Fábrica');
                      setShowStockModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Lançar Entrada (+)</span>
                  </button>
                  <button
                    onClick={() => {
                      setStockMovType('saida');
                      setStockMovReason('Amostra Cortesia (Médicos/Nutris)');
                      setShowStockModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181C] hover:bg-[#202026] text-amber-400 border border-amber-500/30 text-xs font-bold transition-all"
                  >
                    <ArrowOut className="w-3.5 h-3.5" />
                    <span>Lançar Saída (-)</span>
                  </button>
                </div>
              </div>

              {/* Saldo de Estoque por Produto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#18181C] rounded-xl border border-white/[0.06] space-y-1.5"
                  >
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block truncate">
                      {p.name}
                    </span>
                    <div className="text-lg font-bold text-white flex items-baseline gap-1.5">
                      {p.stock}
                      <span className="text-xs font-normal text-zinc-500">unidades</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabela de Histórico */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
                  Histórico Auditável de Lançamentos
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-zinc-500 uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Data / Hora</th>
                        <th className="py-3 px-3">Produto</th>
                        <th className="py-3 px-3">Tipo</th>
                        <th className="py-3 px-3">Quantidade</th>
                        <th className="py-3 px-3">Motivo</th>
                        <th className="py-3 px-3">Responsável</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {stockMovements.map((mov) => (
                        <tr key={mov.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-3 text-zinc-400">{mov.date}</td>
                          <td className="py-3 px-3 font-semibold text-white">{mov.productName}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                mov.type === 'entrada'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                            >
                              {mov.type === 'entrada' ? '+ Entrada' : '- Saída'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-bold text-white">{mov.quantity} un</td>
                          <td className="py-3 px-3 text-zinc-400">{mov.reason}</td>
                          <td className="py-3 px-3 text-zinc-500">{mov.responsible}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FINANCEIRO */}
          {activeTab === 'financeiro' && (
            <div className="bg-[#121216] rounded-2xl border border-white/[0.08] p-6 sm:p-8 shadow-xs animate-fade-in space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Demonstrativo de Resultado & Despesas</h3>
                  <p className="text-xs text-zinc-400">
                    Acompanhamento contábil de receitas, custos fixos e variáveis.
                  </p>
                </div>
              </div>

              {/* Tabela de Despesas */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-500 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Descrição da Despesa</th>
                      <th className="py-3 px-3">Categoria</th>
                      <th className="py-3 px-3">Data</th>
                      <th className="py-3 px-3">Valor</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 font-semibold text-white">{exp.description}</td>
                        <td className="py-3 px-3 text-zinc-400">{exp.category}</td>
                        <td className="py-3 px-3 text-zinc-500">{exp.date}</td>
                        <td className="py-3 px-3 font-bold text-red-400">
                          - R$ {exp.amount.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              exp.status === 'pago'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {exp.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => deleteExpense(exp.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                            title="Remover Despesa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: REVENDEDORES */}
        </main>
      </div>

      {/* MODAL: NOVO PRODUTO */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121216] rounded-2xl border border-white/15 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale max-h-[90vh] overflow-y-auto">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Cadastrar Novo Produto</h3>
                <p className="text-xs text-zinc-400">Adicione um shake, combo ou kit ao catálogo.</p>
              </div>
              <button onClick={() => setShowAddProductModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Shake Matcha & Vanilla Bourbon"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Preço Consumidor (R$)</label>
                  <input
                    type="text"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Categoria</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  >
                    <option value="shakes">Shakes</option>
                    <option value="combos">Combos</option>
                    <option value="kits">Kits</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Estoque Inicial</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <ProductImageUpload
                value={newProdImage}
                onChange={(img) => setNewProdImage(img)}
                label="Foto do Produto"
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="newProdShowcase"
                  checked={newProdShowcase}
                  onChange={(e) => setNewProdShowcase(e.target.checked)}
                  className="rounded bg-[#18181C] border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="newProdShowcase" className="text-zinc-300 font-semibold cursor-pointer">
                  Exibir como amostra na vitrine pública
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-black font-bold hover:brightness-110"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR PRODUTO */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121216] rounded-2xl border border-white/15 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scale max-h-[90vh] overflow-y-auto">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Editar Produto</h3>
                <p className="text-xs text-zinc-400">Atualize informações, preços ou foto do item.</p>
              </div>
              <button onClick={() => setEditingProduct(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Preço Final (R$)</label>
                  <input
                    type="text"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Preço Promocional (R$)</label>
                  <input
                    type="text"
                    placeholder="Opcional"
                    value={editPromoPrice}
                    onChange={(e) => setEditPromoPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Estoque</label>
                  <input
                    type="number"
                    required
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <ProductImageUpload
                value={editImage}
                onChange={(img) => setEditImage(img)}
                label="Foto do Produto"
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editShowcase"
                  checked={editShowcase}
                  onChange={(e) => setEditShowcase(e.target.checked)}
                  className="rounded bg-[#18181C] border-white/20 text-[#D4AF37]"
                />
                <label htmlFor="editShowcase" className="text-zinc-300 font-semibold cursor-pointer">
                  Visível na vitrine pública
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-black font-bold hover:brightness-110"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LANÇAR DESPESA */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121216] rounded-2xl border border-white/15 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Lançar Despesa</h3>
                <p className="text-xs text-zinc-400">Registre custos e pagamentos operacionais.</p>
              </div>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpenseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fornecedor de Proteína Isolada"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Status</label>
                  <select
                    value={expenseStatus}
                    onChange={(e) => setExpenseStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                  >
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Categoria</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                >
                  <option value="Insumos & Matérias-Primas">Insumos & Matérias-Primas</option>
                  <option value="Embalagens & Rótulos">Embalagens & Rótulos</option>
                  <option value="Marketing & Tráfego">Marketing & Tráfego</option>
                  <option value="Logística & Frete">Logística & Frete</option>
                  <option value="Operacional & Software">Operacional & Software</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-black font-bold hover:brightness-110"
                >
                  Lançar Despesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MOVIMENTAÇÃO DE ESTOQUE */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121216] rounded-2xl border border-white/15 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {stockMovType === 'entrada' ? 'Lançar Entrada no Estoque' : 'Lançar Saída no Estoque'}
                </h3>
                <p className="text-xs text-zinc-400">Controle rigoroso de entradas e saídas.</p>
              </div>
              <button onClick={() => setShowStockModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStockMovementSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Produto</label>
                <select
                  value={stockMovProductId}
                  onChange={(e) => setStockMovProductId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Atual: {p.stock} un)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Quantidade de Unidades</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={stockMovQty}
                  onChange={(e) => setStockMovQty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Motivo</label>
                <select
                  value={stockMovReason}
                  onChange={(e) => setStockMovReason(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                >
                  {stockMovType === 'entrada' ? (
                    <>
                      <option value="Lote de Fábrica">Lote de Fábrica</option>
                      <option value="Devolução de Cliente">Devolução de Cliente</option>
                      <option value="Ajuste de Inventário">Ajuste de Inventário (+)</option>
                    </>
                  ) : (
                    <>
                      <option value="Amostra Cortesia (Médicos/Nutris)">Amostra Cortesia (Médicos/Nutris)</option>
                      <option value="Avaria / Perda">Avaria / Perda</option>
                      <option value="Ajuste de Inventário">Ajuste de Inventário (-)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Responsável</label>
                <input
                  type="text"
                  required
                  value={stockMovResponsible}
                  onChange={(e) => setStockMovResponsible(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2.5 rounded-xl text-white font-bold transition-all ${
                    stockMovType === 'entrada'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-amber-600 hover:bg-amber-500'
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
  );
}
