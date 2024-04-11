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
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post data');
  }

  return await res.json();
};

export const postFoodDataById = async (
  data: FoodPropType,
  foodId: string | undefined,
) => {
  const res = await api(`/food/${foodId}`, {
    next: {
      tags: ['addFood', foodId || ''],
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post food data!');
  }
  return await res.json();
};

export const putFoodDataById = async (
  data: FoodPropType,
  foodId: string | undefined,
) => {
  const res = await api(`/food/${foodId}`, {
    next: {
      tags: ['addFood', foodId || ''],
    },
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post food data!');
  }
  return await res.json();
};

export const postFoodData = async (data: FoodPropType) => {
  const res = await api('/food', {
    next: {
      tags: ['addFirstFood'],
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteFoodById = async (foodId: string | undefined) => {
  const res = await api(`/food/${foodId}`, {
    next: {
      tags: ['deleteFood', foodId || ''],
    },
    credentials: 'include',
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete food data!');
  }
  return await res.json();
};

export const deleteReceiptById = async (receiptId: string | undefined) => {
  const res = await api(`/receipt/${receiptId}`, {
    next: {
      tags: ['deleteReceipt', receiptId || ''],
    },
    credentials: 'include',
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete receipt data!');
  }
  return await res.json();
};
