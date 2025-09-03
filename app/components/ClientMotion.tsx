'use client';

import { useEffect, useState } from 'react';
import { motion as fmMotion } from 'framer-motion';

export function MountGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

export const motion = fmMotion;
