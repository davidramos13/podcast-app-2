import { useLazyGetPodcastsQuery } from '~/store/podcastsApi';
import { useAppDispatch, useAppSelector } from '~/store';
import { setFilter } from '~/store/podcastSearchSlice';
import useDebouncedCall from '~/utils/useDebouncedCall';
import { useEffect } from 'react';

const usePodcastSearch = () => {
  const filter = useAppSelector(({ podcastSearch }) => podcastSearch.filter);
  const dispatch = useAppDispatch();
  const [getPodcasts, { data, isLoading }] = useLazyGetPodcastsQuery();

  const debounceCallback = useDebouncedCall((value: string) => getPodcasts(value));

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
