'use client';
import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import { getAnalyzeReceipt } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';

const UploadReceipt = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [incodedFile, setIncodedFile] = useState<string>('');
  const [analyzeReceipt, setAnalyzeReceipt] = useState(false);
  const router = useRouter();
  const { status } = useQuery({
    queryKey: ['receipt', 'anaylze'],
    queryFn: () => getAnalyzeReceipt(incodedFile, 'JPEG'),
    enabled: analyzeReceipt,
  });

  useEffect(() => {
    console.log(status);
    if (status === 'success') {
      console.log('요청에 성공!');
      router.push('/add/receipt/edit');
    } else if (status === 'error') {
      //추후 toast로
      console.log('에러가 발생하였습니다 다시 파일을 업로드해주세요');
    }
  }, [status]);

  const onClickButton = () => {
    fileInput.current!.click();
  };

  const imgUpload = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, (image) => {
        resolve(image as string | PromiseLike<string>);
      });
    });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      imgUpload(e.target.files[0])
        .then((result) => setIncodedFile(result))
        .catch((error) => {
          console.error('Image upload failed:', error);
        });
    }
  };

  return (
    <>
      <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border p-[12px]">
        <div className="p-[8px] text-size-font-card-title">영수증 선택</div>
        <input type="file" onChange={onChangeFile} ref={fileInput} hidden />
        <Button
          onClick={onClickButton}
          className=" flex h-[50%] w-full flex-grow flex-col items-center justify-center rounded-lg hover:bg-color-primary-m">
          <PlusSvg
            cyAttribute="upload-receipt"
            className="flex h-[44px] w-[44px] items-center justify-center"
          />
        </Button>
      </div>
      <Button
        cyAttribute="analyze-receipt"
        onClick={() => setAnalyzeReceipt(true)}
        variant="primary"
        className="rounded-lg mobile:w-full">
        분석하기
      </Button>
    </>
  );
};

export default UploadReceipt;
