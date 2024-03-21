'use client';
import dayjs from 'dayjs';
import { api, receiptApi } from './createCustomFetch';

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

export const getReceiptItems = async (receipt_id: string) => {
  const res = await api(`/receipt/${receipt_id}`, {
    next: {
      tags: ['receipt', 'items', receipt_id],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getAnalyzeReceipt = async (file: string, type: string) => {
  const res = await receiptApi(
    `/custom/${process.env.NEXT_PUBLIC_CLOVA_REQUEST_PATH}`,
    {
      method: 'POST',
      next: {
        tags: ['receipt', 'anaylze'],
      },
    },
    {
      format: type,
      data: file.split(',')[1],
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
