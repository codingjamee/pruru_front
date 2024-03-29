'use client';

import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { FoodPropType } from '@/_types/FoodTypes';
import { getFoodById } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import logo from '@/_assets/pruru_logo.png';
import dayjs from 'dayjs';

const FoodDetailCard = ({ foodId }: { foodId: string }) => {
  const { data: foodData, status } = useQuery<
    FoodPropType[],
    any,
    FoodPropType[],
    any
  >({
    queryKey: ['getFoodById', foodId],
    queryFn: () => getFoodById(foodId),
    staleTime: 10 * 60 * 1000,
  });
  const foodDetailList = [
    {
      title: '중량',
      text: foodData && foodData[0]?.amount + ' ' + foodData[0]?.unit,
    },
    {
      title: '유통기한',
      text: foodData && dayjs(foodData[0]?.expiry_date).format('YY.MM.DD'),
    },
    {
      title: '구매일자',
      text: foodData && dayjs(foodData[0]?.purchase_date).format('YY.MM.DD'),
    },
    { title: '구매장소', text: foodData && foodData[0]?.purchase_location },
    { title: '구매금액', text: foodData && foodData[0]?.purchase_price },
  ];

  return (
    <Card
      variant="outlined"
      className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
      {foodData && (
        <>
          <div className="flex w-full justify-between">
            <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
              {(foodData && foodData[0]?.category) || '카테고리'}
            </div>
            <Button variant="primary" className="rounded-lg mobile:w-full">
              {foodData && foodData[0]?.method}
            </Button>
          </div>
          <div>식재료명</div>
          <div>{foodData && foodData[0]?.name}</div>

          <div className="flex flex-row gap-[20px] mobile:flex-col">
            <div className="mobile:h- flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text mobile:h-[150px] mobile:w-full">
              <Image
                src={(foodData && foodData[0]?.image_url) || logo}
                alt={(foodData && foodData[0]?.name) || '재료사진'}
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
              variant="primary"
              className="flex-1 rounded-lg mobile:w-full">
              수정하기
            </Button>
            <Button
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
