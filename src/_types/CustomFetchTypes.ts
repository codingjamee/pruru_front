export interface HeadersObjType {
  [key: string]: string | undefined;
}

// export interface ImageType {
//   format: string;
//   name: string;
//   url?: string;
//   data?: string | PromiseLike<string>;
// }

export interface CustomFetchType {
  baseURL?: string;
  headers: HeadersObjType;
  'X-OCR-SECRET'?: string;
}

export interface DynamicValuesType {
  format?: string;
  imageUrl?: string;
  timestamp?: number;
  data?: string | PromiseLike<string>;
}

export type ExtendedRequestInit = RequestInit & {
  dynamicValues?: DynamicValuesType;
  baseBodyType?: 'default' | 'custom';
};
