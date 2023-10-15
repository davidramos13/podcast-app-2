import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Podcast } from '~/entities';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { calculateDuration, formatDateToNow } from '~/utils/dates';
import { ITunesResultsRaw, transformITunesResults } from '~/utils/itunes';

const podcastsApi = createApi({
  reducerPath: 'podcasts',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: builder => ({
    getPodcasts: builder.query({
      query: (term: string) => ({
        url: getEncodedUrl(`search?entity=podcast&limit=10&term=${term}`),
        method: 'GET',
      }),
      transformResponse: (apiResults: ITunesResultsRaw): Podcast[] => {
        const podcasts = transformITunesResults(apiResults);
        return podcasts.map(p => ({
          id: p.trackId,
          name: p.trackName,
          author: p.artistName,
          genres: p.genres.join(', '),
          duration: calculateDuration(p.trackTimeMillis),
          releaseDate: formatDateToNow(p.releaseDate),
        }));
      },
    }),
  }),
});

export const { useLazyGetPodcastsQuery } = podcastsApi;

export default podcastsApi;
