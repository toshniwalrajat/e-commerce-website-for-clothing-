export const metadata = { title: 'Cart | Mimosa', description: 'Your shopping cart' };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-xl font-medium">Cart</h1>
      <p className="mt-2 text-sm text-neutral-600">No items yet.</p>
    </div>
  );
}
