import { ReactElement } from 'react';

export type FoodPropType = {
  id: number;
  foodImageUrl?: string;
  foodName?: string;
  purchaseDate?: string;
  foodAmount?: string;
  expiryDate?: string;
};

export type FoodCardType = {
  children?: ReactElement;
  food: FoodPropType;
  className?: string;
};
