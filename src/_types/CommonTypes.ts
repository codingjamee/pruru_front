import { ComponentPropsWithoutRef, ReactElement } from 'react';

export type ButtonVariant = 'disabled' | 'primary' | 'outlined' | undefined;
export type CardVariant = 'primary' | 'outlined' | undefined;

export interface ButtonPropsType extends ComponentPropsWithoutRef<'button'> {
  children?: string | ReactElement | number | string[];
  disabled?: boolean;
  as?: React.ElementType;
  to?: string;
  href?: string;
  customClassName?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | undefined | any;
  variant?: ButtonVariant;
}

export type CarouselProps = {
  autoPlay?: boolean;
  stopAutoplayOnHover?: boolean;
  interval?: number;
  indicators?: boolean;
  infiniteLoop?: boolean;
  height?: number;
  index?: number;
  animation?: 'fade' | 'slide';
  duration?: number;
  children?: ReactElement | ReactElement[];
};
