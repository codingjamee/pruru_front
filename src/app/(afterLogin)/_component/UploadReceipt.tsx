import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';

const UploadReceipt = () => {
  return (
    <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border p-[12px]">
      <div className="p-[8px] text-size-font-card-title">영수증 선택</div>
      <Button
        href="/add/receipt/edit"
        className=" flex h-[50%] w-full flex-grow flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
        <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
      </Button>
    </div>
  );
};

export default UploadReceipt;
