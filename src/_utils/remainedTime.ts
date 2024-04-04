import dayjs from 'dayjs';

const parseDateString = (dateString: Date): Date => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('올바른 날짜 형식이 아닙니다.');
  }
  return date;
};

//"2024-03-30T15:00:00Z"
export const remainedTime = (untilDate: Date): number => {
  const nowDate = dayjs().toDate();
  const until = parseDateString(dayjs(untilDate).toDate());

  const remaningTime = until.getTime() - nowDate.getTime();
  const remainingDay = Math.ceil(remaningTime / (1000 * 60 * 60 * 24));
  return remainingDay;
};
