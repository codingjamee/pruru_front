interface HeadersObjType {
  [key: string]: string;
}

interface CustomFetchTypes {
  baseURL: string;
  headers: HeadersObjType;
}

const createCustomFetch = ({ baseURL, headers }: CustomFetchTypes) => {
  return async (url = '', options?: RequestInit): Promise<Response> => {
    const baseFullUrl = `${baseURL}${url}`;
    const customHeaders = { ...headers, ...(options?.headers || {}) };

    let response;
    try {
      response = await fetch(baseFullUrl, {
        headers: customHeaders,
      });
    } catch (err) {
      console.error(err);
      throw new Error('error occured!');
    }
    return response;
  };
};

export const api = createCustomFetch({
  baseURL: 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN as string}`,
  },
});
