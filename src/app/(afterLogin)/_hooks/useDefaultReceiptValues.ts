import { useMemo } from 'react';
import dayjs from 'dayjs';
import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import { receiptItemsInit } from '@/_utils/listData';

const useDefaultReceiptValues = (
  foundReceiptData: PurchaseReceiptInfoType | undefined,
  totalPrice: number | undefined,
) => {
  return useMemo(() => {
    const defaultValues = {
      purchase_location: foundReceiptData?.purchase_location || '',
      purchase_date: foundReceiptData?.purchase_date || dayjs().toDate(),
      total_price: totalPrice,
      receipt_items: foundReceiptData?.receipt_items.map((item) => ({
        category: item?.category || '',
        name: item?.name || item?.title || '',
        purchase_price: item?.purchase_price || 0,
        amount: item?.amount || 1,
        food_id: Math.random() * 4,
        quantity: item?.quantity,
        image_url: item?.image_url,
        registered: false,
      })) || [receiptItemsInit],
    };

    return defaultValues;
  }, [foundReceiptData, totalPrice]);
};

export default useDefaultReceiptValues;
