import Link from "next/link";
import NewsletterClient from "./NewsletterClient";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200/60 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        {/* Help */}
        <div>
          <h4 className="mb-3 font-medium">Help</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/help/shipping" aria-label="Shipping & Returns">
                <span className="hover:text-black transition-colors">
                  Shipping &amp; Returns
                </span>
              </Link>
            </li>
            <li>
              <Link href="/account/orders" aria-label="Order Status">
                <span className="hover:text-black transition-colors">
                  Order Status
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact" aria-label="Contact Us">
                <span className="hover:text-black transition-colors">
                  Contact Us
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-3 font-medium">Shop</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/category/men" aria-label="Shop Men">
                <span className="hover:text-black transition-colors">Men</span>
              </Link>
            </li>
            <li>
              <Link href="/category/women" aria-label="Shop Women">
                <span className="hover:text-black transition-colors">Women</span>
              </Link>
            </li>
            <li>
              <Link href="/category/new" aria-label="Shop New Arrivals">
                <span className="hover:text-black transition-colors">
                  New Arrivals
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-3 font-medium">Company</h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/about" aria-label="About Company">
                <span className="hover:text-black transition-colors">About</span>
              </Link>
            </li>
            <li>
              <Link href="/careers" aria-label="Careers">
                <span className="hover:text-black transition-colors">
                  Careers
                </span>
              </Link>
            </li>
            <li>
              <Link href="/sustainability" aria-label="Sustainability">
                <span className="hover:text-black transition-colors">
                  Sustainability
                </span>
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
