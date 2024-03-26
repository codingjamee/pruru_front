'use client';
import Portal from '@/_components/Portal';
import BackDrop from './BackDrop';
import Card from './Card';
import { FC, PropsWithChildren } from 'react';

const Modal: FC<
  PropsWithChildren<{ onClick: () => void; modalIsOpen: boolean }>
> = ({ children, onClick, modalIsOpen }) => {
  return (
    <Portal portalTargetId="modal-root">
      <BackDrop onClick={onClick}>
        {modalIsOpen && (
          <Card
            variant="outlined"
            className="z-[999] m-0 flex min-h-[390px] w-[636px] flex-col bg-color-bg-main p-[30px] opacity-100 mobile:w-[370px] "
            onClick={(e) => e.stopPropagation()}>
            {children}
          </Card>
        )}
      </BackDrop>
    </Portal>
  );
};

export default Modal;
