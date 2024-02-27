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
  const getClassName = (base: ButtonVariant) => {
    if (disabled) {
      return `${base}-disabled`;
    }
    return `${base} hover:${base}-hover`;
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
          className={`button ${getClassName(variant)}`}
          {...buttonProps}
          {...props}>
          {href ? <Link href={href}>{children}</Link> : children}
        </Component>
      }
    </>
  );
};

export default Button;
