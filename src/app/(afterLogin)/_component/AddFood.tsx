'use client';
import Card from '@/_components/Card';
import Search from './Search';
import Button from '@/_components/Button';
import Input from '@/_components/Input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Modal from '@/_components/Modal';
import { FoodPropType } from '@/_types/FoodTypes';
import { useQuery } from '@tanstack/react-query';
import { SearchReturnType } from '@/_types/ReturnTypes';
import { getSearchCategory } from '@/_utils/getQuery';

const AddFood = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState<string | undefined>('');
  const { register, handleSubmit, watch } = useForm<
    FoodPropType & { search_name: string }
  >({
    defaultValues: {
      category: '카테고리',
      method: 'room_temp',
      food_name: '',
      remain_amount: '',
      purchase_date: '',
      expiry_date: '',
      purchase_location: '',
      purchase_price: 0,
      search_name: '',
    },
  });

  const searchFoodName = watch('food_name');
  const remainAmount = watch('remain_amount');

  useEffect(() => {
    console.log('watch is changed!');
    console.log(remainAmount);
    setSearchValue(searchFoodName);
  }, [searchFoodName, remainAmount]);

  //검색 요청 api
  const { data } = useQuery<SearchReturnType>({
    queryKey: ['search', 'foodname'],
    queryFn: () => getSearchCategory(10, ['search', 'foodname'], searchValue),
    enabled: searchTrigger,
  });

  const onClickSearch = () => {
    console.log('search is Clicked!');
    setModalIsOpen(true);
  };

  const onAddFood = (data: FoodPropType) => {
    console.log(data);
  };

  const onClickSearchTrigger = () => {
    setSearchTrigger(true);
    console.log('search is Triggered', 'value is : ', searchValue);
  };
  return (
    <>
      {modalIsOpen && (
        <Modal modalIsOpen={modalIsOpen} onClick={() => setModalIsOpen(false)}>
          <Search
            onClickSearch={onClickSearchTrigger}
            {...register('food_name')}
            name="food_name"
          />
          {data &&
            data.items.map((result) => (
              <div key={result.productId}>{result.title}</div>
            ))}
        </Modal>
      )}
      <Card variant="outlined" className="min-h-[695px] w-[635px] ">
        <form
          onSubmit={handleSubmit(onAddFood)}
          className="flex flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
          <Input
            variant="outlined"
            className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full"
            {...register('category', {
              required: '빈 칸이 없게 작성해주세요',
            })}
          />

          <div className="flex w-full flex-col items-center justify-between gap-[10px] tablet:h-[32px] tablet:flex-row tablet:gap-[61px] desktop:h-[32px] desktop:flex-row desktop:gap-[81px]">
            <div className="flex flex-grow mobile:w-full">
              <Search
                onClickSearch={onClickSearch}
                {...register('food_name')}
                name="food_name"
              />
            </div>
            <Button
              href="/receipt"
              variant="primary"
              className="rounded-lg mobile:w-full">
              영수증에서 가져오기
            </Button>
          </div>
          <div className="flex flex-row gap-[20px] mobile:flex-col">
            <div className="mobile:h- flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text mobile:h-[150px] mobile:w-full">
              재료 사진 등록
            </div>
            <div className="flex flex-grow flex-col gap-[20px]">
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>보관방법</div>
                <Input
                  variant="outlined"
                  placeholder="상온"
                  className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full"
                  {...register('method', {
                    required: '빈 칸이 없게 작성해주세요',
                    minLength: 1,
                  })}
                />
              </div>
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>중량</div>
                <Input
                  {...register('remain_amount', {
                    required: '빈 칸이 없게 작성해주세요',
                    minLength: 1,
                  })}
                  variant="outlined"
                  className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full"
                />
              </div>
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>유통기한</div>
                <Input
                  {...register('expiry_date')}
                  variant="outlined"
                  className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full"
                />
              </div>
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>구매일자</div>
                <Input
                  {...register('purchase_date')}
                  variant="outlined"
                  className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full"
                />
              </div>
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>구매장소</div>
                <Input
                  {...register('purchase_location')}
                  variant="underline"
                  className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full"
                />
              </div>
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>구매금액</div>
                <Input
                  {...register('purchase_price')}
                  variant="underline"
                  className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="rounded-lg mobile:w-full">
            추가하기
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddFood;
