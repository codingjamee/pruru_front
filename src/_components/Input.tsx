import { ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithRef<'input'>;
type InputVariantType =
  | 'primary'
  | 'outlined'
  | 'underline'
  | 'danger'
  | 'passed';
interface InputType {
  type?: string;
  placeholder?: string;
  variant: InputVariantType;
  className?: string;
}
type CombinedInputProps = InputProps & InputType;

const Input = forwardRef<HTMLInputElement, CombinedInputProps>(
  ({ type, placeholder, variant, className, ...props }: InputType, ref) => {
    const getClassName = () => {
      const variantClasses = {
        primary: 'input-primary',
        outlined: 'input-outlined',
        underline: 'input-underline',
        danger: 'input-danger',
        passed: 'input-passed',
      };

      return variant ? variantClasses[variant] : '';
    };

    return (
      <input
        className={`input ${variant && getClassName()} ${className}`}
        type={type || 'text'}
        placeholder={placeholder}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
export default Input;
