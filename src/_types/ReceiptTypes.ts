export interface PurchaseReceiptInfoType {
  receipt_id: number;
  purchase_location: string;
  purchase_date: string;
  total_price: number;
  receipt_items: ReceiptDetailType[];
}

export interface ReceiptDetailType {
  food_id?: number;
  image_url?: string;
  category?: string;
  name?: string;
  amount?: string;
  purchase_price?: number;
  price_per_amount?: number;
  quantity?: number;
  registered?: boolean;
}

export interface ReceiptArrType {
  receipt_id: number;
  quantity: number;
  purchase_location: string;
  purchase_date: string;
  total_price: number;
}
