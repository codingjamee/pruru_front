import { ComponentPropsWithoutRef, ReactElement } from 'react';

export type ButtonVariant = 'disabled' | 'primary' | 'outlined' | undefined;

export interface ButtonPropsType extends ComponentPropsWithoutRef<'button'> {
  children?: string | ReactElement | number | string[];
  disabled?: boolean;
  as?: React.ElementType;
  href?: string;
  customClassName?: string;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | undefined | any;
  variant?: ButtonVariant;
}
