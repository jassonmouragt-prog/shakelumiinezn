'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  LoyaltyAccount,
  LoyaltyReward,
  UserRole,
  Expense,
  StockMovement
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_LOYALTY_REWARDS,
  NEUTRAL_LOYALTY_ACCOUNT
} from '@/lib/mock-data';

interface Toast {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface AppContextType {
  // Role & User
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: { id: string; name: string; email: string; role: string } | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => Promise<string | null>;
  logoutAdmin: () => void;

  // General loading state
  isLoading: boolean;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductShowcase: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedFlavor?: string, selectedAddons?: string[], customSelections?: Record<string, string[]>) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status' | 'pointsEarned'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  
  // Loyalty
  loyalty: LoyaltyAccount;
  loyaltyRewards: LoyaltyReward[];
  redeemReward: (rewardId: string) => boolean;
  addLoyaltyPoints: (points: number, description: string) => void;

  // Expenses & Finance
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;

  // Stock Movements (Entrada e Saída)
  stockMovements: StockMovement[];
  addStockMovement: (movement: Omit<StockMovement, 'id' | 'date'>) => void;
  
  // Toast
  toasts: Toast[];
  showToast: (title: string, message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

async function api<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) }
  });
  if (!res.ok) {
    let msg = 'Erro na requisição';
    try {
      const data = await res.json();
      msg = data?.error || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loyalty, setLoyalty] = useState<LoyaltyAccount>(NEUTRAL_LOYALTY_ACCOUNT);
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>(INITIAL_LOYALTY_REWARDS);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load cart from LocalStorage (sessão)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lumiine_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumiine_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [cart]);

  // Load role from LocalStorage (legacy demo only)
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('lumiine_role');
      if (savedRole) setCurrentRole(savedRole as UserRole);
    } catch {}
  }, []);

  // Carrega dados administrativos (pedidos, despesas, estoque, fidelidade)
  const loadAdminData = useCallback(async () => {
    try {
      const [ords, exps, moves, loy] = await Promise.all([
        api('/api/orders').catch(() => null),
        api('/api/expenses').catch(() => null),
        api('/api/stock').catch(() => null),
        api('/api/loyalty').catch(() => null)
      ]);
      if (ords && Array.isArray(ords)) setOrders(ords);
      if (exps && Array.isArray(exps)) setExpenses(exps);
      if (moves && Array.isArray(moves)) setStockMovements(moves);
      if (loy?.account) {
        setLoyalty(loy.account);
        setLoyaltyRewards(loy.rewards || INITIAL_LOYALTY_REWARDS);
      }
    } catch (e) {
      console.warn('API admin hydrate error:', e);
    }
  }, []);

  // Hydrate produtos (público) + checa sessão admin após mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const prods = await api<Product[]>('/api/products').catch(() => null);
        if (cancelled) return;
        if (prods && Array.isArray(prods) && prods.length > 0) {
          const merged = prods.map((p) => {
            const fallback = INITIAL_PRODUCTS.find((init) => init.id === p.id || init.slug === p.slug);
            return {
              ...p,
              image: p.image || fallback?.image || '/images/shake-hero.jpg',
              badge: p.badge || fallback?.badge || null,
              gallery: p.gallery && p.gallery.length > 0 ? p.gallery : (fallback?.gallery || ['/images/shake-hero.jpg']),
              addons: p.addons && p.addons.length > 0 ? p.addons : (fallback?.addons ?? []),
              customizationSteps: p.customizationSteps && p.customizationSteps.length > 0 ? p.customizationSteps : (fallback?.customizationSteps ?? [])
            };
          });
          // Garante que o produto principal "Monte Seu Shake" sempre exista
          const builder = INITIAL_PRODUCTS.find((init) => init.slug === 'monte-seu-shake');
          const final = builder && !merged.some((m) => m.slug === builder.slug) ? [builder, ...merged] : merged;
          setProducts(final);
        }
      } catch (e) {
        console.warn('API products hydrate error:', e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    // Check session — dados administrativos só são carregados se for admin
    (async () => {
      try {
        const me = await api<{ user: { id: string; name: string; email: string; role: string } | null }>('/api/auth/me');
        if (me?.user) {
          setCurrentUser(me.user);
          if (me.user.role === 'admin') {
            setIsAdminAuthenticated(true);
            setCurrentRole('admin');
            await loadAdminData();
          }
        }
      } catch {}
    })();

    return () => {
      cancelled = true;
    };
  }, [loadAdminData]);

  // Toast handler
  const showToast = (title: string, message: string, type: Toast['type'] = 'gold') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Admin Auth (real, via API)
  const loginAdmin = useCallback(
    (email: string, pass: string): Promise<string | null> => {
      return (async () => {
        try {
          const res = await api<{ user: { id: string; name: string; email: string; role: string } }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password: pass })
          });
          if (res?.user?.role === 'admin') {
            setIsAdminAuthenticated(true);
            setCurrentRole('admin');
            setCurrentUser(res.user);
            void loadAdminData();
            showToast('Bem-vindo, Administrador', 'Sessão administrativa iniciada com sucesso.', 'gold');
            return null;
          }
          throw new Error('Credenciais inválidas');
        } catch (e: any) {
          setIsAdminAuthenticated(false);
          const message =
            typeof e?.message === 'string' && e.message.includes('Muitas requisições')
              ? 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.'
              : e?.message || 'Não foi possível acessar o painel. Verifique a conexão e tente novamente.';
          showToast('Falha no Login', message, 'info');
          return message;
        }
      })();
    },
    [loadAdminData]
  );

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentRole('customer');
    setCurrentUser(null);
    setOrders([]);
    setExpenses([]);
    setStockMovements([]);
    setLoyalty(NEUTRAL_LOYALTY_ACCOUNT);
    setLoyaltyRewards([]);
    try {
      localStorage.removeItem('lumiine_admin_auth');
    } catch {}
    api('/api/auth/logout', { method: 'POST' }).catch(() => {});
    showToast('Sessão Encerrada', 'Você saiu do Painel Administrativo.', 'info');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, selectedFlavor?: string, selectedAddons?: string[], customSelections?: Record<string, string[]>) => {
    const flavor = selectedFlavor || product.flavors[0] || 'Original';
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedFlavor === flavor
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        selectedFlavor: flavor,
        ...(selectedAddons?.length ? { selectedAddons } : {}),
        ...(customSelections && Object.keys(customSelections).length > 0 ? { customSelections } : {})
      };
      setCart((prev) => [...prev, newItem]);
    }

    setIsCartOpen(true);
    showToast('Adicionado ao Pedido', `${product.name} (${quantity}x) está no seu carrinho.`, 'gold');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removido', 'O item foi retirado da sua cesta.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    const effectivePrice = item.product.promoPrice || item.product.price;
    const addonsTotal = (item.selectedAddons ?? []).reduce((sum, id) => {
      const addon = item.product.addons?.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
    const customTotal = Object.entries(item.customSelections ?? {}).reduce((sum, [stepId, optionIds]) => {
      const step = item.product.customizationSteps?.find((s) => s.id === stepId);
      if (!step) return sum;
      return sum + optionIds.reduce((s, optId) => {
        const opt = step.options.find((o) => o.id === optId);
        return s + (opt?.price ?? 0);
      }, 0);
    }, 0);
    return acc + (effectivePrice + addonsTotal + customTotal) * item.quantity;
  }, 0);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status' | 'pointsEarned'>) => {
    const newCodeNumber = 1026 + orders.length;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${newCodeNumber}`,
      code: `#${newCodeNumber}`,
      createdAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'pendente',
      pointsEarned: Math.floor(orderData.total)
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);

    // Persistir no banco
    api('/api/orders', { method: 'POST', body: JSON.stringify(orderData) })
      .then(async (saved: any) => {
        // Reajusta code/id com o retornado do servidor
        if (saved?.id && saved?.code) {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === newOrder.id
                ? { ...o, id: saved.id, code: saved.code, createdAt: saved.createdAt, pointsEarned: saved.pointsEarned }
                : o
            )
          );
        }
        // Atualiza pontos de fidelidade apenas quando o admin confirmar (status → pago)
        if (saved?.pointsEarned && saved.pointsEarned > 0) {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === newOrder.id
                ? { ...o, pointsEarned: saved.pointsEarned }
                : o
            )
          );
        }
      })
      .catch(() => {});

    clearCart();
    setIsCartOpen(false);

    showToast('Pedido Confirmado!', `Seu pedido ${newOrder.code} foi registrado com sucesso.`, 'gold');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const current = orders.find((o) => o.id === orderId);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    api(`/api/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
    if (newStatus === 'confirmado' && current && current.status !== 'confirmado') {
      const points = current.pointsEarned || Math.floor(current.total);
      api<{ account: LoyaltyAccount }>('/api/loyalty', {
        method: 'POST',
        body: JSON.stringify({ action: 'points', points, description: `Compra Pedido ${current.code}` })
      })
        .then((res) => {
          if (res?.account) setLoyalty(res.account);
          showToast('Pontos Creditados', `${points} pontos adicionados na conta de fidelidade.`, 'gold');
        })
.catch((e: any) => {
        showToast(
          'Não foi possível registrar o pedido no sistema',
          e?.message || 'Ocorreu um erro ao enviar. Revise os dados e tente novamente.',
          'info'
        );
      });
    }
    showToast('Status Atualizado', `Pedido atualizado para: ${newStatus.toUpperCase()}`, 'info');
  };

  // Loyalty Points
  const addLoyaltyPoints = useCallback((points: number, description: string) => {
    api<{ account: LoyaltyAccount }>('/api/loyalty', {
      method: 'POST',
      body: JSON.stringify({ action: 'points', points, description })
    })
      .then((res) => {
        if (res?.account) setLoyalty(res.account);
      })
      .catch(() => {});
  }, []);

  const redeemReward = (rewardId: string): boolean => {
    const reward = loyaltyRewards.find((r) => r.id === rewardId);
    if (!reward) return false;
    if (loyalty.points < reward.pointsRequired) {
      showToast('Saldo insuficiente', `Você precisa de ${reward.pointsRequired} pontos para esta recompensa.`, 'info');
      return false;
    }

    api<{ account: LoyaltyAccount }>('/api/loyalty', {
      method: 'POST',
      body: JSON.stringify({ action: 'redeem', rewardId })
    })
      .then((res) => {
        if (res?.account) setLoyalty(res.account);
        showToast('Benefício Resgatado!', `${reward.title} adicionado à sua conta com sucesso.`, 'gold');
      })
      .catch((e: any) => {
        showToast('Resgate não concluído', e?.message || 'Erro ao resgatar benefício.', 'info');
      });

    return true;
  };

  // Products CRUD & Showcase Control
  const addProduct = (newProd: Omit<Product, 'id' | 'slug'>) => {
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const created: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      slug,
      showInShowcase: newProd.showInShowcase !== undefined ? newProd.showInShowcase : true
    };
    const updated = [created, ...products];
    setProducts(updated);
    api('/api/products', { method: 'POST', body: JSON.stringify(newProd) }).catch(() => {});
    showToast('Produto Cadastrado', `${newProd.name} foi adicionado ao catálogo.`, 'gold');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    api(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }).catch(() => {});
    showToast('Produto Atualizado', 'Alterações salvas com sucesso.', 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    api(`/api/products/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Produto Removido', 'Item excluído do catálogo.', 'info');
  };

  const toggleProductShowcase = (id: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          const newState = p.showInShowcase === false ? true : false;
          showToast(
            newState ? 'Visível na Vitrine' : 'Ocultado da Vitrine',
            `${p.name} foi ${newState ? 'incluído nas amostras' : 'removido das amostras'} públicas.`,
            'gold'
          );
          setTimeout(() => {
            const target = updated.find((x) => x.id === id);
            api(`/api/products/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({ showInShowcase: newState })
            }).catch(() => {});
          }, 0);
          return { ...p, showInShowcase: newState };
        }
        return p;
      });
      return updated;
    });
  };

  // Expenses Management
  const addExpense = (expData: Omit<Expense, 'id'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => [newExp, ...prev]);
    api('/api/expenses', { method: 'POST', body: JSON.stringify(expData) }).catch(() => {});
    showToast('Despesa Registrada', `Lançamento de R$ ${expData.amount.toFixed(2)} contabilizado.`, 'gold');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    api(`/api/expenses/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Despesa Removida', 'Lançamento excluído com sucesso.', 'info');
  };

  // Stock Movements Management (Entrada e Saída)
  const addStockMovement = (movData: Omit<StockMovement, 'id' | 'date'>) => {
    const newMovement: StockMovement = {
      ...movData,
      id: `mov-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setStockMovements((prev) => [newMovement, ...prev]);

    // Update local product stock optimistically
    setProducts((prev) =>
      prev.map((p) =>
        p.id === movData.productId
          ? {
              ...p,
              stock:
                movData.type === 'entrada'
                  ? p.stock + movData.quantity
                  : Math.max(0, p.stock - movData.quantity)
            }
          : p
      )
    );

    api('/api/stock', { method: 'POST', body: JSON.stringify(movData) }).catch(() => {});

    showToast(
      movData.type === 'entrada' ? 'Entrada de Estoque' : 'Saída de Estoque',
      `${movData.quantity} un de ${movData.productName} registradas (${movData.reason}).`,
      'gold'
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole: (role) => {
          setCurrentRole(role);
          try {
            localStorage.setItem('lumiine_role', role);
          } catch {}
        },
        currentUser,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isLoading,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductShowcase,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        loyalty,
        loyaltyRewards,
        redeemReward,
        addLoyaltyPoints,
        expenses,
        addExpense,
        deleteExpense,
        stockMovements,
        addStockMovement,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
