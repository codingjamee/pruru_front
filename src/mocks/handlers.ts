import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', () => {
    return HttpResponse.json(
      {
        userId: 1,
        nickname: 'jenner',
        id: 'jenner',
        image: '../_assets/pruru_logo.png',
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
];
