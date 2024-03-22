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
import useAllQueriesSuccess from '../_hooks/useAllQueriesSuccess';

const UploadReceipt = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [incodedFile, setIncodedFile] = useState<string>('');
  const [triggerAnalyzeReceipt, setTriggerAnalyzeReceipt] = useState(false);
  const [analyzeSuccess, setAnalyzeSuccess] = useState(false);
  const [searchLists, setSearchLists] = useState([]);
  const anaylzedReceiptInfo = [];
  const queryClient = useQueryClient();
  const router = useRouter();
  const reg_exceptgiho = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gim;
  const { status: analyzeStatus, data: analyzedReceiptData } = useQuery({
    queryKey: ['receipt', 'anaylze'],
    queryFn: () => getAnalyzeReceipt(incodedFile, 'JPEG'),
    enabled: triggerAnalyzeReceipt,
    select: (data) => {
      return {
        purchase_location:
          data.images[0].receipt.result.storeInfo.name.formatted +
          ' ' +
          data.images[0].receipt.result.storeInfo.subName,
        items: data.images[0]?.receipt?.result.subResults[0].items.map(
          (item: AnalyzedReceiptAllType) => {
            return {
              food_name: item.name.formatted.value.replace(reg_exceptgiho, ''),
              purchase_price: item.price.price.formatted.value,
              quantity: item.count.formatted.value,
            };
          },
        ),
      };
    },
  });

  // 영수증 인식 성공이라면 searchList를 만듦
  useEffect(() => {
    if (analyzeStatus === 'success') {
      console.log('요청에 성공!');
      setSearchLists(
        analyzedReceiptData.items.reduce(
          (acc: string[], cur: ModifiedAnalyzeReceiptType) => {
            acc.push(cur.food_name);
            return acc;
          },
          [],
        ),
      );
      setAnalyzeSuccess(true);
    } else if (analyzeStatus === 'error') {
      //추후 toast로
      if (fileInput.current) {
        fileInput.current.value = '';
      }
      console.log({ analyzeStatus });
      console.log('에러가 발생하였습니다 다시 파일을 업로드해주세요');
    }
  }, [analyzeStatus]);

  //네이버검색 요청 쿼리 - 영수증 인식성공시 트리거
  const { data: searchResults } = useQueries({
    queries: searchLists.map((search, idx) => ({
      queryKey: ['search', 'category', idx],
      queryFn: () => getSearchCategory(search),
      enabled: analyzeSuccess,
      staleTime: 60 * 60 * 1000,
    })),
    combine: (results) => {
      return {
        data: results.map((result, index) => {
          if (result?.data?.items[0]?.category1 === '식품')
            return {
              index: index,
              food_category: result.data.items[0].category3,
              food_image: result.data.items[0].image,
            };
        }),
      };
    },
  });

  useEffect(() => {
    console.log(analyzedReceiptData);
  }, [analyzedReceiptData]);

  //모든 검색 요청이 성공하였다
  const isSearchesSuccess = useAllQueriesSuccess(searchResults);

  //영수증 인식 데이터와 검색 성공 데이터를 수정하여 receiptWithCateLists에 저장해야함
  useEffect(() => {
    console.log(isSearchesSuccess);
    if (searchResults.length < 1) return;
    const searchedDataWithCate = [...searchResults];
    const receiptData = analyzedReceiptData && [...analyzedReceiptData.items];
    const modifiedData =
      receiptData &&
      receiptData.map((data, index) => {
        const searchedCateData = searchedDataWithCate.find(
          (cateData) => cateData?.index === index,
        );
        if (searchedCateData) {
          return data.push(searchedCateData);
        }
      });
    anaylzedReceiptInfo.push();
    queryClient.setQueryData(['allSearchResults'], modifiedData);
    console.log(modifiedData);
  }, [isSearchesSuccess]);

  useEffect(() => {
    console.log({ triggerAnalyzeReceipt });
  }, [triggerAnalyzeReceipt]);

  useEffect(() => {
    if (isSearchesSuccess) {
      router.push('/add/receipt/edit');
    }
  }, [isSearchesSuccess]);

  const onClickButton = () => {
    console.log(fileInput.current);
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
          // e.target.value = '';
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

export default UploadReceipt;
