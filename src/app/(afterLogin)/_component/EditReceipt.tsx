'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import PlusSvg from '@/_assets/PlusSvg';
import { Fragment, useEffect, useState } from 'react';
import MinusSvg from '@/_assets/MinusSvg';
import Input from '@/_components/Input';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import dayjs from 'dayjs';
import { postReceiptData } from '@/_utils/postQuery';
import { useRouter } from 'next/navigation';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { editReceiptForm, receiptItemsInit } from '@/_utils/listData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
dayjs.extend(customParseFormat);

const EditReceipt = () => {
  const queryClient = useQueryClient();
  const foundReceiptData: PurchaseReceiptInfoType | undefined =
    queryClient.getQueryData(['allSearchResults']);
  const [length, setLength] = useState<number | undefined>(0);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(
    dayjs().toDate(),
  );
  const { mutate } = useMutation({
    mutationFn: (data: PurchaseReceiptInfoType | undefined) =>
      postReceiptData(data),
    mutationKey: ['posted', 'receipt', 'data'],
    onSuccess: () => {
      const editMonth = dayjs(purchaseDate).format('YY.MM');
      queryClient.invalidateQueries({
        queryKey: ['receipt', 'monthly', editMonth],
      });
      router.push(`/receipt?month=${editMonth}`);
    },
    onError: () => {
      //토스트
      console.log('영수증 업로드 실패...!!');
    },
  });
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<PurchaseReceiptInfoType>({
    defaultValues: {
      purchase_location:
        (foundReceiptData && foundReceiptData.purchase_location) || '',
      purchase_date:
        dayjs(foundReceiptData && foundReceiptData.purchase_date).toDate() ||
        dayjs().format('YY.MM.DD'),
      total_price: totalPrice,
      receipt_items: foundReceiptData
        ? foundReceiptData.receipt_items.map((data) => {
            return {
              category: data?.category || '',
              name: data?.name || '',
              purchase_price: data?.purchase_price || 0,
              amount: data?.amount || 0,
              food_id: Math.random() * 4,
              quantity: data?.quantity,
              image_url: data?.image_url,
              registered: false,
            };
          })
        : [receiptItemsInit],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receipt_items',
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setLength(value.receipt_items && value.receipt_items.length);
      setTotalPrice(
        value.receipt_items &&
          value.receipt_items.reduce(
            (acc: number, cur) => acc + (Number(cur?.purchase_price) || 0),
            0,
          ),
      );
    });
    return () => unsubscribe();
  }, [watch]);

  const onSubmit = (data: PurchaseReceiptInfoType) => {
    mutate(data);
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
          <div className="flex w-full flex-col justify-between gap-[10px]">
            <div className="flex flex-row gap-4">
              <div className="basis-3/12">구매일자</div>
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
                      return onChangeForm(dayjs(datestring));
                    }}
                    wrapperClassName="w-[100%] h-[40px] "
                    dateFormat="yy.MM.dd"
                    onBlur={onBlur}
                    selected={dayjs(purchaseDate).toDate()}
                    className="h-[40px] w-[100%] rounded-lg border border-solid border-color-default-text bg-transparent text-center mobile:w-full"
                  />
                )}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-3/12">구매처</div>
              <Input
                variant="primary"
                className="flex-grow rounded-lg text-center "
                {...register('purchase_location', {
                  required: '빈 칸이 없게 작성해주세요',
                  minLength: 1,
                })}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] mobile:gap-[15px]">
            <div className="flex w-full justify-between gap-[5px] text-center text-[14px] mobile:text-[12px]">
              <div className="basis-2/12">카테고리</div>
              <div className="max-w-[127px] basis-4/12">품명</div>
              <div className="basis-2/12">중량</div>
              <div className="basis-1/12">갯수</div>
              <div className="basis-3/12">금액</div>
              <div className="basis-1/12"></div>
            </div>
            {fields.map((_, index) => (
              <div
                className="flex w-full items-center justify-between gap-[5px] truncate"
                key={`receipt-${index}`}>
                {editReceiptForm.map(
                  ({ field, basis, maxWidth, min, required }, inputIndex) => (
                    <Fragment key={`edit-${inputIndex}`}>
                      <Input
                        variant={
                          errors?.receipt_items?.[index]?.[field]
                            ? 'danger'
                            : 'underline'
                        }
                        {...register(`receipt_items.${index}.${field}`, {
                          required: required
                            ? {
                                value: true,
                                message: '빈 칸이 없게 작성해주세요',
                              }
                            : undefined,
                          minLength: min ? undefined : 1,
                          min: 1,
                        })}
                        className={`${maxWidth ? `max-w-[${maxWidth}]` : ''} basis-${basis} ${field === 'name' ? 'truncate' : ''} text-center`}
                      />
                    </Fragment>
                  ),
                )}
                <div className="basis-1/12 cursor-pointer">
                  {index !== 0 && (
                    <MinusSvg
                      className={index === 0 ? 'hidden' : undefined}
                      onClick={() => remove(index)}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="flex gap-[5px]">
              <div className="basis-11/12"></div>
              <PlusSvg
                className="flex basis-1/12 cursor-pointer"
                onClick={() => append(receiptItemsInit)}
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
