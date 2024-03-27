'use client';
import CameraSvg from '@/_assets/CameraSvg';
import { FoodCardType } from '@/_types/FoodTypes';
import { remainedTime } from '@/_utils/remainedTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FoodCard = ({ children, food, className }: FoodCardType) => {
  const { id, image_url, name, purchase_date, amount, unit, expiry_date } =
    food;
  const remainingDay = expiry_date && remainedTime(expiry_date);
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
        {image_url ? (
          <Image src={image_url} alt={image_url} width="100" height="100" />
        ) : (
          <div className="h-full w-full tablet:p-7 desktop:p-7">
            <CameraSvg />
          </div>
        )}
      </div>

      <div className="h-full w-full flex-col justify-evenly p-[18px] tablet:flex desktop:flex">
        <div>{name}</div>
        <div className="flex w-full justify-between">
          <div>
            {purchase_date &&
              new Date(purchase_date)?.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            구매
          </div>
          <div className="mobile:hidden">
            {amount}
            {unit}
          </div>
        </div>
      </div>
      {children && children}
    </div>
  );
};

export default FoodCard;
