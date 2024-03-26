export interface AnaylzedNameTypes {
  formatted: { value: string };
}

export type ReturnItemTypes = {
  name: AnaylzedNameTypes;
};

export interface ModifiedAnalyzeReceiptType {
  food_name: string;
  purchase_price: string;
  quantity: string;
}

export interface AnalyzedReceiptAllType {
  name: {
    text: string;
    formatted: {
      value: string;
    };
    keyText: string;
    confidenceScore: number;
    boundingPolys: Array<{
      vertices: Array<{
        x: number;
        y: number;
      }>;
    }>;
    maskingPolys: Array<unknown>;
  };
  count: {
    text: string;
    formatted: {
      value: string;
    };
    keyText: string;
    confidenceScore: number;
    boundingPolys: Array<{
      vertices: Array<{
        x: number;
        y: number;
      }>;
    }>;
  };
  price: {
    price: {
      text: string;
      formatted: {
        value: string;
      };
      keyText: string;
      confidenceScore: number;
      boundingPolys: Array<{
        vertices: Array<{
          x: number;
          y: number;
        }>;
      }>;
    };
    unitPrice?: {
      text: string;
      formatted: {
        value: string;
      };
      keyText: string;
      confidenceScore: number;
      boundingPolys: Array<{
        vertices: Array<{
          x: number;
          y: number;
        }>;
      }>;
    };
  };
}

export interface SearchReturnType {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchItems[];
}

interface SearchItems {
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
