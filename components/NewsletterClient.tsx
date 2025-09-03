'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterClient() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: replace with API call or Server Action
    alert(`Thanks! Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <form className="mt-3 flex" onSubmit={handleSubmit}>
      {/* Hidden label for accessibility */}
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="off"
        className="w-full rounded-l-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
      <button
        type="submit"
        className="rounded-r-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-black/90"
      >
        Join
      </button>
    </form>
  );
}
