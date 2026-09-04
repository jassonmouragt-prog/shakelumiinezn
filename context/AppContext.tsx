'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  LoyaltyAccount,
  LoyaltyReward,
  Reseller,
  ResellerCommission,
  UserRole,
  Expense,
  StockMovement
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_LOYALTY_ACCOUNT,
  INITIAL_LOYALTY_REWARDS,
  INITIAL_RESELLERS,
  INITIAL_RESELLER_COMMISSIONS,
  INITIAL_EXPENSES,
  INITIAL_STOCK_MOVEMENTS
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
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  
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
  addToCart: (product: Product, quantity?: number, selectedFlavor?: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status' | 'pointsEarned'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  
  // Loyalty
  loyalty: LoyaltyAccount;
  loyaltyRewards: LoyaltyReward[];
  redeemReward: (rewardId: string) => boolean;
  addLoyaltyPoints: (points: number, description: string) => void;
  
  // Reseller
  resellers: Reseller[];
  currentReseller: Reseller;
  commissions: ResellerCommission[];
  submitResellerApplication: (data: Omit<Reseller, 'id' | 'status' | 'referralCode' | 'totalSales' | 'totalOrders' | 'totalCommission' | 'pendingCommission' | 'approvedCommission' | 'paidCommission' | 'registeredAt'>) => void;
  updateResellerStatus: (resellerId: string, status: Reseller['status']) => void;

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

const FREE_SHIPPING_LIMIT = 150.00;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [loyalty, setLoyalty] = useState<LoyaltyAccount>(INITIAL_LOYALTY_ACCOUNT);
  const [loyaltyRewards] = useState<LoyaltyReward[]>(INITIAL_LOYALTY_REWARDS);
  const [resellers, setResellers] = useState<Reseller[]>(INITIAL_RESELLERS);
  const [commissions, setCommissions] = useState<ResellerCommission[]>(INITIAL_RESELLER_COMMISSIONS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(INITIAL_STOCK_MOVEMENTS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lumiine_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      
      const savedOrders = localStorage.getItem('lumiine_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedProducts = localStorage.getItem('lumiine_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedExpenses = localStorage.getItem('lumiine_expenses');
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

      const savedMovements = localStorage.getItem('lumiine_stock_movements');
      if (savedMovements) setStockMovements(JSON.parse(savedMovements));

      const savedLoyalty = localStorage.getItem('lumiine_loyalty');
      if (savedLoyalty) setLoyalty(JSON.parse(savedLoyalty));

      const savedAdminAuth = localStorage.getItem('lumiine_admin_auth');
      if (savedAdminAuth === 'true') setIsAdminAuthenticated(true);

      const savedRole = localStorage.getItem('lumiine_role');
      if (savedRole) setCurrentRole(savedRole as UserRole);
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

  // Admin Auth
  const loginAdmin = (email: string, pass: string): boolean => {
    // Standard credential validation (allows demo access easily)
    if (email.trim().toLowerCase() === 'admin@lumiine.com' && pass === 'admin123') {
      setIsAdminAuthenticated(true);
      setCurrentRole('admin');
      try {
        localStorage.setItem('lumiine_admin_auth', 'true');
      } catch (e) {
        console.warn(e);
      }
      showToast('Bem-vindo, Administrador', 'Sessão administrativa iniciada com sucesso.', 'gold');
      return true;
    }
    showToast('Falha no Login', 'Credenciais inválidas. Use admin@lumiine.com / admin123', 'info');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentRole('customer');
    try {
      localStorage.removeItem('lumiine_admin_auth');
    } catch (e) {
      console.warn(e);
    }
    showToast('Sessão Encerrada', 'Você saiu do Painel Administrativo.', 'info');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, selectedFlavor?: string) => {
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
        selectedFlavor: flavor
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
    return acc + effectivePrice * item.quantity;
  }, 0);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_LIMIT) * 100);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status' | 'pointsEarned'>) => {
    const newCodeNumber = 1026 + orders.length;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${newCodeNumber}`,
      code: `#${newCodeNumber}`,
      createdAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'pago',
      pointsEarned: Math.floor(orderData.total)
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    try {
      localStorage.setItem('lumiine_orders', JSON.stringify(updatedOrders));
    } catch (e) {
      console.warn(e);
    }

    // Earn loyalty points
    addLoyaltyPoints(newOrder.pointsEarned, `Compra Pedido ${newOrder.code}`);
    
    // Clear cart
    clearCart();
    setIsCartOpen(false);

    showToast('Pedido Confirmado!', `Seu pedido ${newOrder.code} foi registrado com sucesso.`, 'gold');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem('lumiine_orders', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast('Status Atualizado', `Pedido atualizado para: ${newStatus.toUpperCase()}`, 'info');
  };

  // Loyalty Points
  const addLoyaltyPoints = (points: number, description: string) => {
    setLoyalty((prev) => {
      const newPoints = Math.max(0, prev.points + points);
      let newTier = prev.tier;
      if (newPoints >= 3000) newTier = 'Platinum';
      else if (newPoints >= 1500) newTier = 'Gold';
      else if (newPoints >= 500) newTier = 'Silver';
      else newTier = 'Bronze';

      const newTx = {
        id: `tx-${Date.now()}`,
        date: new Date().toLocaleDateString('pt-BR'),
        description,
        points,
        type: (points >= 0 ? 'credit' : 'debit') as 'credit' | 'debit'
      };

      const updated = {
        ...prev,
        points: newPoints,
        tier: newTier,
        transactions: [newTx, ...prev.transactions]
      };
      try {
        localStorage.setItem('lumiine_loyalty', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const redeemReward = (rewardId: string): boolean => {
    const reward = loyaltyRewards.find((r) => r.id === rewardId);
    if (!reward) return false;
    if (loyalty.points < reward.pointsRequired) {
      showToast('Saldo insuficiente', `Você precisa de ${reward.pointsRequired} pontos para esta recompensa.`, 'info');
      return false;
    }

    addLoyaltyPoints(-reward.pointsRequired, `Resgate de benefício: ${reward.title}`);
    showToast('Benefício Resgatado!', `${reward.title} adicionado à sua conta com sucesso.`, 'gold');
    return true;
  };

  // Resellers
  const submitResellerApplication = (data: Omit<Reseller, 'id' | 'status' | 'referralCode' | 'totalSales' | 'totalOrders' | 'totalCommission' | 'pendingCommission' | 'approvedCommission' | 'paidCommission' | 'registeredAt'>) => {
    const newReseller: Reseller = {
      ...data,
      id: `res-${Date.now()}`,
      status: 'pendente',
      referralCode: data.name.split(' ')[0].toUpperCase() + Math.floor(Math.random() * 90 + 10),
      totalSales: 0,
      totalOrders: 0,
      totalCommission: 0,
      pendingCommission: 0,
      approvedCommission: 0,
      paidCommission: 0,
      registeredAt: new Date().toLocaleDateString('pt-BR')
    };

    setResellers((prev) => [newReseller, ...prev]);
    showToast('Inscrição Recebida!', 'Seus dados foram enviados e estão sob análise da nossa equipe.', 'gold');
  };

  const updateResellerStatus = (resellerId: string, status: Reseller['status']) => {
    setResellers((prev) =>
      prev.map((r) => (r.id === resellerId ? { ...r, status } : r))
    );
    showToast('Revendedor Atualizado', `Status alterado para: ${status.toUpperCase()}`, 'info');
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
    try {
      localStorage.setItem('lumiine_products', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast('Produto Cadastrado', `${newProd.name} foi adicionado ao catálogo.`, 'gold');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem('lumiine_products', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast('Produto Atualizado', 'Alterações salvas com sucesso.', 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('lumiine_products', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
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
          return { ...p, showInShowcase: newState };
        }
        return p;
      });
      try {
        localStorage.setItem('lumiine_products', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  // Expenses Management
  const addExpense = (expData: Omit<Expense, 'id'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => {
      const updated = [newExp, ...prev];
      try {
        localStorage.setItem('lumiine_expenses', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast('Despesa Registrada', `Lançamento de R$ ${expData.amount.toFixed(2)} contabilizado.`, 'gold');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      try {
        localStorage.setItem('lumiine_expenses', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    showToast('Despesa Removida', 'Lançamento excluído com sucesso.', 'info');
  };

  // Stock Movements Management (Entrada e Saída)
  const addStockMovement = (movData: Omit<StockMovement, 'id' | 'date'>) => {
    const newMovement: StockMovement = {
      ...movData,
      id: `mov-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setStockMovements((prev) => {
      const updated = [newMovement, ...prev];
      try {
        localStorage.setItem('lumiine_stock_movements', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    // Automatically update product stock
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === movData.productId) {
          const newQty =
            movData.type === 'entrada'
              ? p.stock + movData.quantity
              : Math.max(0, p.stock - movData.quantity);
          return { ...p, stock: newQty };
        }
        return p;
      });
      try {
        localStorage.setItem('lumiine_products', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    showToast(
      movData.type === 'entrada' ? 'Entrada de Estoque' : 'Saída de Estoque',
      `${movData.quantity} un de ${movData.productName} registradas (${movData.reason}).`,
      'gold'
    );
  };

  const currentReseller = resellers[0];

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole: (role) => {
          setCurrentRole(role);
          try {
            localStorage.setItem('lumiine_role', role);
          } catch (e) {
            console.warn(e);
          }
        },
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
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
        freeShippingThreshold: FREE_SHIPPING_LIMIT,
        amountToFreeShipping,
        freeShippingProgress,
        orders,
        createOrder,
        updateOrderStatus,
        loyalty,
        loyaltyRewards,
        redeemReward,
        addLoyaltyPoints,
        resellers,
        currentReseller,
        commissions,
        submitResellerApplication,
        updateResellerStatus,
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
