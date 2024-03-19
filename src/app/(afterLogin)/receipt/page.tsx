import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import React from 'react';
import ReceiptArrowFn from '../_component/ReceiptArrowFn';
import ReceiptCard from '../_component/ReceiptCard';

const page = () => {
  return (
    <div className="flex w-full flex-shrink flex-col gap-[20px] pt-[20px]">
      <div>영수증</div>
      <div className="flex w-full items-center justify-between">
        <ReceiptArrowFn />
      </div>
      <Card variant="primary" className="w-full flex-shrink justify-between">
        <div className="px-[10px] text-size-font-card-title">
          영수증 추가하기
        </div>
        <Button
          href="/add/receipt"
          className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
          <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
        </Button>
      </Card>
      <ReceiptCard />
    </div>
  );
};

export default page;
