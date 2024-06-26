'use client';
import { FoodPropType, FoodReturnType } from '@/_types/FoodTypes';
import { getFoods } from '@/_utils/getQuery';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';
import { useSearchParams } from 'next/navigation';
import { QueryTypes } from '@/_types/CommonTypes';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';
import { useRef } from 'react';

const Foods = () => {
  const params = useSearchParams();
  const storage: QueryTypes['storage'] =
    (params.get('storage') as QueryTypes['storage']) || 'total';
  const sort: QueryTypes['sort'] = (params.get('sort') ||
    'expiryDate') as QueryTypes['sort'];

  const direction: QueryTypes['direction'] =
    (params.get('direction') as QueryTypes['direction']) || 'up';

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
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (data.lastPage && data?.page && data?.page < data.lastPage) {
        return data?.page + 1;
      } else {
        return null;
      }
    },
    staleTime: 10 * 60 * 1000,
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
      {foodData ? (
        foodData.pages?.map((page: FoodReturnType) =>
          page?.foods?.map((food: FoodPropType) => (
            <div key={food.id}>
              <FoodCard className="mobile:hidden" food={food} />
              <SmallFoodCard
                className="tablet:hidden desktop:hidden"
                food={food}
              />
            </div>
          )),
        )
      ) : (
        <div>식재료를 등록해주세요</div>
      )}
      <div ref={targetRef} />
    </>
  );
};

export default Foods;
