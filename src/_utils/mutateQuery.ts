import {
  PurchaseReceiptInfoType,
  ReceiptPostType,
} from '@/_types/ReceiptTypes';
import { api } from './createCustomFetch';
import { FoodMutateType, FoodPropType } from '@/_types/FoodTypes';
import { UserSignupType } from '@/_types/CommonTypes';

export const signInUser = async (data: {
  email: string;
  password: string;
  name?: string;
  image?: string;
}) => {
  const res = await api<UserSignupType & { ok?: boolean }>('/user/signin', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
      image: data.image,
    }),
  });
  if (!res.ok) {
    throw new Error('Failed to post data');
  }

  // const resData = await res.json();
  console.log(res);
  return res;
};

export const postReceiptData = async (
  data: PurchaseReceiptInfoType | undefined,
) => {
  const res = await api<ReceiptPostType & { ok: boolean }>(`/receipt`, {
    next: {
      tags: ['posted', 'receipt', 'data'],
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res;
};

export const postFoodDataById = async (
  data: FoodPropType,
  foodId: string | undefined,
) => {
  const res = await api<FoodMutateType>(`/food/${foodId}`, {
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
  return res;
};

export const putFoodDataById = async (
  data: FoodPropType,
  foodId: string | undefined,
) => {
  const res = await api<FoodMutateType>(`/food/${foodId}`, {
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
  return res;
};

export const postFoodData = async (data: FoodPropType) => {
  const res = await api<FoodMutateType>('/food', {
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
  const res = await api<FoodMutateType>(`/food/${foodId}`, {
    next: {
      tags: ['deleteFood', foodId || ''],
    },
    credentials: 'include',
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete food data!');
  }
  return res;
};

export const deleteReceiptById = async (receiptId: string | undefined) => {
  const res = await api<FoodMutateType>(`/receipt/${receiptId}`, {
    next: {
      tags: ['deleteReceipt', receiptId || ''],
    },
    credentials: 'include',
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete receipt data!');
  }
  return res;
};
