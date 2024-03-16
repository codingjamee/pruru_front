import { ReactElement } from 'react';

export type FoodPropType = {
  id: number;
  storage_id?: number;
  receipt_id?: number;
  food_name?: string;
  method?: 'refrigerated' | 'frozen' | 'room_temp';
  amount?: number;
  quantity?: number;
  unit?: string;
  remain_amount?: number;
  image_url?: string;
  purchase_price?: number;
  purchase_date?: Date;
  expiry_date?: string;
  registered?: boolean;
};

export type FoodCardType = {
  children?: ReactElement;
  food: FoodPropType;
  className?: string;
};
