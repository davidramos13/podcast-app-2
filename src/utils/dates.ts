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

const pad = (num: number) => num.toString().padStart(2, '0');

export const calculateDuration = (ms?: number) => {
  if (ms === undefined) return '';
  const totalSeconds = ms / 1000;
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / 3600) % 24);

  let time = `${pad(minutes)}:${pad(seconds)}`;
  if (hours) {
    time = `${pad(hours)}:${time}`;
  }
  return time;
};
