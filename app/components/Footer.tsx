import Link from 'next/link';
import NewsletterClient from './NewsletterClient';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200/60 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        {/* Help */}
        <div>
          <h4 className="mb-3 font-medium">Help</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/help/shipping" className="hover:text-black transition-colors">
                Shipping &amp; Returns
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="hover:text-black transition-colors">
                Order Status
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-3 font-medium">Shop</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/category/men" className="hover:text-black transition-colors">
                Men
              </Link>
            </li>
            <li>
              <Link href="/category/women" className="hover:text-black transition-colors">
                Women
              </Link>
            </li>
            <li>
              <Link href="/category/new" className="hover:text-black transition-colors">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-3 font-medium">Company</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/about" className="hover:text-black transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-black transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className="hover:text-black transition-colors">
                Sustainability
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-3 font-medium">Newsletter</h4>
          <p className="text-sm text-neutral-600">Get updates on new drops.</p>
          <NewsletterClient />
        </div>
      </div>

      <div className="border-t border-neutral-200/60 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Mimosa. All rights reserved.
      </div>
    </footer>
  );
}
