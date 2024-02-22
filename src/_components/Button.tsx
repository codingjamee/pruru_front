import { ReactNode } from 'react';

const Button = ({ children }: { children: ReactNode }) => {
  return <button className="button primary">{children}</button>;
};

export default Button;
