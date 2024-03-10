import CameraSvg from '@/_assets/CameraSvg';
import Image from 'next/image';
import { ReactElement } from 'react';

type foodPropType = {
  id: number;
  imgSrc?: string;
  foodTitle?: string;
  purchaseDate?: string;
  foodWeight?: string;
  expiryDate?: Date;
};

const FoodCard = ({
  children,
  food,
}: {
  children?: ReactElement;
  food: foodPropType;
}) => {
  const { imgSrc, foodTitle, purchaseDate, foodWeight } = food;
  // const nowDate = new Date();

  return (
    <div className="relative mx-3 flex h-[246px] w-[198px] flex-shrink-0 flex-col rounded-lg border-2 border-solid border-color-default-text shadow-custom">
      <div className="boder-color-default-text h-[133px] w-full border-b desktop:h-[125px]">
        <div className="absolute right-0 m-1 flex h-[22px] w-[60px] items-center justify-center rounded-3xl bg-color-secondary-100 text-color-card-text">
          d-
        </div>
        {imgSrc ? (
          <Image src={imgSrc} alt={imgSrc} />
        ) : (
          <div className="h-full w-full p-7">
            <CameraSvg />
          </div>
        )}
      </div>
      <div className="flex h-full w-full flex-col justify-evenly p-[18px] ">
        <div>{foodTitle}</div>
        <div className="flex w-full justify-between">
          <div>{purchaseDate}구매</div>
          <div className="mobile:hidden">{foodWeight}</div>
        </div>
      </div>
      {children && children}
    </div>
  );
};

export default FoodCard;
