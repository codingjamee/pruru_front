'use client';
import dayjs from 'dayjs';
import { api, searchApi } from './createCustomFetch';
// import { receiptApi } from './createCustomFetch';

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

export const getreceipt_items = async (receipt_id: string) => {
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
  console.log(file, type);
  const res = await api(`/analyze/receipt`, {
    method: 'POST',
    next: {
      tags: ['receipt', 'anaylze'],
    },
  });
  // ==================실제 요청 api (지우면안됨)==================
  // const res = await receiptApi(
  //   `/custom/${process.env.NEXT_PUBLIC_CLOVA_REQUEST_PATH}`,
  //   {
  //     method: 'POST',
  //     next: {
  //       tags: ['receipt', 'anaylze'],
  //     },
  //     dynamicValues: {
  //       format: type,
  //       data: file.split(',')[1],
  //     },
  //   },
  // );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getSearchCategory = async (
  display: number,
  tags: string[],
  searchString?: string,
) => {
  const res = await searchApi(
    `/search/${process.env.NEXT_PUBLIC_NAVER_REQUEST_PATH}${searchString}&display=${display}`,
    {
      method: 'GET',
      next: {
        tags: tags,
      },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getFoodDataById = async (foodId: string) => {
  const res = await api(`/food?${foodId}`, {
    method: 'GET',
    next: {
      tags: ['addFood', foodId],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch food Data');
  }

  return res.json();
};
