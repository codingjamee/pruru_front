import { http, HttpResponse } from 'msw';

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
];
