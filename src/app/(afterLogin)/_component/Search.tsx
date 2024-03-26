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
}

type CombinedInputProps = SearchProps & InputProps;

const Search = forwardRef<HTMLInputElement, CombinedInputProps>(
  ({ onClickSearch, onChange, onBlur, name }: SearchProps, ref) => {
    return (
      <div className="flex w-full items-center justify-center">
        <Input
          ref={ref}
          name={name}
          variant="underline"
          placeholder="재료명"
          onChange={onChange}
          onBlur={onBlur}
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
