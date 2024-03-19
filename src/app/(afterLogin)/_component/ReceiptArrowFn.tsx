'use client';

import Arrow from '@/_components/Arrow';
import { useYearMonthCtx } from '@/_contexts/DateContext';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const ReceiptArrowFn = () => {
  const { yearMonth, setYearMonth } = useYearMonthCtx();
  const getYearMonth = (direction: 'left' | 'right') => {
    const now = dayjs(yearMonth, ['YY.MM']);
    if (direction === 'left') {
      const newYearMonth = now.subtract(1, 'month').format('YY.MM');
      return setYearMonth(newYearMonth);
    }
    if (direction === 'right') {
      const newYearMonth = now.add(1, 'month').format('YY.MM');
      return setYearMonth(newYearMonth);
    }
    return;
  };

  return (
    <>
      <Arrow direction="left" executeFn={getYearMonth} />
      <div>{yearMonth}</div>
      <Arrow direction="right" executeFn={getYearMonth} />
    </>
  );
};

export default ReceiptArrowFn;
