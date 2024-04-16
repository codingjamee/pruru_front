import React from 'react';
import QueryComponent from '../_component/QueryComponent';
import Foods from '../_component/Foods';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food / PRURU',
  description: '식재료 관리',
};

const page = () => {
  return (
    <div className="flex w-full flex-col gap-[20px] pt-[20px]">
      <div className="flex w-full flex-row justify-between gap-[40px] pt-[20px]">
        <div className="flex gap-[20px]">
          <div>식재료 관리</div>
          <QueryComponent query="storage" />
        </div>
        <div className="flex">
          <QueryComponent query="sort" />
          <QueryComponent query="direction" />
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[10px]">
        <Foods />
      </div>
    </div>
  );
};

export default page;
