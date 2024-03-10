import { ReactElement } from 'react';

const CardSliderWrapper = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <div className="flex w-full overflow-x-scroll">{children}</div>;
};

export default CardSliderWrapper;
