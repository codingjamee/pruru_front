'use client';

import Button from '@/_components/Button';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect } from 'react';

const NavTop = () => {
  const segment = useSelectedLayoutSegment();
  console.log(segment);
  const isFocused = (selected: string): string | undefined => {
    if (segment === selected) return 'nav-hover';
    return '';
  };

  useEffect(() => {
    console.log('컴포넌트 렌더링');
  }, []);
  return (
    <ul className="flex h-[72px] items-center justify-between gap-1">
      <Button
        href="/add"
        className={`${isFocused('add')} nav-button hover:nav-hover`}>
        <li>추가</li>
      </Button>
      <Button href="/search" className={`${isFocused('search')} nav-button`}>
        <li>검색</li>
      </Button>
      <Button href="/food" className={`${isFocused('food')} nav-button`}>
        <li>식재료</li>
      </Button>
      <Button href="/receipt" className={`${isFocused('receipt')} nav-button`}>
        <li>영수증</li>
      </Button>
    </ul>
  );
};

export default NavTop;
