import {
  Product,
  LoyaltyAccount,
  LoyaltyReward,
  Order,
  Expense,
  StockMovement
} from '@/types';

export const NEUTRAL_LOYALTY_ACCOUNT: LoyaltyAccount = {
  userId: '',
  userName: '',
  userEmail: '',
  points: 0,
  tier: 'Bronze',
  nextTierPoints: 0,
  totalSaved: 0,
  referralCode: '',
  referralLink: '',
  referralCount: 0,
  referralPointsEarned: 0,
  transactions: []
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'menu-monte-seu-shake',
    slug: 'monte-seu-shake',
    name: 'Monte Seu Shake',
    subtitle: 'Proteico e saudável a partir de R$ 28,00 — monte o seu do seu jeito.',
    description: 'O protagonista do Shake Lumiine ZN: você escolhe a bebida funcional, a base, a textura, a cortesia, até 3 sabores e os adicionais. Tudo montado na hora, do seu jeito.',
    price: 28,
    category: 'shakes',
    badge: 'MAIS VENDIDO',
    image: '/images/img01.jpg',
    gallery: ['/images/img01.jpg'],
    rating: 5,
    reviewsCount: 420,
    weight: '500ml',
    servings: 1,
    flavors: [],
    ingredients: ['Proteína Vegetal Premium', 'Base Leite ou Nutrev (Lac Free)', 'Sabores Naturais', 'Adicionais Funcionais'],
    nutritionalInfo: { calories: '180 kcal', protein: '22g', carbs: '14g', fat: '3.5g', fiber: '5g', sodium: '60mg' },
    benefits: ['Montado na hora, do seu jeito', 'Altíssima densidade proteica', 'Zero açúcar adicionado', 'Impossível enjoar: 3 sabores combinados'],
    addons: [
      { id: 'add-borda', label: 'Borda', price: 8 },
      { id: 'add-calda-quente', label: 'Calda Quente', price: 8 },
      { id: 'add-farofa', label: 'Farofa', price: 8 },
      { id: 'add-crunch', label: 'Crunch', price: 8 },
      { id: 'add-colageno', label: 'Colágeno', price: 8 },
      { id: 'add-fibra', label: 'Fibra', price: 8 },
      { id: 'add-casquinha', label: 'Casquinha', price: 8 }
    ],
    customizationSteps: [
      {
        id: 'bebida',
        title: 'Bebidas Funcionais',
        subtitle: 'Escolha a bebida do seu shake',
        type: 'single',
        required: true,
        options: [
          { id: 'copo-nrg', label: 'Copo de NRG' },
          { id: 'copo-herbal', label: 'Copo de Herbal Concentrate' }
        ]
      },
      {
        id: 'base',
        title: 'Base do Seu Shake',
        subtitle: 'Escolha a base',
        type: 'single',
        required: true,
        options: [
          { id: 'nutrev', label: 'Nutrev (Lac Free)' },
          { id: 'leite', label: 'Leite' }
        ]
      },
      {
        id: 'textura',
        title: 'Textura',
        subtitle: 'Escolha a textura',
        type: 'single',
        required: true,
        options: [
          { id: 'cremoso', label: 'Cremoso' },
          { id: 'sorvete', label: 'Sorvete' }
        ]
      },
      {
        id: 'cortesia',
        title: 'Sua Cortesia',
        subtitle: 'Escolha até 3 cortesias da casa (opcional)',
        type: 'multi',
        max: 3,
        required: false,
        options: [
          { id: 'amendoim', label: 'Amendoim' },
          { id: 'leite-em-po', label: 'Leite em Pó' },
          { id: 'canela', label: 'Canela' },
          { id: 'granola', label: 'Granola' }
        ]
      },
      {
        id: 'sabores',
        title: 'Escolha o Sabor',
        subtitle: 'Combine até 3 sabores',
        type: 'multi',
        max: 3,
        required: true,
        options: [
          { id: 'baunilha', label: 'Baunilha' },
          { id: 'morango', label: 'Morango' },
          { id: 'chocolate', label: 'Chocolate' },
          { id: 'doce-de-leite', label: 'Doce de Leite' },
          { id: 'coco', label: 'Coco' },
          { id: 'pistache', label: 'Pistache' },
          { id: 'banana', label: 'Banana' },
          { id: 'cookies-and-cream', label: 'Cookies and Cream' },
          { id: 'torta-de-limao', label: 'Torta de Limão' },
          { id: 'frape-de-abacaxi', label: 'Frapê de Abacaxi' }
        ]
      }
    ],
    stock: 100,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-shake-pave-trufado',
    slug: 'shake-pave-trufado',
    name: 'Shake Pavê Trufado',
    subtitle: 'Shake cremoso de baunilha com camadas da nossa calda de chocolate.',
    description: 'Uma sobremesa em copo: shake cremoso de baunilha com camadas generosas da nossa calda de chocolate, finalizado com a textura que derrete na boca.',
    price: 46,
    category: 'shakes',
    badge: 'MAIS VENDIDO',
    image: '/images/shake-chocolate.jpg',
    gallery: ['/images/shake-chocolate.jpg', '/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 148,
    weight: '500ml',
    servings: 1,
    flavors: ['Baunilha + Chocolate'],
    ingredients: ['Proteína Vegetal Premium', 'Extrato Natural de Baunilha', 'Calda de Cacau Artesanal'],
    nutritionalInfo: { calories: '240 kcal', protein: '24g', carbs: '18g', fat: '4g', fiber: '5g', sodium: '60mg' },
    benefits: ['Alta densidade proteica', 'Saciedade prolongada', 'Zero açúcares adicionados'],
    addons: [],
    stock: 50,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-shake-churros',
    slug: 'shake-churros',
    name: 'Shake Churros',
    subtitle: 'Shake de doce de leite com borda crocante de doce de leite.',
    description: 'Clássico irresistível: shake de doce de leite com borda crocante de doce de leite, inspirado no sabor do churros.',
    price: 46,
    category: 'shakes',
    badge: 'NOVO',
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 92,
    weight: '500ml',
    servings: 1,
    flavors: ['Doce de Leite'],
    ingredients: ['Proteína Isolada', 'Aroma Natural de Doce de Leite', 'Canela do Ceilão'],
    nutritionalInfo: { calories: '235 kcal', protein: '23g', carbs: '17g', fat: '3.5g', fiber: '4g', sodium: '55mg' },
    benefits: ['Equilíbrio glicêmico', 'Rico em fibras prebióticas'],
    addons: [],
    stock: 45,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-shake-rochelle-bubbaloo',
    slug: 'shake-rochelle-bubbaloo',
    name: 'Shake Rochelle Bubbaloo',
    subtitle: 'Shake de morango com borda de uva que derrete.',
    description: 'Shake refrescante de morango com borda de uva que derrete, trazendo o sabor nostálgico do bubbaloo.',
    price: 46,
    category: 'shakes',
    badge: 'NOVO',
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 84,
    weight: '500ml',
    servings: 1,
    flavors: ['Morango + Uva'],
    ingredients: ['Blend de Frutas Vermelhas Liofilizadas', 'Proteína Vegetal Pura', 'Extrato de Uva'],
    nutritionalInfo: { calories: '220 kcal', protein: '22g', carbs: '16g', fat: '3g', fiber: '6g', sodium: '50mg' },
    benefits: ['Antioxidantes naturais', 'Refrescância extrema'],
    addons: [],
    stock: 40,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-shake-floresta-negra',
    slug: 'shake-floresta-negra',
    name: 'Shake Floresta Negra',
    subtitle: 'Shake de chocolate com farofa crocante, borda de chocolate e fibra de uva.',
    description: 'Interpretação LUMIINE da floresta negra: shake de chocolate com farofa crocante, borda de chocolate e fibra de uva.',
    price: 46,
    category: 'shakes',
    badge: null,
    image: '/images/shake-chocolate.jpg',
    gallery: ['/images/shake-chocolate.jpg'],
    rating: 5,
    reviewsCount: 76,
    weight: '500ml',
    servings: 1,
    flavors: ['Chocolate + Uva'],
    ingredients: ['Cacau 70%', 'Cereja Silvestre', 'Proteína Isolada'],
    nutritionalInfo: { calories: '245 kcal', protein: '24g', carbs: '19g', fat: '4.5g', fiber: '5.5g', sodium: '65mg' },
    benefits: ['Rico em polifenóis', 'Textura crocante e aveludada'],
    addons: [],
    stock: 35,
    isFeatured: false,
    showInShowcase: true
  },
  {
    id: 'menu-shake-ovomaltine',
    slug: 'shake-ovomaltine',
    name: 'Shake Ovomaltine',
    subtitle: 'Shake de baunilha com chocolate e borda crocante de chocolate.',
    description: 'Sabor nostálgico: shake de baunilha com chocolate, borda crocante de chocolate e finalização irresistível.',
    price: 46,
    category: 'shakes',
    badge: 'MAIS VENDIDO',
    image: '/images/shake-chocolate.jpg',
    gallery: ['/images/shake-chocolate.jpg'],
    rating: 5,
    reviewsCount: 112,
    weight: '500ml',
    servings: 1,
    flavors: ['Baunilha + Chocolate'],
    ingredients: ['Malte Puro Tostado', 'Cacau Fino', 'Proteína Vegetal'],
    nutritionalInfo: { calories: '250 kcal', protein: '25g', carbs: '20g', fat: '4g', fiber: '4.5g', sodium: '70mg' },
    benefits: ['Energia limpa para o dia a dia', 'Saciedade'],
    addons: [],
    stock: 50,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-shake-petit-gateau',
    slug: 'shake-petit-gateau',
    name: 'Shake Petit Gâteau',
    subtitle: 'Shake cremoso de baunilha com calda quente de chocolate e borda.',
    description: 'Digitação da clássica sobremesa: shake cremoso de baunilha com calda quente de chocolate e borda da casa.',
    price: 46,
    category: 'shakes',
    badge: null,
    image: '/images/shake-chocolate.jpg',
    gallery: ['/images/shake-chocolate.jpg'],
    rating: 5,
    reviewsCount: 65,
    weight: '500ml',
    servings: 1,
    flavors: ['Baunilha + Chocolate'],
    ingredients: ['Baunilha Bourbon', 'Cacau Belga', 'Blend Proteico'],
    nutritionalInfo: { calories: '248 kcal', protein: '23g', carbs: '18g', fat: '4.2g', fiber: '5g', sodium: '58mg' },
    benefits: ['Experiência gourmet proteica'],
    addons: [],
    stock: 30,
    isFeatured: false,
    showInShowcase: true
  },
  {
    id: 'menu-shake-sensacao',
    slug: 'shake-sensacao',
    name: 'Shake Sensação',
    subtitle: 'Shake de morango com borda de morango e fibra de uva que derrete.',
    description: 'Sensação cremosa: shake de morango com borda de morango e fibra de uva que derrete na boca.',
    price: 46,
    category: 'shakes',
    badge: null,
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 98,
    weight: '500ml',
    servings: 1,
    flavors: ['Morango + Uva'],
    ingredients: ['Morangos Orgânicos', 'Fibra de Uva', 'Proteína Isolada'],
    nutritionalInfo: { calories: '225 kcal', protein: '22g', carbs: '16g', fat: '3.2g', fiber: '6g', sodium: '45mg' },
    benefits: ['Refrescante e funcional'],
    addons: [],
    stock: 40,
    isFeatured: false,
    showInShowcase: true
  },
  {
    id: 'menu-shake-detox',
    slug: 'shake-detox',
    name: 'Shake Detox',
    subtitle: 'Shake de baunilha com fibra de uva e manga.',
    description: 'Leve e refrescante: shake de baunilha com fibra de uva e toques de manga para o dia a dia.',
    price: 46,
    category: 'shakes',
    badge: null,
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 54,
    weight: '500ml',
    servings: 1,
    flavors: ['Baunilha + Manga'],
    ingredients: ['Manga Fresca', 'Fibra Solúvel de Uva', 'Baunilha Natural'],
    nutritionalInfo: { calories: '210 kcal', protein: '21g', carbs: '15g', fat: '2.5g', fiber: '7g', sodium: '40mg' },
    benefits: ['Aporte de fibras e suporte digestivo'],
    addons: [],
    stock: 35,
    isFeatured: false,
    showInShowcase: true
  },
  {
    id: 'menu-hype-drink',
    slug: 'hype-drink',
    name: 'Hype Drink',
    subtitle: 'Bebida funcional energética e refrescante.',
    description: 'Hype Drink — bebida funcional com efeito termogênico e foco limpo para seu dia render com máxima energia.',
    price: 28,
    category: 'bebidas',
    badge: 'MAIS VENDIDO',
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 215,
    weight: '400ml',
    servings: 1,
    flavors: ['Frutas Tropicais', 'Citrus Power'],
    ingredients: ['Guaraná do Amazonas', 'Extrato de Chá Verde', 'Eletrólitos', 'Taurina'],
    nutritionalInfo: { calories: '45 kcal', protein: '2g', carbs: '8g', fat: '0g', fiber: '2g', sodium: '35mg' },
    benefits: ['Foco mental nítido', 'Termogênese suave', 'Zero açúcar'],
    addons: [],
    stock: 80,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-hype-drink-na-garrafa',
    slug: 'hype-drink-na-garrafa',
    name: 'Hype Drink na Garrafa',
    subtitle: 'Bebida funcional para levar com você onde for.',
    description: 'Hype Drink na garrafa — praticidade e hidratação funcional com o sabor e energia consagrados.',
    price: 30,
    category: 'bebidas',
    badge: 'NOVO',
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 68,
    weight: '500ml',
    servings: 1,
    flavors: ['Frutas Tropicais'],
    ingredients: ['Guaraná do Amazonas', 'Chá Verde', 'Minerais Quelatados'],
    nutritionalInfo: { calories: '50 kcal', protein: '2g', carbs: '9g', fat: '0g', fiber: '2g', sodium: '40mg' },
    benefits: ['Praticidade para treinos e trabalho', 'Hidratação contínua'],
    addons: [],
    stock: 60,
    isFeatured: false,
    showInShowcase: true
  },
  {
    id: 'menu-seca-nutrix-500ml',
    slug: 'seca-nutrix-500ml',
    name: 'Seca (Nutrix) 500ml',
    subtitle: 'Bebida funcional diurética e termogênica.',
    description: 'Seca (Nutrix) 500ml — fórmula exclusiva para desinchar, acelerar o metabolismo e hidratar profundamente.',
    price: 30,
    category: 'bebidas',
    badge: 'MAIS VENDIDO',
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 130,
    weight: '500ml',
    servings: 1,
    flavors: ['Limão & Hortelã'],
    ingredients: ['Hibisco Puro', 'Cavalinha', 'Chá Verde Orgânico', 'Gengibre'],
    nutritionalInfo: { calories: '35 kcal', protein: '1g', carbs: '6g', fat: '0g', fiber: '3g', sodium: '25mg' },
    benefits: ['Ação diurética e desintoxicante', 'Metabolismo ativo'],
    addons: [],
    stock: 55,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-coxinha-proteica',
    slug: 'coxinha-proteica',
    name: 'Coxinha Proteica',
    subtitle: 'Refeição saudável, assada e com alta concentração proteica.',
    description: 'Coxinha proteica — massa de batata doce e frango desfiado selecionado, assada com crosta dourada e crocante.',
    price: 15,
    category: 'salgados',
    badge: 'NOVO',
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 88,
    weight: '140g',
    servings: 1,
    flavors: ['Frango Cremoso'],
    ingredients: ['Peito de Frango Desfiado', 'Batata Doce', 'Temperos Naturais'],
    nutritionalInfo: { calories: '180 kcal', protein: '26g', carbs: '14g', fat: '3g', fiber: '4g', sodium: '120mg' },
    benefits: ['Refeição completa e rápida', '26g de pura proteína'],
    addons: [],
    stock: 40,
    isFeatured: true,
    showInShowcase: true
  },
  {
    id: 'menu-pizza-inteira',
    slug: 'pizza-inteira',
    name: 'Pizza (Inteira)',
    subtitle: 'Pizza com massa proteica funcional e recheio generoso.',
    description: 'Pizza inteira — massa leve, molho de tomate rústico e cobertura rica em proteínas para um jantar sem culpa.',
    price: 35,
    category: 'salgados',
    badge: null,
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 42,
    weight: '350g',
    servings: 2,
    flavors: ['Frango com Requeijão Light', 'Marguerita Proteica'],
    ingredients: ['Massa de Grão de Bico e Proteína', 'Queijo Light', 'Molho de Tomate Orgânico'],
    nutritionalInfo: { calories: '380 kcal', protein: '38g', carbs: '28g', fat: '9g', fiber: '7g', sodium: '240mg' },
    benefits: ['Pura saciedade', 'Ideal para pós-treino'],
    addons: [],
    stock: 25,
    isFeatured: false,
    showInShowcase: true
  },
  {
    id: 'menu-pizza-fatia',
    slug: 'pizza-fatia',
    name: 'Pizza (Fatia)',
    subtitle: 'Fatia individual de pizza proteica quentinha.',
    description: 'Pizza em fatia — opção saudável e prática do cardápio de refeições para lanches rápidos.',
    price: 10,
    category: 'salgados',
    badge: null,
    image: '/images/shake-hero.jpg',
    gallery: ['/images/shake-hero.jpg'],
    rating: 5,
    reviewsCount: 57,
    weight: '120g',
    servings: 1,
    flavors: ['Frango com Requeijão Light'],
    ingredients: ['Massa Proteica', 'Frango Desfiado', 'Queijo Light'],
    nutritionalInfo: { calories: '130 kcal', protein: '13g', carbs: '9g', fat: '3g', fiber: '2.5g', sodium: '80mg' },
    benefits: ['Lanche proteico rápido e prático'],
    addons: [],
    stock: 50,
    isFeatured: false,
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
    title: 'R$ 40 OFF no Pedido',
    pointsRequired: 1000,
    discountValue: 40.00,
    description: 'Abatimento especial para membros dedicados.',
    type: 'discount'
  },
  {
    id: 'rew-3',
    title: 'Shake Vanilla Bourbon 600g Grátis',
    pointsRequired: 1500,
    discountValue: 69.90,
    description: 'Resgate um pote inteiro de presente 100% gratuito.',
    type: 'product',
    badge: 'EXCLUSIVO GOLD'
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

