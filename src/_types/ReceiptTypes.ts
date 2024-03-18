export interface purchaseReceiptInfoType {
  purchase_location: string;
  purchase_date: string;
  receiptItems: receiptDetailType[];
}

export interface receiptDetailType {
  food_id?: number;
  food_category: string;
  food_name: string;
  food_weight: string;
  purchase_price: number;
  price_per_amount: number;
  quantity: number;
  registered: boolean;
}

export interface ReceiptArrType {
  receipt_id: number;
  quantity: number;
  purchase_location: string;
  purchase_date: string;
  total_price: number;
}
