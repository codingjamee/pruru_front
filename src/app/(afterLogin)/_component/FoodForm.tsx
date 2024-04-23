import Button from '@/_components/Button';
import Input from '@/_components/Input';
import Search from './Search';
import Image from 'next/image';
import { useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { selectLists } from '@/_utils/listData';

const FoodForm = ({
  onClickSearch,
  onAddFood,
  searchIamgeUrl,
  searchFoodName,
}: {
  onClickSearch: () => void;
  onAddFood: SubmitHandler<FieldValues>;
  searchIamgeUrl: string | undefined;
  searchFoodName: string | undefined;
}) => {
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);
  const { register, handleSubmit, control } = useFormContext();

  return (
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
            placeholder="재료명 검색하기"
            disabled
          />
        </div>
        <Button
          href="/receipt"
          variant="primary"
          className="rounded-lg mobile:w-full"
          aria-label="getInfo-receipt">
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
              {...register('remaining_amount', {
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
              render={({ field: { onChange: onChangeForm, onBlur, name } }) => (
                <ReactDatePicker
                  name={name}
                  onChange={(datestring) => {
                    setPurchaseDate(datestring);
                    return onChangeForm(datestring);
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
              render={({ field: { onChange: onChangeForm, onBlur, name } }) => (
                <ReactDatePicker
                  name={name}
                  onChange={(datestring) => {
                    setExpiryDate(datestring);
                    return onChangeForm(datestring);
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
        className="rounded-lg mobile:w-full"
        aria-label="add-food">
        추가하기
      </Button>
    </form>
  );
};

export default FoodForm;
