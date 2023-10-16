import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Podcast } from '~/entities';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { ITunesResult, ITunesResults, transformITunesResults } from '~/utils/itunes';

export const mapPodcast = (p: ITunesResult) => ({
  id: p.trackId,
  name: p.trackName,
  author: p.artistName,
  genres: p.genres.join(', '),
  releaseDate: p.releaseDate,
  thumbnailUrl: p.artworkUrl60,
});

const podcastsApi = createApi({
  reducerPath: 'podcasts',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: builder => ({
    getPodcasts: builder.query({
      query: (term: string) => ({
        url: getEncodedUrl(`search?entity=podcast&limit=10&term=${term}`),
        method: 'GET',
      }),
      transformResponse: (apiResults: ITunesResults): Podcast[] => {
        const podcasts = transformITunesResults(apiResults);
        return podcasts.map(mapPodcast);
      },
    }),
  }),
});

export const { useLazyGetPodcastsQuery } = podcastsApi;

export default podcastsApi;
