import Card from '@/_components/Card';
import Button from '@/_components/Button';
import Input from '@/_components/Input';

function page() {
  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        식재료 상세
      </div>
      <Card
        variant="outlined"
        className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
        <div className="flex w-full justify-between">
          <div className="w-[213px] rounded-lg border border-solid border-color-default-text px-[30px] py-[7px] text-center mobile:w-full">
            카테고리(자동입력)
          </div>
          <Button variant="primary" className="rounded-lg mobile:w-full">
            상온
          </Button>
        </div>
        <Input variant="underline" placeholder="식재료명" />

        <div className="flex flex-row gap-[20px] mobile:flex-col">
          <div className="mobile:h- flex w-[200px] items-center justify-center rounded-lg border border-solid border-color-default-text mobile:h-[150px] mobile:w-full">
            재료 사진 등록
          </div>
          <div className="flex flex-grow flex-col gap-[20px]">
            <div className="flex flex-row justify-between mobile:flex-col">
              <div>중량</div>
              <Input variant="outlined" className="w-[213px]" />
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
            <Input variant="underline" placeholder="구매장소" />
            <Input variant="underline" placeholder="구매금액" />
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-[17px] ">
          <div>메모</div>
          <textarea className="flex flex-grow rounded-lg border bg-transparent" />
        </div>
        <div className="flex gap-[20px]">
          <Button variant="primary" className="flex-1 rounded-lg mobile:w-full">
            수정하기
          </Button>
          <Button variant="primary" className="flex-1 rounded-lg mobile:w-full">
            삭제하기
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default page;
