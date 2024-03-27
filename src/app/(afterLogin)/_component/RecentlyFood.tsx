'use client';
import { FoodPropType } from '@/_types/FoodTypes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';
import { getFoods } from '@/_utils/getQuery';
import useSortByQuery from '../_hooks/useSortByQuery';

const RecentlyFood = () => {
  const queryClient = useQueryClient();

  const { data: recentFood, isSuccess } = useQuery({
    queryKey: ['foods'],
    queryFn: getFoods,
    staleTime: 10 * 60 * 1000,
    initialData: queryClient.getQueryData(['foods']),
  });

  const sortedData = useSortByQuery(
    {
      sort: 'purchaseDate',
      direction: 'up',
      storage: 'total',
    },
    isSuccess,
    recentFood,
  );

  return (
    <>
      {sortedData?.map((food: FoodPropType) => (
        <React.Fragment key={food.id}>
          <FoodCard className="mobile:hidden" food={food} />
          <SmallFoodCard className="tablet:hidden desktop:hidden" food={food} />
        </React.Fragment>
      ))}
    </>
  );
};

export default RecentlyFood;
