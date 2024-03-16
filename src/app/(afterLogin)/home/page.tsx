import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Carousel from '@/_components/Carousel';
import CarouselItem from '@/_components/CarouselItem';
import CardSliderWrapper from '../_component/CardSliderWrapper';
import Link from 'next/link';
import React from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import ExpireyFood from '../_component/ExpireyFood';
import { foodsByPurchase, getFoodsByExpiry } from '@/_utils/getQuery';
import RecentlyFood from '../_component/RecentlyFood';

export const foodCardDummyArr = [
  {
    id: 1,
    foodName: '당근',
    foodImageUrl: '',
    purchaseDate: '24.2.17',
    foodAmount: '400',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 2,
    foodName: '토마토',
    foodImageUrl: '',
    purchaseDate: '24.2.19',
    foodAmount: '40g',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 3,
    foodName: '아보카도',
    foodImageUrl: '',
    purchaseDate: '24.2.12',
    foodAmount: '3개',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 4,
    foodName: '바나나',
    foodImageUrl: '',
    purchaseDate: '24.2.12',
    foodAmount: '1송이',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 5,
    foodImageUrl: '',
    foodName: '완두콩',
    purchaseDate: '24.2.12',
    foodAmount: '1개',
    expiryDate: '2024-03-30T15:00:00Z',
  },
];

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['foods', 'expiryDate'],
    queryFn: getFoodsByExpiry,
  });
  await queryClient.prefetchQuery({
    queryKey: ['foods', 'purchaseDate'],
    queryFn: foodsByPurchase,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <Carousel
          indicators={false}
          customClass="my-[63px] h-[168px] tablet:h-[225px] desktop:h-[275px]"
          arrowHoverStyle="bg-color-primary-m">
          <CarouselItem>
            <div className="m-[18px] flex h-full flex-col gap-4 tablet:m-[30px] desktop:m-[40px]">
              <div className="text-size-font-card-title">식재료 추가하기</div>
              <Button
                href="/add/food"
                className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
                <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
              </Button>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="m-[18px] flex h-full flex-col gap-4 tablet:m-[30px] desktop:m-[40px]">
              <div className="text-size-font-card-title">영수증 추가하기</div>
              <Button
                href="/add/receipt"
                className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
                <PlusSvg className="h-[44px] w-[44px]" />
              </Button>
            </div>
          </CarouselItem>
        </Carousel>

        <div className="my-10 flex justify-between text-size-font-card-title">
          <div>유통기한 임박</div>
          <Link href="/food?storage=total&sort=expiryDate">더보기</Link>
        </div>
        <CardSliderWrapper>
          <ExpireyFood />
        </CardSliderWrapper>
        <div className="my-10 flex justify-between text-size-font-card-title">
          <div>최근 산 재료</div>
          <Link href="/food?storage=total&sort=purchaseDate">더보기</Link>
        </div>
        <CardSliderWrapper>
          <RecentlyFood />
        </CardSliderWrapper>
      </HydrationBoundary>
    </>
  );
};

export default page;
