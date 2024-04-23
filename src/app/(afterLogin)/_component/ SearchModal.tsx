import Modal from '@/_components/Modal';
import Search from './Search';
import { SearchReturnType } from '@/_types/ReturnTypes';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue, useFormContext } from 'react-hook-form';
import { FoodPropType } from '@/_types/FoodTypes';

export interface SearchModalProp {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  searchedData?: SearchReturnType;
  setValue: UseFormSetValue<
    FoodPropType & {
      search_name?: string;
    }
  >;
  setSearchTrigger: Dispatch<SetStateAction<boolean>>;
  onClickSearchTrigger: () => void;
}

const SearchModal = ({
  modalIsOpen,
  setModalIsOpen,
  searchedData,
  setValue,
  setSearchTrigger,
  onClickSearchTrigger,
}: SearchModalProp) => {
  const { register } = useFormContext();
  return (
    <Modal modalIsOpen={modalIsOpen} onClick={() => setModalIsOpen(false)}>
      <Search
        onClickSearch={onClickSearchTrigger}
        {...register('search_name')}
        name="search_name"
      />
      <div>
        {searchedData && searchedData?.items.length >= 1 ? (
          searchedData?.items.map((result) => (
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
          ))
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
