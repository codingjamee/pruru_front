'use client';

import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { FoodPropType } from '@/_types/FoodTypes';
import { getFoodById } from '@/_utils/getQuery';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import logo from '@/_assets/pruru_logo.png';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { deleteFoodById } from '@/_utils/mutateQuery';
import { storageText } from '@/_utils/listData';

const FoodDetailCard = ({ foodId }: { foodId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: foodData } = useQuery<FoodPropType, any, FoodPropType, any>({
    queryKey: ['foods', foodId],
    queryFn: () => getFoodById(foodId),
    staleTime: 10 * 60 * 1000,
    throwOnError: true,
  });
  const { mutate } = useMutation({
    mutationKey: ['deleteFoodById', foodId],
    mutationFn: (foodId: string) => deleteFoodById(foodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      router.push('/food');
    },
    throwOnError: true,
  });

  const foodDetailList = [
    {
      title: '남은 중량',
      text:
        foodData && foodData?.remaining_amount
          ? foodData?.remaining_amount + ' ' + (foodData?.unit || '')
          : '중량을 설정해주세요',
    },
    {
      title: '유통기한',
      text: foodData?.expiry_date
        ? foodData && dayjs(foodData?.expiry_date).format('YY.MM.DD').toString()
        : '유통기한을 설정해주세요',
    },
    {
      title: '구매일자',
      text:
        foodData &&
        dayjs(foodData?.purchase_date).format('YY.MM.DD').toString(),
    },
    {
      title: '구매장소',
      text:
        (foodData && foodData?.purchase_location) || '구매장소를 설정해주세요',
    },
    {
      title: '구매금액',
      text: foodData && foodData?.purchase_price?.toLocaleString() + ' 원',
    } || '구매금액을 설정해주세요',
  ];

  return (
    <Card
      variant="outlined"
      className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
      {foodData && (
        <>
          <div className="flex w-full justify-between">
            <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
              {(foodData && foodData?.category) || '카테고리'}
            </div>
            <div className="flex h-[40px] w-[110px] items-center justify-center rounded-lg bg-color-primary mobile:w-full">
              {(foodData &&
                foodData?.method !== undefined &&
                storageText[foodData?.method]) ||
                '저장방식'}
            </div>
          </div>
          <div>{foodData && foodData?.name}</div>

          <div className="flex flex-row gap-[20px] mobile:flex-col">
            <div className="flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text">
              <Image
                src={(foodData && foodData?.image_url) || logo}
                alt={(foodData && foodData?.name) || '재료사진'}
                width="100"
                height="100"
              />
            </div>
            <div className="flex flex-grow flex-col gap-[20px]">
              {foodDetailList.map((list) => (
                <div
                  key={list.title}
                  className="flex flex-row justify-between mobile:flex-col">
                  <div>{list.title}</div>
                  <div className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full">
                    {list.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-grow flex-col gap-[17px] "></div>
          <div className="flex gap-[20px]">
            <Button
              onClick={() => router.push(`${foodId}/edit`)}
              variant="primary"
              className="flex-1 rounded-lg mobile:w-full">
              수정하기
            </Button>
            <Button
              onClick={() => mutate(foodId)}
              variant="primary"
              className="flex-1 rounded-lg mobile:w-full">
              삭제하기
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default FoodDetailCard;
