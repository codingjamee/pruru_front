export interface purchaseReceiptInfoType {
  purchaseLocation: string;
  purchaseDate: string;
  receiptItems: receiptDetailType[];
}

export interface receiptDetailType {
  foodId: number;
  foodCategory: string;
  foodName: string;
  foodWeight: string;
  purchasePrice: number;
  pricePerAmount: number;
  quantity: number;
  registered: boolean;
}

export interface ReceiptArrType {
  receiptId: number;
  quantity: number;
  purchaseLocation: string;
  purchaseDate: string;
  totalPrice: number;
}
