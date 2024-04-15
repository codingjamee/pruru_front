import {
  CustomFetchType,
  ExtendedRequestInit,
} from '@/_types/CustomFetchTypes';
import dayjs from 'dayjs';
import uuid4 from 'uuid4';

const createCustomFetch = <T>({ baseURL, headers }: CustomFetchType) => {
  return async (url = '', options?: ExtendedRequestInit): Promise<T> => {
    const baseFullUrl = `${baseURL}${url}`;
    const customHeaders = Object.entries(headers).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    let baseBody: any;
    if (options?.baseBodyType === 'custom') {
      //필요할때 custom body type설정
      baseBody = {};
    } else if (options?.dynamicValues) {
      const { format, imageUrl, timestamp, data } = options.dynamicValues;
      baseBody = {
        images: [
          {
            format: format || 'png',
            name: uuid4(),
            data: data || undefined,
            url: imageUrl || undefined,
          },
        ],
        lang: 'ko',
        requestId: uuid4(),
        timestamp: timestamp || dayjs().unix(),
        version: 'V2',
      };
    }

    if (options && options?.method?.toUpperCase() !== 'GET' && baseBody) {
      options.body = JSON.stringify(baseBody);
    } else if (options?.method?.toUpperCase() === 'GET') {
      options && delete options.body;
    }

    try {
      const response = await fetch(baseFullUrl, {
        ...options,
        headers: customHeaders,
      });

      if (options?.dynamicValues) {
        console.log('요청 성공');
      }

      const resData = await response.json();
      if (
        (response.status === 400 || response.status === 401) &&
        resData.message !== '이메일 혹은 비밀번호가 일치하지 않습니다!'
      ) {
        window.location.href = '/welcome/login';
      }
      return resData;
    } catch (err) {
      throw new Error('new Error');
    }
  };
};
export const api = <T>(
  url: string,
  options?: ExtendedRequestInit,
): Promise<T> => {
  return createCustomFetch<T>({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN as string}`,
    },
  })(url, options);
};

export const receiptApi = <T>(
  url: string,
  options?: ExtendedRequestInit,
): Promise<T> => {
  return createCustomFetch<T>({
    baseURL: ``,
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': process.env.NEXT_PUBLIC_CLOVA_SECRET_KEY,
    },
  })(url, options);
};

export const searchApi = createCustomFetch({
  baseURL: '',
  headers: {
    'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_SECRET_KEY,
  },
});
