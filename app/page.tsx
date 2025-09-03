'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import ClientOnlyButton dynamically (no SSR)
import ClientOnlyButton from '@/components/ClientOnlyButton';


// Product data
const products = [
  { id: 1, title: 'Nicole Trench Coat', price: '₹6,499', image: '/products/trench.jpg' },
  { id: 2, title: 'Wool Overshirt', price: '₹3,999', image: '/products/overshirt.jpg' },
  { id: 3, title: 'Pleated Midi Skirt', price: '₹2,499', image: '/products/skirt.jpg' },
  { id: 4, title: 'Linen Blend Shirt', price: '₹1,799', image: '/products/shirt.jpg' },
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

// Categories
const categories = [
  { name: 'Coats', href: '/category/coats', icon: '🧥', blurb: 'Tailored warmth' },
  { name: 'Dresses', href: '/category/dresses', icon: '👗', blurb: 'Day to evening' },
  { name: 'Denim', href: '/category/denim', icon: '👖', blurb: 'Everyday staples' },
  { name: 'Knitwear', href: '/category/knitwear', icon: '🧶', blurb: 'Soft textures' },
];

export default function HomePage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Ripple effect handler
  const handleRipple = (e) => {
    const target = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(target.clientWidth, target.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '9999px';
    circle.style.left = `${e.nativeEvent.offsetX - diameter / 2}px`;
    circle.style.top = `${e.nativeEvent.offsetY - diameter / 2}px`;
    circle.style.background = 'rgba(0,0,0,0.08)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 600ms ease-out forwards';

    target.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:py-20 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
              New Season Essentials
            </h1>
            <p className="mt-4 max-w-prose text-neutral-600">
              Elevated basics and outerwear designed for fit and comfort.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/category/women"
                className="rounded-md bg-black px-5 py-2.5 text-sm text-white transition-colors hover:bg-black/90"
              >
                Shop Women
              </Link>
              <Link
                href="/category/men"
                className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm transition-colors hover:border-neutral-900 hover:text-neutral-900"
              >
                Shop Men
              </Link>
            </div>
          </div>

          {/* Right Content (Hero Image Placeholder) */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="aspect-[4/3] w-full rounded-2xl bg-neutral-100"
          />
        </motion.div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-medium">Shop by Category</h2>
          <Link href="/category/new" className="text-sm text-neutral-700 hover:text-black">
            View new arrivals →
          </Link>
        </div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <Link
                href={cat.href}
                className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 transition-opacity group-hover:opacity-100"
                />
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{cat.icon}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{cat.name}</p>
                    <p className="truncate text-xs text-neutral-500">{cat.blurb}</p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg bg-neutral-100">
                  <div className="aspect-[4/3] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-100 to-white transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Explore</span>
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-[13px] transition-colors group-hover:border-neutral-900 group-hover:text-neutral-900"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-medium">Featured</h2>
          <Link href="/category/new" className="text-sm text-neutral-700 hover:text-black">
            View all
          </Link>
        </div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              variants={item}
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              {/* Badge */}
              <div className="pointer-events-none absolute left-3 top-3 z-10 select-none rounded-full bg-black/85 px-2 py-1 text-[10px] font-medium tracking-wide text-white">
                {i % 2 === 0 ? 'Bestseller' : 'New'}
              </div>

              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-b-none">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="line-clamp-1 text-sm">{p.title}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm text-neutral-700">{p.price}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500">
                    <span>★</span><span>★</span><span>★</span><span>★</span>
                    <span className="text-neutral-300">★</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <ClientOnlyButton
                    className="relative inline-flex flex-1 items-center justify-center overflow-hidden rounded-md border border-neutral-300 px-3 py-1.5 text-sm transition-colors hover:border-neutral-900 active:scale-[0.98]"
                    onClick={handleRipple}
                  >
                    Add to cart
                  </ClientOnlyButton>

                  <Link
                    href={`/product/${p.id}`}
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                    aria-label={`View ${p.title}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Ripple Animation */}
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
