import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import React from 'react';
import ReceiptArrowFn from '../_component/ReceiptArrowFn';

export const receiptDummyArr = [
  {
    receiptId: 1,
    quantity: 10,
    purchaseLocation: '이마트',
    purchaseDate: '24.2.17',
    totalPrice: 20950,
  },
  {
    receiptId: 2,
    quantity: 17,
    purchaseLocation: '시장마트',
    purchaseDate: '24.2.27',
    totalPrice: 52182,
  },
  {
    receiptId: 3,
    quantity: 1,
    purchaseLocation: '편의점',
    purchaseDate: '24.2.9',
    totalPrice: 5931,
  },
  {
    receiptId: 4,
    quantity: 1,
    purchaseLocation: '홈플러스',
    purchaseDate: '24.2.29',
    totalPrice: 5931,
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
        <Card
          key={receipt.receiptId}
          variant="primary"
          className="flex w-full flex-shrink justify-between gap-[20px] px-[40px]">
          <div className="flex w-full justify-between">
            <div>{receipt.purchaseDate} 구매 영수증</div>
            <div>{receipt.purchaseLocation}</div>
          </div>
          <div className="flex w-full justify-between">
            <div>품목 {receipt.quantity}개</div>
            <div>총 {receipt.totalPrice.toLocaleString()}원</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default page;
