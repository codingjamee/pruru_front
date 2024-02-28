import { CardVariant } from '@/_types/CommonTypes';
import { ReactNode } from 'react';

const Card = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: CardVariant;
}) => {
  const getClassName = (variant: CardVariant) => `card-${variant}`;
  return (
    <div className="center-alignment">
      <div className={`card ${getClassName(variant)} center-alignment m-1`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
