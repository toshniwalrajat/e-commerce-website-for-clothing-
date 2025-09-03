'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, PanInfo, type Transition } from 'framer-motion';

// Client-only search to avoid hydration drift on inputs
const SearchBox = dynamic(() => import('./SearchBox'), { ssr: false });

type NavItem = {
  name: string;
  href: string;
  mega?: { title: string; links: { label: string; href: string }[] }[];
};

const nav: NavItem[] = [
  {
    name: 'Women',
    href: '/category/women',
    mega: [
      {
        title: 'Clothing',
        links: [
          { label: 'Coats & Jackets', href: '/category/women/coats' },
          { label: 'Dresses', href: '/category/women/dresses' },
          { label: 'Denim', href: '/category/women/denim' },
          { label: 'Knitwear', href: '/category/women/knitwear' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'New In', href: '/category/women/new' },
          { label: 'Essentials', href: '/category/women/essentials' },
          { label: 'Workwear', href: '/category/women/work' },
          { label: 'Occasion', href: '/category/women/occasion' },
        ],
      },
    ],
  },
  {
    name: 'Men',
    href: '/category/men',
    mega: [
      {
        title: 'Clothing',
        links: [
          { label: 'Outerwear', href: '/category/men/outerwear' },
          { label: 'Shirts', href: '/category/men/shirts' },
          { label: 'Denim', href: '/category/men/denim' },
          { label: 'Trousers', href: '/category/men/trousers' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'New In', href: '/category/men/new' },
          { label: 'Essentials', href: '/category/men/essentials' },
          { label: 'Athleisure', href: '/category/men/athleisure' },
          { label: 'Occasion', href: '/category/men/occasion' },
        ],
      },
    ],
  },
  { name: 'New', href: '/category/new' },
  { name: 'Sale', href: '/category/sale' },
];

const defaultSuggestions = ['Trench coat', 'Wool overshirt', 'Pleated skirt', 'Linen shirt', 'Wide-leg trousers'];

// ✅ Properly typed Framer Motion transitions
const megaTransition: Transition = { type: 'spring', stiffness: 320, damping: 26 };
const sheetSpring: Transition = { type: 'spring', stiffness: 380, damping: 32, mass: 0.7 };
const backdropEase: Transition = { duration: 0.18, ease: 'linear' };

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [dropShadow, setDropShadow] = useState(false);
  const suggestRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Page scroll shadow
  useEffect(() => {
    const onScroll = () => setDropShadow(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (openMobile) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [openMobile]);

  // ESC to close + focus trap
  useEffect(() => {
    if (!openMobile) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMobile(false);
      if (e.key === 'Tab' && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    firstFocusableRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [openMobile]);

  const closeSheet = () => setOpenMobile(false);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragY = info.offset.y;
    const velocityY = info.velocity.y;
    if (dragY > 80 || velocityY > 600) {
      setOpenMobile(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-shadow ${
        dropShadow ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.08)]' : ''
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight" aria-label="Mimosa Home" onClick={() => setActiveMega(null)}>
            Mimosa
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {nav.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveMega(item.mega ? item.name : null)}
                onMouseLeave={() => setActiveMega((prev) => (prev === item.name ? null : prev))}
              >
                <Link
                  href={item.href}
                  className="group relative pb-1 text-sm text-neutral-700 transition-colors hover:text-black"
                  onClick={() => setActiveMega(null)}
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-black transition-transform duration-150 group-hover:scale-x-100" />
                </Link>

                {/* Mega menu (desktop) */}
                <AnimatePresence>
                  {item.mega && activeMega === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={megaTransition}
                      className="pointer-events-none absolute left-1/2 mt-2 -translate-x-1/2"
                      role="dialog"
                      aria-label={`${item.name} menu`}
                    >
                      <div className="pointer-events-auto w-[560px] rounded-xl border border-neutral-200 bg-white p-6 shadow-xl">
                        <div className="grid grid-cols-2 gap-6">
                          {item.mega.map((col) => (
                            <div key={col.title}>
                              <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                                {col.title}
                              </h4>
                              <ul className="space-y-2">
                                {col.links.map((l) => (
                                  <li key={l.label}>
                                    <Link
                                      href={l.href}
                                      className="text-sm text-neutral-700 transition-colors hover:text-black"
                                      onClick={() => setActiveMega(null)}
                                    >
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <div className="col-span-2 mt-2 rounded-lg bg-neutral-100 p-4">
                            <p className="text-sm">New Season Edit — explore curated looks.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Client-only Search */}
            <div className="relative" ref={suggestRef}>
              <SearchBox suggestions={defaultSuggestions} />
            </div>

            {/* Icons */}
            <div className="ml-1 hidden md:flex items-center gap-3">
              <Link
                aria-label="Wishlist"
                href="/wishlist"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                title="Wishlist"
              >
                <span className="text-2xl leading-none">♥</span>
              </Link>

              <Link
                aria-label="Cart"
                href="/cart"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                title="Cart"
              >
                <span className="text-2xl leading-none">🛒</span>
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                  0
                </span>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            suppressHydrationWarning
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 active:scale-[0.97] transition-transform"
            aria-label="Menu"
            onClick={() => setOpenMobile(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {openMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropEase}
              onClick={closeSheet}
            />

            {/* Sheet */}
            <motion.aside
              ref={sheetRef}
              className="fixed inset-x-0 top-0 z-50 h-[100dvh] bg-white will-change-transform"
              initial={{ y: '-100%', opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0.9 }}
              transition={sheetSpring}
              role="dialog"
              aria-label="Mobile menu"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.02, bottom: 0.3 }}
              onDragEnd={onDragEnd}
            >
              {/* Sheet header */}
              <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 px-4 pb-3 pt-2 backdrop-blur">
                <div className="mx-auto mt-1 mb-2 h-1.5 w-10 rounded-full bg-neutral-300" aria-hidden />
                <div className="flex items-center justify-between">
                  <Link href="/" className="font-serif text-xl" onClick={closeSheet}>
                    Mimosa
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      ref={firstFocusableRef}
                      suppressHydrationWarning
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 active:scale-[0.97] transition-transform"
                      aria-label="Close menu"
                      onClick={closeSheet}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="h-[calc(100dvh-64px)] overflow-y-auto px-4 pb-8">
                {/* Primary links */}
                <nav className="py-3">
                  <ul className="space-y-2 text-lg">
                    {nav.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-2 py-3 text-neutral-900 hover:bg-neutral-100 active:scale-[0.99] transition"
                          onClick={closeSheet}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Search */}
                <div className="mt-3">
                  <SearchBox
                    className="w-full rounded-md border border-neutral-300 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-black/10"
                    suggestions={defaultSuggestions}
                  />
                </div>

                {/* Quick actions */}
                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href="/wishlist"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 active:scale-[0.97] transition"
                    aria-label="Wishlist"
                    onClick={closeSheet}
                  >
                    <span className="text-2xl leading-none">♥</span>
                  </Link>
                  <Link
                    href="/cart"
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 active:scale-[0.97] transition"
                    aria-label="Cart"
                    onClick={closeSheet}
                  >
                    <span className="text-2xl leading-none">🛒</span>
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                      0
                    </span>
                  </Link>
                </div>

                <hr className="my-6 border-neutral-200" />

                {/* Helpful links */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">Help</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>
                        <Link href="/help/shipping" onClick={closeSheet}>
                          Shipping & Returns
                        </Link>
                      </li>
                      <li>
                        <Link href="/account/orders" onClick={closeSheet}>
                          Order Status
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" onClick={closeSheet}>
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">Shop</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>
                        <Link href="/category/men" onClick={closeSheet}>
                          Men
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/women" onClick={closeSheet}>
                          Women
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/new" onClick={closeSheet}>
                          New Arrivals
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
