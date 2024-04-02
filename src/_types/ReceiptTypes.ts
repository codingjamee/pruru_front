export interface PurchaseReceiptInfoType {
  id: number;
  purchase_location: string;
  purchase_date: Date;
  total_price: number;
  receipt_items: ReceiptDetailType[];
}

export interface ReceiptDetailType {
  id?: number;
  image_url?: string;
  category?: string;
  name?: string;
  title?: string;
  amount?: number;
  purchase_price?: number;
  quantity?: number;
  registered?: boolean;
}

export interface ReceiptArrType {
  id: number;
  purchase_location: string;
  purchase_date: string;
  total_price: number;
  quantity: number;
}

export interface ReceiptsReturnType {
  receipts: ReceiptArrType[];
  nextCursor: string;
}
