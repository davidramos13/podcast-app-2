import useDebouncedCall from '~/utils/useDebouncedCall';
import { useEffect } from 'react';
import { useShallowAppStore } from '~/store';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcasts } from '~/store/podcastsApi';

const usePodcastSearch = () => {
  const { filter, setFilter } = useShallowAppStore(['filter', 'setFilter']);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['search', filter],
    queryFn: () => fetchPodcasts(filter),
    enabled: false,
  });

  const debounceCallback = useDebouncedCall(() => refetch());

  useEffect(() => {
    return () => {
      debounceCallback.cancel();
    };
  }, []);

  const onChangeFilter = (value: string) => {
    setFilter(value);
    if (value.length >= 3) {
      debounceCallback();
    }
  };

  return { isLoading, data, filter, onChangeFilter };
};

export default usePodcastSearch;
