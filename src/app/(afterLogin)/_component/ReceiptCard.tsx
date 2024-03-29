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
  const { data: receiptData } = useQuery({
    queryKey: ['receipt', 'monthly', yearMonth],
    queryFn: () => getReceiptsByMonth(yearMonth),
    staleTime: 60 * 1000,
  });
  const onClickCard = (id: number) => {
    router.push(`/receipt/${id}`);
  };
  return (
    <>
      {receiptData &&
        receiptData.receipts.map((data: ReceiptArrType) => (
          <Card
            onClick={() => onClickCard(data.id)}
            key={data.id}
            variant="outlined"
            className="flex w-full flex-shrink cursor-pointer justify-between gap-[20px] px-[40px]">
            <div className="flex w-full justify-between">
              <div>{data.purchase_date} 구매 영수증</div>
              <div>{data.purchase_location}</div>
            </div>
            <div className="flex w-full justify-between">
              <div>품목 {data.quantity}개</div>
              <div>총 {data.total_price.toLocaleString()}원</div>
            </div>
          </Card>
        ))}
    </>
  );
};

export default ReceiptCard;
