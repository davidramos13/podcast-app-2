import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Podcast } from '~/entities/podcast';
import { ITunesResultsRaw, transformITunesResults } from '~/utils/itunes';

const encodedUrl = (term: string) =>
  `get?url=${encodeURIComponent(
    `https://itunes.apple.com/search?entity=podcast&limit=10&term=${term}`,
  )}`;

const podcastsApi = createApi({
  reducerPath: 'podcasts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.allorigins.win',
  }),
  endpoints: builder => ({
    getPodcasts: builder.query({
      query: (term: string) => ({
        url: encodedUrl(term),
        method: 'GET',
      }),
      transformResponse: (apiResults: ITunesResultsRaw): Podcast[] => {
        const data = transformITunesResults(apiResults);
        return data.map(x => ({
          id: x.trackId,
          name: x.trackName,
          author: x.artistName,
          genres: x.genres,
          duration: x.trackTimeMillis,
          releaseDate: x.releaseDate,
        }));
      },
    }),
  }),
});

export const { useLazyGetPodcastsQuery } = podcastsApi;

export { podcastsApi };
