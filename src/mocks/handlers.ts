import { http, HttpResponse } from 'msw';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { foodCardDummyArr, purchaseReceiptInfo, receiptDummyArr } from './data';
dayjs.extend(customParseFormat);
import path from 'path';
import fs from 'fs';

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
  http.get('/api/food', () => {
    return HttpResponse.json(foodCardDummyArr);
  }),
  http.get('/api/receipt', ({ request }) => {
    const url = new URL(request.url);
    const year_month = url.searchParams.get('month');
    const requestObj = dayjs(year_month, ['YY.MM']) || dayjs().format('YY.MM');

    const isThisDayArr = (target: string) => {
      const toDayjsObj = dayjs(target, ['YY.M.D']);

      return (
        toDayjsObj.get('year') === requestObj.get('year') &&
        toDayjsObj.get('month') === requestObj.get('month')
      );
    };
    const filteredReceiptArr = receiptDummyArr.filter((receipt) =>
      isThisDayArr(receipt.purchase_date),
    );
    return HttpResponse.json(filteredReceiptArr);
  }),
  http.get('/api/receipt/:receipt_id', ({ params }) => {
    const { receipt_id } = params;
    console.log({ receipt_id });
    if (!receipt_id) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(
      purchaseReceiptInfo.filter(
        (items) => items.receipt_id === parseInt(receipt_id[0]),
      ),
    );
  }),
  http.post('/api/analyze/receipt', () => {
    const resJsonPath = path.resolve('', 'responseEx.json');
    const exData = fs.readFileSync(resJsonPath, 'utf-8');

    return HttpResponse.json(JSON.parse(exData));
  }),
];
