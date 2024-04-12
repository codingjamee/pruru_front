import SearchGlass from '@/_assets/SearchGlass';
import Input from '@/_components/Input';
import {
  ComponentPropsWithRef,
  SetStateAction,
  SyntheticEvent,
  forwardRef,
} from 'react';

type InputProps = ComponentPropsWithRef<'input'>;

interface SearchProps {
  onClickSearch?: () => void;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  name?: string;
  setSearchVal?: (value: SetStateAction<string | undefined>) => void;
  truncate?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

type CombinedInputProps = SearchProps & InputProps;

const Search = forwardRef<HTMLInputElement, CombinedInputProps>(
  (
    {
      onClickSearch,
      onBlur,
      name,
      truncate,
      disabled,
      placeholder,
    }: SearchProps,
    ref,
  ) => {
    return (
      <div className="flex w-full items-center justify-center">
        <Input
          ref={ref}
          name={name}
          variant="underline"
          placeholder={placeholder || '재료명'}
          onBlur={onBlur}
          truncate={truncate}
          disabled={disabled}
        />
        <div
          onClick={onClickSearch}
          className="h-[18px] w-[29px] translate-x-[-30px] translate-y-[-5px] cursor-pointer">
          <SearchGlass />
        </div>
      </div>
    );
  },
);

Search.displayName = 'Search';
export default Search;
