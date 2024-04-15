export interface AnaylzedNameTypes {
  formatted: { value: string };
}

export type ReturnItemTypes = {
  name: AnaylzedNameTypes;
};

export interface ModifiedAnalyzeReceiptType {
  name: string;
  purchase_price: string;
  quantity: string;
}

export interface AnalyzedReceiptAllType extends Item {
  text: string;
  keyText: string;
  confidenceScore: number;
  boundingPolys: {
    vertices: {
      x: number;
      y: number;
    }[];
  }[];
  maskingPolys: unknown[];
}

export interface Result {
  category1?: string;
  category3?: string;
  image?: string;
}

export interface ResultData {
  data?: {
    total?: number;
    items?: Result[];
  };
  isSuccess: boolean;
}

export interface CombinedResult {
  data: Array<
    | {
        index: number;
        title: string;
        category?: string;
        image_url?: string;
      }
    | undefined
  >;
  searchSuccess: boolean;
}

export interface DataItem {
  index: number;
  title: string;
  category?: string;
  image_url?: string;
}

export interface SearchResults {
  data: (DataItem | undefined)[];
  searchSuccess: boolean;
}

export interface SearchReturnType {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchItems[];
}

export interface SearchItems {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

interface StoreInfo {
  name: {
    formatted: {
      value: string;
    };
  };
  subName?: {
    text: string;
  };
}

interface DateFormatted {
  year: string;
  month: string;
  day: string;
}

interface PaymentInfo {
  date: {
    formatted?: DateFormatted;
  };
}

interface Price {
  price: {
    formatted: {
      value: string;
    };
  };
}

interface Count {
  formatted?: {
    value: string;
  };
  text?: string;
}

export interface Item {
  name: {
    formatted: {
      value: string;
    };
  };
  price: Price;
  count: Count;
}

interface SubResult {
  items: Item[];
}

interface ReceiptResult {
  storeInfo: StoreInfo;
  paymentInfo: PaymentInfo;
  subResults: SubResult[];
}

interface Image {
  receipt: {
    result: ReceiptResult;
  };
}

export interface AnalyzedReceiptData {
  images: Image[];
}
