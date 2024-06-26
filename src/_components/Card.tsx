'use client';
import { CardVariant } from '@/_types/CommonTypes';
import { ReactNode } from 'react';

const Card = ({
  children,
  variant,
  className,
  onClick,
}: {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  onClick?: (e?: any) => void;
}) => {
  const getClassName = (variant: CardVariant) => `${variant}`;
  return (
    <article className="center-alignment" onClick={onClick}>
      <div className={`card ${getClassName(variant)} ${className} m-1`}>
        {children}
      </div>
    </article>
  );
};

export default Card;
