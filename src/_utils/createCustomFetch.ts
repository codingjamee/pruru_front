import dayjs from 'dayjs';
import uuid4 from 'uuid4';

interface HeadersObjType {
  [key: string]: string | undefined;
}

interface ImageType {
  format: string;
  name: string;
  url?: string;
  data?: string | PromiseLike<string>;
}

interface CustomFetchType {
  baseURL?: string;
  headers: HeadersObjType;
  'X-OCR-SECRET'?: string;
}

interface DynamicValuesType {
  format?: string;
  imageUrl?: string;
  timestamp?: number;
  data?: string | PromiseLike<string>;
}

const createCustomFetch = ({ baseURL, headers }: CustomFetchType) => {
  return async (url = '', options?: RequestInit): Promise<Response> => {
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
    let response;
    try {
      response = await fetch(baseFullUrl, {
        ...options,
        headers: customHeaders,
      });
    } catch (err) {
      console.error(err);
      throw new Error('error occured!');
    }
    return response;
  };
};

export const api = createCustomFetch({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN as string}`,
  },
});

const createCustomReceiptFetch = ({ baseURL, headers }: CustomFetchType) => {
  return async (
    url = '',
    options?: RequestInit,
    dynamicValues?: DynamicValuesType,
  ): Promise<Response> => {
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
    const baseBody = {
      images: [
        {
          format: 'png',
          name: uuid4(),
          data: undefined,
          url: undefined,
        },
      ] as ImageType[],
      lang: 'ko',
      requestId: uuid4(),
      timestamp: dayjs().unix(),
      version: 'V2',
    };

    if (dynamicValues) {
      if (dynamicValues.format) {
        baseBody.images[0].format = dynamicValues.format;
      }
      if (dynamicValues.imageUrl) {
        baseBody.images[0].url = dynamicValues.imageUrl;
      }
      if (dynamicValues.timestamp) {
        baseBody.timestamp = dynamicValues.timestamp;
      }
      if (dynamicValues.data) {
        baseBody.images[0].data = dynamicValues.data;
      }
    }
    if (options && options.method && options.method.toUpperCase() !== 'GET') {
      options.body = JSON.stringify(baseBody);
    } else {
      options && delete options.body;
    }
    let response;
    try {
      response = await fetch(baseFullUrl, {
        ...options,
        headers: customHeaders,
        body: JSON.stringify(baseBody),
      });
      console.log('요청 성공');
    } catch (err) {
      console.error(err);
      throw new Error('error occured!');
    }
    return response;
  };
};

export const receiptApi = createCustomReceiptFetch({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    'X-OCR-SECRET': process.env.NEXT_PUBLIC_CLOVA_SECRET_KEY,
  },
});
