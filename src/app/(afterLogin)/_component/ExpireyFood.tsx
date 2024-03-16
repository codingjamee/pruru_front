'use client';
import { FoodPropType } from '@/_types/FoodTypes';
import { getFoodsByExpiry } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';

const ExpireyFood = () => {
  const { data: expiryFood } = useQuery({
    queryKey: ['foods', 'expiryDate'],
    queryFn: getFoodsByExpiry,
  });
  return (
    <>
      {expiryFood &&
        expiryFood.map((food: FoodPropType) => (
          <div key={food.id}>
            <FoodCard className="mobile:hidden" food={food} />
            <SmallFoodCard
              className="tablet:hidden desktop:hidden"
              food={food}
            />
          </div>
        ))}
    </>
  );
};

export default ExpireyFood;
