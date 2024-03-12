'use client';
import CameraSvg from '@/_assets/CameraSvg';
import { remainedTime } from '@/_utils/remainedTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FoodCardType } from './FoodCard';

const SmallFoodCard = ({ food, className }: FoodCardType) => {
  const { id, foodImageUrl, foodName, expiryDate } = food;
  const remainingDay = expiryDate && remainedTime(expiryDate);
  const router = useRouter();

  const onClickCard = () => {
    router.push(`/food/${id}`);
  };

  return (
    <div
      onClick={onClickCard}
      className={`flex h-[133px] w-[158px] flex-shrink-0 cursor-pointer flex-col gap-[10px] rounded-lg border-2  border-solid border-color-default-text shadow-custom ${className}`}>
      <div className="relative flex h-full w-full flex-col">
        <div className="absolute right-0 m-1 flex h-[22px] w-[40px] items-center justify-center rounded-3xl bg-color-secondary-100 text-[12px] text-color-bg-sub">
          D-{remainingDay}
        </div>
        {foodImageUrl ? (
          <Image src={foodImageUrl} alt={foodImageUrl} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-[40%] pt-[10px]">
              <CameraSvg />
            </div>
          </div>
        )}
      </div>
      <div className="h-full w-full flex-col justify-evenly px-3 pt-2 text-center">
        {foodName}
      </div>
    </div>
  );
};

export default SmallFoodCard;
