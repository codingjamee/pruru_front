'use client';
import Card from '@/_components/Card';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FoodPropType } from '@/_types/FoodTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchReturnType } from '@/_types/ReturnTypes';
import { getFoodById, getSearchCategory } from '@/_utils/getQuery';
import { AddFoodInit } from '@/_utils/listData';
import 'react-datepicker/dist/react-datepicker.css';
import { putFoodDataById } from '@/_utils/mutateQuery';
import useDefaultFood from '../_hooks/useDefaultFood';
import FoodForm from './FoodForm';
import SearchModal from './ SearchModal';

const EditFood = () => {
  const params = useParams();
  let foodId: string | undefined;
  if (typeof params.foodId === 'string') {
    foodId = params.foodId;
  }
  const { data: foodData, status } = useQuery<
    FoodPropType,
    any,
    FoodPropType,
    any
  >({
    queryKey: ['foods', foodId],
    queryFn: () => getFoodById(foodId!),
    staleTime: 10 * 60 * 1000,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const methods = useForm();

  const { mutate } = useMutation({
    mutationFn: (data: FoodPropType) => putFoodDataById(data, foodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods', foodId] });
      router.push(`/food/${foodId}`);
    },
    onError: () => {
      //토스트
      console.log('식재료 업로드 실패...!!');
    },
    throwOnError: true,
  });
  const defaultValues = useDefaultFood(foodData);

  const { watch, setValue } = useForm<FoodPropType & { search_name?: string }>({
    defaultValues:
      foodData && status === 'success' ? defaultValues : AddFoodInit,
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
        searchName || searchFoodName,
      ),
    enabled: searchTrigger,
    throwOnError: true,
  });

  const onClickSearch = () => {
    setModalIsOpen(true);
    setValue('image_url', '');
    setValue('search_name', searchFoodName || '');
    setValue('name', '');
  };
  const onAddFood = (data: FoodPropType) => {
    mutate(data);
  };

  const onClickSearchTrigger = () => {
    setSearchTrigger(true);
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
            buttonName="수정하기"
          />
        </Card>
      </FormProvider>
    </>
  );
};

export default EditFood;
