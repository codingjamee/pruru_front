import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
/**
 *   storage_id?: number;
  receipt_id?: number;
  food_id?: number;
  method?: 'refrigerated' | 'frozen' | 'room_temp';
  amount?: number;
  quantity?: number;
  unit?: string;
  remain_amount?: number;
  image_url?: string;
  purchase_date
  purchase_price?: number;
  expiry_date?: string;
  registered?: boolean;
 */

function generate_purchaseDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

function generate_expiryDate() {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return faker.date.between({ from: today, to: nextWeek });
}

const foodCardDummyArr = [
  {
    id: 1,
    method: 'frozen',
    food_name: '당근',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchaseDate(),
    purchase_price: 5950,
    amount: 400,
    unit: 'g',
    expiry_date: generate_expiryDate(),
  },
  {
    id: 2,
    method: 'refrigerated',
    food_name: '토마토',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchaseDate(),
    purchase_price: 10000,
    amount: 40,
    unit: 'g',
    expiry_date: generate_expiryDate(),
  },
  {
    id: 3,
    method: 'frozen',
    food_name: '아보카도',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchaseDate(),
    amount: '3개',
    unit: 'g',
    expiry_date: generate_expiryDate(),
  },
  {
    id: 4,
    method: 'room_temp',
    food_name: '바나나',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchaseDate(),
    amount: 1,
    unit: '송이',
    expiry_date: generate_expiryDate(),
  },
  {
    id: 5,
    method: 'frozen',
    food_name: '완두콩',
    image_url: faker.image.urlLoremFlickr({ category: 'food' }),
    purchase_date: generate_purchaseDate(),
    amount: 1,
    unit: '개',
    expiry_date: generate_expiryDate(),
  },
];

export const handlers = [
  http.post('/api/login', () => {
    return HttpResponse.json(
      {
        userId: 1,
        name: 'jenner',
        id: 'jenner',
      },
      {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        },
      },
    );
  }),
  http.post('/api/logout', () => {
    return HttpResponse.json({
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
  http.post('/api/users', () => {
    return HttpResponse.text(JSON.stringify('user_exists'), {
      status: 403,
    });
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   headers: {
    //     'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
    //   },
    // });
  }),
  http.get('/api/food', ({ request }) => {
    const url = new URL(request.url);
    const storage = url.searchParams.get('storage');
    const sort = url.searchParams.get('sort');
    const direction = url.searchParams.get('direction');
    const filteredFoods =
      storage === 'total'
        ? foodCardDummyArr
        : foodCardDummyArr.filter((food) => food.method === storage);

    if (sort) {
      filteredFoods.sort((a, b) => {
        if (sort === 'purchase_date' || sort === 'expiry_date') {
          const dateA = new Date(a[sort]);
          const dateB = new Date(b[sort]);
          return direction === 'up'
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        } else if (sort === 'purchase_price') {
          const priceA = a.purchase_price ?? 0;
          const priceB = b.purchase_price ?? 0;
          return direction === 'up' ? priceA - priceB : priceB - priceA;
        }
        return 0;
      });
    }

    console.log({ storage, sort });
    return HttpResponse.json(filteredFoods);
  }),
];
