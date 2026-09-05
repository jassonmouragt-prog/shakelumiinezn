import { readFileSync } from 'node:fs';

const BASE = 'http://localhost:3111';
const products = await (await fetch(`${BASE}/api/products`)).json();
const raw = products.find((p) => p.slug === 'monte-seu-shake');

const ts = readFileSync(new URL('../lib/mock-data.ts', import.meta.url), 'utf8');
const kw = 'customizationSteps: ';
const startKw = ts.indexOf(kw, ts.indexOf('menu-monte-seu-shake'));
const arrStart = ts.indexOf('[', startKw);
let depth = 0, end = -1;
for (let i = arrStart; i < ts.length; i++) { const c = ts[i]; if (c === '[') depth++; else if (c === ']') { depth--; if (depth === 0) { end = i; break; } } }
const steps = Function('"use strict"; return (' + ts.slice(arrStart, end + 1) + ')')();

const fallback = {
  image: '/images/monte-seu-shake.jpg',
  badge: 'MONTADO NA HORA',
  gallery: ['/images/monte-seu-shake.jpg'],
  addons: [
    { id: 'add-borda', label: 'Borda', price: 8 },
    { id: 'add-casquinha', label: 'Casquinha', price: 8 }
  ]
};
// Merge igual ao AppContext
const merged = {
  ...raw,
  image: raw.image || fallback.image || '/images/shake-hero.jpg',
  badge: raw.badge || fallback.badge || null,
  gallery: raw.gallery && raw.gallery.length > 0 ? raw.gallery : fallback.gallery,
  addons: raw.addons && raw.addons.length > 0 ? raw.addons : fallback.addons,
  customizationSteps: raw.customizationSteps && raw.customizationSteps.length > 0 ? raw.customizationSteps : steps
};
console.log('merged.chaves:', Object.keys(merged).sort().join(','));
console.log('price:', merged.price, '| image:', JSON.stringify(merged.image), '| flavor:', 'Original');

const payloads = [
  {
    name: 'com steps + addons + customSelections',
    body: {
      customerName: 'Diag Builder', customerEmail: '', customerPhone: '',
      address: { street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipCode: '' },
      shippingMethod: 'retirada', shippingCost: 0, paymentMethod: 'pix',
      items: [{
        id: `menu-monte-seu-shake-${Date.now()}`,
        product: merged,
        quantity: 1,
        selectedFlavor: 'Original',
        selectedAddons: ['add-borda', 'add-casquinha'],
        customSelections: { bebida: ['copo-nrg'], sabores: ['morango', 'chocolate'] }
      }],
      subtotal: 44, discount: 0, total: 44
    }
  },
  {
    name: 'só item mínimo (sem addons/steps)',
    body: {
      customerName: 'Diag Builder 2', customerEmail: '', customerPhone: '',
      address: { street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipCode: '' },
      shippingMethod: 'retirada', shippingCost: 0, paymentMethod: 'pix',
      items: [{
        id: `menu-monte-seu-shake-${Date.now()}`,
        product: merged,
        quantity: 1,
        selectedFlavor: 'Original',
        selectedAddons: [],
        customSelections: { sabores: ['baunilha'] }
      }],
      subtotal: 28, discount: 0, total: 28
    }
  }
];

for (const p of payloads) {
  const res = await fetch(`${BASE}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p.body) });
  console.log(p.name, '->', res.status, (await res.text()).slice(0, 120));
}