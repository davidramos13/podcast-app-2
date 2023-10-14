import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLazyGetPodcastsQuery } from '~/store/podcasts/api';

const usePodcastSearch = () => {
  const [filter, setFilter] = useState('');
  const [trigger, { data, isLoading }] = useLazyGetPodcastsQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallback = useCallback(
    debounce((value: string) => trigger(value), 500),
    [],
  );

  useEffect(
    () => () => {
      debounceCallback.cancel();
    },
    [debounceCallback],
  );

  const onChangeFilter = (value: string) => {
    setFilter(value);
    if (value && value.length >= 3) {
      debounceCallback(value);
    }
  };

  return { isLoading, data, filter, onChangeFilter };
};

export default usePodcastSearch;

const a = setTimeout(() => console.log('a'), 2000);
clearTimeout(a);
