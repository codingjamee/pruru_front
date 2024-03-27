'use client';
import { FoodPropType } from '@/_types/FoodTypes';
import { getFoods } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import FoodCard from './FoodCard';
import SmallFoodCard from './SmallFoodCard';
import { useSearchParams } from 'next/navigation';
import { QueryTypes } from '@/_types/CommonTypes';
import useSortByQuery from '../_hooks/useSortByQuery';

const ExpiryFood = () => {
  const params = useSearchParams();
  const storage: QueryTypes['storage'] =
    (params.get('storage') as QueryTypes['storage']) || 'total';
  const sort: QueryTypes['sort'] =
    (params.get('sort') as QueryTypes['sort']) || 'expiry_date';
  const direction: QueryTypes['direction'] =
    (params.get('direction') as QueryTypes['direction']) || 'down';
  const { data: expiryFood } = useQuery<FoodPropType[]>({
    queryKey: ['foods'],
    queryFn: () => getFoods(),
    staleTime: 10 * 60 * 1000,
  });

  const sortedData = useSortByQuery(
    {
      sort,
      direction,
      storage,
    },
    expiryFood,
  );
  return (
    <>
      {sortedData &&
        sortedData.map((food: FoodPropType) => (
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

export default ExpiryFood;
