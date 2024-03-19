'use client';
import Card from '@/_components/Card';
import { ReceiptArrType } from '@/_types/ReceiptTypes';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getReceiptsByMonth } from '@/_utils/getQuery';
import { useYearMonthCtx } from '@/_contexts/DateContext';

const ReceiptCard = () => {
  const router = useRouter();
  const { yearMonth } = useYearMonthCtx();
  const { data: receipts } = useQuery({
    queryKey: ['receipt', 'monthly', yearMonth],
    queryFn: () => getReceiptsByMonth(yearMonth),
    staleTime: 60 * 1000,
  });
  const onClickCard = (id: number) => {
    router.push(`/receipt/${id}`);
  };
  return (
    <>
      {receipts &&
        receipts.map((receipt: ReceiptArrType) => (
          <Card
            onClick={() => onClickCard(receipt.receipt_id)}
            key={receipt.receipt_id}
            variant="outlined"
            className="flex w-full flex-shrink cursor-pointer justify-between gap-[20px] px-[40px]">
            <div className="flex w-full justify-between">
              <div>{receipt.purchase_date} 구매 영수증</div>
              <div>{receipt.purchase_location}</div>
            </div>
            <div className="flex w-full justify-between">
              <div>품목 {receipt.quantity}개</div>
              <div>총 {receipt.total_price.toLocaleString()}원</div>
            </div>
          </Card>
        ))}
    </>
  );
};

export default ReceiptCard;
