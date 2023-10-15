import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Episode } from '~/entities';
import { BASEURL, getEncodedUrl } from '~/utils/constants';
import { calculateDuration } from '~/utils/dates';
import { ITunesResultsRaw, transformITunesResults } from '~/utils/itunes';

const transformEpisodes = (apiResults: ITunesResultsRaw): Episode[] => {
  const episodes = transformITunesResults(apiResults);
  return episodes
    .filter(e => e.kind === 'podcast-episode')
    .map(e => ({
      id: e.trackId,
      title: e.trackName,
      releaseDate: new Date(e.releaseDate).toLocaleDateString(),
      description: e.description,
      duration: calculateDuration(e.trackTimeMillis),
      url: e.episodeUrl,
    }));
};

const episodesApi = createApi({
  reducerPath: 'episodes',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: builder => ({
    getEpisodes: builder.query({
      query: (podcastId: number) => ({
        url: getEncodedUrl(`lookup?id=${podcastId}&entity=podcastEpisode&limit=20`),
        method: 'GET',
      }),
      transformResponse: transformEpisodes,
    }),
    getLastPodcastEpisode: builder.query({
      query: (podcastId: number) => ({
        url: getEncodedUrl(`lookup?id=${podcastId}&entity=podcastEpisode&limit=1`),
        method: 'GET',
      }),
      transformResponse: (apiResults: ITunesResultsRaw) => {
        const episodes = transformEpisodes(apiResults);
        return episodes[0];
      },
    }),
  }),
});

export const { useGetEpisodesQuery, useLazyGetLastPodcastEpisodeQuery } = episodesApi;

export default episodesApi;
