'use client';

import { api } from '@/_utils/createCustomFetch';
import { useEffect } from 'react';

const Test = () => {
  const testRequest = async () => {
    return await api('/test-connection');
  };
  useEffect(() => {
    testRequest();
  }, []);
  return <>this is Test</>;
};

export default Test;
