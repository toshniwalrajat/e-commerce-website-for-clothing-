import React from 'react';
import ClientOnlyButton from '@/components/ClientOnlyButton';

type ClientOnlyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ClientOnlyButton: React.FC<ClientOnlyButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default ClientOnlyButton;
