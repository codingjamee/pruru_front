import React from 'react';
import QueryComponent from '../_component/QueryComponent';
import Foods from '../_component/Foods';
import { Metadata } from 'next';
import Card from '@/_components/Card';
import Button from '@/_components/Button';
import PlusSvg from '@/_assets/PlusSvg';

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
      <Card variant="primary" className="w-full flex-shrink justify-between">
        <div className="px-[10px] text-size-font-card-title">
          식재료 추가하기
        </div>
        <Button
          href="/add/food"
          className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
          <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
        </Button>
      </Card>
      <div className="flex flex-row flex-wrap items-center justify-center gap-[10px]">
        <Foods />
      </div>
    </div>
  );
};

export default page;
