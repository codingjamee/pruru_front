import { FC, PropsWithChildren } from 'react';

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const BackDrop: FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <div
      className="backdrop fixed left-0  top-0 z-[999] flex h-full w-full items-center justify-center"
      onClick={onClick}>
      {children}
    </div>
  );
};

export default BackDrop;
