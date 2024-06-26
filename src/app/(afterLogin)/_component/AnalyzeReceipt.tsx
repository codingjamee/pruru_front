'use client';
import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import {
  Item,
  ModifiedAnalyzeReceiptType,
  ResultData,
} from '@/_types/ReturnTypes';
import { getAnalyzeReceipt, getSearchCategory } from '@/_utils/getQuery';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  PurchaseReceiptInfoType,
  ReceiptDetailType,
} from '@/_types/ReceiptTypes';
import { reg_exceptgiho } from '@/_utils/regExp';
import useFileUploader from '../_hooks/useFileUploader';
import Loading from '@/app/loading';

const AnalyzeReceipt = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [triggerAnalyzeReceipt, setTriggerAnalyzeReceipt] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchLists, setSearchLists] = useState([]);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { encodedFile, setEncodedFile, onChangeFile } = useFileUploader();
  const {
    status: analyzeStatus,
    data: analyzedReceiptData,
    isPending,
  } = useQuery({
    queryKey: ['receipt', 'anaylze'],
    queryFn: () => getAnalyzeReceipt(encodedFile, 'JPEG'),
    enabled: triggerAnalyzeReceipt,
    gcTime: 60 * 60 * 1000,
    throwOnError: true,
  });
  let analyzedReceiptData_2: PurchaseReceiptInfoType | any = [];
  // 영수증 인식 성공이라면 searchList를 만듦
  useEffect(() => {
    if (analyzeStatus === 'success') {
      analyzedReceiptData_2 = {
        purchase_location:
          (analyzedReceiptData?.images[0]?.receipt?.result?.storeInfo?.name
            .formatted.value || '') +
          ' ' +
          (analyzedReceiptData?.images[0]?.receipt?.result?.storeInfo?.subName
            ?.text || ''),
        purchase_date:
          new Date(
            Number(
              analyzedReceiptData?.images[0]?.receipt?.result?.paymentInfo?.date
                ?.formatted?.year,
            ),
            Number(
              analyzedReceiptData?.images[0]?.receipt?.result?.paymentInfo?.date
                ?.formatted?.month,
            ),
            Number(
              analyzedReceiptData?.images[0]?.receipt?.result?.paymentInfo?.date
                ?.formatted?.day,
            ),
          ) || new Date(),
        receipt_items:
          analyzedReceiptData?.images[0]?.receipt?.result?.subResults[0]?.items.map(
            (item: Item) => {
              return {
                name: item?.name?.formatted?.value?.replace(reg_exceptgiho, ''),
                purchase_price: item?.price?.price?.formatted?.value?.replace(
                  '.',
                  '',
                ),
                quantity: item?.count?.formatted?.value || item?.count?.text,
              };
            },
          ),
      };
      queryClient.setQueryData(['analyzedReceiptData'], analyzedReceiptData_2);
      console.log('요청에 성공!');
      setSearchLists(
        analyzedReceiptData_2?.receipt_items.reduce(
          (acc: string[], cur: ModifiedAnalyzeReceiptType) => {
            acc.push(cur.name);
            return acc;
          },
          [],
        ),
      );
      setTriggerSearch(true);
    } else if (analyzeStatus === 'error') {
      //추후 toast로
      if (fileInput.current) {
        fileInput.current.value = '';
      }
    }
  }, [analyzeStatus]);

  //네이버검색 요청 쿼리 - 영수증 인식성공시 트리거
  const { data: searchResults, searchSuccess } = useQueries({
    queries: searchLists?.map((search, idx) => ({
      queryKey: ['search', 'category', idx],
      queryFn: () =>
        getSearchCategory(1, ['search', 'category', idx.toString()], search),
      enabled: triggerSearch,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    })),
    combine: (results: ResultData[]) => {
      return {
        data: results?.map((result, index) => {
          if (
            result?.data?.items &&
            result?.data?.items[0]?.category1 === '식품'
          ) {
            return {
              index: index,
              title: searchLists[index],
              category: result?.data?.items[0]?.category3,
              image_url: result?.data?.items[0]?.image,
            };
          } else if (result?.data?.total === 0) {
            return {
              index: index,
              title: searchLists[index],
            };
          }
        }),
        searchSuccess: results.every((result) => result.isSuccess),
      };
    },
  });

  //모든 검색 요청이 성공하였다
  //영수증 인식 데이터와 검색 성공 데이터를 수정하여 receiptWithCateLists에 저장해야함
  useEffect(() => {
    if (searchResults.length < 1 || !searchSuccess) return;
    if (searchSuccess) {
      const searchedDataWithCate = [...searchResults];
      const getAnalyzedReceiptData_2: PurchaseReceiptInfoType | undefined =
        queryClient.getQueryData(['analyzedReceiptData']);
      const modifiedData = {
        ...getAnalyzedReceiptData_2,
        receipt_items:
          getAnalyzedReceiptData_2?.receipt_items &&
          getAnalyzedReceiptData_2?.receipt_items?.map(
            (data: ReceiptDetailType, index: number) => {
              const searchedCateData = searchedDataWithCate.find(
                (cateData) => cateData?.index === index,
              );
              if (searchedCateData) {
                return { ...data, ...searchedCateData };
              }
            },
          ),
      };
      typeof window !== 'undefined'
        ? localStorage.setItem('allSearchResults', JSON.stringify(modifiedData))
        : '';
      router.push('/add/receipt/edit');
    }
  }, [searchSuccess]);

  const onClickButton = () => {
    fileInput.current!.click();
  };

  if (triggerAnalyzeReceipt && isPending) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border p-[12px]">
        <input type="file" onChange={onChangeFile} ref={fileInput} hidden />
        {!encodedFile ? (
          <>
            <div className="p-[8px] text-size-font-card-title">영수증 선택</div>
            <Button
              onClick={onClickButton}
              variant="primary"
              className="flex h-[50%] w-full flex-grow flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
              <PlusSvg
                cyAttribute="upload-receipt"
                className="flex h-[44px] w-[44px] items-center justify-center"
              />
            </Button>
          </>
        ) : (
          <>
            <div
              onClick={() => setEncodedFile('')}
              className="cursor-pointer p-[8px] text-size-font-card-title">
              눌러서 취소하기
            </div>
            <div
              className="flex h-[50%] w-full flex-grow cursor-pointer flex-col items-center justify-center rounded-lg"
              onClick={() => setEncodedFile('')}>
              <img src={encodedFile} alt="encoded receipt" />
            </div>
          </>
        )}
      </div>
      <Button
        cyAttribute="analyze-receipt"
        onClick={() => setTriggerAnalyzeReceipt(true)}
        variant="primary"
        className="rounded-lg mobile:w-full">
        분석하기
      </Button>
    </>
  );
};

export default AnalyzeReceipt;
