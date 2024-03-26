import { ReactElement } from 'react';

export type FoodPropType = {
  id?: number;
  category?: string;
  storage_id?: number;
  receipt_id?: number;
  food_name?: string;
  method?: 'refrigerated' | 'frozen' | 'room_temp';
  amount?: string;
  quantity?: number;
  unit?: string;
  remain_amount?: string;
  image_url?: string;
  purchase_price?: number;
  purchase_date?: string;
  expiry_date?: string;
  registered?: boolean;
  purchase_location?: string;
};

export type FoodCardType = {
  children?: ReactElement;
  food: FoodPropType;
  className?: string;
};
