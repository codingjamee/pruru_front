const Arrow = ({
  direction,
  executeFn,
}: {
  direction: 'left' | 'right';
  executeFn: () => void;
}) => {
  const onClickArrow = () => {
    executeFn();
  };
  return (
    <div
      onClick={onClickArrow}
      className="center-vertical w-[30px] cursor-pointer text-[30px] hover:bg-slate-500">
      {direction === 'left' ? '<' : '>'}
    </div>
  );
};

export default Arrow;
