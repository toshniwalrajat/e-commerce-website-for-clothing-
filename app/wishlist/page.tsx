export const metadata = { title: 'Wishlist | Mimosa', description: 'Saved items' };

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-xl font-medium">Wishlist</h1>
      <p className="mt-2 text-sm text-neutral-600">No saved items.</p>
    </div>
  );
}
