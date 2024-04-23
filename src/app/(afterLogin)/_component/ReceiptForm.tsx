import MinusSvg from '@/_assets/MinusSvg';
import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Input from '@/_components/Input';
import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import { editReceiptForm, receiptItemsInit } from '@/_utils/listData';
import dayjs from 'dayjs';
import { Dispatch, Fragment, SetStateAction } from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

const ReceiptForm = ({
  onSubmitForm,
  setPurchaseDate,
  purchaseDate,
  totalPrice,
  length,
}: {
  onSubmitForm: SubmitHandler<PurchaseReceiptInfoType>;
  setPurchaseDate: Dispatch<SetStateAction<Date | null>>;
  purchaseDate: Date | null;
  totalPrice?: number;
  length?: number;
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useFormContext<PurchaseReceiptInfoType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receipt_items',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-[30px]">
      <div className="flex w-full flex-col justify-between gap-[10px]">
        <div className="flex flex-row gap-4">
          <div className="basis-3/12">구매일자</div>
          <Controller
            name="purchase_date"
            control={control}
            render={({ field: { onChange: onChangeForm, onBlur, name } }) => (
              <ReactDatePicker
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
        className="w-full rounded-lg"
        aria-label="add-receipt">
        추가하기
      </Button>
    </form>
  );
};

export default ReceiptForm;
