import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Carousel from '@/_components/Carousel';
import CarouselItem from '@/_components/CarouselItem';
import FoodCard from '../_component/FoodCard';
import CardSliderWrapper from '../_component/CardSliderWrapper';
import Link from 'next/link';
import SmallFoodCard from '../_component/SmallFoodCard';
export const foodCardDummyArr = [
  {
    id: 1,
    imgSrc: '',
    foodTitle: '당근',
    purchaseDate: '24.2.17',
    foodWeight: '400',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 2,
    imgSrc: '',
    foodTitle: '토마토',
    purchaseDate: '24.2.19',
    foodWeight: '40g',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 3,
    imgSrc: '',
    foodTitle: '아보카도',
    purchaseDate: '24.2.12',
    foodWeight: '3개',
    expiryDate: '2024-03-30T15:00:00Z',
  },
  {
    id: 4,
    imgSrc: '',
    foodTitle: '바나나',
    purchaseDate: '24.2.12',
    foodWeight: '1송이',
    expiryDate: '2024-03-30T15:00:00Z',
  },
];
const page = () => {
  return (
    <>
      <Carousel
        indicators={false}
        customClass="my-[63px] h-[168px] tablet:h-[225px] desktop:h-[275px]"
        arrowHoverStyle="bg-color-primary-m">
        <CarouselItem>
          <div className="m-[18px] flex h-full flex-col gap-4 tablet:m-[30px] desktop:m-[40px]">
            <div className="text-size-font-card-title">식재료 추가하기</div>
            <Button
              href="/add/food"
              className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
              <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
            </Button>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="m-[18px] flex h-full flex-col gap-4 tablet:m-[30px] desktop:m-[40px]">
            <div className="text-size-font-card-title">영수증 추가하기</div>
            <Button
              href="/add/receipt"
              className="flex h-[50%] w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
              <PlusSvg className="h-[44px] w-[44px]" />
            </Button>
          </div>
        </CarouselItem>
      </Carousel>

      <div className="my-10 flex justify-between text-size-font-card-title">
        <div>유통기한 임박</div>
        <Link href="/food?storage=total&sort=expiryDate">더보기</Link>
      </div>
      <CardSliderWrapper>
        {foodCardDummyArr.map((food) => (
          <div key={food.id}>
            <FoodCard className="mobile:hidden" food={food} />
            <SmallFoodCard
              className="tablet:hidden desktop:hidden"
              food={food}
            />
          </div>
        ))}
      </CardSliderWrapper>
      <div className="my-10 flex justify-between text-size-font-card-title">
        <div>최근 산 재료</div>
        <Link href="/food?storage=total&sort=purchaseDate">더보기</Link>
      </div>
      <CardSliderWrapper>
        {foodCardDummyArr.map((food) => (
          <div key={food.id}>
            <FoodCard className="mobile:hidden" food={food} />
            <SmallFoodCard
              className="tablet:hidden desktop:hidden"
              food={food}
            />
          </div>
        ))}
      </CardSliderWrapper>
    </>
  );
};

export default page;
