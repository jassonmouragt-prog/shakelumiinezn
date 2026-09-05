#!/usr/bin/env node
// Script de seed do banco LUMIINE.
// Uso: node --env-file=.env.local db/seed.mjs
import { readFileSync } from 'node:fs';
import { randomBytes, scryptSync } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL não configurado. Crie .env.local com a connection string do Neon.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function exec(sqlText) {
  // Remove comentários de linha, depois separa em statements por ';'
  const cleaned = sqlText
    .split('\n')
    .map((l) => l.replace(/--.*$/, '').trimEnd())
    .filter((l) => l.trim() !== '')
    .join('\n');
  const stmts = cleaned
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s && s.length > 0);
  for (const stmt of stmts) {
    try {
      await sql.query(stmt);
    } catch (e) {
      // ignora erro "already exists" / duplicate se já existir
      console.warn('  (stmt skipped) ' + e.message?.slice(0, 80));
    }
  }
}

function passwordHash(pw) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(pw, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('🔧 Aplicando schema...');
  const schema = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');
  await exec(schema);
  console.log('✓ schema ok');

  // ---- Admin user ----
  console.log('Criando usuário admin...');
  const adminHash = passwordHash('admin123');
  await sql`
    INSERT INTO users (id, name, email, password_hash, role)
    VALUES ('user-admin', 'Administrador LUMIINE', 'admin@lumiine.com', ${adminHash}, 'admin')
    ON CONFLICT (email) DO NOTHING
  `;
  console.log('✓ admin criado (admin@lumiine.com / admin123)');

  // ---- Produtos ----
  console.log('Populando produtos...');
  const products = [
    {
      id: 'menu-monte-seu-shake', slug: 'monte-seu-shake',
      name: 'Monte Seu Shake',
      subtitle: 'Proteico e saudável a partir de R$ 28,00 — monte o seu do seu jeito.',
      description: 'O protagonista do Shake Lumiine ZN: você escolhe as bebidas funcionais, as bases, as texturas, as cortesias, os sabores e os adicionais que quiser — tudo é acumulativo e montado na hora.',
      price: 28, promo_price: null, category: 'shakes',
      badge: 'MAIS VENDIDO', image: '/images/3d-product.png',
      gallery: ['/images/3d-product.png'],
      rating: 5, reviews_count: 420, weight: '500ml', servings: 1,
      flavors: [],
      ingredients: ['Proteína Vegetal Premium', 'Base Leite ou Nutrev (Lac Free)', 'Sabores Naturais', 'Adicionais Funcionais'],
      nutritional_info: { calories: '180 kcal', protein: '22g', carbs: '14g', fat: '3.5g', fiber: '5g', sodium: '60mg' },
      benefits: ['Montado na hora, do seu jeito', 'Altíssima densidade proteica', 'Zero açúcar adicionado', 'Combine quantos sabores quiser'],
      addons: [
        { id: 'add-borda', label: 'Borda', price: 8 },
        { id: 'add-calda-quente', label: 'Calda Quente', price: 8 },
        { id: 'add-farofa', label: 'Farofa', price: 8 },
        { id: 'add-crunch', label: 'Crunch', price: 8 },
        { id: 'add-colageno', label: 'Colágeno', price: 8 },
        { id: 'add-fibra', label: 'Fibra', price: 8 },
        { id: 'add-casquinha', label: 'Casquinha', price: 8 }
      ],
      stock: 100, is_featured: true, show_in_showcase: true
    },
    {
      id: 'prod-1', slug: 'shake-vanilla-bourbon-amendoas',
      name: 'Shake Vanilla Bourbon & Amêndoas Douradas',
      subtitle: 'Aveludado, aromático e nutritivo com notas de fava de baunilha pura.',
      description: 'Nossa assinatura mais celebrada. Uma fusão harmoniosa de proteínas vegetais isoladas, extrato orgânico de fava de baunilha Bourbon de Madagascar, leite de amêndoas prensado a frio e minerais quelatados de alta biodisponibilidade.',
      price: 69.9, promo_price: 59.9, category: 'shakes',
      badge: 'MAIS VENDIDO', image: '/images/shake-hero.jpg',
      gallery: ['/images/shake-hero.jpg', '/images/shake-chocolate.jpg'],
      rating: 4.9, reviews_count: 382, weight: '600g', servings: 20,
      flavors: ['Vanilla Bourbon Clássica', 'Vanilla com Toque de Canela'],
      ingredients: ['Blend Proteico Ultra-Puro (Ervilha Dourada e Arroz Germinado)', 'Extrato Natural de Baunilha Bourbon de Madagascar', 'Farinha de Amêndoas Finas Prensada a Frio', 'Inulina de Raiz de Chicória (Prebiótico)', 'Complexo de Minerais Marinhos Aquamin™', 'Stévia de Alta Pureza Reb-M'],
      nutritional_info: { calories: '138 kcal', protein: '22g', carbs: '4.2g', fat: '2.8g', fiber: '5.5g', sodium: '78mg' },
      benefits: ['Saciedade prolongada e digestão ultraleve', 'Equilíbrio da microbiota com prebióticos nobres', 'Zero adição de açúcares, glúten e conservantes', 'Aporte de micronutrientes essenciais diários'],
      stock: 84, is_featured: true, show_in_showcase: true
    },
    {
      id: 'prod-2', slug: 'shake-cacao-noir-raw-coconut',
      name: 'Shake Cacao Noir & Raw Coconut',
      subtitle: 'Rico, cremoso e irresistível com cacau selvagem 100% puro.',
      description: 'Para quem não abre mão do prazer autêntico do chocolate nobre. Formulado com cacau noir monovarietal do sul da Bahia, leite de coco liofilizado e sementes de chia ativadas para uma textura de mousse cremosa.',
      price: 74.9, promo_price: 64.9, category: 'shakes',
      badge: 'NOVO', image: '/images/shake-chocolate.jpg',
      gallery: ['/images/shake-chocolate.jpg', '/images/shake-hero.jpg'],
      rating: 4.95, reviews_count: 247, weight: '600g', servings: 20,
      flavors: ['Cacao Noir 70%', 'Cacao com Nibs Torrados'],
      ingredients: ['Cacau Selvagem Noir Puro Orgânico', 'Proteína Vegetal Isolada Hipoalergênica', 'Leite de Coco Puro em Pó (Sem Maltodextrina)', 'Fibras Solúveis de Acácia', 'Extrato de Café Verde Descafeinado', 'Monk Fruit e Taumatina'],
      nutritional_info: { calories: '146 kcal', protein: '21g', carbs: '3.9g', fat: '4.1g', fiber: '6.0g', sodium: '65mg' },
      benefits: ['Rico em polifenóis antioxidantes e flavonoides', 'Sensação de bem-estar e suporte ao humor', 'Textura densa e saciante sem laticínios', 'Sem sabor residual de adoçante'],
      stock: 52, is_featured: true, show_in_showcase: true
    }
  ];
  for (const p of products) {
    await sql`
      INSERT INTO products (id, slug, name, subtitle, description, price, promo_price,
        category, badge, image, gallery, rating, reviews_count, weight,
        servings, flavors, ingredients, nutritional_info, benefits, stock, is_featured, show_in_showcase,
        addons)
      VALUES (${p.id}, ${p.slug}, ${p.name}, ${p.subtitle}, ${p.description}, ${p.price},
        ${p.promo_price}, ${p.category}, ${p.badge}, ${p.image},
        ${JSON.stringify(p.gallery)}, ${p.rating}, ${p.reviews_count}, ${p.weight},
        ${p.servings}, ${JSON.stringify(p.flavors)}, ${JSON.stringify(p.ingredients)},
        ${JSON.stringify(p.nutritional_info)}, ${JSON.stringify(p.benefits)}, ${p.stock},
        ${p.is_featured}, ${p.show_in_showcase},
        ${JSON.stringify(p.addons ?? [])})
      ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock, addons = EXCLUDED.addons
    `;
  }
  console.log('✓ produtos ok');

  // ---- Fidelidade ----
  console.log('Populando fidelidade...');
  await sql`
    INSERT INTO loyalty_accounts (id, user_name, user_email, points, tier, next_tier_points,
      total_saved, referral_code, referral_link, referral_count, referral_points_earned)
    VALUES ('account-01', 'Camila Mendonça', 'camila.mendonca@lumiine.com', 1500, 'Gold', 3000,
      340.0, 'CAMILA10', 'https://lumiine.com/indique/CAMILA10', 8, 400)
    ON CONFLICT (id) DO NOTHING
  `;
  const txs = [
    ['tx-1', '01/09/2026', 'Compra Pedido #1022 — Combo Ritual Diário', 120, 'credit'],
    ['tx-2', '24/08/2026', 'Indicação de nova cliente (Renata Silva)', 50, 'credit'],
    ['tx-3', '15/08/2026', 'Resgate de benefício Cupom R$ 25 OFF', -300, 'debit'],
    ['tx-4', '02/08/2026', 'Bônus de aniversário de membro Gold', 200, 'credit'],
    ['tx-5', '18/07/2026', 'Compra Pedido #0940 — Shake Vanilla Bourbon', 70, 'credit']
  ];
  for (const [id, date, desc, points, type] of txs) {
    await sql`
      INSERT INTO loyalty_transactions (id, account_id, date, description, points, type)
      VALUES (${id}, 'account-01', ${date}, ${desc}, ${points}, ${type})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  const rewards = [
    ['rew-1', 'R$ 15 OFF na Próxima Compra', 400, 15, 'Desconto direto no carrinho em qualquer shake ou combo.', 'discount', 'MAIS POPULAR'],
    ['rew-2', 'R$ 40 OFF no Pedido', 1000, 40, 'Abatimento especial para membros dedicados.', 'discount', null],
    ['rew-3', 'Shake Vanilla Bourbon 600g Grátis', 1500, 69.9, 'Resgate um pote inteiro de presente 100% gratuito.', 'product', 'EXCLUSIVO GOLD']
  ];
  for (const [id, title, pr, dv, desc, type, badge] of rewards) {
    await sql`
      INSERT INTO loyalty_rewards (id, title, points_required, discount_value, description, type, badge)
      VALUES (${id}, ${title}, ${pr}, ${dv}, ${desc}, ${type}, ${badge})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log('✓ fidelidade ok');

  // ---- Pedidos ----
  console.log('Populando pedidos...');
  const orders = [
    {
      id: 'ord-1025', code: '#1025', customer_name: 'Mariana Duarte', customer_email: 'mariana.duarte@email.com',
      customer_phone: '(11) 97111-2233',
      address: { street: 'Alameda Gabriel Monteiro da Silva', number: '1420', neighborhood: 'Jardim Paulistano', city: 'São Paulo', state: 'SP', zipCode: '01442-001' },
      shipping_method: 'entrega', shipping_cost: 0, payment_method: 'pix', status: 'pendente',
      subtotal: 184.7, discount: 14.8, total: 169.9, points_earned: 170,
      created_at_str: '02/09/2026 14:32', created_at_ts: '2026-09-02T14:32:00Z',
      items: [
        { id: 'item-1', product: products[0], quantity: 2, selectedFlavor: 'Vanilla Bourbon Clássica' },
        { id: 'item-2', product: products[1], quantity: 1, selectedFlavor: 'Cacao Noir 70%' }
      ]
    },
    {
      id: 'ord-1024', code: '#1024', customer_name: 'Thiago Valença', customer_email: 'thiago.valenca@email.com',
      customer_phone: '(21) 98222-3344',
      address: { street: 'Avenida Vieira Souto', number: '480', neighborhood: 'Ipanema', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22420-006' },
      shipping_method: 'entrega', shipping_cost: 0, payment_method: 'cartao', status: 'pendente',
      subtotal: 169.9, discount: 0, total: 169.9, points_earned: 170,
      created_at_str: '01/09/2026 18:10', created_at_ts: '2026-09-01T18:10:00Z',
      items: [
        { id: 'item-3', product: products[3], quantity: 1, selectedFlavor: 'Vanilla Bourbon + Cacao Noir' }
      ]
    },
    {
      id: 'ord-1023', code: '#1023', customer_name: 'Camila Mendonça', customer_email: 'camila.mendonca@lumiine.com',
      customer_phone: '(11) 99888-7766',
      address: { street: 'Rua Oscar Freire', number: '920', complement: 'Apto 104', neighborhood: 'Cerqueira César', city: 'São Paulo', state: 'SP', zipCode: '01426-000' },
      shipping_method: 'entrega', shipping_cost: 0, payment_method: 'pix', status: 'pendente',
      subtotal: 114.9, discount: 0, total: 114.9, points_earned: 115,
      created_at_str: '28/08/2026 10:15', created_at_ts: '2026-08-28T10:15:00Z',
      items: [
        { id: 'item-4', product: products[2], quantity: 1, selectedFlavor: '1x Vanilla Bourbon + 1x Cacao Noir' }
      ]
    }
  ];
  for (const o of orders) {
    await sql`
      INSERT INTO orders (id, code, customer_name, customer_email, customer_phone, address,
        shipping_method, shipping_cost, payment_method, status, subtotal, discount, total,
        points_earned, created_at_str, created_at_ts)
      VALUES (${o.id}, ${o.code}, ${o.customer_name}, ${o.customer_email}, ${o.customer_phone},
        ${JSON.stringify(o.address)}, ${o.shipping_method}, ${o.shipping_cost}, ${o.payment_method},
        ${o.status}, ${o.subtotal}, ${o.discount}, ${o.total}, ${o.points_earned},
        ${o.created_at_str}, ${o.created_at_ts})
      ON CONFLICT (id) DO NOTHING
    `;
    for (const it of o.items) {
      const p = it.product;
      await sql`
        INSERT INTO order_items (id, order_id, product_id, product_name, product_image, price,
          promo_price, quantity, selected_flavor, product_snapshot)
        VALUES (${it.id}, ${o.id}, ${p.id}, ${p.name}, ${p.image}, ${p.price},
          ${p.promo_price}, ${it.quantity}, ${it.selectedFlavor}, ${JSON.stringify(p)})
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }
  console.log('✓ pedidos ok');

  // ---- Despesas ----
  console.log('Populando despesas...');
  const expenses = [
    ['exp-1', 'Compra de Fava de Baunilha Bourbon & Amêndoas Orgânicas (Lote 40)', 'Insumos & Matérias-Primas', 5400, '28/08/2026', 'pago', 'Fornecedor certificado Fair Trade Madagascar.'],
    ['exp-2', 'Potes Cerâmicos Foscos com Tampa Metálica Dourada (500 un)', 'Embalagens & Frascos', 6800, '25/08/2026', 'pago', 'Lote com gravação a laser e selagem a vácuo.'],
    ['exp-3', 'Campanha Digital & Parcerias com Médicos e Nutricionistas', 'Marketing & Campanhas', 4200, '30/08/2026', 'pago', null],
    ['exp-4', 'Contrato Logística Expressa & Envio Termo-Controlado', 'Logística & Frete', 3150, '01/09/2026', 'pago', null],
    ['exp-5', 'Tributos Fiscais e Simples Nacional Competência 08/2026', 'Impostos & Taxas', 4920, '02/09/2026', 'pendente', null]
  ];
  for (const e of expenses) {
    const [id, description, category, amount, date, status, notes] = e;
    await sql`
      INSERT INTO expenses (id, description, category, amount, date, status, notes)
      VALUES (${id}, ${description}, ${category}, ${amount}, ${date}, ${status}, ${notes})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log('✓ despesas ok');

  // ---- Estoque ----
  console.log('Populando movimentações de estoque...');
  const moves = [
    ['mov-1', 'prod-1', 'Shake Vanilla Bourbon & Amêndoas Douradas', 'entrada', 100, 'Lote de Fábrica', '20/08/2026 09:30', 'Coordenação de Operações'],
    ['mov-2', 'prod-1', 'Shake Vanilla Bourbon & Amêndoas Douradas', 'saida', 6, 'Amostra Cortesia (Médicos/Nutris)', '25/08/2026 14:15', 'Relacionamento Médico'],
    ['mov-3', 'prod-2', 'Shake Cacao Noir & Raw Coconut', 'entrada', 80, 'Lote de Fábrica', '22/08/2026 11:00', 'Coordenação de Operações'],
    ['mov-4', 'prod-2', 'Shake Cacao Noir & Raw Coconut', 'saida', 2, 'Avaria / Teste de Qualidade', '26/08/2026 16:40', 'Controle de Qualidade']
  ];
  for (const m of moves) {
    const [id, product_id, product_name, type, quantity, reason, date, responsible] = m;
    await sql`
      INSERT INTO stock_movements (id, product_id, product_name, type, quantity, reason, date, responsible)
      VALUES (${id}, ${product_id}, ${product_name}, ${type}, ${quantity}, ${reason}, ${date}, ${responsible})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log('✓ estoque ok');

  console.log('\n✅ Seed concluído com sucesso.');
}

main().catch((e) => {
  console.error('Erro no seed:', e);
  process.exit(1);
});
