'use client';
import Card from '@/_components/Card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { FoodPropType } from '@/_types/FoodTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchReturnType } from '@/_types/ReturnTypes';
import { getSearchCategory } from '@/_utils/getQuery';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { postFoodData, postFoodDataById } from '@/_utils/mutateQuery';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SearchModal from './ SearchModal';
import FoodForm from './FoodForm';
import useDefaultFood from '../_hooks/useDefaultFood';
dayjs.extend(customParseFormat);

const AddFood = () => {
  const existFoodId = useSearchParams().get('foodId') || '';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const foodData: FoodPropType | undefined = queryClient.getQueryData([
    'addFood',
    existFoodId,
  ]);
  const methods = useForm();
  const { mutate } = useMutation({
    mutationFn: (
      data: (FoodPropType | undefined) & { search_name?: string },
    ) => {
      if (existFoodId) {
        console.log(data);
        return postFoodDataById(data, existFoodId);
      } else {
        console.log(data);
        return postFoodData(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      router.push(`/food/${existFoodId}`);
    },
    onError: () => {
      //토스트
      console.log('식재료 업로드 실패...!!');
    },
    throwOnError: true,
  });

  const defaultValues = useDefaultFood(foodData);

  const { watch, setValue } = useForm<FoodPropType & { search_name?: string }>({
    defaultValues: defaultValues,
  });

  const searchFoodName = watch('name');
  const searchName = watch('search_name');
  const searchIamgeUrl = watch('image_url');

  //검색결과
  const { data: searchedData } = useQuery<SearchReturnType>({
    queryKey: ['search', searchName],
    queryFn: () =>
      getSearchCategory(
        10,
        ['search', 'foodname'],
        searchName || searchFoodName,
      ),
    enabled: searchTrigger,
    throwOnError: true,
  });

  const onClickSearch = () => {
    setModalIsOpen(true);
    setValue('image_url', '');
    setValue('search_name', searchFoodName || '');
    setSearchTrigger(false);
  };

  const onAddFood = (
    data: (FoodPropType | undefined) & { search_name?: string },
  ) => {
    mutate(data);
  };

  const onClickSearchTrigger = () => {
    setSearchTrigger(true);
    console.log('search is Triggered', 'value is : ', searchName);
  };

  return (
    <>
      <FormProvider {...methods}>
        {modalIsOpen && (
          <SearchModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            searchedData={searchedData}
            setValue={setValue}
            setSearchTrigger={setSearchTrigger}
            onClickSearchTrigger={onClickSearchTrigger}
          />
        )}
        <Card variant="outlined" className="min-h-[695px] w-[635px] ">
          <FoodForm
            onClickSearch={onClickSearch}
            onAddFood={onAddFood}
            searchIamgeUrl={searchIamgeUrl}
            searchFoodName={searchFoodName}
            buttonName="추가하기"
          />
        </Card>
      </FormProvider>
    </>
  );
};

export default AddFood;
