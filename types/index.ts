export interface ProductAddon {
  id: string;
  label: string;
  price: number;
}

export interface CustomizationOption {
  id: string;
  label: string;
  price?: number;
}

export interface CustomizationStep {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi';
  max?: number;
  required?: boolean;
  options: CustomizationOption[];
}

export type ProductCategory = 'todos' | 'shakes' | 'bebidas' | 'salgados' | 'combos' | 'kits' | 'novidades' | 'mais-vendidos';

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  promoPrice?: number;
  category: 'shakes' | 'bebidas' | 'salgados' | 'combos' | 'kits' | 'novidades' | 'mais-vendidos' | string;
  badge?: 'MAIS VENDIDO' | 'NOVO' | 'OFERTA' | null;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  weight: string;
  servings: number;
  flavors: string[];
  ingredients: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sodium: string;
  };
  benefits: string[];
  addons?: ProductAddon[];
  customizationSteps?: CustomizationStep[]; // Construtor tipo iFood (Bebida, Base, Textura, Cortesia, Sabores)
  stock: number;
  isFeatured?: boolean;
  showInShowcase?: boolean; // Controle se aparece na vitrine/amostra do site
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedFlavor: string;
  selectedAddons?: string[];
  customSelections?: Record<string, string[]>; // stepId -> opção ids (montagem do shake)
}

export type OrderStatus = 'pendente' | 'pago' | 'preparando' | 'enviado' | 'entregue' | 'cancelado';

export interface Order {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingMethod: 'entrega' | 'retirada';
  shippingCost: number;
  paymentMethod: 'pix' | 'cartao';
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  pointsEarned: number;
  createdAt: string;
}

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'credit' | 'debit';
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsRequired: number;
  discountValue: number;
  description: string;
  type: 'discount' | 'shipping' | 'product';
  badge?: string;
}

export interface LoyaltyAccount {
  userId: string;
  userName: string;
  userEmail: string;
  points: number;
  tier: LoyaltyTier;
  nextTierPoints: number;
  totalSaved: number;
  referralCode: string;
  referralLink: string;
  referralCount: number;
  referralPointsEarned: number;
  transactions: LoyaltyTransaction[];
}

export type ExpenseCategory =
  | 'Insumos & Matérias-Primas'
  | 'Embalagens & Frascos'
  | 'Marketing & Campanhas'
  | 'Logística & Frete'
  | 'Impostos & Taxas'
  | 'Operacional';

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  status: 'pago' | 'pendente';
  notes?: string;
}

export type StockMovementType = 'entrada' | 'saida';
export type StockMovementReason =
  | 'Lote de Fábrica'
  | 'Amostra Cortesia (Médicos/Nutris)'
  | 'Avaria / Teste de Qualidade'
  | 'Ajuste de Balanço'
  | 'Venda Consumidor';

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: StockMovementType;
  quantity: number;
  reason: StockMovementReason;
  date: string;
  responsible: string;
}

export type UserRole = 'customer' | 'admin';
