import type { Metadata } from "next";
import Link from "next/link";

// Page metadata
export const metadata: Metadata = {
  title: "Collection | Mimosa",
  description: "Curated collection",
};

// Dynamic collection page
export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Format the slug into a proper title (e.g., "summer-collection" → "Summer Collection")
  const title = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-medium text-xl">{title}</h1>
        <Link
          href="/"
          className="text-sm text-neutral-700 hover:text-black transition-colors"
        >
          Home →
        </Link>
      </div>

      {/* Content Placeholder */}
      <p className="text-sm text-neutral-600">
        Collection “{slug}” is coming soon. Replace this with real data or a
        fetch request by slug.
      </p>
    </div>
  );
}
