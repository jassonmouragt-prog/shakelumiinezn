import type { Product, ProductAddon } from '@/types';

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  promo_price: number | null;
  reseller_price: number;
  category: string;
  badge: string | null;
  image: string;
  gallery: unknown;
  rating: number;
  reviews_count: number;
  weight: string;
  servings: number;
  flavors: unknown;
  ingredients: unknown;
  nutritional_info: unknown;
  benefits: unknown;
  addons: unknown;
  stock: number;
  is_featured: boolean;
  show_in_showcase: boolean;
};

export function productFromRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    description: row.description,
    price: row.price,
    promoPrice: row.promo_price ?? undefined,
    resellerPrice: row.reseller_price,
    category: row.category as Product['category'],
    badge: (row.badge as Product['badge']) ?? null,
    image: row.image,
    gallery: (row.gallery as string[]) ?? [],
    rating: row.rating,
    reviewsCount: row.reviews_count,
    weight: row.weight,
    servings: row.servings,
    flavors: (row.flavors as string[]) ?? [],
    ingredients: (row.ingredients as string[]) ?? [],
    nutritionalInfo: (row.nutritional_info as Product['nutritionalInfo']) ?? {},
    benefits: (row.benefits as string[]) ?? [],
    addons: (row.addons as ProductAddon[]) ?? [],
    stock: row.stock,
    isFeatured: row.is_featured,
    showInShowcase: row.show_in_showcase
  };
}
