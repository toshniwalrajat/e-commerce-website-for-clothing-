import Link from 'next/link';

// Demo data; replace with a real fetch
const all = [
  { id: 1, title: 'Nicole Trench Coat', price: '₹6,499', image: '/vercel.svg', category: 'women' },
  { id: 2, title: 'Wool Overshirt', price: '₹3,999', image: '/next.svg', category: 'men' },
  { id: 3, title: 'Pleated Midi Skirt', price: '₹2,499', image: '/globe.svg', category: 'women' },
  { id: 4, title: 'Linen Blend Shirt', price: '₹1,799', image: '/window.svg', category: 'men' },
];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Next 15: unwrap server params
  const s = slug.toLowerCase();
  const list = s === 'women' || s === 'men' ? all.filter((p) => p.category === s) : all;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 font-medium capitalize">{slug}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <article key={p.id} className="rounded-xl border border-neutral-200 bg-white p-3">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-3 text-sm">{p.title}</h3>
            <p className="text-sm text-neutral-600">{p.price}</p>
            <Link
              href={`/product/${p.id}`}
              className="mt-2 inline-block text-sm text-neutral-700 hover:text-black"
            >
              View →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
