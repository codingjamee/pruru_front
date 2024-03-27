import { faker } from '@faker-js/faker';

function generate_purchase_date() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

function generate_expiry_date() {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return faker.date.between({ from: today, to: nextWeek });
}

export const foodCardDummyArr = [
  {
    id: 1,
    method: 'frozen',
    name: '당근',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchase_date(),
    purchase_price: 5950,
    amount: 400,
    unit: 'g',
    expiry_date: generate_expiry_date(),
  },
  {
    id: 2,
    method: 'refrigerated',
    name: '토마토',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchase_date(),
    purchase_price: 10000,
    amount: 40,
    unit: 'g',
    expiry_date: generate_expiry_date(),
  },
  {
    id: 3,
    method: 'frozen',
    name: '아보카도',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchase_date(),
    amount: '3개',
    unit: 'g',
    expiry_date: generate_expiry_date(),
  },
  {
    id: 4,
    method: 'roomTemp',
    name: '바나나',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchase_date(),
    amount: 1,
    unit: '송이',
    expiry_date: generate_expiry_date(),
  },
  {
    id: 5,
    method: 'frozen',
    name: '완두콩',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchase_date(),
    amount: 1,
    unit: '개',
    expiry_date: generate_expiry_date(),
  },
];
export const receiptDummyArr = [
  {
    receipt_id: 1,
    quantity: 10,
    purchase_location: '이마트',
    purchase_date: '24.2.17',
    total_price: 20950,
  },
  {
    receipt_id: 2,
    quantity: 17,
    purchase_location: '시장마트',
    purchase_date: '24.2.27',
    total_price: 52182,
  },
  {
    receipt_id: 3,
    quantity: 1,
    purchase_location: '편의점',
    purchase_date: '24.2.9',
    total_price: 5931,
  },
  {
    receipt_id: 4,
    quantity: 1,
    purchase_location: '홈플러스',
    purchase_date: '24.2.29',
    total_price: 5931,
  },
];

export const purchaseReceiptInfo = [
  {
    receipt_id: 1,
    purchase_location: '이마트',
    purchase_date: '24.2.17',
    total_price: 21890,
    receipt_items: [
      {
        food_id: 1,
        category: '콩류',
        name: '두부',
        amount: '한모',
        purchase_price: 5240,
        price_per_amount: 5240,
        quantity: 1,
        registered: false,
      },
      {
        food_id: 2,
        name: '어린잎채소',
        category: '채소',
        amount: '200g',
        purchase_price: 7370,
        price_per_amount: 7370,
        quantity: 1,
        registered: false,
      },
      {
        food_id: 3,
        name: '흙흙당근 이름이 매우매우 긴 흙흙당근',
        category: '채소',
        amount: '1000g',
        purchase_price: 4290,
        price_per_amount: 4290,
        quantity: 1,
        registered: true,
      },
      {
        food_id: 4,
        name: '도토리묵',
        category: '채소',
        amount: '1개',
        purchase_price: 4990,
        price_per_amount: 4990,
        quantity: 1,
        registered: true,
      },
    ],
  },
  {
    receipt_id: 2,
    purchase_location: '이이마트',
    purchase_date: '24.3.17',
    receipt_items: [
      {
        food_id: 1,
        category: '콩콩류',
        name: '두부',
        amount: '한모',
        purchase_price: 5240,
        price_per_amount: 5240,
        quantity: 1,
        registered: false,
      },
      {
        food_id: 2,
        name: '어린잎잎채소',
        category: '채소',
        amount: '200g',
        purchase_price: 7370,
        price_per_amount: 7370,
        quantity: 1,
        registered: false,
      },
      {
        food_id: 3,
        name: '흙흙흙당근 이름이 매우매우 긴 흙흙당근',
        category: '채소',
        amount: '1000g',
        purchase_price: 4290,
        price_per_amount: 4290,
        quantity: 1,
        registered: true,
      },
      {
        food_id: 4,
        name: '도토리묵묵묵',
        category: '채소',
        amount: '1개',
        purchase_price: 4990,
        price_per_amount: 4990,
        quantity: 1,
        registered: true,
      },
    ],
  },
];
