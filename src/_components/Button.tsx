'use client';

import { useButtonProps } from '@/_hooks/useButtonProps';
import { ButtonPropsType } from '@/_types/CommonTypes';
import { FC, PropsWithChildren } from 'react';

const Button: FC<PropsWithChildren<ButtonPropsType>> = ({
  disabled,
  children,
  onClick,
  // as: tagName,
  variant,
  className,
  cyAttribute,
  ...props
}: ButtonPropsType) => {
  const getClassName = () => {
    if (variant === 'primary') {
      if (disabled) {
        return 'primary-disabled';
      }
      return 'primary hover:primary-hover';
    } else if (variant === 'outlined') {
      if (disabled) {
        return 'outlined-disabled';
      }
      return 'outlined hover:outlined-hover';
    }
    return '';
  };

  const [buttonProps, { tagName: Component }] = useButtonProps({
    disabled,
    onClick,
    ...props,
  });

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Component
        data-cy={cyAttribute}
        className={`button ${variant && getClassName()} ${className}`}
        {...buttonProps}
        {...props}>
        {children}
      </Component>
    </>
  );
};

export default Button;
