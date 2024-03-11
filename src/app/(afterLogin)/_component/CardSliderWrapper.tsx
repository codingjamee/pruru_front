import { ReactElement } from 'react';

const CardSliderWrapper = ({
  children,
  className,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => {
  return (
    <div className={`flex w-full overflow-x-scroll ${className}`}>
      {children}
    </div>
  );
};

export default CardSliderWrapper;
