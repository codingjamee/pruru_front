'use client';
import Card from '@/_components/Card';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PurchaseReceiptInfoType } from '@/_types/ReceiptTypes';
import dayjs from 'dayjs';
import { postReceiptData } from '@/_utils/mutateQuery';
import { useRouter } from 'next/navigation';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'react-datepicker/dist/react-datepicker.css';
import useDefaultReceiptValues from '../_hooks/useDefaultReceiptValues';
import ReceiptForm from './ReceiptForm';
dayjs.extend(customParseFormat);

const EditReceipt = () => {
  const queryClient = useQueryClient();
  const modifiedData =
    typeof window !== 'undefined'
      ? localStorage.getItem('allSearchResults')
      : '';
  const foundReceiptData: PurchaseReceiptInfoType | undefined =
    modifiedData && JSON.parse(modifiedData);
  const [length, setLength] = useState<number | undefined>(
    (foundReceiptData && foundReceiptData.receipt_items.length) || 1,
  );
  const [totalPrice, setTotalPrice] = useState<number | undefined>(
    foundReceiptData &&
      foundReceiptData.receipt_items &&
      foundReceiptData.receipt_items?.reduce(
        (acc: number, cur) => acc + (Number(cur?.purchase_price) || 0),
        0,
      ),
  );
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(
    (foundReceiptData && foundReceiptData.purchase_date) || dayjs().toDate(),
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
      localStorage.removeItem('allSearchResults');
      router.push(`/receipt?month=${editMonth}`);
    },
    onError: () => {
      console.log('영수증 업로드 실패...!!');
    },
    throwOnError: true,
  });
  const router = useRouter();
  const defaultValues = useDefaultReceiptValues(foundReceiptData, totalPrice);

  const methods = useForm<PurchaseReceiptInfoType>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setLength(value.receipt_items && value.receipt_items.length);
      setTotalPrice(
        value.receipt_items?.reduce(
          (acc: number, cur) => acc + (Number(cur?.purchase_price) || 0),
          0,
        ),
      );
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const onSubmitForm = (data: PurchaseReceiptInfoType) => {
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
        <FormProvider {...methods}>
          <ReceiptForm
            onSubmitForm={onSubmitForm}
            setPurchaseDate={setPurchaseDate}
            purchaseDate={purchaseDate}
            totalPrice={totalPrice}
            length={length}
            buttonName="추가하기"
          />
        </FormProvider>
      </Card>
    </div>
  );
};

export default EditReceipt;
