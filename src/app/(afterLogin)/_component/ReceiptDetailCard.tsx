import PlusSvg from '@/_assets/PlusSvg';
import RefrigerIcon from '@/_assets/RefrigerIcon';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { purchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import { useMemo } from 'react';

const purchaseReceiptInfo: purchaseReceiptInfoType = {
  purchaseLocation: '이마트',
  purchaseDate: '24.2.17',
  receiptItems: [
    {
      foodId: 1,
      foodCategory: '콩류',
      foodName: '두부',
      foodWeight: '한모',
      purchasePrice: 5240,
      pricePerAmount: 5240,
      quantity: 1,
      registered: false,
    },
    {
      foodId: 2,
      foodName: '어린잎채소',
      foodCategory: '채소',
      foodWeight: '200g',
      purchasePrice: 7370,
      pricePerAmount: 7370,
      quantity: 1,
      registered: false,
    },
    {
      foodId: 3,
      foodName: '흙흙당근 이름이 매우매우 긴 흙흙당근',
      foodCategory: '채소',
      foodWeight: '1000g',
      purchasePrice: 4290,
      pricePerAmount: 4290,
      quantity: 1,
      registered: true,
    },
    {
      foodId: 4,
      foodName: '도토리묵',
      foodCategory: '채소',
      foodWeight: '1개',
      purchasePrice: 4990,
      pricePerAmount: 4990,
      quantity: 1,
      registered: true,
    },
  ],
};

const ReceiptDetailCard = ({ receiptId }: { receiptId: string }) => {
  const totalPrice = useMemo(
    () =>
      purchaseReceiptInfo.receiptItems.reduce((acc, cur) => {
        return cur.purchasePrice * cur.quantity + acc;
      }, 0),
    [purchaseReceiptInfo],
  );
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
            {purchaseReceiptInfo.purchaseDate} 구매
          </div>
          <Button variant="primary" className="rounded-lg mobile:w-full">
            {purchaseReceiptInfo.purchaseLocation}
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
              key={receipt.foodId}>
              <div className="basis-2/12">{receipt.foodCategory}</div>
              <div className="max-w-[127px] basis-5/12 truncate">
                {receipt.foodName}
              </div>
              <div className="basis-2/12">{receipt.foodWeight}</div>
              <div className="basis-2/12">
                {receipt.pricePerAmount * receipt.quantity}
              </div>
              <div className="basis-1/12 cursor-pointer">
                {receipt.registered ? (
                  <div className="w-[22px] rounded-full bg-color-primary">
                    <RefrigerIcon />
                  </div>
                ) : (
                  <PlusSvg />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-[30px]">
          <div>품목 {purchaseReceiptInfo.receiptItems.length}개</div>
          <div>총{totalPrice.toLocaleString()}원</div>
        </div>

        <Button
          href={`/receipt/${receiptId}/edit`}
          variant="primary"
          className="w-full rounded-lg">
          수정하기
        </Button>
      </Card>
    </div>
  );
};

export default ReceiptDetailCard;
