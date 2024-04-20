'use client'; // Error components must be Client Components

import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card variant="outlined" className="mt-10 min-h-[695px] w-[635px]">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2>요청에 실패하였습니다..... </h2>
        <Button
          variant="primary"
          className="rounded-lg"
          aria-label="try-again"
          onClick={() => reset()}>
          다시 시도하기
        </Button>
      </div>
    </Card>
  );
}
