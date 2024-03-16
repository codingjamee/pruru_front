'use client';
import { FoodPropType } from '@/_types/FoodTypes';
import { foodsByPurchase } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';

const RecentlyFood = () => {
  const { data: purchaseFood } = useQuery({
    queryKey: ['foods', 'purchaseDate'],
    queryFn: foodsByPurchase,
  });
  return (
    <>
      {' '}
      {purchaseFood.map((food: FoodPropType) => (
        <React.Fragment key={food.id}>
          <FoodCard className="mobile:hidden" food={food} />
          <SmallFoodCard className="tablet:hidden desktop:hidden" food={food} />
        </React.Fragment>
      ))}
    </>
  );
};

export default RecentlyFood;
