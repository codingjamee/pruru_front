'use client';
import Card from '@/_components/Card';
import { ReceiptArrType } from '@/_types/ReceiptTypes';
import { useRouter } from 'next/navigation';

const ReceiptCard = ({ receipt }: { receipt: ReceiptArrType }) => {
  const router = useRouter();
  const onClickCard = () => {
    router.push(`/receipt/${receipt.receipt_id.toString()}`);
  };
  return (
    <Card
      onClick={onClickCard}
      key={receipt.receipt_id}
      variant="primary"
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
  );
};

export default ReceiptCard;
