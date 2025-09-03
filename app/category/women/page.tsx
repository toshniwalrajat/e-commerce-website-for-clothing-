import Link from "next/link";
import Image from "next/image";
import { fetchByPath } from "@/app/lib/products";

export default async function WomenPage() {
  const list = await fetchByPath(["women"]); // keep await for future-proofing

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 font-medium text-xl">Women</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <article
            key={p.id}
            className="rounded-xl border border-neutral-200 bg-white p-3 transition hover:shadow-md"
          >
            {/* Optimized Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 relative">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={false}
              />
            </div>

            {/* Product Details */}
            <h3 className="mt-3 text-sm font-medium">{p.title}</h3>
            <p className="text-sm text-neutral-600">{p.price}</p>
            <Link
              href={`/product/${p.id}`}
              className="mt-2 inline-block text-sm text-neutral-700 hover:text-black transition-colors"
            >
              View →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
