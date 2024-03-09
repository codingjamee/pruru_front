import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Carousel from '@/_components/Carousel';
import CarouselItem from '@/_components/CarouselItem';
import FoodCard from '../_component/FoodCard';

const page = () => {
  return (
    <>
      <Carousel
        height="275px"
        customClass="my-[63px]"
        arrowHoverStyle="bg-color-primary-m">
        <CarouselItem>
          <div className="m-[40px] h-full">
            <div className="text-[24px]">식재료 추가하기</div>
            <Button
              href="/add/food"
              className="flex h-full w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
              <PlusSvg className="h-[44px] w-[44px]" />
            </Button>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="m-[40px] h-full">
            <div className="text-[24px]">영수증 추가하기</div>
            <Button
              href="/add/receipt"
              className="flex h-full w-full flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
              <PlusSvg className="h-[44px] w-[44px]" />
            </Button>
          </div>
        </CarouselItem>
      </Carousel>
      <FoodCard />
    </>
  );
};

export default page;
