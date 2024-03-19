'use client';
import dayjs from 'dayjs';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

const yearMonthCtx = createContext<null | {
  yearMonth: string;
  setYearMonth: Dispatch<SetStateAction<string>>;
}>(null);

export const useYearMonthCtx = () => {
  const context = useContext(yearMonthCtx);
  if (!context) {
    throw new Error('범위 외에서 사용할 수 없습니다.');
  }

  return context;
};

export const YearMonthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [yearMonth, setYearMonth] = useState(dayjs().format('YY.MM'));

  return (
    <yearMonthCtx.Provider value={{ yearMonth, setYearMonth }}>
      {children}
    </yearMonthCtx.Provider>
  );
};
