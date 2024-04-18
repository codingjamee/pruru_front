'use client';
import dayjs from 'dayjs';
import { api, searchApi } from './createCustomFetch';
import { receiptApi } from './createCustomFetch';
import { QueryTypes } from '@/_types/CommonTypes';
import { FoodPropType, FoodReturnType } from '@/_types/FoodTypes';
import {
  PurchaseReceiptInfoType,
  ReceiptsReturnType,
} from '@/_types/ReceiptTypes';
import { AnalyzedReceiptData, SearchReturnType } from '@/_types/ReturnTypes';

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
  if (pageParam) params.append('page', pageParam.toString());
  const res = await api<FoodReturnType & { ok: boolean }>(
    `/food?${params.toString()}`,
    {
      next: {
        tags: ['foods', storage, sort, direction],
      },
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res;
};

export const getFoodById = async (id: string) => {
  const res = await api<FoodPropType & { ok: boolean }>(`/food/${id}`, {
    next: {
      tags: ['foods', id],
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to Fetch Food by id');

  return res;
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
  const res = await api<ReceiptsReturnType & { ok: boolean }>(
    `/receipt?month=${YM}&cursor=${pageParam}`,
    {
      next: {
        tags: ['receipt', 'monthly'],
      },
      credentials: 'include',
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res;
};

export const getReceiptDetail = async (receipt_id: string) => {
  const res = await api<PurchaseReceiptInfoType & { ok: boolean }>(
    `/receipt/${receipt_id}`,
    {
      next: {
        tags: ['receipt', 'items', receipt_id],
      },
      credentials: 'include',
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res;
};

export const getAnalyzeReceipt = async (file: string, type: string) => {
  const res = await receiptApi<AnalyzedReceiptData>(
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
      credentials: 'include',
    },
  );
  return res;
};

export const getSearchCategory = async (
  display: number,
  tags: string[],
  searchString?: string,
) => {
  const res = await searchApi<SearchReturnType>(
    `/search/${process.env.NEXT_PUBLIC_NAVER_REQUEST_PATH}${searchString}&display=${display}`,
    {
      method: 'GET',
      next: {
        tags: tags,
      },
      credentials: 'include',
    },
  );

  return res;
};
