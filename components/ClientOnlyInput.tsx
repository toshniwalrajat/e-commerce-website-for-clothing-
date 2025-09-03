'use client';

import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function ClientOnlyInput(props: Props) {
  return <input {...props} autoComplete="off" suppressHydrationWarning />;
}
