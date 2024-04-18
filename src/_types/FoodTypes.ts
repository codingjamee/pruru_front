import { ReactElement } from 'react';

export type FoodPropType = {
  id?: number;
  category?: string;
  storage_id?: number;
  receipt_id?: number;
  name?: string;
  method?: 'refrigerated' | 'frozen' | 'roomTemp';
  amount?: string;
  remaining_amount?: string;
  quantity?: number;
  unit?: string;
  image_url?: string;
  purchase_price?: number;
  purchase_date?: Date;
  expiry_date?: Date;
  registered?: boolean;
  purchase_location?: string;
};

export type FoodCardType = {
  children?: ReactElement;
  food: FoodPropType;
  className?: string;
};

export type FoodReturnType = {
  foods: FoodPropType[];
  lastPage?: number;
  page?: number;
};

export interface FoodMutateType {
  ok: boolean;
  message: string;
  foodId?: number;
}
