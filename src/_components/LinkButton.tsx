'use client';

import { ButtonVariant } from '@/_types/CommonTypes';
import Link, { LinkProps } from 'next/link';
import { FC, PropsWithChildren, ReactNode } from 'react';

const LinkButton: FC<
  PropsWithChildren<
    LinkProps & {
      variant?: ButtonVariant;
      className?: string;
      cyAttribute?: string;
      children?: ReactNode | ReactNode[];
    }
  >
> = ({
  href,
  variant,
  className,
  cyAttribute,
  children,
  ...props
}: LinkProps & {
  variant?: ButtonVariant;
  className?: string;
  cyAttribute?: string;
  children?: ReactNode;
}) => {
  const getClassName = () => {
    if (variant === 'primary') {
      return 'primary hover:primary-hover';
    } else if (variant === 'outlined') {
      return 'outlined hover:outlined-hover';
    }
    return '';
  };

  return (
    <>
      <Link
        href={href}
        data-cy={cyAttribute}
        className={`button ${variant && getClassName()} ${className}`}
        {...props}>
        {children}
      </Link>
    </>
  );
};

export default LinkButton;
