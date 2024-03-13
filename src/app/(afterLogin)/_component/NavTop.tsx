'use client';

import Button from '@/_components/Button';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const navList = [
  {
    name: '추가',
    path: '/add/food',
    focusKey: 'add',
    style: 'link-one',
    subStyle: 'link-hidden-one',
    subList: [
      { name: '식재료', subPath: '/add/food' },
      { name: '영수증', subPath: '/add/receipt' },
    ],
  },
  {
    name: '검색',
    path: '/search',
    focusKey: 'search',
    style: 'link-two',
    subList: [],
  },
  {
    name: '식재료',
    path: '/food',
    focusKey: 'food',
    style: 'link-three',
    subStyle: 'link-hidden-three',
    subList: [
      { name: '전체', subPath: '/food?storage=total&sort=category' },
      { name: '냉장', subPath: '/food?storage=refrigerated&sort=category' },
      { name: '냉동', subPath: '/food?storage=frozen&sort=category' },
    ],
  },
  {
    name: '영수증',
    path: '/receipt',
    focusKey: 'receipt',
    subList: [],
  },
];

const NavTop = () => {
  const segment = useSelectedLayoutSegment();
  const isFocused = (selected: string): string | undefined => {
    if (segment === selected) return 'nav-hover';
    return '';
  };

  return (
    <ul className="flex h-[52px] items-center justify-between gap-4 text-size-font-default">
      {navList.map((nav) => (
        <div key={nav.path} className={`${nav.style} relative`}>
          <Button
            href={nav.path}
            className={`${isFocused(nav.focusKey)}  nav-button hover:nav-hover`}>
            <li>{nav.name}</li>
          </Button>
          <div className={`${nav.subStyle} sub-nav`}>
            {nav.subList &&
              nav.subList.length > 0 &&
              nav.subList.map((sub) => (
                <Link
                  key={sub.subPath}
                  className="link-style"
                  href={sub.subPath}>
                  {sub.name}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </ul>
  );
};

export default NavTop;
