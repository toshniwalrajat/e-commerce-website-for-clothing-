'use client';

import { useState } from 'react';

export default function NewsletterClient() {
  const [email, setEmail] = useState('');

  return (
    <form
      className="mt-3 flex"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: replace with API call or Server Action
        alert(`Thanks! Subscribed: ${email}`);
        setEmail('');
      }}
    >
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="off"
        suppressHydrationWarning
        className="w-full rounded-l-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
      <button
        type="submit"
        suppressHydrationWarning
        className="rounded-r-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-black/90"
      >
        Join
      </button>
    </form>
  );
}
