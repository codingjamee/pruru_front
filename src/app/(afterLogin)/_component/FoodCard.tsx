'use client';
import CameraSvg from '@/_assets/CameraSvg';
import { FoodCardType } from '@/_types/FoodTypes';
import { remainedTime } from '@/_utils/remainedTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FoodCard = ({ children, food, className }: FoodCardType) => {
  const { id, foodImageUrl, foodName, purchaseDate, foodAmount, expiryDate } =
    food;
  const remainingDay = expiryDate && remainedTime(expiryDate);
  const router = useRouter();

  const onClickCard = () => {
    router.push(`/food/${id}`);
  };

  return (
    <div
      onClick={onClickCard}
      className={`flex w-[198px] cursor-pointer flex-col rounded-lg border-2 border-solid border-color-default-text shadow-custom mobile:hidden tablet:h-[246px] desktop:h-[246px] ${className}`}>
      <div className="boder-color-default-text relative h-full min-w-[194px] tablet:h-[125px] tablet:border-b desktop:h-[133px] desktop:border-b">
        <div className="absolute right-0 m-1 flex h-[22px] w-[60px] items-center justify-center rounded-3xl bg-color-secondary-100 text-color-card-text">
          D-{remainingDay}
        </div>
        {foodImageUrl ? (
          <Image src={foodImageUrl} alt={foodImageUrl} />
        ) : (
          <div className="h-full w-full tablet:p-7 desktop:p-7">
            <CameraSvg />
          </div>
        )}
      </div>

      <div className="h-full w-full flex-col justify-evenly p-[18px] tablet:flex desktop:flex">
        <div>{foodName}</div>
        <div className="flex w-full justify-between">
          <div>{purchaseDate}구매</div>
          <div className="mobile:hidden">{foodAmount}</div>
        </div>
      </div>
      {children && children}
    </div>
  );
};

export default FoodCard;
