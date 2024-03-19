'use client';
import PlusSvg from '@/_assets/PlusSvg';
import RefrigerIcon from '@/_assets/RefrigerIcon';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { receiptDetailType } from '@/_types/ReceiptTypes';
import { getReceiptItems } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const ReceiptDetailCard = ({ receipt_id }: { receipt_id: string }) => {
  const { data: purchaseReceiptInfo } = useQuery({
    queryKey: ['receipt', 'items', receipt_id],
    queryFn: () => getReceiptItems(receipt_id),
  });
  console.log(receipt_id);
  console.log(purchaseReceiptInfo);
  const total_price = useMemo(
    () =>
      purchaseReceiptInfo &&
      purchaseReceiptInfo[0]?.receiptItems.reduce(
        (acc: number, cur: receiptDetailType) => {
          return cur.purchase_price * cur.quantity + acc;
        },
        0,
      ),
    [purchaseReceiptInfo],
  );
  const router = useRouter();
  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        영수증 상세
      </div>
      {purchaseReceiptInfo && (
        <Card
          variant="outlined"
          className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
          <div className="flex w-full justify-between gap-[10px] mobile:flex-col">
            <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
              {purchaseReceiptInfo[0].purchase_date} 구매
            </div>
            <Button variant="primary" className="rounded-lg mobile:w-full">
              {purchaseReceiptInfo[0].purchase_location}
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
            {purchaseReceiptInfo[0].receiptItems.map(
              (receipt: receiptDetailType) => (
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
              ),
            )}
          </div>

          <div className="flex justify-end gap-[30px]">
            <div>품목 {purchaseReceiptInfo[0].receiptItems.length}개</div>
            <div>총{total_price.toLocaleString()}원</div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReceiptDetailCard;
