"use client";

import React from "react";

type ClientOnlyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ClientOnlyButton: React.FC<ClientOnlyButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`relative overflow-hidden px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 ${props.className || ""}`}
    >
      {children}
    </button>
  );
};

export default ClientOnlyButton;
