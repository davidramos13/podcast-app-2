import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const formatDateToNow = (dateStr: string) => {
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(currentDate.getDate() - 30);

  const date = new Date(dateStr);
  const dateFormatted = date > oneMonthAgo ? formatDistanceToNow(date) : format(date, 'dd/MM/yyyy');
  return dateFormatted;
};

export const calculateDuration = (ms?: number) => {
  if (!ms) return '';
  const totalSeconds = ms / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalSeconds / 3600;
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(totalMinutes % 60)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(totalHours % 24)
    .toString()
    .padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;
  return time;
};
