import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Your existing options…

  // Allow cross-origin dev asset requests (/_next/*) from these origins
  // Add every origin actually used during development
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.1.8:3000', // LAN IP you’re opening on phone/tablet
    // Add more if needed:
    // 'http://192.168.1.10:3000',
    // 'http://my-machine.local:3000',
  ],
};

export default nextConfig;
