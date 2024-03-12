import React from 'react';
import Search from '../_component/Search';
import Card from '@/_components/Card';
import SmallFoodCard from '../_component/SmallFoodCard';
import { foodCardDummyArr } from '../home/page';
import SSmallFoodCard from '../_component/SSmallFoodCard';

function page() {
  return (
    <>
      <div className="py-[20px] mobile:py-[10px]">
        <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
          검색하기
        </div>
        <Card
          variant="outlined"
          className="min-h-[695px] w-[635px] px-[55px] mobile:min-h-[450px] mobile:px-[40px]">
          <div className="flex flex-col gap-[50px]">
            <Search />
            <div className="flex w-full flex-wrap items-start gap-4 rounded-lg  mobile:gap-3">
              {foodCardDummyArr.map((food) => (
                <>
                  <SmallFoodCard food={food} className="mobile:hidden" />
                  <SSmallFoodCard
                    food={food}
                    className="tablet:hidden desktop:hidden"
                  />
                </>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default page;
