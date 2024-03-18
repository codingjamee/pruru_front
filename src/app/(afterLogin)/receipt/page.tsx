import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import React from 'react';
import ReceiptArrowFn from '../_component/ReceiptArrowFn';
import ReceiptCard from '../_component/ReceiptCard';
import { ReceiptArrType } from '@/_types/ReceiptTypes';

export const receiptDummyArr: ReceiptArrType[] = [
  {
    receipt_id: 1,
    quantity: 10,
    purchase_location: '이마트',
    purchase_date: '24.2.17',
    total_price: 20950,
  },
  {
    receipt_id: 2,
    quantity: 17,
    purchase_location: '시장마트',
    purchase_date: '24.2.27',
    total_price: 52182,
  },
  {
    receipt_id: 3,
    quantity: 1,
    purchase_location: '편의점',
    purchase_date: '24.2.9',
    total_price: 5931,
  },
  {
    receipt_id: 4,
    quantity: 1,
    purchase_location: '홈플러스',
    purchase_date: '24.2.29',
    total_price: 5931,
  },
];
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
      {receiptDummyArr.map((receipt) => (
        <ReceiptCard key={receipt.receipt_id} receipt={receipt} />
      ))}
    </div>
  );
};

export default page;
