'use client';

import { useButtonProps } from '@/_hooks/useButtonProps';
import { ButtonPropsType } from '@/_types/CommonTypes';
import Link from 'next/link';

const Button = ({
  href,
  disabled,
  children,
  onClick,
  // as: tagName,
  customClassName,
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
      {href ? (
        <Link href={href} className={className}>
          {/* @ts-expect-error Server Component */}
          <Component
            data-cy={cyAttribute}
            className={`button ${variant && getClassName()} ${customClassName} ${className}`}
            {...buttonProps}
            {...props}>
            {children}
          </Component>
        </Link>
      ) : (
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
      )}
    </>
  );
};

export default Button;
