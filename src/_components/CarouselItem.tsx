'use client';
import { ReactElement } from 'react';

const CarouselItem = ({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) => {
  return (
    <div className="flex max-h-[100%] flex-shrink flex-col">{children}</div>
  );
};

export default CarouselItem;
