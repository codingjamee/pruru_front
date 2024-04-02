'use client';
import CameraSvg from '@/_assets/CameraSvg';
import { FoodCardType } from '@/_types/FoodTypes';
import { remainedTime } from '@/_utils/remainedTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const SSmallFoodCard = ({ food, className }: FoodCardType) => {
  const { id, image_url, name, expiry_date } = food;
  // const { id, foodImageUrl, name, purchase_date, foodAmount, expiry_date } = food;
  const remainingDay = expiry_date && remainedTime(expiry_date);
  const router = useRouter();

  const onClickCard = () => {
    router.push(`/food/${id}`);
  };

  return (
    <div
      onClick={onClickCard}
      className={`flex h-[90px] w-[100px] flex-shrink-0 cursor-pointer flex-col gap-[3px] rounded-lg border-2 border-solid  border-color-default-text shadow-custom ${className}`}>
      <div className="relative flex h-full w-full flex-col">
        <div className="absolute right-0 m-1 flex h-[22px] w-[40px] items-center justify-center rounded-3xl bg-color-secondary-100  text-color-bg-sub mobile:text-[10px]">
          D-{remainingDay}
        </div>
        {image_url ? (
          <Image src={image_url} alt={image_url} className="h-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-[40%] pt-[10px]">
              <CameraSvg />
            </div>
          </div>
        )}
      </div>
      <div className="h-full w-full flex-col justify-evenly px-3 pt-2 text-center tablet:hidden desktop:hidden">
        {name}
      </div>
    </div>
  );
};

export default SSmallFoodCard;
