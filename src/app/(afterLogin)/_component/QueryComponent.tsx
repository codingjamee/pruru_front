'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface QueryTextMap {
  [key: string]: string;
}

const QueryComponent = ({ value }: { value: 'storage' | 'sort' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const storage = searchParams.get('storage') || '전체';
  const sort = searchParams.get('sort') || '유통기한';
  const direction = searchParams.get('direction');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const storageText: QueryTextMap = {
    refrigerated: '냉장',
    frozen: '냉동',
    total: '전체',
  };

  const sortText: QueryTextMap = {
    price: '가격순',
    expiryDate: '유통기한',
    purchase_date: '구매일자',
  };
  let returnText = '';
  if (value === 'storage' && typeof storage === 'string') {
    returnText = storageText[storage] || '전체';
  } else if (value === 'sort' && typeof sort === 'string') {
    returnText = sortText[sort] || '유통기한';
  }

  return (
    <div className="flex items-center gap-[10px]">
      <div className="cursor-pointer">{returnText}</div>
      {value === 'sort' && (
        <div
          onClick={() =>
            router.push(
              pathname +
                '?' +
                createQueryString(
                  'direction',
                  direction === 'up' ? 'down' : 'up',
                ),
            )
          }
          className={`${direction === 'up' ? 'arrow-up' : 'arrow-down'} cursor-pointer`}></div>
      )}
    </div>
  );
};

export default QueryComponent;
