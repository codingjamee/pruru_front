import { useButtonProps } from '@/_hooks/useButtonProps';
import { ButtonPropsType, ButtonVariant } from '@/_types/CommonTypes';

const Button = ({
  href,
  disabled,
  children,
  onClick,
  as: tagName,
  variant,
  ...props
}: ButtonPropsType) => {
  const getClassName = (variant: ButtonVariant) => {
    if (variant === 'primary') {
      return 'primary hover:primary-hover';
    } else if (variant === 'outlined') {
      return 'outlined hover:outlined-hover';
    }
  };

  const [buttonProps, { tagName: Component }] = useButtonProps({
    href,
    disabled,
    onClick,
    ...props,
  });

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Component
        className={`button ${getClassName(variant)}`}
        {...buttonProps}
        {...props}>
        {children}
      </Component>
    </>
  );
};

export default Button;
