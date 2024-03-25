import { FC, PropsWithChildren } from 'react';

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const BackDrop: FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <div
      className="absolute z-[999] flex h-full w-full items-center justify-center bg-color-bg-main "
      onClick={onClick}>
      {children}
    </div>
  );
};

export default BackDrop;
