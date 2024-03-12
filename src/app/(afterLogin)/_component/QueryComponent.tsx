'use client';
import { useSearchParams } from 'next/navigation';

interface QueryTextMap {
  [key: string]: string;
}

const QueryComponent = ({ value }: { value: 'storage' | 'sort' }) => {
  const router = useSearchParams();
  const storage = router.get('storage') || '전체';
  const sort = router.get('sort') || '유통기한';
  const direction = router.get('direction');

  const storageText: QueryTextMap = {
    refrigerated: '냉장',
    frozen: '냉동',
    total: '전체',
  };

  const sortText: QueryTextMap = {
    price: '가격순',
    expiryDate: '유통기한',
    purchaseDate: '구매일자',
  };
  //value가 내가 원하는 return text
  let returnText = '';
  if (value === 'storage' && typeof storage === 'string') {
    returnText = storageText[storage] || '전체';
  } else if (value === 'sort' && typeof sort === 'string') {
    returnText = sortText[sort] || '유통기한';
  }

  console.log(returnText);

  return (
    <div className="flex items-center gap-[10px]">
      <div className="cursor-pointer">{returnText}</div>
      {value === 'sort' && (
        <div
          className={`${direction === 'up' ? 'arrow-up' : 'arrow-down'} cursor-pointer`}></div>
      )}
    </div>
  );
};

export default QueryComponent;
