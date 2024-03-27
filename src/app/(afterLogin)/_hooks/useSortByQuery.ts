import { QueryTypes } from '@/_types/CommonTypes';
import { FoodPropType } from '@/_types/FoodTypes';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export interface ArrayType {
  [key: string]: string;
}

const useSortByQuery = (
  { sort, direction, storage }: QueryTypes,
  data?: FoodPropType[],
) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortedData, setSortedData] = useState<FoodPropType[] | undefined>([]);

  useEffect(() => {
    setFilteredData(
      data &&
        data.filter((data) => data.method === storage || storage === 'total'),
    );
  }, [storage]);

  useEffect(() => {
    if (!data) return;
    const sorted =
      filteredData &&
      [...filteredData].sort((a, b) => {
        if (sort === 'expiryDate' || sort === 'purchaseDate') {
          let diff;
          if (sort === 'expiryDate') {
            diff = dayjs(a['expiry_date']).diff(dayjs(b['expiry_date']));
          } else {
            diff = dayjs(a['purchase_date']).diff(dayjs(b['purchase_date']));
          }
          return direction === 'up' ? -diff : diff;
        } else if (sort === 'price') {
          if (a.purchase_price && b.purchase_price)
            return direction === 'up'
              ? a.purchase_price - b.purchase_price
              : b.purchase_price - a.purchase_price;
        }
        return 0;
      });

    setSortedData(sorted);
  }, [sort, direction, filteredData]);

  return sortedData;
};

export default useSortByQuery;
