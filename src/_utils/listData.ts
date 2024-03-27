import { QueryTextMap } from '@/_types/CommonTypes';
import { FoodPropType } from '@/_types/FoodTypes';
import dayjs from 'dayjs';

export const editReceiptForm: {
  field: 'category' | 'name' | 'amount' | 'purchase_price';
  label: string;
  basis: string;
  maxWidth?: string;
  min?: number;
}[] = [
  { field: 'category', label: 'Food Category', basis: '2/12' },
  { field: 'name', label: 'Food Name', basis: '5/12', maxWidth: '127px' },
  { field: 'amount', label: 'Food Weight', basis: '2/12' },
  { field: 'purchase_price', label: 'Purchase Price', basis: '2/12', min: 1 },
];

export const receiptItemsInit = [
  {
    food_id: Math.random() * 4,
    category: undefined,
    name: undefined,
    amount: undefined,
    purchase_price: undefined,
    quantity: undefined,
    image_url: '',
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
  name: '',
  remain_amount: '',
  purchase_date: dayjs().format('YY.MM.DD'),
  expiry_date: '',
  purchase_location: '',
  purchase_price: 0,
  image_url: '',
  search_name: '',
};

export const storageText: QueryTextMap = {
  refrigerated: '냉장',
  frozen: '냉동',
  room_temp: '상온',
  total: '전체',
};

export const sortText: QueryTextMap = {
  price: '가격순',
  expiryDate: '유통기한',
  purchaseDate: '구매일자',
};

export const directionText: QueryTextMap = {
  up: '오름차순',
  down: '내림차순',
};
