import { api } from './createCustomFetch';

export const getFoodsByExpiry = async () => {
  const res = await api(`/food?storage=total&sort=expiry_date`, {
    next: {
      tags: ['foods', 'expiryDate'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const foodsByPurchase = async () => {
  const res = await api(`/food?storage=total&sort=purchase_date`, {
    next: {
      tags: ['foods', 'purchaseDate'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
