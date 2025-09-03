'use client';

import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ClientOnlyButton = forwardRef<HTMLButtonElement, Props>(function ClientOnlyButton(
  { type = 'button', ...rest },
  ref
) {
  return <button ref={ref} type={type} suppressHydrationWarning {...rest} />;
});

export default ClientOnlyButton;
