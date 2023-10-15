import { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useLazyGetPodcastsQuery } from '~/store/podcastsApi';
import { useAppDispatch, useAppSelector } from '~/store';
import { setFilter } from '~/store/podcastSearchSlice';

const usePodcastSearch = () => {
  const filter = useAppSelector(({ podcastSearch }) => podcastSearch.filter);
  const dispatch = useAppDispatch();
  const [getPodcasts, { data, isLoading }] = useLazyGetPodcastsQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps -- false positive from eslint
  const debounceCallback = useCallback(
    debounce((value: string) => getPodcasts(value), 500),
    [],
  );

  useEffect(() => {
    if (filter.length >= 3) {
      debounceCallback(filter);
    }

    return () => {
      debounceCallback.cancel();
    };
  }, [debounceCallback, filter]);

  const onChangeFilter = (value: string) => {
    dispatch(setFilter(value));
  };

  return { isLoading, data, filter, onChangeFilter };
};

export default usePodcastSearch;
