'use client';
import { FoodPropType } from '@/_types/FoodTypes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';
import { getFoods } from '@/_utils/getQuery';

const RecentlyFood = () => {
  const queryClient = useQueryClient();
  const storage = 'total';
  const sort = 'purchaseDate';
  const direction = 'up';

  const { data: recentFood, isSuccess } = useQuery({
    queryKey: ['foods'],
    queryFn: ({ pageParam }) =>
      getFoods({
        storage,
        sort,
        direction,
        pageParam,
      }),
    staleTime: 10 * 60 * 1000,
    initialData: queryClient.getQueryData(['foods']),
  });

  return (
    <>
      {isSuccess &&
        recentFood &&
        recentFood.foods.map((food: FoodPropType) => (
          <React.Fragment key={food.id}>
            <FoodCard className="mobile:hidden" food={food} />
            <SmallFoodCard
              className="tablet:hidden desktop:hidden"
              food={food}
            />
          </React.Fragment>
        ))}
    </>
  );
};

export default RecentlyFood;
