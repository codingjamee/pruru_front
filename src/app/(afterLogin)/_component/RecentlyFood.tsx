'use client';
import { FoodPropType, FoodReturnType } from '@/_types/FoodTypes';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';
import { getFoods } from '@/_utils/getQuery';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';

const RecentlyFood = () => {
  const storage = 'total';
  const sort = 'purchaseDate';
  const direction = 'up';
  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    data: foodData,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery<
    FoodReturnType,
    unknown,
    InfiniteData<FoodReturnType>,
    [_1: string, _2: string, _3: string, _4: string],
    unknown
  >({
    queryKey: ['foods', storage, sort, direction],
    queryFn: ({ pageParam = 0 }) =>
      getFoods({
        storage,
        sort,
        direction,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      if (data.lastPage && data?.page && data?.page < data.lastPage) {
        return data?.page + 1;
      } else {
        return null;
      }
    },
    staleTime: 10 * 60 * 1000,
    throwOnError: true,
  });

  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (!isIntersecting) return;
    if (isIntersecting && !isFetching && foodData) {
      await fetchNextPage();
    }
  };

  useIntersectionObserver({
    target: targetRef.current,
    onIntersect: onIntersect,
  });

  return (
    <>
      {foodData &&
        foodData.pages?.map((page: FoodReturnType) =>
          page?.foods?.map((food: FoodPropType) => (
            <React.Fragment key={food.id}>
              <FoodCard className="mobile:hidden" food={food} />
              <SmallFoodCard
                className="tablet:hidden desktop:hidden"
                food={food}
              />
            </React.Fragment>
          )),
        )}
    </>
  );
};

export default RecentlyFood;
