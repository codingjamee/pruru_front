import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import { api } from './createCustomFetch';

export const postReceiptData = async (
  data: PurchaseReceiptInfoType | undefined,
) => {
  const res = await api(`/receipt`, {
    next: {
      tags: ['posted', 'receipt', 'data'],
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post data');
  }

  return res.json();
};
