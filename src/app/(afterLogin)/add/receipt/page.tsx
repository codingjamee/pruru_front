import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import UploadReceipt from '../../_component/UploadReceipt';

const page = () => {
  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        영수증 추가
      </div>
      <Card
        variant="outlined"
        className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
        <UploadReceipt />
        <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border p-[12px]">
          <div className="p-[8px] text-size-font-card-title">직접 입력하기</div>
          <Button
            href="/add/receipt/edit"
            className="flex h-[50%] w-full flex-grow flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
            <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default page;
