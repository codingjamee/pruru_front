import dayjs from 'dayjs';
import { api } from './createCustomFetch';

export const getFoodsByExpiry = async () => {
  const res = await api(`/food?storage=total&sort=expiry_date`, {
    next: {
      tags: ['foods', 'expiryDate'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const foodsByPurchase = async () => {
  const res = await api(`/food?storage=total&sort=purchase_date`, {
    next: {
      tags: ['foods', 'purchase_date'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getReceiptsByMonth = async (YM?: string) => {
  if (!YM) {
    YM = dayjs().format('YY.MM');
  }
  const res = await api(`/receipt?month=${YM}`, {
    next: {
      tags: ['receipt', 'monthly'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
