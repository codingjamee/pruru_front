import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import AnalyzeReceipt from '../../_component/AnalyzeReceipt';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: '영수증추가 / PRURU',
  description: '영수증 추가하기',
};

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="py-[20px] mobile:py-[10px]">
        <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
          영수증 추가
        </div>
        <Card
          variant="outlined"
          className="flex min-h-[695px] w-[635px] flex-col gap-[30px] px-[55px] mobile:min-h-[450px] mobile:border-0 mobile:px-4">
          <AnalyzeReceipt />
          <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border p-[12px]">
            <div className="p-[8px] text-size-font-card-title">
              직접 입력하기
            </div>
            <Button
              href="/add/receipt/edit"
              variant="primary"
              className="flex h-[50%] w-full flex-grow flex-col items-center justify-center rounded-lg hover:bg-color-primary-m"
              aria-label="add-receipt">
              <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
            </Button>
          </div>
        </Card>
      </div>
    </Suspense>
  );
};

export default page;
