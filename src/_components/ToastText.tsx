import { ReactNode } from 'react';

const ToastText = ({
  children,
  style,
  // toastPosCls,
}: {
  children: ReactNode | string;
  style?: object;
  toastPosCls?: 'top' | 'middle' | 'bottom';
}) => {
  return (
    <div
      className={`animate-fade-in z-50 mx-auto max-w-[210px] rounded-lg bg-sky-400 px-3 py-2.5 text-center text-sm font-semibold text-white `}
      style={style}>
      {children}
    </div>
  );
};

export default ToastText;
