export type Product = { id: number; title: string; price: string; image: string; path: string[] };

export const PRODUCTS: Product[] = [
  // Women
  { id: 101, title: 'Classic Trench', price: '₹6,499', image: '/vercel.svg', path: ['women', 'coats'] },
  { id: 102, title: 'Wool Overcoat', price: '₹7,999', image: '/next.svg', path: ['women', 'coats'] },
  { id: 103, title: 'Day Dress', price: '₹3,499', image: '/globe.svg', path: ['women', 'dresses'] },
  { id: 104, title: 'Denim Straight', price: '₹2,799', image: '/window.svg', path: ['women', 'denim'] },
  { id: 105, title: 'Cashmere Knit', price: '₹5,499', image: '/vercel.svg', path: ['women', 'knitwear'] },
  { id: 106, title: 'New Season Blazer', price: '₹4,999', image: '/next.svg', path: ['women', 'new'] },
  { id: 107, title: 'Essential Tee', price: '₹1,299', image: '/globe.svg', path: ['women', 'essentials'] },
  { id: 108, title: 'Workwear Shirt', price: '₹1,899', image: '/window.svg', path: ['women', 'work'] },
  { id: 109, title: 'Occasion Dress', price: '₹4,299', image: '/vercel.svg', path: ['women', 'occasion'] },
  // Men
  { id: 201, title: 'Padded Parka', price: '₹6,999', image: '/next.svg', path: ['men', 'outerwear'] },
  { id: 202, title: 'Oxford Shirt', price: '₹1,999', image: '/globe.svg', path: ['men', 'shirts'] },
  { id: 203, title: 'Denim Slim', price: '₹2,699', image: '/window.svg', path: ['men', 'denim'] },
  { id: 204, title: 'Tapered Trousers', price: '₹2,499', image: '/vercel.svg', path: ['men', 'trousers'] },
  { id: 205, title: 'New Knit Polo', price: '₹2,299', image: '/next.svg', path: ['men', 'new'] },
  { id: 206, title: 'Core Hoodie', price: '₹1,799', image: '/globe.svg', path: ['men', 'essentials'] },
  { id: 207, title: 'Athleisure Joggers', price: '₹2,199', image: '/window.svg', path: ['men', 'athleisure'] },
  { id: 208, title: 'Occasion Suit', price: '₹8,499', image: '/vercel.svg', path: ['men', 'occasion'] },
  // Shared collections
  { id: 301, title: 'Seasonal Pick 1', price: '₹3,299', image: '/next.svg', path: ['new'] },
  { id: 302, title: 'Seasonal Pick 2', price: '₹3,899', image: '/globe.svg', path: ['new'] },
  { id: 401, title: 'Discount Knit', price: '₹1,299', image: '/window.svg', path: ['sale'] },
  { id: 402, title: 'Discount Denim', price: '₹1,999', image: '/vercel.svg', path: ['sale'] },
];

export function fetchByPath(parts: string[]) {
  const key = parts.map((p) => p.toLowerCase()).filter(Boolean);
  return PRODUCTS.filter((p) => key.every((seg, i) => p.path[i] === seg));
}
