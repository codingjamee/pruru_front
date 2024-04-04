'use client';
import LeftSvg from '@/_assets/LeftSvg';
import RightSvg from '@/_assets/RightSvg';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

interface ArrowProps {
  direction: 'left' | 'right';
  executeFn: (direction: 'left' | 'right') => void;
  inArrow?: boolean;
  hoverStyle?: string;
}

const Arrow: FC<PropsWithChildren<ArrowProps>> = ({
  direction,
  executeFn,
  inArrow,
  hoverStyle,
  children,
}) => {
  const [hoverColor, setHoverColor] = useState(hoverStyle || undefined);

  useEffect(() => {
    hoverStyle && setHoverColor(`hover:${hoverStyle}`);
  }, [hoverStyle]);

  const returnString = direction === 'left' ? <LeftSvg /> : <RightSvg />;

  return (
    <div
      onClick={() => executeFn(direction)}
      className={`${inArrow ? 'absolute z-50' : ''} ${direction === 'left' ? 'left-0 top-0 rounded-l-lg' : 'right-0 top-0 rounded-r-lg'}  center-vertical flex h-full w-[30px] cursor-pointer text-[30px] ${hoverColor && hoverColor}`}>
      {returnString}
      {children}
    </div>
  );
};

export default Arrow;
