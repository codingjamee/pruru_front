'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import PlusSvg from '@/_assets/PlusSvg';
import { useEffect, useState } from 'react';
import MinusSvg from '@/_assets/MinusSvg';
import Input from '@/_components/Input';
import { useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import dayjs from 'dayjs';

const EditReceipt = () => {
  const queryClient = useQueryClient();
  const foundReceiptData: PurchaseReceiptInfoType | undefined =
    queryClient.getQueryData(['allSearchResults']);
  const [length, setLength] = useState<number | undefined>(0);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<PurchaseReceiptInfoType>({
    defaultValues: {
      purchase_location:
        (foundReceiptData && foundReceiptData.purchase_location) ||
        '구매처 입력란',
      purchase_date:
        dayjs(foundReceiptData && foundReceiptData.purchase_date).format(
          'YY.MM.DD',
        ) + ' 구매',
      receiptItems: foundReceiptData
        ? foundReceiptData.receiptItems.map((data) => {
            return {
              food_category: data?.food_category || '',
              food_name: data?.food_name || '',
              purchase_price: data?.purchase_price || 0,
              food_weight: '',
              food_id: Math.random() * 4,
              quantity: data?.quantity,
              registered: false,
            };
          })
        : [
            {
              food_id: Math.random() * 4,
              food_category: undefined,
              food_name: undefined,
              food_weight: undefined,
              purchase_price: undefined,
              quantity: undefined,
              registered: false,
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receiptItems',
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setLength(value.receiptItems && value.receiptItems.length);
      setTotalPrice(
        value.receiptItems &&
          value.receiptItems.reduce(
            (acc: number, cur) => acc + (Number(cur?.purchase_price) || 0),
            0,
          ),
      );
    });
    return () => unsubscribe();
  }, [watch]);

  const onSubmit = (data: PurchaseReceiptInfoType) => {
    console.log(data);
  };

  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        영수증 추가하기 <br />
        <div className="text-[10px]">(추가하면 삭제만 가능합니다.)</div>
      </div>
      <Card
        variant="outlined"
        className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]">
          <div className="flex w-full justify-between gap-[10px] mobile:flex-col">
            <Input
              variant={errors.purchase_date ? 'danger' : 'outlined'}
              className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full"
              {...register('purchase_date', {
                required: '빈 칸이 없게 작성해주세요',
                minLength: 1,
              })}
            />
            <Input
              variant="primary"
              className="w-[213px] rounded-lg text-center mobile:w-full"
              {...register('purchase_location', {
                required: '빈 칸이 없게 작성해주세요',
                minLength: 1,
              })}
            />
          </div>
          <div className="flex flex-1 flex-col gap-[10px] mobile:gap-[15px]">
            <div className="flex w-full justify-between text-[14px]">
              <div className="basis-2/12">카테고리</div>
              <div className="max-w-[127px] basis-5/12">품명</div>
              <div className="basis-2/12">중량</div>
              <div className="basis-2/12">금액</div>
              <div className="basis-1/12">등록</div>
            </div>
            {fields.map((_, index) => (
              <div
                className="flex w-full items-center justify-between gap-[5px] truncate"
                key={`receipt-${index}`}>
                <Input
                  variant={
                    errors?.receiptItems?.[index]?.food_category
                      ? 'danger'
                      : 'underline'
                  }
                  {...register(`receiptItems.${index}.food_category`, {
                    required: {
                      value: true,
                      message: '빈 칸이 없게 작성해주세요',
                    },
                    minLength: 1,
                  })}
                  className="basis-2/12"
                />
                <Input
                  variant={
                    errors?.receiptItems?.[index]?.food_name
                      ? 'danger'
                      : 'underline'
                  }
                  {...register(`receiptItems.${index}.food_name`, {
                    required: {
                      value: true,
                      message: '빈 칸이 없게 작성해주세요',
                    },
                    minLength: 1,
                  })}
                  className="max-w-[127px] basis-5/12 truncate"
                />
                <Input
                  variant={
                    errors?.receiptItems?.[index]?.food_weight
                      ? 'danger'
                      : 'underline'
                  }
                  {...register(`receiptItems.${index}.food_weight`, {
                    required: {
                      value: true,
                      message: '빈 칸이 없게 작성해주세요',
                    },
                    minLength: 1,
                  })}
                  className="basis-2/12"
                />
                <Input
                  variant={
                    errors?.receiptItems?.[index]?.purchase_price
                      ? 'danger'
                      : 'underline'
                  }
                  {...register(`receiptItems.${index}.purchase_price`, {
                    required: {
                      value: true,
                      message: '빈 칸이 없게 작성해주세요',
                    },
                    min: 1,
                  })}
                  className="basis-2/12"
                />
                <div className="basis-1/12 cursor-pointer">
                  {index !== 0 && <MinusSvg onClick={() => remove(index)} />}
                </div>
              </div>
            ))}
            <div className="flex gap-[5px]">
              <div className="basis-11/12"></div>
              <PlusSvg
                className="flex basis-1/12"
                onClick={() =>
                  append({
                    food_id: Math.random() * 4,
                    food_category: undefined,
                    food_name: undefined,
                    food_weight: undefined,
                    purchase_price: undefined,
                    quantity: undefined,
                    registered: false,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-[30px]">
            <div>품목 {length}개</div>
            <div>총{totalPrice ? totalPrice.toLocaleString() : 0}원</div>
          </div>
          <div>{errors && <p>{errors?.root?.message}</p>}</div>
          <Button
            type="submit"
            variant="outlined"
            className="w-full rounded-lg">
            추가하기
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditReceipt;
