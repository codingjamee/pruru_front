'use client';
import ModalPortal from '@/_components/ModalPortal';
import BackDrop from './BackDrop';
import Card from './Card';
import { FC, PropsWithChildren } from 'react';

const Modal: FC<
  PropsWithChildren<{ onClick: () => void; modalIsOpen: boolean }>
> = ({ children, onClick, modalIsOpen }) => {
  return (
    <ModalPortal>
      <BackDrop onClick={onClick}>
        {modalIsOpen && (
          <Card
            variant="outlined"
            className="z-[999] m-0 flex min-h-[390px] w-[636px] flex-col p-[30px] opacity-100 mobile:w-[370px]"
            onClick={(e) => e.stopPropagation()}>
            {children}
          </Card>
        )}
      </BackDrop>
    </ModalPortal>
  );
};

export default Modal;
