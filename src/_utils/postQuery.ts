import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import { api } from './createCustomFetch';
import { FoodPropType } from '@/_types/FoodTypes';

export const postReceiptData = async (
  data: PurchaseReceiptInfoType | undefined,
) => {
  const res = await api(`/receipt`, {
    next: {
      tags: ['posted', 'receipt', 'data'],
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post data');
  }

  return res.json();
};

export const postFoodDataById = async (data: FoodPropType, foodId: string) => {
  const res = await api(`/food/${foodId}`, {
    next: {
      tags: ['addFood', foodId],
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post food data!');
  }
  return res.json();
};

export const postFoodData = async (data: FoodPropType) => {
  const res = await api('/food', {
    next: {
      tags: ['addFirstFood'],
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res;
};
