import {
  Product,
  LoyaltyAccount,
  LoyaltyReward,
  Reseller,
  ResellerCommission,
  Order,
  ResellerClient,
  Expense,
  StockMovement
} from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'shake-vanilla-bourbon-amendoas',
    name: 'Shake Vanilla Bourbon & Amêndoas Douradas',
    subtitle: 'Aveludado, aromático e nutritivo com notas de fava de baunilha pura.',
    description: 'Nossa assinatura mais celebrada. Uma fusão harmoniosa de proteínas vegetais isoladas, extrato orgânico de fava de baunilha Bourbon de Madagascar, leite de amêndoas prensado a frio e minerais quelatados de alta biodisponibilidade.',
    price: 69.90,
    promoPrice: 59.90,
    resellerPrice: 39.90,
    category: 'shakes',
    badge: 'MAIS VENDIDO',
    image: '/images/shake-hero.jpg',
    gallery: [
      '/images/shake-hero.jpg',
      '/images/shake-chocolate.jpg'
    ],
    rating: 4.9,
    reviewsCount: 382,
    weight: '600g',
    servings: 20,
    flavors: ['Vanilla Bourbon Clássica', 'Vanilla com Toque de Canela'],
    ingredients: [
      'Blend Proteico Ultra-Puro (Ervilha Dourada e Arroz Germinado)',
      'Extrato Natural de Baunilha Bourbon de Madagascar',
      'Farinha de Amêndoas Finas Prensada a Frio',
      'Inulina de Raiz de Chicória (Prebiótico)',
      'Complexo de Minerais Marinhos Aquamin™',
      'Stévia de Alta Pureza Reb-M'
    ],
    nutritionalInfo: {
      calories: '138 kcal',
      protein: '22g',
      carbs: '4.2g',
      fat: '2.8g',
      fiber: '5.5g',
      sodium: '78mg'
    },
    benefits: [
      'Saciedade prolongada e digestão ultraleve',
      'Equilíbrio da microbiota com prebióticos nobres',
      'Zero adição de açúcares, glúten e conservantes',
      'Aporte de micronutrientes essenciais diários'
    ],
    stock: 84,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'prod-2',
    slug: 'shake-cacao-noir-raw-coconut',
    name: 'Shake Cacao Noir & Raw Coconut',
    subtitle: 'Rico, cremoso e irresistível com cacau selvagem 100% puro.',
    description: 'Para quem não abre mão do prazer autêntico do chocolate nobre. Formulado com cacau noir monovarietal do sul da Bahia, leite de coco liofilizado e sementes de chia ativadas para uma textura de mousse cremosa.',
    price: 74.90,
    promoPrice: 64.90,
    resellerPrice: 42.90,
    category: 'shakes',
    badge: 'NOVO',
    image: '/images/shake-chocolate.jpg',
    gallery: [
      '/images/shake-chocolate.jpg',
      '/images/shake-hero.jpg'
    ],
    rating: 4.95,
    reviewsCount: 247,
    weight: '600g',
    servings: 20,
    flavors: ['Cacao Noir 70%', 'Cacao com Nibs Torrados'],
    ingredients: [
      'Cacau Selvagem Noir Puro Orgânico',
      'Proteína Vegetal Isolada Hipoalergênica',
      'Leite de Coco Puro em Pó (Sem Maltodextrina)',
      'Fibras Solúveis de Acácia',
      'Extrato de Café Verde Descafeinado',
      'Monk Fruit e Taumatina'
    ],
    nutritionalInfo: {
      calories: '146 kcal',
      protein: '21g',
      carbs: '3.9g',
      fat: '4.1g',
      fiber: '6.0g',
      sodium: '65mg'
    },
    benefits: [
      'Rico em polifenóis antioxidantes e flavonoides',
      'Sensação de bem-estar e suporte ao humor',
      'Textura densa e saciante sem laticínios',
      'Sem sabor residual de adoçante'
    ],
    stock: 52,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'prod-3',
    slug: 'combo-ritual-diario-duo',
    name: 'Combo Ritual Diário — Vanilla & Cacao',
    subtitle: 'A combinação perfeita para intercalar o frescor da baunilha e a intensidade do cacau.',
    description: 'Dois potes clássicos LUMIINE com dosador de metal dourado colecionável incluso de presente. Ideal para manter sua rotina de 40 dias com consistência, praticidade e prazer.',
    price: 139.80,
    promoPrice: 114.90,
    resellerPrice: 79.90,
    category: 'combos',
    badge: 'OFERTA',
    image: '/images/shake-hero.jpg',
    gallery: [
      '/images/shake-hero.jpg',
      '/images/shake-chocolate.jpg'
    ],
    rating: 5.0,
    reviewsCount: 164,
    weight: '1.2kg (2x 600g)',
    servings: 40,
    flavors: ['1x Vanilla Bourbon + 1x Cacao Noir'],
    ingredients: [
      'Ingredientes 100% naturais dos Shakes Vanilla Bourbon e Cacao Noir'
    ],
    nutritionalInfo: {
      calories: '142 kcal / dose',
      protein: '21.5g',
      carbs: '4.0g',
      fat: '3.4g',
      fiber: '5.8g',
      sodium: '71mg'
    },
    benefits: [
      'Economia de R$ 25 no kit completo',
      'Inclui dosador de medição dourado especial',
      'Frete cortesia para todo o Brasil',
      'Atendimento consultivo personalizado'
    ],
    stock: 35,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'prod-4',
    slug: 'kit-transformacao-30-dias-wellness',
    name: 'Kit Transformação 30 Dias + Coqueteleira Diamond',
    subtitle: 'Ecossistema completo com 2 Shakes, coqueteleira de aço térmico fosco e guia alimentar.',
    description: 'A experiência sensorial definitiva. Criado para transformar seus hábitos matinais com elegância. Acompanha nossa garrafa shaker térmica com acabamento branco fosco e tampa dourada.',
    price: 199.90,
    promoPrice: 169.90,
    resellerPrice: 119.90,
    category: 'kits',
    badge: 'MAIS VENDIDO',
    image: '/images/shake-chocolate.jpg',
    gallery: [
      '/images/shake-chocolate.jpg',
      '/images/shake-hero.jpg'
    ],
    rating: 4.98,
    reviewsCount: 96,
    weight: '1.2kg + Shaker 700ml',
    servings: 40,
    flavors: ['Vanilla Bourbon + Cacao Noir'],
    ingredients: [
      'Blends proteicos nobres, superalimentos funcionais e adaptógenos naturais'
    ],
    nutritionalInfo: {
      calories: '140 kcal / dose',
      protein: '22g',
      carbs: '4.1g',
      fat: '3.2g',
      fiber: '5.6g',
      sodium: '70mg'
    },
    benefits: [
      'Garrafa térmica de parede dupla com vácuo (mantém 12h gelado)',
      'Acesso ao Guia Digital de Hábitos e Receitas Autorais',
      'Envio prioritário em embalagem sustentável'
    ],
    stock: 28,
    isFeatured: true,
    showInShowcase: true
  }
];

export const INITIAL_LOYALTY_ACCOUNT: LoyaltyAccount = {
  userId: 'user-01',
  userName: 'Camila Mendonça',
  userEmail: 'camila.mendonca@lumiine.com',
  points: 1500,
  tier: 'Gold',
  nextTierPoints: 3000,
  totalSaved: 340.00,
  referralCode: 'CAMILA10',
  referralLink: 'https://lumiine.com/indique/CAMILA10',
  referralCount: 8,
  referralPointsEarned: 400,
  transactions: [
    {
      id: 'tx-1',
      date: '01/09/2026',
      description: 'Compra Pedido #1022 — Combo Ritual Diário',
      points: 120,
      type: 'credit'
    },
    {
      id: 'tx-2',
      date: '24/08/2026',
      description: 'Indicação de nova cliente (Renata Silva)',
      points: 50,
      type: 'credit'
    },
    {
      id: 'tx-3',
      date: '15/08/2026',
      description: 'Resgate de benefício Cupom R$ 25 OFF',
      points: -300,
      type: 'debit'
    },
    {
      id: 'tx-4',
      date: '02/08/2026',
      description: 'Bônus de aniversário de membro Gold',
      points: 200,
      type: 'credit'
    },
    {
      id: 'tx-5',
      date: '18/07/2026',
      description: 'Compra Pedido #0940 — Shake Vanilla Bourbon',
      points: 70,
      type: 'credit'
    }
  ]
};

export const INITIAL_LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-1',
    title: 'R$ 15 OFF na Próxima Compra',
    pointsRequired: 400,
    discountValue: 15.00,
    description: 'Desconto direto no carrinho em qualquer shake ou combo.',
    type: 'discount',
    badge: 'MAIS POPULAR'
  },
  {
    id: 'rew-2',
    title: 'Frete Cortesia Express',
    pointsRequired: 650,
    discountValue: 24.90,
    description: 'Frete grátis sem valor mínimo de pedido para qualquer região.',
    type: 'shipping',
    badge: 'ESSENCIAL'
  },
  {
    id: 'rew-3',
    title: 'R$ 40 OFF no Pedido',
    pointsRequired: 1000,
    discountValue: 40.00,
    description: 'Abatimento especial para membros dedicados.',
    type: 'discount'
  },
  {
    id: 'rew-4',
    title: 'Shake Vanilla Bourbon 600g Grátis',
    pointsRequired: 1500,
    discountValue: 69.90,
    description: 'Resgate um pote inteiro de presente 100% gratuito.',
    type: 'product',
    badge: 'EXCLUSIVO GOLD'
  }
];

export const INITIAL_RESELLERS: Reseller[] = [
  {
    id: 'res-1',
    name: 'Juliana Vasconcelos',
    document: '12.345.678/0001-90',
    email: 'juliana.wellness@gmail.com',
    phone: '(11) 98765-4321',
    city: 'São Paulo',
    state: 'SP',
    instagram: '@ju.lifestyle_wellness',
    activityType: 'Nutricionista & Espaço Wellness',
    salesExperience: 'Mais de 4 anos com alimentação premium',
    discoverySource: 'Instagram Oficial LUMIINE',
    notes: 'Excelente perfil com clínica em Moema. Alto potencial de recorrência.',
    status: 'aprovado',
    referralCode: 'JUWELLNESS',
    totalSales: 14850.00,
    totalOrders: 42,
    totalCommission: 2970.00,
    pendingCommission: 480.00,
    approvedCommission: 890.00,
    paidCommission: 1600.00,
    registeredAt: '12/04/2026'
  },
  {
    id: 'res-2',
    name: 'Rodrigo Alcantara Studio',
    document: '98.765.432/0001-10',
    email: 'rodrigo@studioalcantara.com.br',
    phone: '(21) 99123-4567',
    city: 'Rio de Janeiro',
    state: 'RJ',
    instagram: '@alcantara.movement',
    activityType: 'Studio de Pilates & Treinamento Integrado',
    salesExperience: '2 anos revendendo produtos saudáveis',
    discoverySource: 'Indicação de cliente',
    status: 'aprovado',
    referralCode: 'RODRIGOALC',
    totalSales: 9420.00,
    totalOrders: 27,
    totalCommission: 1884.00,
    pendingCommission: 320.00,
    approvedCommission: 564.00,
    paidCommission: 1000.00,
    registeredAt: '28/05/2026'
  },
  {
    id: 'res-3',
    name: 'Beatriz Fontes',
    document: '456.789.012-34',
    email: 'bia.fontes.fit@outlook.com',
    phone: '(31) 98877-6655',
    city: 'Belo Horizonte',
    state: 'MG',
    instagram: '@biafontes_nutri',
    activityType: 'Consultora de Estilo de Vida',
    salesExperience: 'Iniciando no segmento de wellness',
    discoverySource: 'Anúncio Google',
    status: 'pendente',
    referralCode: 'BIAFONTES',
    totalSales: 0,
    totalOrders: 0,
    totalCommission: 0,
    pendingCommission: 0,
    approvedCommission: 0,
    paidCommission: 0,
    registeredAt: '02/09/2026'
  }
];

export const INITIAL_RESELLER_COMMISSIONS: ResellerCommission[] = [
  {
    id: 'com-1',
    orderId: 'ord-1025',
    orderCode: '#1025',
    date: '02/09/2026',
    customerName: 'Mariana Duarte',
    orderValue: 169.90,
    commissionRate: 0.20,
    commissionValue: 33.98,
    status: 'pendente'
  },
  {
    id: 'com-2',
    orderId: 'ord-1020',
    orderCode: '#1020',
    date: '31/08/2026',
    customerName: 'Lucas Ferraz',
    orderValue: 229.80,
    commissionRate: 0.20,
    commissionValue: 45.96,
    status: 'aprovada'
  },
  {
    id: 'com-3',
    orderId: 'ord-1014',
    orderCode: '#1014',
    date: '28/08/2026',
    customerName: 'Patricia Gomes',
    orderValue: 114.90,
    commissionRate: 0.20,
    commissionValue: 22.98,
    status: 'paga'
  }
];

export const INITIAL_RESELLER_CLIENTS: ResellerClient[] = [
  {
    id: 'cli-1',
    name: 'Mariana Duarte',
    email: 'mariana.duarte@email.com',
    firstOrderDate: '14/06/2026',
    lastOrderDate: '02/09/2026',
    totalSpent: 849.50,
    commissionGenerated: 169.90
  },
  {
    id: 'cli-2',
    name: 'Lucas Ferraz',
    email: 'lucas.ferraz@email.com',
    firstOrderDate: '22/07/2026',
    lastOrderDate: '31/08/2026',
    totalSpent: 569.70,
    commissionGenerated: 113.94
  },
  {
    id: 'cli-3',
    name: 'Patricia Gomes',
    email: 'patricia.g@email.com',
    firstOrderDate: '10/08/2026',
    lastOrderDate: '28/08/2026',
    totalSpent: 344.70,
    commissionGenerated: 68.94
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1025',
    code: '#1025',
    customerName: 'Mariana Duarte',
    customerEmail: 'mariana.duarte@email.com',
    customerPhone: '(11) 97111-2233',
    address: {
      street: 'Alameda Gabriel Monteiro da Silva',
      number: '1420',
      neighborhood: 'Jardim Paulistano',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01442-001'
    },
    shippingMethod: 'entrega',
    shippingCost: 0,
    paymentMethod: 'pix',
    status: 'preparando',
    items: [
      {
        id: 'item-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        selectedFlavor: 'Vanilla Bourbon Clássica'
      },
      {
        id: 'item-2',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedFlavor: 'Cacao Noir 70%'
      }
    ],
    subtotal: 184.70,
    discount: 14.80,
    total: 169.90,
    pointsEarned: 170,
    resellerCode: 'JUWELLNESS',
    createdAt: '02/09/2026 14:32'
  },
  {
    id: 'ord-1024',
    code: '#1024',
    customerName: 'Thiago Valença',
    customerEmail: 'thiago.valenca@email.com',
    customerPhone: '(21) 98222-3344',
    address: {
      street: 'Avenida Vieira Souto',
      number: '480',
      neighborhood: 'Ipanema',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22420-006'
    },
    shippingMethod: 'entrega',
    shippingCost: 0,
    paymentMethod: 'cartao',
    status: 'enviado',
    items: [
      {
        id: 'item-3',
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        selectedFlavor: 'Vanilla Bourbon + Cacao Noir'
      }
    ],
    subtotal: 169.90,
    discount: 0,
    total: 169.90,
    pointsEarned: 170,
    createdAt: '01/09/2026 18:10'
  },
  {
    id: 'ord-1023',
    code: '#1023',
    customerName: 'Camila Mendonça',
    customerEmail: 'camila.mendonca@lumiine.com',
    customerPhone: '(11) 99888-7766',
    address: {
      street: 'Rua Oscar Freire',
      number: '920',
      complement: 'Apto 104',
      neighborhood: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-000'
    },
    shippingMethod: 'entrega',
    shippingCost: 0,
    paymentMethod: 'pix',
    status: 'entregue',
    items: [
      {
        id: 'item-4',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        selectedFlavor: '1x Vanilla Bourbon + 1x Cacao Noir'
      }
    ],
    subtotal: 114.90,
    discount: 0,
    total: 114.90,
    pointsEarned: 115,
    createdAt: '28/08/2026 10:15'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    description: 'Compra de Fava de Baunilha Bourbon & Amêndoas Orgânicas (Lote 40)',
    category: 'Insumos & Matérias-Primas',
    amount: 5400.00,
    date: '28/08/2026',
    status: 'pago',
    notes: 'Fornecedor certificado Fair Trade Madagascar.'
  },
  {
    id: 'exp-2',
    description: 'Potes Cerâmicos Foscos com Tampa Metálica Dourada (500 un)',
    category: 'Embalagens & Frascos',
    amount: 6800.00,
    date: '25/08/2026',
    status: 'pago',
    notes: 'Lote com gravação a laser e selagem a vácuo.'
  },
  {
    id: 'exp-3',
    description: 'Campanha Digital & Parcerias com Médicos e Nutricionistas',
    category: 'Marketing & Campanhas',
    amount: 4200.00,
    date: '30/08/2026',
    status: 'pago'
  },
  {
    id: 'exp-4',
    description: 'Contrato Logística Expressa & Envio Termo-Controlado',
    category: 'Logística & Frete',
    amount: 3150.00,
    date: '01/09/2026',
    status: 'pago'
  },
  {
    id: 'exp-5',
    description: 'Tributos Fiscais e Simples Nacional Competência 08/2026',
    category: 'Impostos & Taxas',
    amount: 4920.00,
    date: '02/09/2026',
    status: 'pendente'
  }
];

export const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: 'mov-1',
    productId: 'prod-1',
    productName: 'Shake Vanilla Bourbon & Amêndoas Douradas',
    type: 'entrada',
    quantity: 100,
    reason: 'Lote de Fábrica',
    date: '20/08/2026 09:30',
    responsible: 'Coordenação de Operações'
  },
  {
    id: 'mov-2',
    productId: 'prod-1',
    productName: 'Shake Vanilla Bourbon & Amêndoas Douradas',
    type: 'saida',
    quantity: 6,
    reason: 'Amostra Cortesia (Médicos/Nutris)',
    date: '25/08/2026 14:15',
    responsible: 'Relacionamento Médico'
  },
  {
    id: 'mov-3',
    productId: 'prod-2',
    productName: 'Shake Cacao Noir & Raw Coconut',
    type: 'entrada',
    quantity: 80,
    reason: 'Lote de Fábrica',
    date: '22/08/2026 11:00',
    responsible: 'Coordenação de Operações'
  },
  {
    id: 'mov-4',
    productId: 'prod-2',
    productName: 'Shake Cacao Noir & Raw Coconut',
    type: 'saida',
    quantity: 2,
    reason: 'Avaria / Teste de Qualidade',
    date: '26/08/2026 16:40',
    responsible: 'Controle de Qualidade'
  }
];

