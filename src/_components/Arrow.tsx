'use client';
import { useEffect, useState } from 'react';

const Arrow = ({
  direction,
  executeFn,
  inArrow,
  hoverStyle,
}: {
  direction: 'left' | 'right';
  executeFn: (val: 'left' | 'right') => void;
  inArrow?: boolean;
  hoverStyle?: string;
}) => {
  const [hoverColor, setHoverColor] = useState(hoverStyle || undefined);

  useEffect(() => {
    hoverStyle && setHoverColor(`hover:${hoverStyle}`);
  }, [hoverStyle]);

  return (
    <div
      onClick={() => executeFn(direction)}
      className={`${inArrow ? 'absolute z-50' : ''} ${direction === 'left' ? 'left-0 top-0 rounded-l-lg' : 'right-0 top-0 rounded-r-lg'}  center-vertical flex h-full w-[30px] cursor-pointer text-[30px] ${hoverColor && hoverColor}`}>
      {direction === 'left' ? '<' : '>'}
    </div>
  );
};

export default Arrow;
