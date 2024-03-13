import SearchGlass from '@/_assets/SearchGlass';
import Input from '@/_components/Input';

const Search = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Input variant="underline" placeholder="재료명" />
      <div className="h-[18px] w-[29px] translate-x-[-30px] translate-y-[-5px] cursor-pointer">
        <SearchGlass />
      </div>
    </div>
  );
};

export default Search;
