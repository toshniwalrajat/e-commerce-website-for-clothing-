import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Collection | Mimosa',
  description: 'Curated collection',
};

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const title = slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-medium">{title}</h1>
        <Link href="/" className="text-sm text-neutral-700 hover:text-black">Home →</Link>
      </div>

      <p className="text-sm text-neutral-600">
        Collection “{slug}” is coming soon. Replace this with real data or a fetch by slug.
      </p>
    </div>
  );
}
