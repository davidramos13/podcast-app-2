import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLazyGetPodcastsQuery } from '~/store/podcastsApi';

const usePodcastSearch = () => {
  const [filter, setFilter] = useState('');
  const [getPodcasts, { data, isLoading }] = useLazyGetPodcastsQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallback = useCallback(
    debounce((value: string) => getPodcasts(value), 500),
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
