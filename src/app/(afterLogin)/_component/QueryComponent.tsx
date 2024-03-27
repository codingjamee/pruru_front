'use client';
import { QueryKeyType } from '@/_types/CommonTypes';
import { directionText, sortText, storageText } from '@/_utils/listData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const getTextByKey = (type: QueryKeyType) => {
  const textMaps = {
    storage: storageText,
    sort: sortText,
    direction: directionText,
  };
  return textMaps[type];
};

const optionList = (value: QueryKeyType) => {
  return Object.entries(getTextByKey(value)).map(([key, val]) => ({
    key: key,
    value: val,
  }));
};

const QueryComponent = ({ query }: { query: QueryKeyType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams],
  );

  return (
    <div className="flex items-center gap-[10px]">
      <div className="cursor-pointer">
        <select
          className="bg-transparent"
          onChange={(e) => createQueryString(query, e.target.value)}>
          {optionList(query).map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default QueryComponent;
