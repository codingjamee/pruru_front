import SearchGlass from '@/_assets/SearchGlass';
import Input from '@/_components/Input';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface SearchProps {
  onClickSearch?: () => void;
  register?: UseFormRegister<FieldValues>;
  name?: string;
}

const Search = ({ onClickSearch, register, name }: SearchProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Input
        {...(register && name ? register(name) : {})}
        variant="underline"
        placeholder="재료명"
      />
      <div
        onClick={onClickSearch}
        className="h-[18px] w-[29px] translate-x-[-30px] translate-y-[-5px] cursor-pointer">
        <SearchGlass />
      </div>
    </div>
  );
};

export default Search;
