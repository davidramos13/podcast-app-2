import { StorageData } from '~/entities/common';

const DAY_MILLISECS = 86400000; // 1 day in milliseconds

export const getStorageData = <T>(key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  const result = JSON.parse(data) as StorageData<T>;
  if (Date.now() > result.timestamp + DAY_MILLISECS) return null;
  return result.data;
};

export const saveStorageData = <T>(key: string, data: T) => {
  const dataStr = JSON.stringify({ data, timestamp: Date.now() });
  localStorage.setItem(key, dataStr);
};
