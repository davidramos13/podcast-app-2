import axios from 'axios';
import { useEffect, useState } from 'react';
import { getStorageData, saveStorageData } from './storage';

const usePageLoad = <TypeData, TypeApi>(
  url: string,
  storageKey: string,
  onSuccess: (apiData: TypeApi) => TypeData,
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeData | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const cachedData = getStorageData<TypeData>(storageKey);
        if (cachedData) {
          setData(cachedData);
          return;
        }
        const apiData = await axios.get<TypeApi>(url);
        const result = onSuccess(apiData.data);
        saveStorageData(storageKey, result);
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [onSuccess, storageKey, url]);

  return { loading, data };
};

export default usePageLoad;
