'use client';

import { useButtonProps } from '@/_hooks/useButtonProps';
import { ButtonPropsType, ButtonVariant } from '@/_types/CommonTypes';
import Link from 'next/link';

const Button = ({
  href,
  disabled,
  children,
  onClick,
  // as: tagName,
  variant,
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
  };

  const [buttonProps, { tagName: Component }] = useButtonProps({
    disabled,
    onClick,
    ...props,
  });

  return (
    <>
      {
        /* @ts-expect-error Server Component */
        <Component
          className={`button ${getClassName()}`}
          {...buttonProps}
          {...props}>
          {href ? <Link href={href}>{children}</Link> : children}
        </Component>
      }
    </>
  );
};

export default Button;
