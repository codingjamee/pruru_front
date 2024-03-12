'use client';
import { useRouter } from 'next/navigation';

const SearchGlass = ({
  width,
  height,
  path,
  color,
}: {
  width?: number;
  height?: number;
  path?: string;
  color?: string;
}) => {
  const router = useRouter();
  const onClick = () => {
    path && router.push(path);
  };

  return (
    <div onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color || 'currentColor'}
        width={width || '22px'}
        height={height || '22px'}
        className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>{' '}
    </div>
  );
};

export default SearchGlass;
