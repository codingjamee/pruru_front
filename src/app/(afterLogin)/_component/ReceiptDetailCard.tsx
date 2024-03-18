'use client';
import PlusSvg from '@/_assets/PlusSvg';
import RefrigerIcon from '@/_assets/RefrigerIcon';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { purchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const purchaseReceiptInfo: purchaseReceiptInfoType = {
  purchase_location: '이마트',
  purchase_date: '24.2.17',
  receiptItems: [
    {
      food_id: 1,
      food_category: '콩류',
      food_name: '두부',
      food_weight: '한모',
      purchase_price: 5240,
      price_per_amount: 5240,
      quantity: 1,
      registered: false,
    },
    {
      food_id: 2,
      food_name: '어린잎채소',
      food_category: '채소',
      food_weight: '200g',
      purchase_price: 7370,
      price_per_amount: 7370,
      quantity: 1,
      registered: false,
    },
    {
      food_id: 3,
      food_name: '흙흙당근 이름이 매우매우 긴 흙흙당근',
      food_category: '채소',
      food_weight: '1000g',
      purchase_price: 4290,
      price_per_amount: 4290,
      quantity: 1,
      registered: true,
    },
    {
      food_id: 4,
      food_name: '도토리묵',
      food_category: '채소',
      food_weight: '1개',
      purchase_price: 4990,
      price_per_amount: 4990,
      quantity: 1,
      registered: true,
    },
  ],
};

const ReceiptDetailCard = ({ receipt_id }: { receipt_id: string }) => {
  const total_price = useMemo(
    () =>
      purchaseReceiptInfo.receiptItems.reduce((acc, cur) => {
        return cur.purchase_price * cur.quantity + acc;
      }, 0),
    [purchaseReceiptInfo],
  );
  const router = useRouter();
  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        영수증 상세
      </div>
      <Card
        variant="outlined"
        className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
        <div className="flex w-full justify-between gap-[10px] mobile:flex-col">
          <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
            {purchaseReceiptInfo.purchase_date} 구매
          </div>
          <Button variant="primary" className="rounded-lg mobile:w-full">
            {purchaseReceiptInfo.purchase_location}
          </Button>
        </div>
        <div className="flex flex-col gap-[10px] mobile:gap-[15px]">
          <div className="flex w-full justify-between text-[14px]">
            <div className="basis-2/12">카테고리</div>
            <div className="max-w-[127px] basis-5/12">품명</div>
            <div className="basis-2/12">중량</div>
            <div className="basis-2/12">금액</div>
            <div className="basis-1/12">등록</div>
          </div>
          {purchaseReceiptInfo.receiptItems.map((receipt) => (
            <div
              className="flex w-full justify-between truncate"
              key={receipt.food_id}>
              <div className="basis-2/12">{receipt.food_category}</div>
              <div className="max-w-[127px] basis-5/12 truncate">
                {receipt.food_name}
              </div>
              <div className="basis-2/12">{receipt.food_weight}</div>
              <div className="basis-2/12">
                {receipt.price_per_amount * receipt.quantity}
              </div>
              <div className="basis-1/12 cursor-pointer">
                {receipt.registered ? (
                  <div className="w-[22px] rounded-full bg-color-primary">
                    <RefrigerIcon />
                  </div>
                ) : (
                  <PlusSvg onClick={() => router.push('')} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-[30px]">
          <div>품목 {purchaseReceiptInfo.receiptItems.length}개</div>
          <div>총{total_price.toLocaleString()}원</div>
        </div>

        <Button
          href={`/receipt/${receipt_id}/edit`}
          variant="primary"
          className="w-full rounded-lg">
          수정하기
        </Button>
      </Card>
    </div>
  );
};

export default ReceiptDetailCard;
