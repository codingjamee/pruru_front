'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import PlusSvg from '@/_assets/PlusSvg';
import { Fragment, useEffect, useState } from 'react';
import MinusSvg from '@/_assets/MinusSvg';
import Input from '@/_components/Input';
import { useFieldArray, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import dayjs from 'dayjs';
import { postReceiptData } from '@/_utils/postQuery';
import { useRouter } from 'next/navigation';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { editReceiptForm, receiptItemsInit } from '@/_utils/listData';
dayjs.extend(customParseFormat);

const EditReceipt = () => {
  const queryClient = useQueryClient();
  const foundReceiptData: PurchaseReceiptInfoType | undefined =
    queryClient.getQueryData(['allSearchResults']);
  const [length, setLength] = useState<number | undefined>(0);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [receiptData, setReceiptData] = useState<
    PurchaseReceiptInfoType | undefined
  >();
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const router = useRouter();

  const { status } = useQuery({
    queryKey: ['posted', 'receipt', 'data'],
    queryFn: () => postReceiptData(receiptData),
    enabled: submitTrigger,
    staleTime: 6 * 60 * 1000,
  });

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
      total_price: totalPrice,
      receipt_items: foundReceiptData
        ? foundReceiptData.receipt_items.map((data) => {
            return {
              category: data?.category || '',
              name: data?.name || '',
              purchase_price: data?.purchase_price || 0,
              amount: '',
              food_id: Math.random() * 4,
              quantity: data?.quantity,
              image_url: data?.image_url,
              registered: false,
            };
          })
        : receiptItemsInit,
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

  useEffect(() => {
    if (status === 'success') {
      const editMonth = dayjs(
        foundReceiptData?.purchase_date.split(' ')[0],
        'YY.MM',
      );
      router.push(`receipt?month=${editMonth}`);
    }
  }, [status]);

  const onSubmit = (data: PurchaseReceiptInfoType) => {
    setReceiptData(data);
    setSubmitTrigger(true);
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
                {editReceiptForm.map(
                  ({ field, basis, maxWidth, min }, index) => (
                    <Fragment key={`edit-${index}`}>
                      <Input
                        variant={
                          errors?.receipt_items?.[index]?.[field]
                            ? 'danger'
                            : 'underline'
                        }
                        {...register(`receipt_items.${index}.${field}`, {
                          required: {
                            value: true,
                            message: '빈 칸이 없게 작성해주세요',
                          },
                          minLength: min ? undefined : 1,
                          min: 1,
                        })}
                        className={`${maxWidth ? `max-w-[${maxWidth}]` : ''} basis-${basis} ${field === 'name' ? 'truncate' : ''}`}
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
                onClick={() => append(receiptItemsInit[0])}
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
