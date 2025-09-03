import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/app/lib/products";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const p = PRODUCTS.find((x) => String(x.id) === id);

  if (!p) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm text-neutral-600">Product not found.</p>
        <Link
          href="/"
          className="text-sm text-neutral-700 hover:text-black transition-colors"
        >
          Go home →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
      {/* Product Image */}
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 relative">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-xl font-medium">{p.title}</h1>
        <p className="mt-2 text-neutral-700">{p.price}</p>
        <div className="mt-6">
          <Link
            href="/cart"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-900 transition-colors"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
