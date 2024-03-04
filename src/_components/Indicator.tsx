import { useId } from 'react';

function Indicator({ number = 0 }: { number?: number }) {
  const id = useId();
  return (
    <>
      {Array(number)
        .fill(0)
        .map((_, index) => (
          <div
            key={`${id}-${index}`}
            className="h-5 w-5 rounded-full bg-white"
          />
        ))}
    </>
  );
}

export default Indicator;
