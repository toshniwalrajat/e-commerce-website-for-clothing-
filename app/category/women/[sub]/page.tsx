import Link from 'next/link';
import { fetchByPath } from '@/app/lib/products';

export default async function WomenSubPage({ params }: { params: { sub: string } }) {
  const list = fetchByPath(['women', params.sub]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 font-medium capitalize">Women / {params.sub}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <article key={p.id} className="rounded-xl border border-neutral-200 bg-white p-3">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-3 text-sm">{p.title}</h3>
            <p className="text-sm text-neutral-600">{p.price}</p>
            <Link href={`/product/${p.id}`} className="mt-2 inline-block text-sm text-neutral-700 hover:text-black">View →</Link>
          </article>
        ))}
        {list.length === 0 && <p className="text-sm text-neutral-600">No items yet.</p>}
      </div>
    </div>
  );
}
