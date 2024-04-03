import React from 'react';
import Search from '../_component/Search';
import Card from '@/_components/Card';
import SmallFoodCard from '../_component/SmallFoodCard';
import SSmallFoodCard from '../_component/SSmallFoodCard';
import dayjs from 'dayjs';

const foodCardDummyArr = [
  {
    id: 1,
    name: '당근',
    image_url: '',
    purchase_date: dayjs('2024-03-20T15:00:00Z').toDate(),
    amount: '400',
    expiry_date: dayjs('2024-03-30T15:00:00Z').toDate(),
  },
  {
    id: 2,
    name: '토마토',
    image_url: '',
    purchase_date: dayjs('2024-03-20T15:00:00Z').toDate(),
    amount: '40g',
    expiry_date: dayjs('2024-03-30T15:00:00Z').toDate(),
  },
  {
    id: 3,
    name: '아보카도',
    image_url: '',
    purchase_date: dayjs('2024-03-24T15:00:00Z').toDate(),
    amount: '3개',
    expiry_date: dayjs('2024-03-30T15:00:00Z').toDate(),
  },
  {
    id: 4,
    name: '바나나',
    image_url: '',
    purchase_date: dayjs('2024-03-28T15:00:00Z').toDate(),
    amount: '1송이',
    expiry_date: dayjs('2024-03-30T15:00:00Z').toDate(),
  },
  {
    id: 5,
    image_url: '',
    name: '완두콩',
    purchase_date: dayjs('2024-03-30T15:00:00Z').toDate(),
    amount: '1개',
    expiry_date: dayjs('2024-03-30T15:00:00Z').toDate(),
  },
];

const page = () => {
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
};

export default page;
