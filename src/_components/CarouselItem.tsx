'use client';
import { ReactElement } from 'react';

const CarouselItem = ({
  children,
  backgroundColor,
  customClassName,
}: {
  children?: ReactElement | ReactElement[];
  backgroundColor?: string;
  customClassName?: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor && backgroundColor,
      }}
      className={`flex h-full max-h-[100%] ${
        backgroundColor ?? 'bg-color-primary'
      } w-full flex-shrink flex-col rounded-lg ${customClassName}`}>
      {children}
    </div>
  );
};

export default CarouselItem;
