'use client';
import PlusSvg from '@/_assets/PlusSvg';
import RefrigerIcon from '@/_assets/RefrigerIcon';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import {
  PurchaseReceiptInfoType,
  ReceiptDetailType,
} from '@/_types/ReceiptTypes';
import { getReceiptDetail } from '@/_utils/getQuery';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { deleteReceiptById } from '@/_utils/mutateQuery';

const ReceiptDetailCard = ({ receipt_id }: { receipt_id: string }) => {
  const router = useRouter();

  const { data: purchaseReceiptInfo } = useQuery<
    PurchaseReceiptInfoType,
    any,
    PurchaseReceiptInfoType,
    any
  >({
    queryKey: ['receipt', 'items', receipt_id],
    queryFn: () => getReceiptDetail(receipt_id),
    staleTime: 10 * 60 * 1000,
    throwOnError: true,
  });
  const { mutate } = useMutation({
    mutationKey: ['deleteReceipt', receipt_id],
    mutationFn: (receipt_id: string) => deleteReceiptById(receipt_id),
    onSuccess: () => router.push('/receipt'),
    throwOnError: true,
  });
  const queryClient = useQueryClient();

  const onClickAddFood = (index: number, foodId?: string) => {
    if (foodId && purchaseReceiptInfo) {
      queryClient.setQueryData(
        ['addFood', foodId],
        purchaseReceiptInfo.receipt_items[index],
      );
      router.push(`/add/food?foodId=${foodId}`);
    }
  };

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
              {dayjs(purchaseReceiptInfo.purchase_date).format('YY.MM.DD')} 구매
            </div>
            <div className="flex h-[40px] items-center justify-center rounded-lg bg-color-primary px-3 text-color-card-text mobile:w-full">
              {purchaseReceiptInfo.purchase_location}
            </div>
          </div>
          <div className="flex flex-col gap-[10px] mobile:gap-[15px]">
            <div className="flex w-full justify-between text-[14px]">
              <div className="basis-2/12">카테고리</div>
              <div className="max-w-[127px] basis-5/12">품명</div>
              <div className="basis-2/12">중량</div>
              <div className="basis-2/12">금액</div>
              <div className="basis-1/12">등록</div>
            </div>
            {purchaseReceiptInfo.receipt_items.map(
              (receipt: ReceiptDetailType, index: number) => (
                <div
                  className="flex w-full justify-between truncate"
                  key={receipt.id}>
                  <div className="basis-2/12">{receipt.category}</div>
                  <div className="max-w-[127px] basis-5/12 truncate">
                    {receipt.name}
                  </div>
                  <div className="basis-2/12">{receipt.amount}</div>
                  <div className="basis-2/12">
                    {receipt.purchase_price?.toLocaleString()}
                  </div>
                  <div className="basis-1/12">
                    {receipt.registered ? (
                      <div className="w-[22px] rounded-full bg-color-primary">
                        <RefrigerIcon />
                      </div>
                    ) : (
                      <PlusSvg
                        className="cursor-pointer"
                        onClick={() =>
                          onClickAddFood(index, receipt.id?.toString())
                        }
                      />
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="flex justify-end gap-[30px]">
            <div>품목 {purchaseReceiptInfo.receipt_items.length}개</div>
            <div>총{purchaseReceiptInfo.total_price?.toLocaleString()}원</div>
          </div>
          <Button
            variant="primary"
            className="rounded-lg"
            aria-label="receipt-delete"
            onClick={() => mutate(receipt_id)}>
            삭제하기
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ReceiptDetailCard;
