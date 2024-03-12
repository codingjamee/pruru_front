import { CardVariant } from '@/_types/CommonTypes';
import { ReactNode } from 'react';

const Card = ({
  children,
  variant,
  className,
}: {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}) => {
  const getClassName = (variant: CardVariant) => `card-${variant}`;
  return (
    <div className="center-alignment">
      <div className={`card ${getClassName(variant)} ${className} m-1`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
