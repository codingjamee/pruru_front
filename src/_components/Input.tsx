import { ComponentPropsWithRef, SyntheticEvent, forwardRef } from 'react';

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
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  name?: string;
  truncate?: boolean;
}
type CombinedInputProps = InputProps & InputType;

const Input = forwardRef<HTMLInputElement, CombinedInputProps>(
  (
    {
      type,
      placeholder,
      variant,
      className,
      onChange,
      onBlur,
      name,
      truncate,
      ...props
    }: InputType,
    ref,
  ) => {
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
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={`input ${variant && getClassName()} ${className} ${truncate && 'truncate'}`}
        type={type || 'text'}
        placeholder={placeholder}
        autoComplete="off"
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
export default Input;
