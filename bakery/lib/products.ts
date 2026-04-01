export type Product = {
  id: string;
  slug: 'nastar-bread' | 'sponge-cake';
  name: string;
  unitLabel: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  accent: string;
};

export const SHIPPING_FEE = 15000;

export const products: Product[] = [
  {
    id: 'nastar-bread',
    slug: 'nastar-bread',
    name: 'Nastar Bread',
    unitLabel: 'box',
    price: 85000,
    shortDescription: 'Buttery pineapple jam-filled pastries baked fresh for cozy family gatherings.',
    description:
      'Traditional Indonesian pineapple jam-filled pastries, baked fresh daily. Buttery, melt-in-your-mouth cookies filled with homemade pineapple jam, perfect for any occasion.',
    image: '/nastar-bread.svg',
    accent: 'from-rose/80 via-cream to-antique',
  },
  {
    id: 'sponge-cake',
    slug: 'sponge-cake',
    name: 'Sponge Cake',
    unitLabel: 'loaf',
    price: 120000,
    shortDescription: 'A feather-light vanilla sponge with a golden crust and countryside warmth.',
    description:
      'Light and airy classic sponge cake made from farm-fresh eggs and pure vanilla. Perfectly moist with a golden crust, great for afternoon tea or celebrations.',
    image: '/sponge-cake.svg',
    accent: 'from-sage/60 via-cream to-rose/60',
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product]));

export const getProductBySlug = (slug: string) => productMap[slug as keyof typeof productMap];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
