import { FoodPropType } from '@/_types/FoodTypes';
import { AddFoodInit } from '@/_utils/listData';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const useDefaultFood = (foodData: FoodPropType | undefined) => {
  return useMemo(() => {
    const defaultValues = foodData
      ? {
          category: foodData.category,
          method: foodData.method || 'roomTemp',
          name: foodData.name,
          remaining_amount: foodData.remaining_amount,
          purchase_date: foodData.purchase_date || dayjs().toDate(),
          expiry_date: foodData.expiry_date,
          purchase_location: foodData.purchase_location,
          purchase_price: foodData.purchase_price,
          image_url: foodData.image_url,
          registered: true,
          search_name: '',
        }
      : AddFoodInit;
    return defaultValues;
  }, [foodData]);
};

export default useDefaultFood;
