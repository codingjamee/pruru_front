'use client';

import Arrow from '@/_components/Arrow';
import { useEffect, useState } from 'react';

const ReceiptArrowFn = () => {
  const [yearMonth, setYearMonth] = useState('');

  useEffect(() => {}, [yearMonth]);
  const leftFn = () => {
    setYearMonth('');
  };
  const rightFn = () => {};
  return (
    <>
      <Arrow direction="left" executeFn={leftFn} />
      <div>2024.2월</div>
      <Arrow direction="right" executeFn={rightFn} />
    </>
  );
};

export default ReceiptArrowFn;
