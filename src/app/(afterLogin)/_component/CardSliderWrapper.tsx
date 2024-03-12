import { ReactElement } from 'react';

const CardSliderWrapper = ({
  children,
  className,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => {
  return (
    <article className={`flex w-full gap-4 overflow-x-scroll ${className}`}>
      {children}
    </article>
  );
};

export default CardSliderWrapper;
