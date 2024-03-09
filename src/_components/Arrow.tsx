import { useEffect, useState } from 'react';

const Arrow = ({
  direction,
  executeFn,
  inArrow,
  hoverStyle,
}: {
  direction: 'left' | 'right';
  executeFn: () => void;
  inArrow?: boolean;
  hoverStyle?: string;
}) => {
  const onClickArrow = () => {
    executeFn();
  };
  const [hoverColor, setHoverColor] = useState(hoverStyle || undefined);

  useEffect(() => {
    hoverStyle && setHoverColor(`hover:${hoverStyle}`);
  }, [hoverStyle]);

  return (
    <div
      onClick={onClickArrow}
      className={`${inArrow ? 'absolute z-50' : ''} ${direction === 'left' ? 'left-0 top-0 rounded-l-lg' : 'right-0 top-0 rounded-r-lg'}  center-vertical flex h-full w-[30px] cursor-pointer text-[30px] ${hoverColor && hoverColor}`}>
      {direction === 'left' ? '<' : '>'}
    </div>
  );
};

export default Arrow;
