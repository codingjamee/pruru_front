'use client';
import PlusSvg from '@/_assets/PlusSvg';
import Button from '@/_components/Button';
import { getAnalyzeReceipt } from '@/_utils/getQuery';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';

const UploadReceipt = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [incodedFile, setIncodedFile] = useState<
    string | ArrayBuffer | null | undefined
  >('');
  const [imgType, setImgType] = useState<string>('');
  const [analyzeReceipt, setAnalyzeReceipt] = useState(false);
  const router = useRouter();
  const { isSuccess, isError } = useQuery({
    queryKey: ['receipt', 'anaylze'],
    queryFn: () => getAnalyzeReceipt(incodedFile, imgType),
    enabled: analyzeReceipt,
  });
  if (isSuccess) {
    router.push('/add/receipt/edit');
  } else if (isError) {
    //추후 toast로
    console.log('에러가 발생하였습니다 다시 파일을 업로드해주세요');
  }
  const onClickButton = () => {
    fileInput.current!.click();
  };

  const imgUpload = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setIncodedFile(event.target?.result);
        resolve(event.target?.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgType(e.target.files[0].type);
      imgUpload(e.target.files[0]);
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
          <PlusSvg className="flex h-[44px] w-[44px] items-center justify-center" />
        </Button>
      </div>
      <Button
        onClick={() => setAnalyzeReceipt(true)}
        variant="primary"
        className="rounded-lg mobile:w-full">
        분석하기
      </Button>
    </>
  );
};

export default UploadReceipt;
