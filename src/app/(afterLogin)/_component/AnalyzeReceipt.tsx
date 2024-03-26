'use client';
import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import {
  AnalyzedReceiptAllType,
  ModifiedAnalyzeReceiptType,
} from '@/_types/ReturnTypes';
import { getAnalyzeReceipt, getSearchCategory } from '@/_utils/getQuery';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import {
  PurchaseReceiptInfoType,
  ReceiptDetailType,
} from '@/_types/ReceiptTypes';
import { reg_exceptgiho } from '@/_utils/regExp';

const AnalyzeReceipt = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [incodedFile, setIncodedFile] = useState<string>('');
  const [triggerAnalyzeReceipt, setTriggerAnalyzeReceipt] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchLists, setSearchLists] = useState([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { status: analyzeStatus, data: analyzedReceiptData } = useQuery({
    queryKey: ['receipt', 'anaylze'],
    queryFn: () => getAnalyzeReceipt(incodedFile, 'JPEG'),
    enabled: triggerAnalyzeReceipt,
  });
  let analyzedReceiptData_2: PurchaseReceiptInfoType | any = [];
  // 영수증 인식 성공이라면 searchList를 만듦
  useEffect(() => {
    if (analyzeStatus === 'success') {
      analyzedReceiptData_2 = {
        purchase_location:
          (analyzedReceiptData.images[0].receipt.result.storeInfo.name.formatted
            .value || '') +
          ' ' +
          (analyzedReceiptData.images[0].receipt.result.storeInfo.subName
            .text || ''),
        purchase_date:
          analyzedReceiptData.images[0].receipt.result.paymentInfo.date.text,
        receipt_items:
          analyzedReceiptData.images[0]?.receipt?.result?.subResults[0]?.items.map(
            (item: AnalyzedReceiptAllType) => {
              return {
                food_name: item.name.formatted.value.replace(
                  reg_exceptgiho,
                  '',
                ),
                purchase_price: item.price.price.formatted.value.replace(
                  '.',
                  '',
                ),
                quantity: item.count?.formatted.value,
              };
            },
          ),
      };
      queryClient.setQueryData(['analyzedReceiptData'], analyzedReceiptData_2);
      console.log('요청에 성공!');
      setSearchLists(
        analyzedReceiptData_2?.receipt_items.reduce(
          (acc: string[], cur: ModifiedAnalyzeReceiptType) => {
            acc.push(cur.food_name);
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
      console.log('에러가 발생하였습니다 다시 파일을 업로드해주세요');
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
    })),
    combine: (results) => {
      return {
        data: results?.map((result, index) => {
          if (result?.data?.items[0]?.category1 === '식품')
            return {
              index: index,
              food_category: result.data.items[0].category3,
              food_image: result.data.items[0].image,
            };
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
      queryClient.setQueryData(['allSearchResults'], modifiedData);
      router.push('/add/receipt/edit');
    }
  }, [searchSuccess]);

  const onClickButton = () => {
    fileInput.current!.click();
  };

  const imgUpload = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, (image) => {
        resolve(image as string | PromiseLike<string>);
      });
    });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      imgUpload(e.target.files[0])
        .then((result) => setIncodedFile(result))
        .catch((error) => {
          console.error('Image upload failed:', error);
          e.target.value = '';
        });
    }
  };

  return (
    <>
      <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border p-[12px]">
        <div className="p-[8px] text-size-font-card-title">영수증 선택</div>
        <input type="file" onChange={onChangeFile} ref={fileInput} hidden />
        <Button
          onClick={onClickButton}
          className=" flex h-[50%] w-full flex-grow flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
          <PlusSvg
            cyAttribute="upload-receipt"
            className="flex h-[44px] w-[44px] items-center justify-center"
          />
        </Button>
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
