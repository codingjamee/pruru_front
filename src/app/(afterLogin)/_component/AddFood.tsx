'use client';
import Card from '@/_components/Card';
import { useRouter, useSearchParams } from 'next/navigation';
import Search from './Search';
import Button from '@/_components/Button';
import Input from '@/_components/Input';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import Modal from '@/_components/Modal';
import { FoodPropType } from '@/_types/FoodTypes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchReturnType } from '@/_types/ReturnTypes';
import { getFoodDataById, getSearchCategory } from '@/_utils/getQuery';
import Image from 'next/image';
import { AddFoodInit, selectLists } from '@/_utils/listData';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { postFoodData, postFoodDataById } from '@/_utils/postQuery';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const AddFood = () => {
  const existFoodId = useSearchParams().get('foodId') || '';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);
  const { data: foodData } = useQuery<FoodPropType, any, FoodPropType>({
    queryKey: ['addFood', existFoodId],
    queryFn: () => getFoodDataById(existFoodId),
    enabled: !!existFoodId,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, setValue, control } = useForm<
    FoodPropType & { search_name: string }
  >({
    defaultValues: foodData
      ? {
          category: foodData.category,
          method: foodData.method,
          name: foodData.name,
          remain_amount: foodData.amount,
          purchase_date: foodData.purchase_date || dayjs().format('YY.MM.DD'),
          expiry_date: foodData.expiry_date,
          purchase_location: foodData.purchase_location,
          purchase_price: foodData.purchase_price,
          image_url: foodData.image_url,
          registered: true,
        }
      : AddFoodInit,
  });

  const searchFoodName = watch('name');
  const searchName = watch('search_name');
  const searchIamgeUrl = watch('image_url');

  //검색결과
  const { data: searchedData } = useQuery<SearchReturnType>({
    queryKey: ['search', 'foodname'],
    queryFn: () =>
      getSearchCategory(
        10,
        ['search', 'foodname'],
        searchFoodName || searchName,
      ),
    enabled: searchTrigger,
  });

  const onClickSearch = () => {
    setModalIsOpen(true);
    setValue('image_url', '');
    setValue('search_name', searchFoodName || '');
    setValue('name', '');
  };

  const onAddFood = (data: FoodPropType) => {
    console.log(data);
    const requestYM = dayjs(purchaseDate, ['YY.MM.DD']).format('YY.MM');
    if (existFoodId) {
      queryClient
        .fetchQuery({
          queryKey: ['editExistFood'],
          queryFn: () => postFoodDataById(data, existFoodId),
        })
        .then(() =>
          router.push(`/food?storage=total&sort=${requestYM}&direction=down`),
        )
        .catch((err) => console.log(err));
    } else {
      queryClient
        .fetchQuery({
          queryKey: ['addFirstFood'],
          queryFn: () => postFoodData(data),
        })
        .then(() =>
          router.push(`/food?storage=total&sort=${requestYM}&direction=down`),
        )
        .catch((err) => console.log(err));
    }
    //성공하면 /food/:foodId로 이동..
  };

  const onClickSearchTrigger = () => {
    setSearchTrigger(true);
    console.log('search is Triggered', 'value is : ', searchFoodName);
  };

  return (
    <>
      {modalIsOpen && (
        <Modal modalIsOpen={modalIsOpen} onClick={() => setModalIsOpen(false)}>
          <Search
            onClickSearch={onClickSearchTrigger}
            {...register('search_name')}
            name="search_name"
          />
          <div>
            {searchedData &&
              searchedData.items.map((result) => (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setValue('name', result.title.replace(/<\/?b>/g, ''));
                    setValue('image_url', result.image);
                    setValue('category', result.category3);
                    setSearchTrigger(false);
                    setModalIsOpen(false);
                  }}
                  key={result.productId}>
                  {result.title.replace(/<\/?b>/g, '')}
                </div>
              ))}
          </div>
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
                {...register('name')}
                name="name"
                truncate={true}
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
            {searchIamgeUrl ? (
              <div className="mobile:h- flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text mobile:h-[150px] mobile:w-full">
                <Image
                  src={searchIamgeUrl}
                  alt={searchFoodName || ''}
                  width="100"
                  height="100"
                  className="h-full desktop:w-[200px]"
                />
              </div>
            ) : (
              <div className="mobile:h- flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text mobile:h-[150px] mobile:w-full">
                재료 사진
              </div>
            )}
            <div className="flex flex-grow flex-col gap-[20px]">
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>보관방법</div>
                <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                    <select
                      onChange={(e) => field.onChange(e.target.value)}
                      className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text bg-transparent text-center mobile:w-full">
                      {selectLists.map(({ value, label }) => (
                        <option value={value} key={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
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
                <div>구매일자</div>
                <Controller
                  name="purchase_date"
                  control={control}
                  render={({
                    field: { onChange: onChangeForm, onBlur, name },
                  }) => (
                    <DatePicker
                      name={name}
                      onChange={(datestring) => {
                        setPurchaseDate(dayjs(datestring).toDate());
                        return onChangeForm(
                          dayjs(datestring).format('YY.MM.DD'),
                        );
                      }}
                      dateFormat="yy.MM.dd"
                      onBlur={onBlur}
                      selected={purchaseDate}
                      className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text bg-transparent text-center mobile:w-full"
                    />
                  )}
                />
              </div>
              <div className="flex flex-row justify-between mobile:flex-col">
                <div>유통기한</div>
                <Controller
                  name="expiry_date"
                  control={control}
                  render={({
                    field: { onChange: onChangeForm, onBlur, name },
                  }) => (
                    <DatePicker
                      name={name}
                      onChange={(datestring) => {
                        setExpiryDate(dayjs(datestring).toDate());
                        return onChangeForm(
                          dayjs(datestring).format('YY.MM.DD'),
                        );
                      }}
                      dateFormat="yy.MM.dd"
                      onBlur={onBlur}
                      selected={expiryDate}
                      className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text bg-transparent text-center mobile:w-full"
                    />
                  )}
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
