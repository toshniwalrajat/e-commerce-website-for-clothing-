import Link from 'next/link';
import { PRODUCTS } from '@/app/lib/products';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // await the async params in Next 15
  const p = PRODUCTS.find((x) => String(x.id) === id);

  if (!p) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm text-neutral-600">Product not found.</p>
        <Link href="/" className="text-sm text-neutral-700 hover:text-black">Go home →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
      </div>
      <div>
        <h1 className="text-xl font-medium">{p.title}</h1>
        <p className="mt-2 text-neutral-700">{p.price}</p>
        <div className="mt-6">
          <Link href="/cart" className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-900">
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
