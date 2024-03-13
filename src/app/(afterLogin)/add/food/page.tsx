import Card from '@/_components/Card';
import Button from '@/_components/Button';
import Search from '../../_component/Search';

function page() {
  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        추가하기
      </div>
      <Card
        variant="outlined"
        className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
        <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
          카테고리(자동입력)
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-[10px] tablet:h-[32px] tablet:flex-row tablet:gap-[61px] desktop:h-[32px] desktop:flex-row desktop:gap-[81px]">
          <div className="flex flex-grow mobile:w-full">
            <Search />
          </div>
          <Button variant="primary" className="rounded-lg mobile:w-full">
            영수증에서 가져오기
          </Button>
        </div>
        <div className="flex flex-row gap-[20px] mobile:flex-col">
          <div className="mobile:h- flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text mobile:h-[150px] mobile:w-full">
            재료 사진 등록
          </div>
          <div className="flex flex-grow flex-col gap-[20px]">
            <div className="flex flex-row justify-between mobile:flex-col">
              <div>보관방법</div>
              <div className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full">
                상온
              </div>
            </div>
            <div className="flex flex-row justify-between mobile:flex-col">
              <div>중량(g)</div>
              <div className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full">
                10g
              </div>
            </div>
            <div className="flex flex-row justify-between mobile:flex-col">
              <div>유통기한</div>
              <div className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full">
                2024.02.20
              </div>
            </div>
            <div className="flex flex-row justify-between mobile:flex-col">
              <div>구매일자</div>
              <div className="h-[29px] w-[213px] rounded-lg border border-solid border-color-default-text text-center mobile:w-full">
                2024.02.01
              </div>
            </div>
            <div className="border-b border-color-card-text">구매장소</div>
            <div className="border-b border-color-card-text">구매금액</div>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-[17px] ">
          <div>메모</div>
          <div className="flex flex-grow rounded-lg border"></div>
        </div>
        <Button variant="primary" className="rounded-lg mobile:w-full">
          추가하기
        </Button>
      </Card>
    </div>
  );
}

export default page;
