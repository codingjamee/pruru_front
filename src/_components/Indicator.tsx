import { useId } from 'react';

function Indicator({
  number = 0,
  activeIndex,
}: {
  number?: number;
  activeIndex: number;
}) {
  const id = useId();
  return (
    <>
      {Array(number)
        .fill(0)
        .map((_, index) => {
          return activeIndex === index ? (
            <div
              key={`${id}-${index}`}
              className="h-5 w-5 rounded-full bg-white"
            />
          ) : (
            <div
              key={`${id}-${index}`}
              className="h-5 w-5 rounded-full border border-white"
            />
          );
        })}
    </>
  );
}

export default Indicator;
