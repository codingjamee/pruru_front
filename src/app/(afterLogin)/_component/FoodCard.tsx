'use client';
import CameraSvg from '@/_assets/CameraSvg';
import { remainedTime } from '@/_utils/remainedTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

type foodPropType = {
  id: number;
  imgSrc?: string;
  foodTitle?: string;
  purchaseDate?: string;
  foodWeight?: string;
  expiryDate?: string;
};

const FoodCard = ({
  children,
  food,
  className,
}: {
  children?: ReactElement;
  food: foodPropType;
  className?: string;
}) => {
  const { id, imgSrc, foodTitle, purchaseDate, foodWeight, expiryDate } = food;
  const remainingDay = expiryDate && remainedTime(expiryDate);
  const router = useRouter();

  const onClickCard = () => {
    router.push(`/food/${id}`);
  };

  return (
    <div
      onClick={onClickCard}
      className={`mx-3 flex w-[198px] cursor-pointer flex-col rounded-lg border-2 border-solid border-color-default-text shadow-custom mobile:hidden tablet:h-[246px] desktop:h-[246px] ${className}`}>
      <div className="boder-color-default-text relative h-full min-w-[194px] tablet:h-[125px] tablet:border-b desktop:h-[133px] desktop:border-b">
        <div className="absolute right-0 m-1 flex h-[22px] w-[60px] items-center justify-center rounded-3xl bg-color-secondary-100 text-color-card-text">
          d-{remainingDay}
        </div>
        {imgSrc ? (
          <Image src={imgSrc} alt={imgSrc} />
        ) : (
          <div className="h-full w-full tablet:p-7 desktop:p-7">
            <CameraSvg />
          </div>
        )}
      </div>

      <div className="h-full w-full flex-col justify-evenly p-[18px] tablet:flex desktop:flex">
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
