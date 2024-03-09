import CameraSvg from '@/_assets/CameraSvg';
import Image from 'next/image';
import { ReactElement } from 'react';

const imgSrc = '';

const FoodCard = ({ children }: { children?: ReactElement }) => {
  return (
    <div className="shadow-custom flex h-[246px] w-[198px] flex-col rounded-lg border-2 border-solid border-color-default-text">
      <div className="boder-color-default-text h-[125px] w-full border-b ">
        {imgSrc ? (
          <Image src={imgSrc} alt={imgSrc} />
        ) : (
          <div className="h-full w-full p-7">
            <CameraSvg />
          </div>
        )}
      </div>
      <div className="flex h-full w-full flex-col justify-evenly p-[18px] ">
        <div className="">재료이름</div>
        <div className="flex w-full justify-between">
          <div>24.2.17구매</div>
          <div>40g</div>
        </div>
      </div>
      {children && children}
    </div>
  );
};

export default FoodCard;
