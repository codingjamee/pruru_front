import React from 'react';
import FoodCard from '../_component/FoodCard';
import SmallFoodCard from '../_component/SmallFoodCard';
import { foodCardDummyArr } from '../home/page';
import QueryComponent from '../_component/QueryComponent';

const page = () => {
  return (
    <div className="flex w-full flex-col gap-[20px] pt-[20px]">
      <div className="flex w-full flex-row justify-between gap-[40px] pt-[20px]">
        <div className="flex gap-[20px]">
          <div>식재료 관리</div>
          <QueryComponent value="storage" />
        </div>
        <div className="flex">
          <QueryComponent value="sort" />
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[10px]">
        {foodCardDummyArr.map((food) => (
          <React.Fragment key={food.id}>
            <FoodCard className="mobile:hidden" food={food} />
            <SmallFoodCard
              className="tablet:hidden desktop:hidden"
              food={food}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default page;
