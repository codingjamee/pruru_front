const Arrow = ({
  direction,
  executeFn,
  inArrow,
}: {
  direction: 'left' | 'right';
  executeFn: () => void;
  inArrow?: boolean;
}) => {
  const onClickArrow = () => {
    executeFn();
  };
  return (
    <div
      onClick={onClickArrow}
      className={`${inArrow ? 'absolute z-50' : ''} ${direction === 'left' ? 'left-0 top-0' : 'right-0 top-0'}  center-vertical flex w-[30px] cursor-pointer text-[30px] hover:bg-slate-500`}>
      {direction === 'left' ? '<' : '>'}
    </div>
  );
};

export default Arrow;
