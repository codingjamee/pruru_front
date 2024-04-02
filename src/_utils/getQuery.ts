'use client';
import dayjs from 'dayjs';
import { api, searchApi } from './createCustomFetch';

import { receiptApi } from './createCustomFetch';
import { QueryTypes } from '@/_types/CommonTypes';

export const getFoods = async ({
  storage,
  sort,
  direction,
  pageParam,
}: QueryTypes) => {
  const params = new URLSearchParams('/food?');

  if (storage) params.append('storage', storage);
  if (sort) params.append('sort', sort);
  if (direction) params.append('direction', direction);
  if (pageParam) params.append('cursor', pageParam.toString());

  const res = await api(`/food?${params.toString()}`, {
    next: {
      tags: ['foods'],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getFoodById = async (id: string) => {
  const res = await api(`/food/${id}`, {
    next: {
      tags: ['getFoodById', id],
    },
  });
  if (!res.ok) throw new Error('Failed to Fetch Food by id');

  return res.json();
};

export const getReceiptsByMonth = async ({
  pageParam,
  YM,
}: {
  pageParam?: unknown;
  YM?: string | any;
}) => {
  if (!YM) {
    YM = dayjs().format('YY.MM');
  }
  const res = await api(`/receipt?month=${YM}&cursor=${pageParam}`, {
    next: {
      tags: ['receipt', 'monthly'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getReceiptDetail = async (receipt_id: string) => {
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
      dynamicValues: {
        format: type,
        data: file.split(',')[1],
      },
    },
  );
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
