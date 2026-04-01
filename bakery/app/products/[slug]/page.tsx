import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductBySlug, products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
