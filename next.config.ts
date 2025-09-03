import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for better debugging
  reactStrictMode: true,

  // Allow cross-origin dev asset requests (/_next/*) from these origins
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.1.8:3000', // your LAN IP for mobile/tablet testing
    // Add more if needed:
    // 'http://192.168.1.10:3000',
    // 'http://my-machine.local:3000',
  ],

  // Image optimization domains (add your external image sources here if used)
  images: {
    domains: ['localhost'],
  },

  // Experimental / future options can go here if needed
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
