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
import RecentlyFood from '../_component/RecentlyFood';
import { getFoods } from '@/_utils/getQuery';
import Foods from '../_component/Foods';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈 / PRURU',
  description: '유통기한 구매일자별 식재료',
};

const page = async () => {
  const storage = 'total';
  const sort = 'expiryDate';
  const direction = 'up';
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['foods', storage, sort, direction],
    queryFn: () => getFoods({ storage, sort, direction }),
    staleTime: 10 * 60 * 1000,
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
            <div className="m-[18px] flex h-full flex-col gap-4 text-color-card-text tablet:m-[30px] desktop:m-[40px]">
              <div className="text-size-font-card-title">식재료 추가하기</div>
              <Button
                href="/add/food"
                className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m"
                aria-label="add-food">
                <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
              </Button>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="m-[18px] flex h-full flex-col gap-4 text-color-card-text tablet:m-[30px] desktop:m-[40px] ">
              <div className="text-size-font-card-title">영수증 추가하기</div>
              <Button
                href="/add/receipt"
                className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m"
                aria-label="add-receipt">
                <PlusSvg className="h-[44px] w-[44px]" />
              </Button>
            </div>
          </CarouselItem>
        </Carousel>

        <div className="my-10 flex justify-between text-size-font-card-title">
          <div>유통기한 임박</div>
          <Link
            href="/food?storage=total&sort=expiryDate&direction=up"
            aria-label="more-expiry-food">
            더보기
          </Link>
        </div>
        <CardSliderWrapper>
          <Foods />
        </CardSliderWrapper>
        <div className="my-10 flex justify-between text-size-font-card-title">
          <div>최근 산 재료</div>
          <Link
            href="/food?storage=total&sort=purchaseDate&direction=up"
            aria-label="more-recently-food">
            더보기
          </Link>
        </div>
        <CardSliderWrapper>
          <RecentlyFood />
        </CardSliderWrapper>
      </HydrationBoundary>
    </>
  );
};

export default page;
