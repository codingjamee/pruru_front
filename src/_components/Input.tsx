import { ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      ...props
    }: {
      type?: string;
      placeholder?: string;
    },
    ref,
  ) => {
    return (
      <input
        className="input"
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
