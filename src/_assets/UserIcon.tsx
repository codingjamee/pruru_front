'use client';
import { useRouter } from 'next/navigation';

const UserIcon = ({
  width,
  height,
  path,
}: {
  width?: number;
  height?: number;
  path?: string;
}) => {
  const router = useRouter();
  const onClick = () => {
    path && router.push(path);
  };

  return (
    <div onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || '22px'}
        height={height || '22px'}
        viewBox="0 0 24 24"
        fill="none">
        <path
          d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
          fill="black"
        />
        <path
          d="M4 18C4 15.2386 6.23858 13 9 13H15C17.7614 13 20 15.2386 20 18V22H4V18Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

export default UserIcon;
