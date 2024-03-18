'use client';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import PlusSvg from '@/_assets/PlusSvg';
import { purchaseReceiptInfo } from './ReceiptDetailCard';
import { useMemo } from 'react';
import MinusSvg from '@/_assets/MinusSvg';
import Input from '@/_components/Input';
import { useFieldArray, useForm } from 'react-hook-form';

const EditReceipt = () => {
  const total_price = useMemo(
    () =>
      purchaseReceiptInfo.receiptItems.reduce((acc, cur) => {
        return cur.purchase_price * cur.quantity + acc;
      }, 0),
    [purchaseReceiptInfo],
  );

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      receiptArr: [...purchaseReceiptInfo.receiptItems],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receiptArr',
  });

  const onSubmit = () => {};

  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        영수증 추가하기 <br />
        <div className="text-[10px]">(추가하면 삭제만 가능합니다.)</div>
      </div>
      <Card
        variant="outlined"
        className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
        <div className="flex w-full justify-between gap-[10px] mobile:flex-col">
          <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
            {purchaseReceiptInfo.purchase_date} 구매
          </div>
          <Button variant="primary" className="rounded-lg mobile:w-full">
            {purchaseReceiptInfo.purchase_location}
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-[10px] mobile:gap-[15px]">
          <div className="flex w-full justify-between text-[14px]">
            <div className="basis-2/12">카테고리</div>
            <div className="max-w-[127px] basis-5/12">품명</div>
            <div className="basis-2/12">중량</div>
            <div className="basis-2/12">금액</div>
            <div className="basis-1/12">등록</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((receipt, index) => (
              <div
                className="flex w-full justify-between gap-[5px] truncate"
                key={receipt.food_id}>
                <Input
                  variant="underline"
                  {...register(`receiptArr.${index}.food_category`)}
                  className="basis-2/12"
                />
                <Input
                  variant="underline"
                  {...register(`receiptArr.${index}.food_name`)}
                  className="max-w-[127px] basis-5/12 truncate"
                />

                <Input
                  variant="underline"
                  {...register(`receiptArr.${index}.food_weight`)}
                  className="basis-2/12"
                />
                <Input
                  variant="underline"
                  defaultValue={(
                    receipt.price_per_amount * receipt.quantity
                  ).toLocaleString()}
                  className="basis-2/12"
                />

                <div className="basis-1/12 cursor-pointer">
                  <MinusSvg onClick={() => remove(index)} />
                </div>
              </div>
            ))}
          </form>

          <div className="flex gap-[5px]">
            <div className="basis-11/12"></div>
            <PlusSvg
              className="flex basis-1/12"
              onClick={() =>
                append({
                  food_category: '',
                  food_name: '',
                  food_weight: '',
                  purchase_price: 0,
                  price_per_amount: 0,
                  quantity: 0,
                  registered: false,
                })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-[30px]">
          <div>품목 {purchaseReceiptInfo.receiptItems.length}개</div>
          <div>총{total_price.toLocaleString()}원</div>
        </div>

        <Button
          onClick={onSubmit}
          variant="outlined"
          className="w-full rounded-lg">
          수정완료
        </Button>
      </Card>
    </div>
  );
};

export default EditReceipt;
