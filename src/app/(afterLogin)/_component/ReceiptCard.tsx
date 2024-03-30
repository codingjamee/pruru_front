'use client';
import Card from '@/_components/Card';
import { ReceiptArrType, ReceiptsReturnType } from '@/_types/ReceiptTypes';
import { useRouter } from 'next/navigation';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getReceiptsByMonth } from '@/_utils/getQuery';
import { useYearMonthCtx } from '@/_contexts/DateContext';
import { useRef } from 'react';
import useIntersectionObserver from '../_hooks/useIntersectionObserver';
import dayjs from 'dayjs';

const ReceiptCard = () => {
  const router = useRouter();
  const { yearMonth } = useYearMonthCtx();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { data: receiptData, fetchNextPage } = useInfiniteQuery<
    ReceiptsReturnType,
    unknown,
    InfiniteData<ReceiptsReturnType>,
    [_1: string, _2: string, _3: string],
    unknown
  >({
    queryKey: ['receipt', 'monthly', yearMonth],
    queryFn: ({ pageParam }) =>
      getReceiptsByMonth({
        pageParam,
        YM: yearMonth || dayjs().format('YY.MM'),
      }),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      return data.nextCursor;
    },
    staleTime: 10 * 60 * 1000,
  });

  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (!isIntersecting) return;
    await fetchNextPage();
  };

  useIntersectionObserver({
    target: targetRef.current,
    onIntersect: onIntersect,
  });

  const onClickCard = (id: number) => {
    router.push(`/receipt/${id}`);
  };
  return (
    <>
      {receiptData &&
        receiptData.pages.map((page: ReceiptsReturnType) =>
          page.receipts?.map((data: ReceiptArrType) => (
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
          )),
        )}
      <div ref={targetRef} />
    </>
  );
};

export default ReceiptCard;
