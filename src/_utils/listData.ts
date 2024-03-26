import { FoodPropType } from '@/_types/FoodTypes';
import dayjs from 'dayjs';

export const editReceiptForm: {
  field: 'food_category' | 'food_name' | 'food_weight' | 'purchase_price';
  label: string;
  basis: string;
  maxWidth?: string;
  min?: number;
}[] = [
  { field: 'food_category', label: 'Food Category', basis: '2/12' },
  { field: 'food_name', label: 'Food Name', basis: '5/12', maxWidth: '127px' },
  { field: 'food_weight', label: 'Food Weight', basis: '2/12' },
  { field: 'purchase_price', label: 'Purchase Price', basis: '2/12', min: 1 },
];

export const receiptItemsInit = [
  {
    food_id: Math.random() * 4,
    food_category: undefined,
    food_name: undefined,
    food_weight: undefined,
    purchase_price: undefined,
    quantity: undefined,
    food_image: '',
    registered: false,
  },
];

export const selectLists: {
  value: 'refrigerated' | 'frozen' | 'room_temp';
  label: string;
}[] = [
  { value: 'room_temp', label: '상온' },
  { value: 'refrigerated', label: '냉장' },
  { value: 'frozen', label: '냉동' },
];

export const AddFoodInit: FoodPropType & { search_name: string } = {
  category: '카테고리',
  method: 'refrigerated',
  food_name: '',
  remain_amount: '',
  purchase_date: dayjs().format('YY.MM.DD'),
  expiry_date: '',
  purchase_location: '',
  purchase_price: 0,
  image_url: '',
  search_name: '',
};
